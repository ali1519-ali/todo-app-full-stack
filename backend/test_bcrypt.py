import sys
sys.path.append('C:/Users/LAPTOP WORLD/Desktop/todo-full-stack-web-application-with-neon-db-main/backend/src')

try:
    from passlib.context import CryptContext
    print("CryptContext imported successfully")
    
    # Create a password context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    print("Password context created successfully")
    
    # Test password hashing
    password = "Can123#"
    print(f"Testing password: {password}")
    
    hashed = pwd_context.hash(password)
    print(f"Password hashed successfully: {hashed[:50]}...")
    
    # Test verification
    verified = pwd_context.verify(password, hashed)
    print(f"Password verification: {verified}")
    
    print("All bcrypt operations successful!")
    
except ImportError as e:
    print(f"Import error: {e}")
except Exception as e:
    print(f"Error during bcrypt operations: {e}")
    import traceback
    traceback.print_exc()