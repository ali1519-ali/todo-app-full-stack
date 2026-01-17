from src.utils.auth import get_password_hash, truncate_password_to_bytes

# Test the password functions
password = "simple123"
print(f"Original password: {password}")
print(f"Truncated password: {truncate_password_to_bytes(password, 72)}")

try:
    hashed = get_password_hash(password)
    print(f"Password hashed successfully: {hashed[:20]}...")
except Exception as e:
    print(f"Error hashing password: {e}")