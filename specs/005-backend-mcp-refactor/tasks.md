# Implementation Tasks: Backend MCP Refactor

**Feature**: Backend MCP Refactor
**Branch**: 005-backend-mcp-refactor
**Created**: 2026-01-10
**Status**: Ready for Implementation

## Dependencies

- **User Story 2 depends on User Story 1**: Analytics functionality requires the core task management to be working
- **User Story 3 depends on User Story 1**: Conversation persistence requires the models to be in place
- **Foundational tasks must complete before user stories**: Infrastructure setup is required

## Parallel Execution Examples

- **Parallel Setup**: Tasks T001-T002 can run simultaneously as they involve different files
- **Parallel Development**: Tasks T003-T004 can run in parallel as they create separate components

## Implementation Strategy

**MVP Scope**: User Story 1 (Task Management via AI Assistant) with foundational setup - this provides the core value of task management through AI.

**Incremental Delivery**:
- Sprint 1: Setup + User Story 1 (Task Management)
- Sprint 2: User Story 2 (Analytics) + User Story 3 (Conversation Persistence)
- Sprint 3: Polish & Cross-Cutting Concerns

---

## Phase 1: Setup & Infrastructure

- [x] T001 Set up project structure and verify dependencies for backend MCP implementation
- [x] T002 [P] Create directory structure: `mkdir -p backend/src/models`, `mkdir -p backend/src/mcp`, `mkdir -p backend/src/api/v1/endpoints`

---

## Phase 2: Foundational Components

- [x] T003 [P] Create `backend/src/models/chat.py` with imports: `SQLModel`, `Field`, `uuid`, `datetime`
- [x] T004 [P] Create `backend/src/mcp/tools.py` with imports: `Session`, `select`, `sync_engine`, `Task`, `User`
- [x] T005 [P] Create `backend/src/api/v1/endpoints/agent.py` with imports: `APIRouter`, `OpenAI`, `tools`
- [x] T006 [P] Create placeholder for `src.db.session` module to provide `sync_engine`

---

## Phase 3: User Story 1 - Task Management via AI Assistant (Priority: P1)

**Goal**: Enable users to manage tasks through natural language commands via the AI assistant.

**Independent Test Criteria**: User can add, list, and delete tasks through the AI assistant.

**Acceptance Scenarios**:
1. Given user sends a request to add a task, When the AI processes the request, Then the `add_task` function is called and the task is saved to the database
2. Given user sends a request to list tasks, When the AI processes the request, Then the `list_tasks` function is called and the tasks are returned to the user
3. Given user sends a request to delete a task, When the AI processes the request, Then the `delete_task` function is called and the task is removed from the database

- [x] T007 [US1] Define `Conversation` model in `backend/src/models/chat.py` with id, user_id, title fields
- [x] T008 [US1] Define `ChatMessage` model in `backend/src/models/chat.py` with id, conversation_id, role, content fields
- [x] T009 [US1] Verify `user_id` in Conversation model is indexed for performance
- [x] T010 [US1] Implement `add_task(user_id: str, title: str, ...)` function in `backend/src/mcp/tools.py` using synchronous DB calls
- [x] T011 [US1] Implement `list_tasks(user_id: str, status: str)` function in `backend/src/mcp/tools.py` using synchronous DB calls
- [x] T012 [US1] Implement `delete_task(user_id: str, task_title: str)` function in `backend/src/mcp/tools.py` using synchronous DB calls
- [x] T013 [US1] Implement `get_analytics(user_id: str)` function in `backend/src/mcp/tools.py` using synchronous DB calls
- [x] T014 [US1] Define `SYSTEM_PROMPT` in `backend/src/api/v1/endpoints/agent.py` for task management
- [x] T015 [US1] Define `tools_schema` JSON definition for OpenAI in `backend/src/api/v1/endpoints/agent.py`
- [x] T016 [US1] Implement `POST /chat` endpoint in `backend/src/api/v1/endpoints/agent.py` with conversation history retrieval
- [x] T017 [US1] Implement OpenAI call logic in `backend/src/api/v1/endpoints/agent.py`
- [x] T018 [US1] Implement tool call execution logic in `backend/src/api/v1/endpoints/agent.py` (execute function, save as tool role, recurse)
- [x] T019 [US1] Implement final response logic in `backend/src/api/v1/endpoints/agent.py` (save response and return)

---

## Phase 4: User Story 2 - Analytics via AI Assistant (Priority: P2)

**Goal**: Allow users to get analytics about their tasks through the AI assistant.

**Independent Test Criteria**: User can ask for analytics and receive analytical data about their tasks.

**Acceptance Scenarios**:
1. Given user requests analytics, When the AI processes the request, Then the `get_analytics` function is called and analytics are returned to the user

**Prerequisites**: User Story 1 must be complete

- [ ] T020 [US2] Enhance `get_analytics` function to calculate and return comprehensive analytical data
- [ ] T021 [US2] Test analytics functionality with the agent endpoint

---

## Phase 5: User Story 3 - Persistent Chat Conversations (Priority: P3)

**Goal**: Persist conversations so users can continue discussions across sessions.

**Independent Test Criteria**: User can have a conversation with the AI assistant and messages are saved and retrievable.

**Acceptance Scenarios**:
1. Given user has a conversation with the AI, When messages are exchanged, Then the messages are saved to the database with proper conversation tracking
2. Given a conversation exists, When user continues the conversation, Then the conversation context is maintained

**Prerequisites**: User Story 1 must be complete

- [ ] T022 [US3] Test conversation persistence functionality with the models and agent
- [ ] T023 [US3] Verify conversation history retrieval works correctly in the agent endpoint

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T024 Delete legacy files `backend/conversation.py` and `backend/chat_message.py` to avoid duplicate table errors
- [x] T025 Delete legacy files `backend/agent_routes.py` and `backend/agent_tools.py`
- [x] T026 Update `backend/src/main.py` to register the new agent router at `/api/v1` with tags
- [x] T027 Implement proper error handling for database operations in all tool functions
- [x] T028 Add validation for user_id in all tool functions to prevent cross-user data access
- [x] T029 Implement date parsing with `datetime.strptime` in tool functions where needed
- [ ] T030 Conduct integration testing of the complete task management flow
- [ ] T031 Verify all requirements from spec (FR-001 to FR-012) are satisfied
- [ ] T032 Perform security validation to ensure user data isolation
- [ ] T033 Update documentation to reflect the new architecture