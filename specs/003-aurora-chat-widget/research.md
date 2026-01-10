# Research Document: Aurora Chat Widget

## Decision: Task Store Integration
**Rationale**: The existing `useTaskStore` provides all necessary functionality for accessing user tasks and context. The store exposes tasks, user information, and dashboard stats that can be used by the AI assistant to provide contextual help.

**Integration Points**:
- `get().tasks`: Access to user's current tasks
- `get().user`: Access to current user information
- `get().stats`: Access to dashboard statistics

## Decision: Dashboard Layout Structure
**Rationale**: The application uses Next.js App Router with a main layout at `frontend/src/app/layout.tsx`. The dashboard page is at `frontend/src/app/dashboard/page.tsx`. Since the requirement is to make the AI assistant persist across page navigations, we need to add it to a layout that encompasses multiple pages.

**Plan**: Create a dashboard-specific layout at `frontend/src/app/dashboard/layout.tsx` that includes the `AiAssistant` component, or potentially add it to the root layout if it should appear site-wide.

## Decision: Missing Dependency Installation
**Rationale**: For proper AI response rendering with markdown formatting, we need to install `react-markdown`.

**Command**: `npm install react-markdown remark-gfm`

## Decision: Component Architecture Approach
**Rationale**: Following the existing architecture patterns and constitutional requirements, we will create:
- `src/components/ui/aurora/AuroraCard.tsx` - Reusable glassmorphism card component
- `src/components/ai/ChatWindow.tsx` - Main chat interface
- `src/components/ai/AiAssistant.tsx` - Floating widget container

## Decision: State Management Strategy
**Rationale**: Using Zustand for the chat-specific state while leveraging the existing `useTaskStore` for task context. This maintains consistency with the existing architecture.

**Implementation**:
- Create `useChatStore` for chat-specific state (messages, open/closed state, etc.)
- Connect to `useTaskStore` for task context
- Maintain separation of concerns between task management and chat functionality

## Decision: Animation Implementation
**Rationale**: Framer Motion is already installed and widely used in the application (evident from dashboard page imports). We will leverage it for the smooth animations required.

**Implementation**:
- Use `AnimatePresence` for the open/close transitions
- Apply motion.div for animated elements
- Follow existing animation patterns from the codebase

## Decision: Responsive Design Approach
**Rationale**: The existing codebase appears to use Tailwind CSS for responsive design. We will follow the same approach for mobile/desktop responsiveness.

**Implementation**:
- Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- Implement full-screen mode for mobile devices
- Fixed width (350px-400px) for desktop as specified

## Alternatives Considered: Alternative State Management
- **Redux**: Overkill for this feature given existing Zustand usage
- **Context API**: Would create unnecessary complexity when Zustand is already established
- **Local component state only**: Insufficient for maintaining chat history across navigations