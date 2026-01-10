# Data Model: Backend MCP Refactor

## Conversation Entity
- **id**: string (UUID) - Unique identifier for the conversation
- **user_id**: string (UUID) - Foreign key linking to the user who owns this conversation
- **title**: string - Title of the conversation for easy identification
- **created_at**: DateTime - Timestamp when the conversation was created
- **updated_at**: DateTime - Timestamp when the conversation was last updated

### Validation Rules
- id must be a valid UUID
- user_id must reference an existing user
- title must be 1-200 characters
- created_at must be before updated_at

### Relationships
- Has-many: ChatMessage (via conversation_id foreign key)

## ChatMessage Entity
- **id**: string (UUID) - Unique identifier for the message
- **conversation_id**: string (UUID) - Foreign key linking to the parent conversation
- **role**: enum (user | assistant | tool) - Defines who sent the message
- **content**: string - The actual message content
- **timestamp**: DateTime - When the message was created
- **tool_call_id**: string (optional) - ID of the tool call if this is a tool response

### Validation Rules
- id must be a valid UUID
- conversation_id must reference an existing conversation
- role must be one of 'user', 'assistant', or 'tool'
- content must be 1-10000 characters
- If role is 'tool', tool_call_id must be provided

### Relationships
- Belongs-to: Conversation (via conversation_id foreign key)

## Task Entity (Referenced by Tools)
- **id**: string (UUID) - Unique identifier for the task
- **user_id**: string (UUID) - Foreign key linking to the user who owns this task
- **title**: string - Title of the task
- **description**: string (optional) - Detailed description of the task
- **status**: enum (pending | in-progress | completed | archived) - Current status of the task
- **priority**: enum (low | medium | high) - Priority level of the task
- **due_date**: DateTime (optional) - Deadline for the task
- **created_at**: DateTime - When the task was created
- **updated_at**: DateTime - When the task was last updated

### Validation Rules
- id must be a valid UUID
- user_id must reference an existing user
- title must be 1-200 characters
- status must be one of the defined enums
- priority must be one of the defined enums
- due_date must be in the future if provided

## Analytics Entity (Referenced by Tools)
- **user_id**: string (UUID) - Foreign key linking to the user
- **task_completion_rate**: float - Percentage of tasks completed
- **average_completion_time**: int - Average time to complete tasks (in days)
- **productivity_score**: float - Calculated productivity score
- **tasks_completed_this_week**: int - Number of tasks completed in the current week
- **tasks_pending**: int - Number of pending tasks
- **calculated_at**: DateTime - When the analytics were last calculated

### Validation Rules
- user_id must reference an existing user
- task_completion_rate must be between 0.0 and 100.0
- average_completion_time must be non-negative
- productivity_score must be between 0.0 and 100.0

## Relationships
- Conversation has-many ChatMessage (one-to-many)
- User has-many Conversation (one-to-many)
- User has-many Task (one-to-many)
- User has-one Analytics (one-to-one)

## Constraints
- All entities must include proper user scoping (user_id validation)
- All timestamps must be in UTC
- All UUIDs must follow standard format
- All database operations must be synchronous