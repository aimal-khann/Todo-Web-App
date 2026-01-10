# Research Document: Backend MCP Refactor

## Decision: Database Models Structure
**Rationale**: The constitution requires SQLModel for type safety with proper user scoping. We need to implement the Conversation and ChatMessage models as specified.

**Implementation Approach**:
- Use SQLModel with Pydantic-style field definitions
- Include proper user_id foreign keys for scoping
- Implement proper relationships between Conversation and ChatMessage
- Add proper indexes for performance

## Decision: Synchronous Database Operations
**Rationale**: The constitution mandates `with Session(sync_engine)` to avoid GreenletExit errors and ensure reliable transaction handling.

**Implementation Approach**:
- Use context manager pattern `with Session(engine) as session:`
- Implement proper transaction handling with try/except blocks
- Ensure all database operations are synchronous
- Handle database errors gracefully

## Decision: OpenAI Tool Schema Format
**Rationale**: Need to define JSON Schema for OpenAI function calling to expose our tools to the LLM.

**Implementation Approach**:
- Define function schemas in standard OpenAI format
- Include proper parameter types and descriptions
- Handle required parameters correctly
- Validate tool call execution

## Decision: Multi-Turn Conversation Loop
**Rationale**: The agent must support complex workflows through multi-step execution, where a single user request may trigger multiple tool calls in sequence.

**Implementation Approach**:
- Implement a loop that continues until no more tool calls are needed
- Properly maintain conversation history
- Track message roles (user, assistant, tool)
- Handle tool execution results appropriately

## Decision: Tool Function Signatures
**Rationale**: The tools need to follow the signatures specified in the user input while maintaining security and proper data handling.

**Implementation Approach**:
- Implement user_id validation in all tool functions
- Use datetime.strptime for date parsing as required
- Return appropriate data structures for the LLM
- Handle errors gracefully with informative messages

## Alternatives Considered: Async vs Sync Database Operations
- **Async Operations**: Would violate constitution requirement for synchronous operations
- **Mixed Sync/Async**: Would create complexity and potential runtime errors
- **Synchronous Operations**: Required by constitution and avoids GreenletExit errors