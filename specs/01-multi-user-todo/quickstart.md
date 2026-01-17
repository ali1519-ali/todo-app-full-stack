# Quickstart Guide: Multi-User Todo Application

## Development Environment Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL-compatible database (Neon recommended)
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database and auth configuration
   ```

5. Run database migrations:
   ```bash
   python -m src.database.migrate
   ```

6. Start the backend server:
   ```bash
   uvicorn src.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL and auth configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Application
- Backend API will be available at `http://localhost:8000`
- Frontend will be available at `http://localhost:3000`
- API documentation available at `http://localhost:8000/docs`

## Testing
### Backend Tests
```bash
cd backend
source venv/bin/activate
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Key Features Access
1. Visit the frontend at `http://localhost:3000`
2. Register a new account or sign in
3. Create, view, update, and delete tasks
4. Mark tasks as complete/incomplete
5. Filter tasks by status

## Troubleshooting
- If you encounter database connection issues, verify your Neon PostgreSQL credentials in the `.env` file
- For authentication problems, ensure Better Auth is properly configured in both frontend and backend
- If API calls fail, check that the backend is running and the API URL is correctly configured in the frontend