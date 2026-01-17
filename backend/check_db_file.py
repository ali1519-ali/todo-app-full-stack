import os
from pathlib import Path

# Check if the database file exists and its permissions
db_path = "todo_app.db"
abs_db_path = os.path.abspath(db_path)
print(f"Database path: {abs_db_path}")
print(f"Directory exists: {os.path.exists(os.path.dirname(abs_db_path))}")
print(f"Directory writable: {os.access(os.path.dirname(abs_db_path), os.W_OK)}")

# Try to create the file if it doesn't exist
if not os.path.exists(abs_db_path):
    try:
        # Create parent directories if they don't exist
        Path(abs_db_path).parent.mkdir(parents=True, exist_ok=True)
        
        # Create an empty file
        with open(abs_db_path, 'w') as f:
            f.write('')
        print("Database file created successfully")
    except Exception as e:
        print(f"Error creating database file: {e}")
else:
    print("Database file already exists")

# Check file permissions
print(f"File exists: {os.path.exists(abs_db_path)}")
print(f"File writable: {os.access(abs_db_path, os.W_OK)}")