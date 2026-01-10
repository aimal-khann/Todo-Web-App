<!--
SYNC IMPACT REPORT
Version change: 3.0.0 → 4.0.0
Modified principles: Frontend-Only Focus → Full-Stack MCP Integration, Client-Side State Management → Synchronous Database Operations
Added sections: MCP-Native Backend Architecture, Synchronous Data Handling, Multi-Step Execution Pattern
Removed sections: Aurora Design System (frontend-specific), Mock Data Strategy (replaced with real data handling)
Templates requiring updates:
  - ✅ plan-template.md (will reference new constitution in Constitution Check)
  - ✅ spec-template.md (aligns with full-stack MCP requirements)
  - ✅ tasks-template.md (aligns with backend implementation requirements)
Follow-up TODOs: None
-->

# MCP-Native Backend Constitution

## Core Principles

### Full-Stack MCP Integration
We are building the **Backend Integration Layer** that connects the "Liquid Glass" UI to the Database via Local MCP tools. **NO external server processes:** All functionality runs inside the FastAPI `sync` context as pure Python functions exposed via JSON schemas to the LLM.

### MCP-Native Architecture
All backend functionality follows the "Local MCP" pattern with tools implemented as pure functions in `backend/src/mcp/tools.py`. These tools are exposed to the LLM via JSON schemas for reliable execution. The agent orchestrates multi-step workflows by chaining tool calls together.

### Synchronous Database Operations
All database operations MUST use `with Session(sync_engine)` synchronous context to avoid `GreenletExit` errors and ensure reliable transaction handling. No asynchronous database operations are permitted in the tool layer.

### User-Scoped Data Integrity
Every tool execution MUST validate `user_id` to prevent data leaks between users. All operations are scoped to the authenticated user's data only, ensuring privacy and security.

### Persistent Message Logging
Every message (User, Assistant, and Tool Output) must be logged to the `chat_messages` table in the database. This provides audit trails and enables conversation history functionality.

### Multi-Step Execution Pattern
The agent must support complex workflows through multi-step execution, where a single user request may trigger multiple tool calls in sequence. For example: "Delete all tasks" may require listing tasks first, then deleting each individually.

### Agentic Workflow
Follow the cycle: Specify → Plan → Tasks → Implement. Each phase must be completed before moving to the next, ensuring proper documentation and validation at each step.

### Professional Architecture (Backend)
Organize code following clean architecture principles with proper separation of concerns. Use the required structure:
- `backend/src/mcp/tools.py` -> Pure functions (Add, List, Delete)
- `backend/src/api/v1/endpoints/agent.py` -> The OpenAI execution loop
- `backend/src/models/chat.py` -> Chat History tables

## Technology & Architecture Constraints

### Tech Stack Mandate
- Framework: FastAPI with SQLAlchemy
- Database: PostgreSQL with synchronous engine
- Tool Schema: JSON Schema for LLM tool exposure
- Agent Runtime: OpenAI-compatible execution loop

### Data Model Requirements
- All database models MUST use SQLModel for type safety
- Every table MUST include proper user scoping with `user_id` foreign keys
- All chat history MUST be persisted to `chat_messages` table
- Transaction handling MUST be explicit with synchronous sessions

### Tool Development Standards
- All tools MUST be pure functions with JSON-serializable inputs/outputs
- Tools MUST validate user permissions before executing operations
- Tools MUST handle errors gracefully and provide informative responses
- Tools MUST follow consistent naming and documentation patterns

### Security Requirements
- All user data access MUST be validated against the authenticated user
- No cross-user data access is permitted
- Session management MUST be handled through proper authentication
- Input validation MUST be applied to all user inputs

## Development Workflow

Follow the agentic workflow: Specify → Plan → Tasks → Implement. Use strict type hints in Python. Implement proper error handling and validation. All tools must be tested with real database operations (no mocking). Ensure proper transaction handling and user scoping in all database operations. Multi-step workflows should be designed to handle intermediate failures gracefully.

## Governance

All code must comply with the MCP-Native architecture principles and synchronous database requirements. Backend implementations must include proper user scoping, transaction handling, and message persistence. Code reviews must verify compliance with the technology stack and security requirements. All tools must follow the pure function pattern and support multi-step execution scenarios. Database operations must consistently use the synchronous context to avoid runtime errors.

**Version**: 4.0.0 | **Ratified**: 2026-01-10 | **Last Amended**: 2026-01-10