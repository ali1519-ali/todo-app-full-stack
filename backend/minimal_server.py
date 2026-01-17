from fastapi import FastAPI, Depends, HTTPException, status
from sqlmodel import SQLModel, Field, Session, create_engine, select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def get_session():
    with Session(engine) as session:
        yield session

# Models
class UserBase(BaseModel):
    email: str
    name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    hashed_password: str = Field(nullable=False)

class UserRead(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime

# Utility functions
def get_password_hash(password: str) -> str:
    """Hash a password with bcrypt."""
    return pwd_context.hash(password)

def truncate_password_to_bytes(password: str, max_bytes: int = 72) -> str:
    """Truncate a password string to ensure it doesn't exceed the specified byte length."""
    password_bytes = password.encode('utf-8')
    if len(password_bytes) <= max_bytes:
        return password

    # Truncate to max_bytes while preserving character boundaries
    truncated_bytes = password_bytes[:max_bytes]
    return truncated_bytes.decode('utf-8', errors='ignore')

# Create tables
SQLModel.metadata.create_all(engine)

# FastAPI app
app = FastAPI()

@app.post("/api/auth/signup", response_model=UserRead)
def signup(user_create: UserCreate, session: Session = Depends(get_session)):
    """Register a new user."""
    try:
        # Check if user already exists
        existing_user = session.exec(select(User).where(User.email == user_create.email)).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )

        # Truncate password to ensure it doesn't exceed bcrypt limits (72 bytes)
        truncated_password = truncate_password_to_bytes(user_create.password, 72)

        # Hash the password
        hashed_password = get_password_hash(truncated_password)

        # Create new user
        db_user = User(
            email=user_create.email,
            name=user_create.name,
            hashed_password=hashed_password
        )

        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        print(f"Error during registration: {e}")  # This will help us see the actual error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during registration: {str(e)}"
        )

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)