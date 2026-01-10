# API Contracts: Agent Service

## Overview
This document defines the API contracts for the MCP Agent service. The service provides an OpenAI-compatible interface that allows the LLM to call our backend tools.

## Base URL
`/api/v1/agent`

## Authentication
All endpoints require a valid authentication token in the Authorization header:
```
Authorization: Bearer {token}
```

## Endpoints

### POST /chat
Process a chat message and potentially execute tools based on the LLM's response.

#### Request
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Add a task called 'Buy groceries'"
    }
  ],
  "user_id": "user-uuid-string"
}
```

#### Response (Success - Direct Response)
```json
{
  "id": "chatcmpl-123",
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I've added the task 'Buy groceries' to your list."
      }
    }
  ],
  "created": 1677610602,
  "model": "gpt-4",
  "object": "chat.completion"
}
```

#### Response (Success - Tool Call)
```json
{
  "id": "chatcmpl-123",
  "choices": [
    {
      "finish_reason": "tool_calls",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_abc123",
            "function": {
              "arguments": "{\"user_id\":\"user-uuid\",\"title\":\"Buy groceries\"}",
              "name": "add_task"
            },
            "type": "function"
          }
        ]
      }
    }
  ],
  "created": 1677610602,
  "model": "gpt-4",
  "object": "chat.completion"
}
```

## Tool Schemas

### add_task
Add a new task to the user's task list.

#### Schema
```json
{
  "type": "function",
  "function": {
    "name": "add_task",
    "description": "Add a new task to the user's task list",
    "parameters": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "The ID of the user"
        },
        "title": {
          "type": "string",
          "description": "The title of the task"
        },
        "description": {
          "type": "string",
          "description": "Optional description of the task"
        },
        "priority": {
          "type": "string",
          "enum": ["low", "medium", "high"],
          "description": "Priority of the task (default: medium)"
        },
        "due_date": {
          "type": "string",
          "format": "date-time",
          "description": "Due date in ISO format (optional)"
        }
      },
      "required": ["user_id", "title"]
    }
  }
}
```

### list_tasks
List tasks for the user with optional filtering.

#### Schema
```json
{
  "type": "function",
  "function": {
    "name": "list_tasks",
    "description": "List tasks for the user with optional filtering",
    "parameters": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "The ID of the user"
        },
        "status": {
          "type": "string",
          "enum": ["pending", "in-progress", "completed", "archived"],
          "description": "Filter by task status (optional)"
        }
      },
      "required": ["user_id"]
    }
  }
}
```

### delete_task
Delete a task from the user's task list.

#### Schema
```json
{
  "type": "function",
  "function": {
    "name": "delete_task",
    "description": "Delete a task from the user's task list",
    "parameters": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "The ID of the user"
        },
        "task_title": {
          "type": "string",
          "description": "The title of the task to delete"
        }
      },
      "required": ["user_id", "task_title"]
    }
  }
}
```

### get_analytics
Get analytics data for the user.

#### Schema
```json
{
  "type": "function",
  "function": {
    "name": "get_analytics",
    "description": "Get analytics data for the user",
    "parameters": {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "description": "The ID of the user"
        }
      },
      "required": ["user_id"]
    }
  }
}
```

## Error Responses
All endpoints return standard error responses:

```json
{
  "error": {
    "type": "invalid_request_error",
    "message": "Error description",
    "code": "error_code"
  }
}
```

## Tool Execution Flow
1. LLM determines which tool to call based on user input
2. API receives tool call request
3. Backend executes the appropriate function synchronously
4. Tool result is returned to the LLM
5. LLM processes the result and continues the conversation
6. Final response is returned to the user

## Rate Limits
- 100 requests per minute per user
- 1000 requests per minute per IP

## Security Requirements
- All user_id parameters must match the authenticated user
- All database operations must use synchronous sessions
- Input validation must be applied to all parameters