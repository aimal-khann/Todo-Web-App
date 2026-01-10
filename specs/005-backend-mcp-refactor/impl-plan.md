# Implementation Plan: Backend MCP Refactor

**Feature**: Backend MCP Refactor
**Branch**: 005-backend-mcp-refactor
**Created**: 2026-01-10
**Status**: Draft

## Technical Context

### Current State
- **Framework**: FastAPI with SQLAlchemy
- **Database**: PostgreSQL with synchronous engine
- **Architecture**: MCP-Native with Local MCP tools pattern
- **Data Model**: SQLModel for type safety with user scoping
- **Security**: User-scoped data integrity with user_id validation
- **Agent Runtime**: OpenAI-compatible execution loop
- **Tool Schema**: JSON Schema for LLM tool exposure

### Target State
- **Data Layer**: Consolidated models in `backend/src/models/chat.py` with Conversation and ChatMessage
- **Tool Layer**: Pure functions in `backend/src/mcp/tools.py` (add, list, delete, analytics) using sync engine
- **Agent Layer**: OpenAI execution loop in `backend/src/api/v1/endpoints/agent.py` with multi-turn conversation support
- **Integration**: Updated main.py to register new agent router

### Architecture Context
- **Data Layer**: `backend/src/models/chat.py` (Conversation, ChatMessage models)
- **Tool Layer**: `backend/src/mcp/tools.py` (Pure functions with sync database operations)
- **Agent Layer**: `backend/src/api/v1/endpoints/agent.py` (OpenAI execution loop)
- **Integration**: `backend/src/main.py` (Router registration)

### Dependencies Status
- **FastAPI**: ✓ Available (from constitution)
- **SQLAlchemy**: ✓ Available (from constitution)
- **SQLModel**: ✓ Available (from constitution)
- **OpenAI**: ✓ Required for agent layer (from user input)
- **datetime**: ✓ Available (for date parsing)

### Unknowns to Resolve
- **None identified**: All requirements can be implemented with existing technologies

## Constitution Check

### Compliance Verification
- ✅ **Full-Stack MCP Integration**: Implementation follows Local MCP pattern with pure functions
- ✅ **MCP-Native Architecture**: Tools implemented as pure functions in specified location
- ✅ **Synchronous Database Operations**: Will use `with Session(sync_engine)` as required
- ✅ **User-Scoped Data Integrity**: Will validate user_id in all tool functions
- ✅ **Persistent Message Logging**: Will log all messages to database
- ✅ **Multi-Step Execution Pattern**: Will implement multi-turn conversation loop
- ✅ **Professional Architecture**: Will follow specified directory structure
- ✅ **Tech Stack Mandate**: Using FastAPI, SQLAlchemy, SQLModel as required
- ✅ **Data Model Requirements**: Will implement proper user scoping with user_id
- ✅ **Tool Development Standards**: Will create pure functions with JSON-serializable I/O
- ✅ **Security Requirements**: Will validate user permissions and prevent cross-user access

### Potential Violations
- **None identified**: All requirements align with constitution

## Gates

### Entry Gate: Specification Compliance
- **Status**: PASSED
- **Verification**: All functional requirements from spec can be implemented within constitutional constraints

### Architecture Gate: Technical Feasibility
- **Status**: PASSED
- **Verification**: All required technologies are available in current stack

### Dependency Gate: Prerequisites
- **Status**: PASSED
- **Verification**: All required dependencies available

## Phase 0: Research & Discovery

### Research Tasks
1. **Database Models**: Research SQLModel patterns for Conversation and ChatMessage models
2. **Sync Engine Usage**: Find best practices for `with Session(sync_engine)` implementation
3. **OpenAI Tool Schema**: Research JSON Schema format for OpenAI function calling
4. **Multi-Turn Loop**: Study patterns for multi-step conversation handling

### Research Plan
- Analyze existing database patterns in the codebase
- Plan synchronous database operation implementation
- Design tool schemas for OpenAI integration
- Plan multi-turn conversation loop with proper state management

## Phase 1: Design & Contracts

### Data Model: data-model.md
- **Conversation**: { id, user_id, title } with proper SQLModel structure
- **ChatMessage**: { id, conversation_id, role, content } with proper SQLModel structure
- **Relationships**: Conversation has-many ChatMessage relationship

### API Contracts: contracts/agent-api.md
- **POST /api/v1/agent/chat**: Main chat endpoint with tool calling support
- **Tool Definitions**: JSON Schema for add_task, list_tasks, delete_task, get_analytics

### Quickstart Guide: quickstart.md
- How to run the MCP backend
- Configuration options for the agent
- Integration with existing systems

### Agent Context Update
- Add MCP tool patterns to agent memory
- Update function calling implementation guidelines