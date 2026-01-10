# Quickstart Guide: Backend MCP Implementation

## Overview
This guide explains how to implement the MCP-Native Backend with Local MCP tools pattern, including data models, tools, and agent integration.

## Prerequisites
- Python 3.10+
- FastAPI
- SQLAlchemy
- SQLModel
- OpenAI library
- PostgreSQL database

## Implementation Steps

### 1. Data Layer Setup
Create the consolidated models file at `backend/src/models/chat.py`:
```python
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional, List
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Conversation(SQLModel, table=True):
    id: str = Field(default_factory=generate_uuid, primary_key=True)
    user_id: str = Field(index=True)
    title: str = Field(max_length=200)
    created_at: datetime = Field(default=datetime.utcnow())
    updated_at: datetime = Field(default=datetime.utcnow())

    # Relationship to chat messages
    messages: List["ChatMessage"] = Relationship(back_populates="conversation")

class ChatMessage(SQLModel, table=True):
    id: str = Field(default_factory=generate_uuid, primary_key=True)
    conversation_id: str = Field(foreign_key="conversation.id", index=True)
    role: str = Field(regex="^(user|assistant|tool)$")
    content: str = Field(max_length=10000)
    timestamp: datetime = Field(default=datetime.utcnow())
    tool_call_id: Optional[str] = Field(default=None)

    # Relationship to conversation
    conversation: Conversation = Relationship(back_populates="messages")
```

### 2. Tool Layer Implementation
Create `backend/src/mcp/tools.py` with the four core functions:
```python
from sqlmodel import Session, select
from datetime import datetime
from typing import List, Optional
from .models.chat import Task  # Assuming Task model exists

def add_task(user_id: str, title: str, description: Optional[str] = None,
             priority: str = "medium", due_date: Optional[str] = None):
    """
    Add a new task to the user's task list
    """
    with Session(sync_engine) as session:
        # Validate user_id
        # Parse due_date with datetime.strptime if provided
        # Create and save task
        pass

def list_tasks(user_id: str, status: Optional[str] = None):
    """
    List tasks for the user with optional filtering
    """
    with Session(sync_engine) as session:
        # Validate user_id
        # Query tasks for user
        # Apply status filter if provided
        pass

def delete_task(user_id: str, task_title: str):
    """
    Delete a task from the user's task list
    """
    with Session(sync_engine) as session:
        # Validate user_id
        # Find and delete task by title
        pass

def get_analytics(user_id: str):
    """
    Get analytics data for the user
    """
    with Session(sync_engine) as session:
        # Validate user_id
        # Calculate and return analytics
        pass
```

### 3. Agent Layer Setup
Create `backend/src/api/v1/endpoints/agent.py` with the OpenAI execution loop:
```python
from fastapi import APIRouter, HTTPException
from openai import OpenAI
from typing import List, Dict, Any
import json
from ...mcp.tools import add_task, list_tasks, delete_task, get_analytics

router = APIRouter()

# Define tool schemas
TOOLS_SCHEMA = [
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a new task to the user's task list",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {"type": "string"},
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "priority": {"type": "string", "enum": ["low", "medium", "high"]},
                    "due_date": {"type": "string"}
                },
                "required": ["user_id", "title"]
            }
        }
    },
    # ... other tool schemas
]

@router.post("/chat")
async def chat_endpoint(messages: List[Dict[str, Any]], user_id: str):
    client = OpenAI()

    # Multi-turn conversation loop
    while True:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            tools=TOOLS_SCHEMA
        )

        msg = response.choices[0].message

        if msg.tool_calls:
            # Execute tool calls
            for tool_call in msg.tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)

                # Execute the appropriate function
                if function_name == "add_task":
                    result = add_task(**function_args)
                elif function_name == "list_tasks":
                    result = list_tasks(**function_args)
                # ... handle other functions

                # Append result to messages
                messages.append({
                    "role": "tool",
                    "content": json.dumps(result),
                    "tool_call_id": tool_call.id
                })
            # Continue loop to get next response
        else:
            # No more tool calls, return final response
            return {"response": msg.content}
```

### 4. Integration
Update `backend/src/main.py` to register the agent router:
```python
from fastapi import FastAPI
from .api.v1.endpoints.agent import router as agent_router

app = FastAPI()

# Register agent router
app.include_router(agent_router, prefix="/api/v1/agent")
```

## Verification
1. Test each tool function individually
2. Verify the multi-turn conversation loop works correctly
3. Confirm user_id validation is working properly
4. Ensure all database operations use synchronous sessions
5. Test the complete chat flow from user input to final response