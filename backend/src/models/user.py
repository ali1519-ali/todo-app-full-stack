from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
import uuid

class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False)
    name: Optional[str] = Field(default=None)

class User(UserBase, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Hashed password would be stored here in a real implementation
    hashed_password: str = Field(nullable=False)

    # Relationship to tasks
    tasks: List["Task"] = Relationship(back_populates="user")

class UserRead(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime

class UserCreate(UserBase):
    password: str  # Plain text password that will be hashed on the server