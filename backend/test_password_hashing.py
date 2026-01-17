import sys
import os
sys.path.append('C:/Users/LAPTOP WORLD/Desktop/todo-full-stack-web-application-with-neon-db-main/backend/src')

from utils.auth import get_password_hash
from models.user import User
from sqlmodel import Session
from database.database import engine
from datetime import datetime

# Test the password hashing directly
password = "Can123#"
print(f"Testing password: {password}")
print(f"Password length in bytes: {len(password.encode('utf-8'))}")

try:
    hashed = get_password_hash(password)
    print(f"Password hashed successfully: {hashed[:50]}...")
except Exception as e:
    print(f"Error hashing password: {e}")
    import traceback
    traceback.print_exc()

# Test creating a user object
try:
    user_obj = User(
        email="test@example.com",
        name="Test User",
        hashed_password=hashed,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    print(f"User object created successfully: {user_obj.email}")
except Exception as e:
    print(f"Error creating user object: {e}")
    import traceback
    traceback.print_exc()

# Test saving to database
try:
    with Session(engine) as session:
        session.add(user_obj)
        session.commit()
        print("User saved to database successfully!")
except Exception as e:
    print(f"Error saving user to database: {e}")
    import traceback
    traceback.print_exc()