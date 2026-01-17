from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session
from typing import List, Optional
from ..models.task import Task, TaskCreate, TaskUpdate, TaskUpdateStatus, TaskRead
from ..services.task_service import TaskService
from ..database.database import get_session
from ..utils.auth import get_current_user

router = APIRouter(prefix="/tasks", tags=["tasks"])  # path me user_id remove

@router.get("/", response_model=List[TaskRead])
def get_tasks(
    status_filter: Optional[str] = Query(None),
    sort_by: Optional[str] = Query(None),
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)  # JWT se ID
):
    task_service = TaskService(session=session)
    tasks = task_service.get_tasks_by_user(user_id, status_filter, sort_by)
    return tasks


@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    task_create: TaskCreate,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task_service = TaskService(session=session)
    task = task_service.create_task(task_create, user_id)
    return task


@router.get("/{task_id}", response_model=TaskRead)
def get_task(
    task_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task_service = TaskService(session=session)
    task = task_service.get_task_by_id(task_id, user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task_service = TaskService(session=session)
    task = task_service.update_task(task_id, task_update, user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task_service = TaskService(session=session)
    success = task_service.delete_task(task_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return


@router.patch("/{task_id}/complete", response_model=TaskRead)
def update_task_complete(
    task_id: int,
    task_update_status: TaskUpdateStatus,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user)
):
    task_service = TaskService(session=session)
    task = task_service.update_task_status(task_id, task_update_status, user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
