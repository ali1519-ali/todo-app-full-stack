from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def truncate_password_to_bytes(password: str, max_bytes: int = 72) -> str:
    """
    Truncate a password string to ensure it doesn't exceed the specified byte length.

    Args:
        password: The password string to truncate
        max_bytes: Maximum number of bytes (default 72 for bcrypt)

    Returns:
        A truncated password string that fits within the byte limit
    """
    password_bytes = password.encode('utf-8')
    if len(password_bytes) <= max_bytes:
        return password

    # Truncate to max_bytes while preserving character boundaries
    truncated_bytes = password_bytes[:max_bytes]
    return truncated_bytes.decode('utf-8', errors='ignore')



# JWT token scheme
security = HTTPBearer()

# Secret key and algorithm from environment
SECRET_KEY = os.getenv("SECRET_KEY", "0123456789abcdef")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))  # 7 days


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


def get_password_hash(password: str) -> str:
    """
    Hash a password with bcrypt.
    Truncate if longer than 72 bytes to avoid bcrypt errors.
    """
    truncated_password = truncate_password_to_bytes(password, 72)
    try:
        return pwd_context.hash(truncated_password)
    except ValueError as e:
        # Specific error for bcrypt length issues
        raise ValueError(f"Password cannot be longer than 72 bytes: {str(e)}")
    except Exception as e:
        # General error for other issues
        raise Exception(f"Error hashing password: {str(e)}")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password with bcrypt.
    Truncate if longer than 72 bytes to avoid bcrypt errors.
    """
    truncated_password = truncate_password_to_bytes(plain_password, 72)
    try:
        return pwd_context.verify(truncated_password, hashed_password)
    except Exception as e:
        # General error for other issues
        raise Exception(f"Error verifying password: {str(e)}")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    # The 'sub' field should already be in the data, so just add the expiration
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



def verify_token(token: str) -> Optional[TokenData]:
    """Verify a JWT token and return the token data."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        token_data = TokenData(username=username)
        return token_data
    except JWTError:
        return None


from fastapi import Request
from fastapi import HTTPException
from ..models.user import User
from sqlmodel import Session, select
from ..database.database import get_session
from typing import Generator


def get_current_user_from_email(email: str, session: Session) -> User:
    """Helper function to get user by email from the database."""
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
):
    """Dependency to get the current user from the JWT token."""
    token = credentials.credentials
    token_data = verify_token(token)
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Find user by email (stored in token_data.username)
    user = session.exec(select(User).where(User.email == token_data.username)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user.id  # Return the user ID to match the path parameter