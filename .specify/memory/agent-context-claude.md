# Agent Context: MCP-Native Backend Patterns

## MCP Tool Implementation Patterns

### Tool Function Structure
- Use pure functions with JSON-serializable inputs/outputs
- Include user_id validation in all functions
- Use `with Session(sync_engine)` for database operations
- Handle errors gracefully with informative responses
- Follow consistent naming and documentation patterns

### Synchronous Database Operations
- Always use `with Session(sync_engine)` context manager
- Implement proper transaction handling with try/except blocks
- Ensure all database operations are synchronous to avoid GreenletExit errors
- Validate user_id in all operations to prevent cross-user data access

### Multi-Turn Conversation Loop
- Implement loop that continues until no more tool calls are needed
- Properly maintain conversation history with role tracking
- Handle tool execution results appropriately
- Track message roles (user, assistant, tool) for proper context

### Tool Schema Definition
- Define function schemas in standard OpenAI JSON Schema format
- Include proper parameter types and descriptions
- Handle required parameters correctly
- Validate tool call execution

### OpenAI Agent Integration
- Use OpenAI-compatible execution loop with tool calling
- Process tool calls until final response is ready
- Maintain proper conversation state between calls
- Return structured responses that include both direct responses and tool calls

## MCP Architecture Best Practices
- Follow Local MCP pattern with tools as pure functions
- Expose tools via JSON schemas to the LLM
- Implement multi-step execution for complex workflows
- Ensure all operations are user-scoped with proper validation
- Log all messages (User, Assistant, and Tool Output) to database