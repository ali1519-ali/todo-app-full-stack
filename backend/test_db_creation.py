import sys
import os
sys.path.append('C:/Users/LAPTOP WORLD/Desktop/todo-full-stack-web-application-with-neon-db-main/backend/src')

from database.database import engine
from models import user, task
from sqlmodel import SQLModel

print("Creating database tables...")
try:
    SQLModel.metadata.create_all(engine)
    print("Database tables created successfully!")
    
    # Check if we can connect to the database
    from sqlmodel import Session
    with Session(engine) as session:
        print("Database connection successful!")
        
        # Try to query the users table
        result = session.exec(user.select()).all()
        print(f"Number of users in database: {len(result)}")
        
except Exception as e:
    print(f"Error creating database tables: {e}")
    import traceback
    traceback.print_exc()