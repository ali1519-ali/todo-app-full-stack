# Todo App Backend Setup Guide

## Overview
This guide explains how to properly set up and run the Todo app backend to avoid common issues with signup functionality.

## Prerequisites
- Python 3.8+
- pip
- For optimal performance, PostgreSQL (optional but recommended)

## Setup Steps

### 1. Environment Configuration
1. Navigate to the backend directory:
   ```bash
   cd /path/to/todo-app/backend
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Configure your database:
   - For PostgreSQL (recommended):
     - Install PostgreSQL locally or use a cloud service
     - Uncomment and modify the DATABASE_URL in `.env`:
       ```env
       DATABASE_URL=postgresql://username:password@localhost:5432/todoapp
       ```

   - For SQLite (development only):
     - Use the default configuration in `.env`:
       ```env
       DATABASE_URL=sqlite:///./todo_app.db
       ```
     - Note: SQLite may have concurrency issues in web applications

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Application
```bash
cd src
python -m main
```

The application will be available at `http://localhost:8000`

## Troubleshooting Common Issues

### Issue: "attempt to write a readonly database" error during signup
**Cause**: This is typically a SQLite concurrency issue in web applications.

**Solutions**:
1. **Recommended**: Switch to PostgreSQL database for better concurrency handling
2. If using SQLite, ensure proper file permissions:
   - Make sure the application has write permissions to the database file location
   - Check that the disk is not full
3. Restart the application to clear any potential file locks

### Issue: Port already in use
**Solution**: Kill any existing processes running on port 8000:
```bash
pkill -f "uvicorn" || pkill -f "src.main"
```

## Notes
- The application uses SQLModel with support for both PostgreSQL and SQLite
- PostgreSQL is recommended for production and development due to better concurrency
- SQLite can be used for quick local testing but may have limitations with concurrent requests
- The signup functionality creates a new user record in the database upon successful registration