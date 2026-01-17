from sqlmodel import Session, select
from typing import List, Optional
from ..models.task import Task, TaskCreate, TaskUpdate, TaskUpdateStatus
from ..models.user import User
from fastapi import Depends, HTTPException, status
from ..database.database import get_session


class TaskService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create_task(self, task_create: TaskCreate, user_id: str) -> Task:
        """Create a new task for a user."""
        # Verify the user exists
        user = self.session.get(User, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Create the task
        db_task = Task(
            title=task_create.title,
            description=task_create.description,
            user_id=user_id  # Assign the user_id directly
        )

        self.session.add(db_task)
        self.session.commit()
        self.session.refresh(db_task)
        return db_task

    def get_tasks_by_user(
        self, 
        user_id: str, 
        status_filter: Optional[str] = None, 
        sort_by: Optional[str] = None
    ) -> List[Task]:
        """Get all tasks for a user with optional filtering and sorting."""
        query = select(Task).where(Task.user_id == user_id)
        
        # Apply status filter if provided
        if status_filter and status_filter != "all":
            if status_filter == "pending":
                query = query.where(Task.completed == False)
            elif status_filter == "completed":
                query = query.where(Task.completed == True)
        
        # Apply sorting if provided
        if sort_by == "title":
            query = query.order_by(Task.title)
        elif sort_by == "due_date":  # Assuming we had a due_date field
            # For now, just order by id as a placeholder
            query = query.order_by(Task.id)
        else:  # Default to created date
            query = query.order_by(Task.created_at)
        
        tasks = self.session.exec(query).all()
        return tasks

    def get_task_by_id(self, task_id: int, user_id: str) -> Optional[Task]:
        """Get a specific task by ID for a user."""
        task = self.session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return None
        return task

    def update_task(self, task_id: int, task_update: TaskUpdate, user_id: str) -> Optional[Task]:
        """Update a task."""
        task = self.session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return None
        
        # Update only the fields that are provided
        update_data = task_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)
        
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        return task

    def delete_task(self, task_id: int, user_id: str) -> bool:
        """Delete a task."""
        task = self.session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return False
        
        self.session.delete(task)
        self.session.commit()
        return True

    def update_task_status(self, task_id: int, task_update_status: TaskUpdateStatus, user_id: str) -> Optional[Task]:
        """Update a task's completion status."""
        task = self.session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return None
        
        task.completed = task_update_status.completed
        
        self.session.add(task)
        self.session.commit()
        self.session.refresh(task)
        return task