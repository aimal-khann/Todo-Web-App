# Feature Specification: Backend MCP Refactor

**Feature Branch**: `005-backend-mcp-refactor`
**Created**: 2026-01-10
**Status**: Draft
**Input**: User description: "Name: Backend MCP Refactor

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
- **Action:** Register `agent_router` at `/api/v1/agent`."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Task Management via AI Assistant (Priority: P1)

As a user of the AI assistant, I want to manage my tasks through natural language commands so that I can add, list, and delete tasks without navigating the UI.

**Why this priority**: This is the core functionality that connects the AI assistant to the task management system, enabling the primary value proposition.

**Independent Test**: User can say "Add a task called 'Buy groceries'" and the task appears in their task list, or say "List my tasks" and see their current tasks.

**Acceptance Scenarios**:

1. **Given** user sends a request to add a task, **When** the AI processes the request, **Then** the `add_task` function is called and the task is saved to the database
2. **Given** user sends a request to list tasks, **When** the AI processes the request, **Then** the `list_tasks` function is called and the tasks are returned to the user
3. **Given** user sends a request to delete a task, **When** the AI processes the request, **Then** the `delete_task` function is called and the task is removed from the database

---

### User Story 2 - Analytics via AI Assistant (Priority: P2)

As a user of the AI assistant, I want to get analytics about my tasks so that I can understand my productivity patterns.

**Why this priority**: This provides additional value by allowing users to get insights through the AI assistant.

**Independent Test**: User can ask "Show me my analytics" and receive analytical data about their tasks.

**Acceptance Scenarios**:

1. **Given** user requests analytics, **When** the AI processes the request, **Then** the `get_analytics` function is called and analytics are returned to the user

---

### User Story 3 - Persistent Chat Conversations (Priority: P3)

As a user of the AI assistant, I want my conversations to be persisted so that I can continue discussions across sessions.

**Why this priority**: This enhances the user experience by maintaining conversation context.

**Independent Test**: User can have a conversation with the AI assistant and the messages are saved and retrievable.

**Acceptance Scenarios**:

1. **Given** user has a conversation with the AI, **When** messages are exchanged, **Then** the messages are saved to the database with proper conversation tracking
2. **Given** a conversation exists, **When** user continues the conversation, **Then** the conversation context is maintained

---

### Edge Cases

- What happens when a user tries to access another user's tasks?
- How does the system handle invalid date formats in task creation?
- What occurs when the AI receives an unrecognized command?
- How does the system handle database connection failures during tool execution?
- What happens when a user attempts to delete a non-existent task?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide `add_task(user_id: str, title: str, ...)` function that saves tasks to the database using `Session(sync_engine)`
- **FR-002**: System MUST provide `list_tasks(user_id: str, status: str)` function that retrieves user's tasks from the database
- **FR-003**: System MUST provide `delete_task(user_id: str, task_title: str)` function that removes tasks from the database
- **FR-004**: System MUST provide `get_analytics(user_id: str)` function that returns analytical data for the user
- **FR-005**: System MUST implement `Conversation` model with id, user_id, and title fields
- **FR-006**: System MUST implement `ChatMessage` model with id, conversation_id, role, and content fields
- **FR-007**: System MUST implement agent router with `POST /chat` endpoint that handles conversation loops
- **FR-008**: System MUST define tool schemas manually using JSON Schema format
- **FR-009**: System MUST implement multi-turn conversation loop that processes tool calls until final response
- **FR-010**: System MUST register agent router at `/api/v1/agent` in main application
- **FR-011**: System MUST use `datetime.strptime` for parsing date strings in tool functions
- **FR-012**: System MUST validate user_id in all tool functions to prevent cross-user data access

### Key Entities *(include if feature involves data)*

- **Conversation**: Represents a single conversation thread with id, user_id, and title
- **ChatMessage**: Represents a single message in a conversation with id, conversation_id, role (user/assistant/tool), and content
- **Task**: Represents a user task with id, user_id, title, description, status, priority, and due_date
- **Analytics**: Represents analytical data for a user including task completion rates, productivity metrics, etc.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can successfully add, list, and delete tasks through the AI assistant with 95% success rate
- **SC-002**: The agent correctly processes multi-turn conversations with tool calls and returns final responses
- **SC-003**: All conversation messages are persisted to the database without loss
- **SC-004**: User data isolation is maintained with 0% cross-user data access incidents
- **SC-005**: The system handles database errors gracefully without crashing
- **SC-006**: Analytics requests return meaningful data within 2 seconds