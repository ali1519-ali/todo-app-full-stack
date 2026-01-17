import sqlite3
import os

# Connect to the database
db_path = "/home/muaaz/Desktop/Governor Sindh IT/Todo Full-Stack Web Application/todo-app/backend/todo_app.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Check what tables exist
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables in database:", tables)

# Try to create a simple test record if the user table exists
if ('user',) in tables:
    try:
        # Insert a test record
        cursor.execute("INSERT INTO user (email, name, id, created_at, updated_at, hashed_password) VALUES (?, ?, ?, datetime('now'), datetime('now'), ?)", 
                      ("test@example.com", "Test User", "test-id", "$2b$12$testhash"))
        conn.commit()
        print("Successfully inserted test record into user table")
        
        # Query back the record
        cursor.execute("SELECT * FROM user WHERE email = ?", ("test@example.com",))
        result = cursor.fetchone()
        print("Retrieved record:", result)
    except Exception as e:
        print(f"Failed to insert into user table: {e}")
else:
    print("User table does not exist in the database")

conn.close()