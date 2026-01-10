# Data Model: Aurora Chat Widget

## ChatMessage Entity
- **id**: string (unique identifier for the message)
- **content**: string (the actual message text)
- **sender**: 'user' | 'ai' (indicates who sent the message)
- **timestamp**: Date (when the message was sent)
- **status**: 'sent' | 'pending' | 'error' (delivery status)
- **metadata**: object (optional additional data for rendering)

### Validation Rules
- content must be 1-2000 characters
- sender must be either 'user' or 'ai'
- timestamp must be a valid date/time

## ChatSession Entity
- **id**: string (unique identifier for the session)
- **messages**: ChatMessage[] (array of messages in the conversation)
- **createdAt**: Date (when the session was created)
- **updatedAt**: Date (when the session was last updated)
- **isActive**: boolean (whether the session is currently active)
- **userId**: string (reference to the user who owns this session)

### Validation Rules
- messages array must not exceed 1000 items
- createdAt must be before updatedAt
- userId must reference a valid user

## AuroraWidgetState Entity
- **isOpen**: boolean (whether the chat window is open/collapsed)
- **position**: { x: number, y: number } (coordinates for floating button positioning)
- **animationState**: 'idle' | 'expanding' | 'collapsing' | 'open' | 'closed' (current animation phase)
- **lastActive**: Date (when the widget was last interacted with)

### Validation Rules
- position coordinates must be positive numbers
- animationState must be one of the defined values

## Relationships
- ChatSession has-many ChatMessage (one session contains many messages)
- AuroraWidgetState belongs-to ChatSession (widget state relates to a specific session)

## State Transitions
- AuroraWidgetState: closed → expanding → open → collapsing → closed
- ChatMessage: pending → sent | error

## Constraints
- Chat history should persist for at least 24 hours
- Maximum message length: 2000 characters
- Maximum session duration: 8 hours of inactivity before cleanup