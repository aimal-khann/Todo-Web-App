# Data Model: Professional Todo Manager (Backend API)

**Feature**: 001-backend-api | **Date**: 2026-01-02

## Entity Overview

This document defines the data models for the Professional Todo Manager backend API, following the schema-first approach with SQLModel as the ORM.

## User Entity

### User Model
- **Table Name**: `users`
- **Primary Key**: `id` (UUID)
- **Fields**:
  - `id`: UUID (Primary Key, auto-generated)
  - `email`: String (Unique, Indexed, Required)
  - `password_hash`: String (Required)
  - `full_name`: String (Required)
  - `created_at`: DateTime (UTC, Auto-generated)
  - `updated_at`: DateTime (UTC, Auto-generated, Updated on change)

### Relationships
- One-to-Many: User → Tasks (via `user_id` foreign key in Task model)

### Validation Rules
- Email must be a valid email format
- Email must be unique across all users
- Full name must not be empty
- Password hash is stored (never plain text passwords)

## Task Entity

### Task Model
- **Table Name**: `tasks`
- **Primary Key**: `id` (UUID)
- **Fields**:
  - `id`: UUID (Primary Key, auto-generated)
  - `user_id`: UUID (Foreign Key to User.id, Required)
  - `title`: String (Required)
  - `description`: String (Optional, nullable)
  - `status`: Enum (Values: 'pending', 'completed', 'archived', Default: 'pending')
  - `priority`: Enum (Values: 'low', 'medium', 'high', Default: 'medium')
  - `due_date`: DateTime (Optional, nullable)
  - `created_at`: DateTime (UTC, Auto-generated)
  - `updated_at`: DateTime (UTC, Auto-generated, Updated on change)

### Relationships
- Many-to-One: Task → User (via `user_id` foreign key)

### Validation Rules
- Title must not be empty
- Status must be one of the defined enum values
- Priority must be one of the defined enum values
- User can only access tasks associated with their user_id
- Due date, if provided, should be a valid future date

## State Transitions

### Task Status Transitions
- `pending` → `completed`: When user marks task as done
- `pending` → `archived`: When user archives a pending task
- `completed` → `pending`: When user reopens completed task
- `completed` → `archived`: When user archives completed task
- `archived` → `pending`: When user unarchives task

## Indexes

### Required Indexes
- `users.email`: Unique index for fast user lookup by email
- `tasks.user_id`: Index for filtering tasks by user
- `tasks.status`: Index for filtering tasks by status
- `tasks.due_date`: Index for ordering tasks by due date
- `tasks.created_at`: Index for chronological ordering

## Constraints

### Database Constraints
- Foreign key constraint: `tasks.user_id` must reference a valid `users.id`
- Not null constraints: All required fields must have values
- Unique constraint: `users.email` must be unique
- Check constraints: Status and priority fields must be valid enum values

### Business Logic Constraints
- Users can only access/modify their own tasks
- Task ownership cannot be changed after creation
- Tasks cannot be created without a valid user

## API Schema Mapping

### Pydantic Schema Classes

#### User Schemas
- `UserCreate`: email, password (plain), full_name
- `UserRead`: id, email, full_name, created_at
- `UserUpdate`: email, full_name (password updates handled separately)

#### Task Schemas
- `TaskCreate`: title, description (optional), status (optional), priority (optional), due_date (optional)
- `TaskRead`: id, user_id, title, description, status, priority, due_date, created_at, updated_at
- `TaskUpdate`: title (optional), description (optional), status (optional), priority (optional), due_date (optional)

### Field Transformations
- Python snake_case → JSON camelCase (for API responses)
- Password hashing applied before database storage
- Timestamps automatically managed by the database/models