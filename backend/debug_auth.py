import sys
sys.path.append('C:/Users/LAPTOP WORLD/Desktop/todo-full-stack-web-application-with-neon-db-main/backend/src')

from utils.auth import truncate_password_to_bytes, get_password_hash
from services.auth_service import AuthService
from models.user import UserCreate
from database.database import get_session

# Test the password function directly
password = "Can123#"
print(f"Original password: {password}")
print(f"Password length in bytes: {len(password.encode('utf-8'))}")

truncated = truncate_password_to_bytes(password)
print(f"Truncated password: {truncated}")

try:
    hashed = get_password_hash(truncated)
    print(f"Password hashed successfully: {hashed[:20]}...")
except Exception as e:
    print(f"Error hashing password: {e}")

# Test creating a UserCreate object
user_data = UserCreate(email="test@example.com", name="Test User", password=password)
print(f"UserCreate object created: {user_data.email}, {user_data.name}")