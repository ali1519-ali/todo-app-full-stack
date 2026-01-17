from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from pydantic import BaseModel
from ..models.user import UserCreate, UserRead
from ..services.auth_service import AuthService
from ..database.database import get_session
from ..utils.auth import Token, truncate_password_to_bytes


class SigninRequest(BaseModel):
    email: str
    password: str


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=UserRead)
def signup(user_create: UserCreate, session: Session = Depends(get_session)):
    """Register a new user."""
    auth_service = AuthService(session=session)
    try:
        user = auth_service.register_user(user_create)
        return user
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during registration: {str(e)}"
        )


@router.post("/signin", response_model=Token)
def signin(signin_request: SigninRequest, session: Session = Depends(get_session)):
    """Authenticate a user and return a JWT token."""
    # Truncate password to ensure it doesn't exceed bcrypt limits (72 bytes)
    truncated_password = truncate_password_to_bytes(signin_request.password, 72)

    auth_service = AuthService(session=session)
    user = auth_service.authenticate_user(signin_request.email, truncated_password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = auth_service.create_access_token_for_user(user)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signout")
def signout():
    """Logout a user."""
    # In a real implementation, you might want to blacklist the token
    # For now, we just return a success message
    return {"message": "Successfully logged out"}