# Data Model: Professional Todo Manager (Frontend UI/UX)

## Overview
This document defines the data structures for the todo manager application, focusing on the client-side mock data model that will be managed by Zustand.

## Core Entities

### Task
Represents a user's to-do item with properties for organization and tracking.

**Fields:**
- `id`: string (UUID) - Unique identifier for the task
- `title`: string - The main task description (required, max 200 characters)
- `description`: string - Detailed information about the task (optional, max 1000 characters)
- `createdAt`: Date - Timestamp when the task was created
- `updatedAt`: Date - Timestamp when the task was last modified
- `dueDate`: Date | null - Optional deadline for the task
- `priority`: "low" | "medium" | "high" - Task importance level (default: "medium")
- `status`: "pending" | "completed" | "archived" - Current state of the task (default: "pending")
- `tags`: string[] - Optional array of tags for categorization (max 5 tags)

**Validation Rules:**
- Title must be 1-200 characters
- Description, if provided, must be 1-1000 characters
- Due date, if set, cannot be in the past
- Priority must be one of the allowed values
- Status must be one of the allowed values
- Tags array cannot exceed 5 items

**State Transitions:**
- `pending` → `completed` (when user marks task as done)
- `pending` → `archived` (when user archives an uncompleted task)
- `completed` → `pending` (when user unmarks a completed task)
- `archived` → `pending` (when user unarchives a task)

### User
Represents a registered user in the mock authentication system.

**Fields:**
- `id`: string (UUID) - Unique identifier for the user
- `email`: string - User's email address (required, valid email format)
- `name`: string - User's display name (required, 1-100 characters)
- `avatar`: string | null - URL to user's avatar image (optional)
- `createdAt`: Date - Timestamp when the user account was created
- `lastLoginAt`: Date | null - Timestamp of last login

**Validation Rules:**
- Email must be a valid email format
- Name must be 1-100 characters
- Avatar URL, if provided, must be a valid URL

### Dashboard Statistics
Represents the statistics displayed on the user dashboard.

**Fields:**
- `tasksDueSoon`: number - Count of tasks due in the next 7 days
- `completedToday`: number - Count of tasks completed today
- `productivityScore`: number - Calculated score based on completion rate (0-100)
- `totalTasks`: number - Total number of tasks
- `completedTasks`: number - Total number of completed tasks

**Validation Rules:**
- All counts must be non-negative integers
- Productivity score must be between 0 and 100
- `completedTasks` cannot exceed `totalTasks`

## Relationships

### Task → User
- Each task belongs to a user (in the actual implementation, for mock data purposes)
- A user can have many tasks

## Mock Data Examples

### Sample Tasks
```json
[
  {
    "id": "task-1",
    "title": "Finish Hackathon Phase II",
    "description": "Complete the frontend implementation with all required features",
    "createdAt": "2026-01-01T10:00:00Z",
    "updatedAt": "2026-01-01T10:00:00Z",
    "dueDate": "2026-01-03T23:59:59Z",
    "priority": "high",
    "status": "pending",
    "tags": ["work", "hackathon"]
  },
  {
    "id": "task-2",
    "title": "Review PR",
    "description": "Review the pull request from the team",
    "createdAt": "2026-01-01T14:30:00Z",
    "updatedAt": "2026-01-01T15:45:00Z",
    "dueDate": "2026-01-02T12:00:00Z",
    "priority": "medium",
    "status": "completed",
    "tags": ["work", "code-review"]
  }
]
```

### Sample User
```json
{
  "id": "user-1",
  "email": "user@example.com",
  "name": "Demo User",
  "avatar": null,
  "createdAt": "2026-01-01T09:00:00Z",
  "lastLoginAt": "2026-01-02T08:00:00Z"
}
```

### Sample Dashboard Stats
```json
{
  "tasksDueSoon": 3,
  "completedToday": 2,
  "productivityScore": 75,
  "totalTasks": 12,
  "completedTasks": 9
}
```