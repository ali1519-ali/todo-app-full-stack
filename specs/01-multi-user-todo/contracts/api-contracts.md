# API Contracts: Multi-User Todo Application

## Authentication Endpoints

### POST /api/auth/signup
- **Description**: Register a new user
- **Request Body**: 
  - email: string (valid email format)
  - password: string (min 8 characters)
  - name: string (optional)
- **Response**: 
  - 200: User registration successful
  - 400: Invalid input data
  - 409: Email already exists

### POST /api/auth/signin
- **Description**: Authenticate user and return JWT
- **Request Body**: 
  - email: string
  - password: string
- **Response**: 
  - 200: Authentication successful, returns JWT
  - 401: Invalid credentials

### POST /api/auth/signout
- **Description**: Logout user
- **Headers**: 
  - Authorization: Bearer <token>
- **Response**: 
  - 200: Successfully logged out

## Task Management Endpoints

### GET /api/users/{user_id}/tasks
- **Description**: Retrieve all tasks for a user
- **Headers**: 
  - Authorization: Bearer <token>
- **Query Parameters**:
  - status: string (optional, values: "all", "pending", "completed"; default: "all")
  - sort: string (optional, values: "created", "title", "due_date"; default: "created")
- **Response**: 
  - 200: Array of task objects
  - 401: Unauthorized
  - 403: Access forbidden (trying to access other user's tasks)

### POST /api/users/{user_id}/tasks
- **Description**: Create a new task
- **Headers**: 
  - Authorization: Bearer <token>
- **Request Body**: 
  - title: string (1-200 characters)
  - description: string (optional, max 1000 characters)
- **Response**: 
  - 201: Task created successfully, returns task object
  - 400: Invalid input data
  - 401: Unauthorized
  - 403: Access forbidden (trying to create task for other user)

### GET /api/users/{user_id}/tasks/{task_id}
- **Description**: Retrieve a specific task
- **Headers**: 
  - Authorization: Bearer <token>
- **Response**: 
  - 200: Task object
  - 401: Unauthorized
  - 403: Access forbidden (trying to access other user's task)
  - 404: Task not found

### PUT /api/users/{user_id}/tasks/{task_id}
- **Description**: Update a task
- **Headers**: 
  - Authorization: Bearer <token>
- **Request Body**: 
  - title: string (1-200 characters)
  - description: string (optional, max 1000 characters)
- **Response**: 
  - 200: Task updated successfully, returns task object
  - 400: Invalid input data
  - 401: Unauthorized
  - 403: Access forbidden (trying to update other user's task)
  - 404: Task not found

### DELETE /api/users/{user_id}/tasks/{task_id}
- **Description**: Delete a task
- **Headers**: 
  - Authorization: Bearer <token>
- **Response**: 
  - 204: Task deleted successfully
  - 401: Unauthorized
  - 403: Access forbidden (trying to delete other user's task)
  - 404: Task not found

### PATCH /api/users/{user_id}/tasks/{task_id}/complete
- **Description**: Toggle task completion status
- **Headers**: 
  - Authorization: Bearer <token>
- **Request Body**: 
  - completed: boolean
- **Response**: 
  - 200: Task updated successfully, returns task object
  - 400: Invalid input data
  - 401: Unauthorized
  - 403: Access forbidden (trying to update other user's task)
  - 404: Task not found

## Task Object Schema
```
{
  "id": integer,
  "title": string,
  "description": string,
  "completed": boolean,
  "user_id": string,
  "created_at": string (ISO 8601 datetime),
  "updated_at": string (ISO 8601 datetime)
}
```