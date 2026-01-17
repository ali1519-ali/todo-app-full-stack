# Data Model: Multi-User Todo Application

## User Entity
- **id**: String (UUID) - Unique identifier from Better Auth
- **email**: String - User's email address (unique)
- **name**: String - User's display name
- **created_at**: DateTime - Account creation timestamp
- **updated_at**: DateTime - Last update timestamp

## Task Entity
- **id**: Integer - Auto-incrementing primary key
- **title**: String (1-200 characters) - Task title (required)
- **description**: String (max 1000 characters) - Task description (optional)
- **completed**: Boolean - Task completion status (default: false)
- **user_id**: String (UUID) - Foreign key linking to User entity
- **created_at**: DateTime - Task creation timestamp
- **updated_at**: DateTime - Last update timestamp

## Relationships
- One User to Many Tasks (one-to-many relationship)
- Each Task belongs to exactly one User
- Tasks are isolated by user_id to enforce ownership

## Validation Rules
- Task title must be 1-200 characters
- Task description must be ≤ 1000 characters
- User email must be valid email format
- Task user_id must reference an existing User

## State Transitions
- Task.completed can transition from False to True (mark complete)
- Task.completed can transition from True to False (mark incomplete)
- Task entity can transition to deleted state (soft delete)