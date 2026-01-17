#!/bin/bash

echo "Setting up PostgreSQL for Todo App..."

# Update package list
sudo apt update

# Install PostgreSQL
echo "Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
echo "Creating database and user..."
sudo -u postgres psql -c "CREATE DATABASE todoapp;"
sudo -u postgres psql -c "CREATE USER todoapp_user WITH PASSWORD 'SecurePass123!';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE todoapp TO todoapp_user;"

# Update the .env file
TODO_BACKEND_PATH="/home/muaaz/Desktop/Governor Sindh IT/Todo Full-Stack Web Application/todo-app/backend"
ENV_FILE="$TODO_BACKEND_PATH/.env"

if [ -f "$ENV_FILE" ]; then
    # Backup the original file
    cp "$ENV_FILE" "$ENV_FILE.backup"
    
    # Update the DATABASE_URL
    sed -i "s|DATABASE_URL=sqlite:///./todo_app.db|DATABASE_URL=postgresql://todoapp_user:SecurePass123!@localhost:5432/todoapp|" "$ENV_FILE"
    sed -i "s|# DATABASE_URL=postgresql://todoapp_user:SecurePass123!@localhost:5432/todoapp|DATABASE_URL=postgresql://todoapp_user:SecurePass123!@localhost:5432/todoapp|" "$ENV_FILE"
    
    echo "Updated .env file with PostgreSQL connection string."
else
    echo "Error: .env file not found at $ENV_FILE"
fi

# Install required Python package
echo "Installing psycopg2-binary..."
cd "$TODO_BACKEND_PATH"
source venv_new/bin/activate
pip install psycopg2-binary

echo "PostgreSQL setup complete!"
echo "Database: todoapp"
echo "User: todoapp_user"
echo "Password: SecurePass123!"
echo ""
echo "To run the application:"
echo "cd $TODO_BACKEND_PATH/src && python -m main"