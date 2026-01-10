---
id: 2
title: "Backend MCP Refactor Plan"
stage: plan
date_iso: 2026-01-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: backend-mcp-refactor
branch: 005-backend-mcp-refactor
user: user
command: "sp.plan"
labels:
  - backend
  - mcp
  - refactor
  - tools
  - agent
  - planning
links:
  spec: specs/005-backend-mcp-refactor/spec.md
  plan: specs/005-backend-mcp-refactor/impl-plan.md
  data-model: specs/005-backend-mcp-refactor/data-model.md
  contracts: specs/005-backend-mcp-refactor/contracts/agent-api.md
  research: specs/005-backend-mcp-refactor/research.md
  quickstart: specs/005-backend-mcp-refactor/quickstart.md
  adr: null
  pr: null
files_yaml:
  - "specs/005-backend-mcp-refactor/impl-plan.md"
  - "specs/005-backend-mcp-refactor/research.md"
  - "specs/005-backend-mcp-refactor/data-model.md"
  - "specs/005-backend-mcp-refactor/contracts/agent-api.md"
  - "specs/005-backend-mcp-refactor/quickstart.md"
  - ".specify/memory/agent-context-claude.md"
tests_yaml: []
---

# Backend MCP Refactor Planning

## Outcome
Created comprehensive implementation plan for Backend MCP Refactor feature with all supporting documents.

## Evaluation
The planning phase has produced all required artifacts:
- Implementation plan with technical context and constitutional compliance check
- Research document resolving all unknowns and technical decisions
- Data model defining key entities (Conversation, ChatMessage, Task, Analytics)
- API contracts specifying tool schemas and endpoints
- Quickstart guide for developers
- Agent context update with MCP patterns and best practices

## Prompt Text
```
Name: Backend Implementation Strategy

**1. Data Layer (Foundation)**
- [ ] `task-001`: Create `backend/src/models/chat.py`. Consolidate `Conversation` and `ChatMessage` models here.
- [ ] `task-002`: Clean up. Delete `backend/conversation.py`, `backend/chat_message.py`.

**2. Tool Layer (The Capabilities)**
- [ ] `task-003`: Create `backend/src/mcp/tools.py`. Implement the 4 core functions (`add`, `list`, `delete`, `analytics`) using `sync_engine`. **Crucial:** Remove all `fastmcp` code.

**3. Agent Layer (The Intelligence)**
- [ ] `task-004`: Create `backend/src/api/v1/endpoints/agent.py`. Implement the **OpenAI Execution Loop**. This connects the "Brain" (OpenAI) to the "Hands" (Tools).

**4. Integration (The Wiring)**
- [ ] `task-005`: Update `backend/src/main.py`. Register the new router.
- [ ] `task-006`: Delete legacy files `backend/agent_tools.py` and `backend/agent_routes.py`.
```

## Response Text
Successfully completed the planning phase for Backend MCP Refactor with the following deliverables:

1. **Implementation Plan** - Detailed technical context, constitutional compliance check, and phased approach
2. **Research Findings** - Resolved all unknowns regarding database models, sync operations, and tool schemas
3. **Data Model** - Defined entities (Conversation, ChatMessage, Task, Analytics) with validation rules and relationships
4. **API Contracts** - Specified tool schemas and endpoints for OpenAI integration
5. **Quickstart Guide** - Developer documentation for implementation and integration
6. **Agent Context** - Updated patterns and best practices for MCP tool development

Key findings include:
- All requirements align with MCP-Native Backend Constitution
- Synchronous database operations required to avoid GreenletExit errors
- Multi-turn conversation loop enables complex workflows
- User-scoped data integrity maintained through user_id validation
- OpenAI-compatible execution loop connects LLM to backend tools
- Proper tool schemas defined for function calling

The implementation plan follows the required architecture with data layer, tool layer, agent layer, and integration components.