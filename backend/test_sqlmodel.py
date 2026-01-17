from sqlmodel import SQLModel, Field, create_engine, Session
from datetime import datetime
import uuid
import os

# Define a simple model similar to the User model
class TestUser(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    email: str = Field(unique=True, nullable=False)
    name: str = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    hashed_password: str = Field(nullable=False)

# Create an engine with a test database
db_path = "./test_sqlmodel.db"
DATABASE_URL = f"sqlite:///{db_path}"

# Remove the file if it exists
if os.path.exists(db_path):
    os.remove(db_path)

print(f"Creating database at: {os.path.abspath(db_path)}")

# Create engine
connect_args = {"check_same_thread": False}
engine = create_engine(DATABASE_URL, echo=True, connect_args=connect_args)

# Create tables
SQLModel.metadata.create_all(engine)

# Try to insert a record
with Session(engine) as session:
    test_user = TestUser(
        email="test@example.com",
        name="Test User",
        hashed_password="$2b$12$examplehashedpassword"
    )
    
    session.add(test_user)
    session.commit()
    session.refresh(test_user)
    
    print(f"Created user: {test_user.email}")

print("SQLModel test successful!")