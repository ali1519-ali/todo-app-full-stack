# REST API Endpoints

## Authentication
All endpoints require JWT token:
Authorization: Bearer <token>

## Tasks

### GET /api/{user_id}/tasks
- List all tasks for the authenticated user
- Query parameters: status (all|pending|completed), sort (created|title|due_date)
- Response: Array of task objects

### POST /api/{user_id}/tasks
- Create a new task
- Request body: title (string, required), description (string, optional)
- Response: Created task object

### GET /api/{user_id}/tasks/{id}
- Get details of a task
- Response: Task object

### PUT /api/{user_id}/tasks/{id}
- Update a task
- Users can only update their own tasks
- Request body: title, description
- Response: Updated task object

### DELETE /api/{user_id}/tasks/{id}
- Delete a task
- Only owner can delete
- Response: 204 No Content

### PATCH /api/{user_id}/tasks/{id}/complete
- Toggle task complete/pending
- Response: Updated task object