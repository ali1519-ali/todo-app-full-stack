from sqlmodel import create_engine, Session, SQLModel, Field
from datetime import datetime
import uuid
import os

# Define the same User model as in the application
class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False)
    name: str = Field(default=None)

class User(UserBase, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    hashed_password: str = Field(nullable=False)

# Remove the database file if it exists
db_path = "./application_test.db"
if os.path.exists(db_path):
    os.remove(db_path)

print(f"Creating database at: {os.path.abspath(db_path)}")

# Create engine exactly as the application does
DATABASE_URL = f"sqlite:///{db_path}"
connect_args = {"check_same_thread": False}
engine = create_engine(DATABASE_URL, echo=True, connect_args=connect_args)

# Create tables as the application does
SQLModel.metadata.create_all(engine)

# Try to create a user exactly as the auth service does
with Session(engine) as session:
    db_user = User(
        email="test@example.com",
        name="Test User",
        hashed_password="$2b$12$examplehashedpassword"
    )

    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    
    print(f"Created user: {db_user.email}, ID: {db_user.id}")

print("Application-style database test successful!")