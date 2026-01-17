password = "Canada123#"
print(f"Password: {password}")
print(f"Length in characters: {len(password)}")
print(f"Length in bytes: {len(password.encode('utf-8'))}")

# Test the truncate function
from src.utils.auth import truncate_password_to_bytes

truncated = truncate_password_to_bytes(password, 72)
print(f"Truncated password: {truncated}")
print(f"Truncated length in bytes: {len(truncated.encode('utf-8'))}")