# API Contracts: Aurora Chat Service

## Overview
This document defines the API contracts for the Aurora AI Chat service. Since backend implementation is out of scope for this phase, these represent the intended interface that will be implemented with mock services in the frontend layer.

## Base URL
`/api/aurora-chat`

## Authentication
All endpoints require a valid authentication token in the Authorization header:
```
Authorization: Bearer {token}
```

## Endpoints

### POST /messages
Send a message to the Aurora AI assistant and receive a response.

#### Request
```json
{
  "message": "Hello, can you help me with my tasks?",
  "sessionId": "session-id-optional",
  "context": {
    "tasks": [
      {
        "id": "task-1",
        "title": "Complete project proposal",
        "status": "pending",
        "priority": "high"
      }
    ],
    "stats": {
      "tasksDueSoon": 3,
      "completedToday": 2,
      "productivityScore": 85
    }
  }
}
```

#### Response (Success)
```json
{
  "id": "msg-123",
  "content": "I'd be happy to help you with your tasks. I see you have 3 tasks due soon, including 'Complete project proposal' which is high priority.",
  "sender": "ai",
  "timestamp": "2026-01-09T10:30:00Z",
  "sessionId": "session-abc-123"
}
```

#### Response (Error)
```json
{
  "error": "Message could not be processed",
  "code": "CHAT_ERROR_001"
}
```

### GET /sessions
Retrieve available chat sessions for the current user.

#### Response
```json
{
  "sessions": [
    {
      "id": "session-1",
      "title": "General Questions",
      "lastActive": "2026-01-09T09:15:00Z",
      "messageCount": 12
    }
  ]
}
```

### GET /sessions/{sessionId}/messages
Retrieve messages for a specific session.

#### Response
```json
{
  "messages": [
    {
      "id": "msg-1",
      "content": "Hello!",
      "sender": "user",
      "timestamp": "2026-01-09T09:00:00Z"
    },
    {
      "id": "msg-2",
      "content": "Hi there! How can I help you?",
      "sender": "ai",
      "timestamp": "2026-01-09T09:00:05Z"
    }
  ]
}
```

### POST /sessions
Create a new chat session.

#### Request
```json
{
  "title": "New Session"
}
```

#### Response
```json
{
  "id": "new-session-id",
  "title": "New Session",
  "createdAt": "2026-01-09T10:00:00Z"
}
```

## Error Codes
- `CHAT_ERROR_001`: Message could not be processed
- `SESSION_NOT_FOUND_002`: Requested session does not exist
- `RATE_LIMIT_EXCEEDED_003`: Too many requests
- `AUTHENTICATION_FAILED_004`: Invalid or expired token

## Rate Limits
- 60 messages per minute per user
- 1000 messages per hour per user

## Mock Implementation Notes
For the frontend implementation phase:
- Create mock service functions that simulate API responses
- Use sample data that matches the expected schema
- Simulate network delays (300-800ms) for realistic experience
- Implement error scenarios for testing