from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import auth, tasks, user as user_api
from .database.database import engine
from .models import user, task  # Import models to create tables

# Create tables
from sqlmodel import SQLModel
SQLModel.metadata.create_all(engine)

# Create FastAPI app
app = FastAPI(title="Todo API", version="1.0.0")

# Add CORS middleware with more permissive settings for mobile networks
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
        "https://muaazasif.github.io",
        "https://todo-full-stack-web-application-with-neon-db-production.up.railway.app",
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Additional headers that might help with mobile network issues
    allow_origin_regex=r"https?://.*",
)

# Include routers
# Include routers with proper prefixes
app.include_router(auth.router, prefix="/api")
app.include_router(tasks.router, prefix="/api", tags=["tasks"])
app.include_router(user_api.router, prefix="/api", tags=["user"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}

# Add a health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        # Additional settings that might help with mobile network stability
        timeout_keep_alive=30,
        timeout_graceful_shutdown=5
    )