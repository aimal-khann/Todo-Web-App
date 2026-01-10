# Implementation Tasks: Aurora Frontend UI Refinement

**Feature**: Aurora Frontend UI Refinement
**Branch**: 004-aurora-ui-refinement
**Created**: 2026-01-09
**Status**: Ready for Implementation

## Dependencies

- **User Story 2 depends on User Story 1**: Compact sizing should be implemented before adding new functionality
- **User Story 3 depends on User Story 1**: Visual enhancements build on the base functionality

## Parallel Execution Examples

- **No parallel tasks**: All tasks modify the same file (`ChatWindow.tsx`) and must be executed sequentially

## Implementation Strategy

**MVP Scope**: User Story 1 (Start New Conversation) with compact sizing - this provides the core functionality of refreshing conversations.

**Incremental Delivery**:
- Sprint 1: User Story 1 (New Chat functionality) + Sizing adjustments
- Sprint 2: User Story 2 (Compact Chat Window) + Visual enhancements
- Sprint 3: User Story 3 (Enhanced Aurora Aesthetic) + Polish

---

## Phase 1: Setup & Infrastructure

- [x] T001 Verify existing component structure at `frontend/src/components/ai/ChatWindow.tsx`
- [x] T002 Backup current `ChatWindow.tsx` file before modifications

---

## Phase 2: Foundational Components

- [x] T003 Import necessary dependencies and verify `Plus` icon availability from Lucide React

---

## Phase 3: User Story 1 - Start New Conversation (Priority: P1)

**Goal**: Enable users to start a fresh conversation by clearing the current message list state.

**Independent Test Criteria**: User can click the "New Chat" button and verify that the message list clears while maintaining the chat interface.

**Acceptance Scenarios**:
1. Given user has an active conversation with multiple messages, When user clicks the "New Chat" button (Plus icon), Then all messages are cleared from the chat window and the conversation is reset
2. Given user has just started a new conversation, When user types and sends a message, Then the new message appears in the cleared chat window

- [x] T004 [US1] Resize Chat Window: In `src/components/ai/ChatWindow.tsx`, find the main `AuroraCard` className. Change `md:w-[400px]` to `md:w-[380px]` and `h-[600px]` to `h-[500px]`.
- [x] T005 [US1] Add "New Chat" Button: In `src/components/ai/ChatWindow.tsx`, import `Plus` from `lucide-react`.
- [x] T006 [US1] Add "New Chat" Button: In `src/components/ai/ChatWindow.tsx`, add a `handleNewChat` function that calls `setMessages([])` and clears `inputValue`.
- [x] T007 [US1] Add "New Chat" Button: In `src/components/ai/ChatWindow.tsx`, in the header options div (next to the History button), add a new `<button onClick={handleNewChat}>` containing the `<Plus size={20} />` icon, using the same styling as the existing buttons.

---

## Phase 4: User Story 2 - Compact Chat Window (Priority: P2)

**Goal**: Make the chat window more compact so it feels less intrusive and allows better focus on primary tasks.

**Independent Test Criteria**: User can open the chat window and verify it has the new compact dimensions (500px height, 380px width).

**Acceptance Scenarios**:
1. Given user opens the Aurora chat window, When the window appears, Then it has reduced dimensions (height: 500px, width: 380px) compared to the previous version
2. Given user is interacting with the compact chat window, When user scrolls through messages, Then the interface remains functional and readable despite the smaller size

**Prerequisites**: User Story 1 must be complete

- [x] T008 [US2] Verify compact sizing implementation in `src/components/ai/ChatWindow.tsx` (already covered in T004)
- [x] T009 [US2] Test message area usability with reduced dimensions in `src/components/ai/ChatWindow.tsx`

---

## Phase 5: User Story 3 - Enhanced Aurora Aesthetic (Priority: P3)

**Goal**: Enhance the internal elements to have a more refined Aurora aesthetic so the interface feels like layered glass rather than solid blocks.

**Independent Test Criteria**: User can examine the visual elements of the chat window and verify they have the enhanced Aurora styling.

**Acceptance Scenarios**:
1. Given user opens the Aurora chat window, When viewing the header, Then it displays a subtle indigo-to-purple gradient border instead of a simple line
2. Given user is typing in the input area, When the textarea is focused, Then it shows a subtle glow effect and increased transparency
3. Given user is viewing the message area, When looking at the container background, Then it is transparent enough that dashboard colors subtly bleed through the blur effect

**Prerequisites**: User Story 1 must be complete

- [x] T010 [US3] Enhance Visual Polish: In `src/components/ai/ChatWindow.tsx`, update the Header `div` className. Replace `border-b border-white/[0.1]` with a gradient border effect, e.g., `border-b border-transparent bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent bg-[length:100%_1px] bg-bottom bg-no-repeat`.
- [x] T011 [US3] Enhance Visual Polish: In `src/components/ai/ChatWindow.tsx`, update the `textarea` className. Change `bg-white/[0.05]` to a more transparent `bg-white/[0.02]`. Add focus ring styling: `focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-500/30`.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T012 Verify all UI refinements work together harmoniously in `src/components/ai/ChatWindow.tsx`
- [x] T013 Test responsive behavior on different screen sizes for the compact window
- [x] T014 Verify accessibility of new "New Chat" button with proper ARIA labels
- [x] T015 Test performance impact of gradient borders and enhanced transparency
- [x] T016 Conduct manual verification: Open chat window and test all new functionality
- [x] T017 Verify that the Aurora aesthetic is consistently applied across all elements
- [x] T018 Update any documentation to reflect the new UI changes