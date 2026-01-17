import sqlite3
import os

# Test if we can create and write to a SQLite database
db_path = "./test_todo_app.db"

# Remove the file if it exists
if os.path.exists(db_path):
    os.remove(db_path)

print(f"Creating database at: {os.path.abspath(db_path)}")
print(f"Directory permissions: {oct(os.stat('.').st_mode)[-3:]}")

# Create a connection and try to create a table
try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create a simple table
    cursor.execute('''CREATE TABLE test_table (id INTEGER PRIMARY KEY, name TEXT)''')
    
    # Insert a record
    cursor.execute("INSERT INTO test_table (name) VALUES (?)", ("test",))
    
    # Commit changes
    conn.commit()
    
    # Query the record
    cursor.execute("SELECT * FROM test_table")
    result = cursor.fetchall()
    print(f"Query result: {result}")
    
    conn.close()
    print("Database write test successful!")
    
    # Check file permissions
    print(f"Database file permissions: {oct(os.stat(db_path).st_mode)[-3:]}")
    
except Exception as e:
    print(f"Database write test failed: {e}")
    
    # Check file permissions
    if os.path.exists(db_path):
        print(f"Database file permissions: {oct(os.stat(db_path).st_mode)[-3:]}")