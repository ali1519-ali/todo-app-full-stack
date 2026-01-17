from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from ..models.user import UserRead
from ..utils.auth import get_current_user
from ..database.database import get_session
from sqlmodel import select


router = APIRouter(prefix="/user", tags=["user"])


@router.get("/profile", response_model=UserRead)
def get_user_profile(
    current_user_id: str = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Get the current user's profile information."""
    from ..models.user import User

    user = session.exec(select(User).where(User.id == current_user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user