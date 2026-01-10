---
id: 1
title: "Backend MCP Refactor Spec"
stage: spec
date_iso: 2026-01-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: backend-mcp-refactor
branch: 005-backend-mcp-refactor
user: user
command: "sp.specify"
labels:
  - backend
  - mcp
  - refactor
  - tools
  - agent
links:
  spec: specs/005-backend-mcp-refactor/spec.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/005-backend-mcp-refactor/spec.md"
tests_yaml: []
---

# Backend MCP Refactor Specification

## Outcome
Created comprehensive specification for Backend MCP Refactor feature, covering tools, models, agent router, and main registry integration.

## Evaluation
The specification includes:
- Three prioritized user stories (P1-P3) covering task management, analytics, and persistent conversations
- Twelve functional requirements (FR-001 to FR-012) defining the core behavior
- Four key entities for data modeling
- Six measurable success criteria
- Edge case considerations

## Prompt Text
```
Name: Backend MCP Refactor

**1. The Tools (`src/mcp/tools.py`)**
- **Refactor:** Convert `agent_tools.py` into standard functions.
- **Signature:**
  - `add_task(user_id: str, title: str, ...)`
  - `list_tasks(user_id: str, status: str)`
  - `delete_task(user_id: str, task_title: str)`
  - `get_analytics(user_id: str)`
- **Logic:** Use `datetime.strptime` for dates. Use `Session(sync_engine)` for SQL.

**2. The Models (`src/models/chat.py`)**
- **Consolidation:** Combine your `conversation.py` and `chat_message.py` uploads into one file.
- **Schema:**
  - `Conversation`: id, user_id, title.
  - `ChatMessage`: id, conversation_id, role (user/assistant/tool), content.

**3. The Agent Router (`src/api/v1/endpoints/agent.py`)**
- **Dependency:** `openai`.
- **Logic:**
  - Define `tools_schema` manually (JSON Schema).
  - Implement `POST /chat`.
  - **The Loop:**
    ```python
    while True:
        response = client.chat.completions.create(..., tools=tools)
        msg = response.choices[0].message
        if msg.tool_calls:
            # Execute Python Function
            # Append Result to History
            # Continue Loop
        else:
            # Break and Return Response
    ```

**4. Main Registry (`src/main.py`)**
- **Action:** Register `agent_router` at `/api/v1/agent`.
```

## Response Text
Created a comprehensive specification for the Backend MCP Refactor feature with the following elements:
- User stories prioritized by importance (P1-P3) covering task management, analytics, and persistent conversations
- Functional requirements defining the core behavior (FR-001 to FR-012) including tool functions, data models, agent logic, and routing
- Key entities for data modeling (Conversation, ChatMessage, Task, Analytics)
- Success criteria with measurable outcomes (SC-001 to SC-006)
- Edge cases consideration for various scenarios
- Complete specification ready for planning and implementation