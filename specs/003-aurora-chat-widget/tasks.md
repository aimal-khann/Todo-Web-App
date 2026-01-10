# Implementation Tasks: Aurora Chat Widget

**Feature**: Aurora Chat Widget
**Branch**: 003-aurora-chat-widget
**Created**: 2026-01-09
**Status**: Ready for Implementation

## Dependencies

- **User Story 2 depends on User Story 1**: Messaging functionality requires the chat window to be accessible
- **User Story 3 depends on User Story 2**: Task context integration requires messaging functionality
- **Foundational tasks must complete before user stories**: Infrastructure setup is required

## Parallel Execution Examples

- **Parallel Setup**: Tasks T001-T002 can run simultaneously as they involve different systems
- **Parallel Component Creation**: Tasks T003-T004 can run in parallel as they create separate components
- **Parallel Styling**: AuroraCard styling can be developed alongside ChatWindow functionality

## Implementation Strategy

**MVP Scope**: User Story 1 (Access AI Assistant) with foundational setup - this provides the core value of accessing the AI assistant

**Incremental Delivery**:
- Sprint 1: Setup + User Story 1 (Accessibility)
- Sprint 2: User Story 2 (Messaging)
- Sprint 3: User Story 3 (Task Context) + Polish

---

## Phase 1: Setup & Infrastructure

- [x] T001 Install UI dependencies: `npm install react-markdown remark-gfm lucide-react clsx tailwind-merge`
- [x] T002 Create professional directory structure: `mkdir -p src/components/ai` and `mkdir -p src/components/ui/aurora`

---

## Phase 2: Foundational Components

- [x] T003 [P] Create `src/components/ui/aurora/AuroraCard.tsx` with glassmorphism styling: `bg-white/[0.02]`, `backdrop-blur-2xl`, thin white borders, subtle hover lift
- [x] T004 [P] Create mock chat service in `src/lib/ai/mock-chat-service.ts` to simulate AI responses with proper delay
- [x] T005 Create dashboard layout at `src/app/dashboard/layout.tsx` to house persistent AI assistant

---

## Phase 3: User Story 1 - Access AI Assistant (Priority: P1)

**Goal**: Enable users to quickly access the AI assistant from the dashboard without leaving their current context.

**Independent Test Criteria**: User can click the floating Sparkle button and see the chat window appear, then close it again.

**Acceptance Scenarios**:
1. Given user is on the dashboard page, When user clicks the floating Sparkle button, Then the chat window expands smoothly from the button position
2. Given user has the chat window open, When user clicks the close button, Then the chat window closes and the floating button returns to its original position

- [x] T006 [US1] Create `src/components/ai/AiAssistant.tsx` with Sparkles FAB positioned at bottom-right
- [x] T007 [US1] Implement AnimatePresence for smooth expand/collapse animation of the chat window
- [x] T008 [US1] Add responsive design: full screen on mobile, fixed width (350px-400px) on desktop
- [x] T009 [US1] Integrate `AiAssistant` into `src/app/dashboard/layout.tsx` to persist across page navigations

---

## Phase 4: User Story 2 - Send Messages to AI Assistant (Priority: P2)

**Goal**: Allow users to send messages and see responses in a conversation format.

**Independent Test Criteria**: User can type a message in the input area and see it appear in the chat window.

**Acceptance Scenarios**:
1. Given user has opened the chat window, When user types a message and sends it, Then the message appears in a user bubble on the right side of the chat window
2. Given user has sent a message, When the AI responds, Then the response appears in an AI bubble on the left side of the chat window

**Prerequisites**: User Story 1 must be complete

- [x] T010 [US2] Create `src/components/ai/ChatWindow.tsx` with header ("Aurora AI" title + "Online" status + close button)
- [x] T011 [US2] Implement scrollable message list area displaying messages
- [x] T012 [US2] Create auto-expanding textarea input that grows from 1 row to max height
- [x] T013 [US2] Style user messages on right side with indigo styling using AuroraCard
- [x] T014 [US2] Style AI responses on left side with glass effect using AuroraCard
- [x] T015 [US2] Implement react-markdown rendering for AI message content
- [x] T016 [US2] Add Framer Motion animations for message bubble entry
- [x] T017 [US2] Connect mock chat service to handle message sending and receiving

---

## Phase 5: User Story 3 - View Task Context in Chat (Priority: P3)

**Goal**: Enable the AI to be aware of current tasks and provide contextual help.

**Independent Test Criteria**: AI assistant can access and reference the user's task data.

**Acceptance Scenarios**:
1. Given user has tasks in their task store, When user starts a conversation with the AI, Then the AI has access to the user's task context
2. Given user asks a question about their tasks, When the AI processes the query, Then the response includes relevant information from the user's task data

**Prerequisites**: User Story 2 must be complete

- [x] T018 [US3] Integrate `useTaskStore` connection in `ChatWindow` to fetch user context
- [x] T019 [US3] Modify mock chat service to include task context in AI responses
- [x] T020 [US3] Add sidebar (hidden by default) with slide-over menu for "History" (visual mock only)

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T021 Implement Aurora aesthetic: deep black background (#020204), indigo (#6366f1) and purple (#a855f7) accents
- [x] T022 Add z-index stacking to ensure chatbot floats above dashboard content
- [x] T023 Implement proper error handling for offline scenarios
- [x] T024 Add loading states for message sending/receiving
- [x] T025 Optimize performance to prevent layout shifts
- [x] T026 Conduct manual verification: Start dev server, verify Sparkle button appears bottom-right and opens glassmorphic chat window
- [x] T027 Test responsive behavior on mobile and desktop
- [x] T028 Verify all animations complete smoothly (target <300ms)