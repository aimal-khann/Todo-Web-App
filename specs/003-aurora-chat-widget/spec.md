# Feature Specification: Aurora Chat Widget

**Feature Branch**: `003-aurora-chat-widget`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "Name: Frontend - Aurora Chat Widget

**1. Executive Summary**
Implement the client-side interface for the Todo Agent. This includes a floating "Sparkle" button that expands into a glassmorphic chat window overlaying the dashboard. The design mimics the "Vibe Coding" aesthetic provided by the lead architect.

**2. Component Specifications**

**2.1. Shared UI: `AuroraCard`**
- **Purpose:** A wrapper component for the "Glass" effect.
- **Style:** `bg-white/[0.02]`, `backdrop-blur-2xl`, thin white borders, subtle hover lift.
- **Location:** `src/components/ui/aurora/AuroraCard.tsx`.

**2.2. The Chat Window: `ChatWindow`**
- **Location:** `src/components/ai/ChatWindow.tsx`.
- **Features:**
  - **Header:** "Aurora AI" title + "Online" status indicator + Close button.
  - **Message List:** Scrollable area displaying User (Right/Indigo) and AI (Left/Glass) bubbles.
  - **Input Area:** Auto-expanding textarea (`rows=1` to `max-h`).
  - **Sidebar (Hidden by default):** Slide-over menu for "History" (Visual mock only).
- **Behavior:** Needs `useTaskStore` connection (mocked or imported) to fetch user context.

**2.3. The Widget Container: `AiAssistant`**
- **Location:** `src/components/ai/AiAssistant.tsx`.
- **Features:**
  - **FAB (Floating Action Button):** A glowing button with a `Sparkles` icon fixed at bottom-right.
  - **Transition:** Uses `AnimatePresence` to expand the FAB into the `ChatWindow` smoothly.
  - **Responsiveness:** Full screen on mobile, fixed width (`350px-400px`) on desktop.

**2.4. Dashboard Integration**
- **Location:** `src/app/dashboard/layout.tsx`.
- **Requirement:** The `AiAssistant` must be placed in the Layout tree so it persists across page navigations.

**3. Visual Requirements (The "Vibe")**
- **Gradients:** Deep black backgrounds with subtle indigo noise/blobs.
- **Typography:** Sans-serif, crisp white text, muted secondary text.
- **Motion:** Elements must fade in (`opacity: 0 -> 1`) and slide up (`y: 20 -> 0`)."

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

### User Story 1 - Access AI Assistant (Priority: P1)

As a user working on the dashboard, I want to quickly access the AI assistant so that I can get help with my tasks without leaving the current context.

**Why this priority**: This is the core functionality that enables all other interactions with the AI assistant. Without this basic access point, no other features matter.

**Independent Test**: Can be fully tested by clicking the floating Sparkle button and seeing the chat window appear, delivering immediate value by providing access to AI assistance.

**Acceptance Scenarios**:

1. **Given** user is on the dashboard page, **When** user clicks the floating Sparkle button, **Then** the chat window expands smoothly from the button position
2. **Given** user has the chat window open, **When** user clicks the close button, **Then** the chat window closes and the floating button returns to its original position

---

### User Story 2 - Send Messages to AI Assistant (Priority: P2)

As a user interacting with the AI assistant, I want to send messages and see the responses so that I can get help with my tasks and have a conversation.

**Why this priority**: This provides the core value proposition of the AI assistant - actual interaction and help. It builds upon the access functionality.

**Independent Test**: Can be fully tested by typing a message in the input area and seeing it appear in the chat window, delivering value through the ability to communicate with the AI.

**Acceptance Scenarios**:

1. **Given** user has opened the chat window, **When** user types a message and sends it, **Then** the message appears in a user bubble on the right side of the chat window
2. **Given** user has sent a message, **When** the AI responds, **Then** the response appears in an AI bubble on the left side of the chat window

---

### User Story 3 - View Task Context in Chat (Priority: P3)

As a user talking with the AI assistant, I want the AI to be aware of my current tasks so that it can provide relevant, contextual help.

**Why this priority**: This enhances the value of the AI interaction by making it more personalized and relevant to the user's current work context.

**Independent Test**: Can be fully tested by verifying that the AI assistant can access and reference the user's task data, delivering value through more intelligent and contextual responses.

**Acceptance Scenarios**:

1. **Given** user has tasks in their task store, **When** user starts a conversation with the AI, **Then** the AI has access to the user's task context
2. **Given** user asks a question about their tasks, **When** the AI processes the query, **Then** the response includes relevant information from the user's task data

---

### Edge Cases

- What happens when the user is offline and cannot connect to the AI service?
- How does the system handle very long messages that exceed typical text input limits?
- What occurs when the user rapidly opens and closes the chat window multiple times?
- How does the widget behave when the user navigates between different dashboard pages?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a floating action button with Sparkles icon positioned at the bottom-right of the screen
- **FR-002**: System MUST smoothly animate the transition between the floating button and the expanded chat window using Framer Motion
- **FR-003**: System MUST display the chat window as a glassmorphic overlay that doesn't interfere with the underlying dashboard content
- **FR-004**: System MUST render user messages on the right side with indigo styling and AI responses on the left side with glass effect styling
- **FR-005**: System MUST provide an auto-expanding text input area that grows from 1 row to a maximum height
- **FR-006**: System MUST persist the chat window state across page navigations within the dashboard
- **FR-007**: System MUST integrate with the existing task store to provide user context to the AI
- **FR-008**: System MUST provide a close button in the chat window header to collapse the widget back to the floating button
- **FR-009**: System MUST support responsive design with full-screen mode on mobile and fixed-width (350px-400px) on desktop
- **FR-010**: System MUST display an "Online" status indicator in the chat window header
- **FR-011**: System MUST implement the Aurora aesthetic with deep black background (#020204), indigo (#6366f1) and purple (#a855f7) accents, and glassmorphism effects

### Key Entities *(include if feature involves data)*

- **ChatMessage**: Represents a single message in the conversation with sender type (user/ai), content, timestamp, and display properties
- **ChatSession**: Represents a single interaction session with the AI assistant, containing the message history and metadata
- **AuroraWidgetState**: Represents the current state of the widget (collapsed/expanded) and associated UI properties

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Users can access the AI assistant within 2 seconds of arriving on the dashboard page
- **SC-002**: Chat window animations complete smoothly within 300ms without jank or stuttering
- **SC-003**: 95% of users successfully send their first message after opening the chat window
- **SC-004**: Users spend an average of 2+ minutes in meaningful conversation with the AI assistant per session
- **SC-005**: The chat widget does not negatively impact dashboard performance or cause layout shifts
- **SC-006**: 90% of users can identify the AI assistant functionality as a key feature during usability testing