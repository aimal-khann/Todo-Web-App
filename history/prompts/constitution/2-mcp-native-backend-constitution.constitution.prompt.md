---
id: 2
title: "MCP Native Backend Constitution"
stage: constitution
date_iso: 2026-01-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: mcp-native-backend
branch: main
user: user
command: "sp.constitution"
labels:
  - mcp
  - backend
  - constitution
  - database
  - tools
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - ".specify/memory/constitution.md"
tests_yaml: []
---

# MCP-Native Backend Constitution Update

## Outcome
Updated project constitution to reflect MCP-Native Backend requirements with focus on synchronous database operations and Local MCP tool architecture.

## Evaluation
The constitution has been successfully updated with the following key changes:
- Changed focus from frontend-only to full-stack MCP integration
- Added MCP-Native Architecture principles
- Implemented synchronous database operation requirements
- Added user-scoped data integrity requirements
- Included persistent message logging requirements
- Added multi-step execution pattern requirements
- Updated tech stack to FastAPI/SQLAlchemy with synchronous engine
- Updated development workflow to reflect backend implementation

## Prompt Text
```
Create the Constitution for Phase 3.2: MCP-Native Backend.

**1. Mission: Reliable Intelligence**
- **Objective:** Build a crash-free Backend that links the "Liquid Glass" UI to the Database.
- **Pattern:** "Local MCP". Tools are internal Python functions exposed to the LLM via JSON Schemas.
- **Constraint:** NO `fastmcp` or external server processes. Everything runs inside the FastAPI `sync` context.

**2. The Professional Structure**
- **Tools:** `backend/src/mcp/tools.py` -> Pure functions (Add, List, Delete).
- **Agent:** `backend/src/api/v1/endpoints/agent.py` -> The OpenAI execution loop.
- **Models:** `backend/src/models/chat.py` -> Chat History tables.

**3. Data Handling**
- **Synchronous Only:** All database tools MUST use `with Session(sync_engine)` to avoid `GreenletExit` errors.
- **User Scoping:** Every tool execution MUST validate `user_id` to prevent data leaks between users.
- **Persistence:** Every message (User, Assistant, and Tool Output) must be logged to the `chat_messages` table.

**4. The "Brain" Logic**
- The Agent must support **Multi-Step Execution**:
  1. User says: "Delete all tasks."
  2. Agent calls: `list_tasks()`.
  3. Agent analyzes list.
  4. Agent calls: `delete_task()` for each item.
  5. Agent replies: "All done."
```

## Response Text
Updated the constitution file to reflect the MCP-Native Backend requirements with the following key changes:

- **Focus Shift**: Changed from frontend-only to full-stack MCP integration with Local MCP tools
- **Architecture**: Added MCP-Native Architecture principles for pure Python functions exposed via JSON schemas
- **Data Handling**: Implemented synchronous database operation requirements using `with Session(sync_engine)`
- **Security**: Added user-scoped data integrity requirements with `user_id` validation
- **Persistence**: Included persistent message logging requirements for all conversation elements
- **Execution**: Added multi-step execution pattern for complex workflows
- **Tech Stack**: Updated to FastAPI/SQLAlchemy with synchronous engine requirements
- **Structure**: Updated professional architecture to reflect required backend file locations
- **Standards**: Added tool development standards for pure functions with JSON-serializable I/O
- **Version**: Updated from 3.0.0 to 4.0.0 with proper governance information