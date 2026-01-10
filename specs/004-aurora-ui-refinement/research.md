# Research Document: Aurora Frontend UI Refinement

## Decision: Component Structure Analysis
**Rationale**: The ChatWindow component uses React hooks for state management with messages stored in useState. The component structure is well-organized with header, main content area, and input section.

**Key Findings**:
- Messages state: `const [messages, setMessages] = useState<ChatMessage[]>([])`
- Need to add a `handleNewChat` function to clear messages: `setMessages([])`
- Current dimensions: `w-full max-w-md md:w-[400px] h-[600px]` (line 132)
- Header styling: `border-b border-white/[0.1]` (line 134)
- Input styling: `bg-white/[0.05]` (line 262)

## Decision: Tailwind Gradient Border Implementation
**Rationale**: To create a gradient border, we need to use a pseudo-element approach since Tailwind doesn't have built-in gradient border utilities.

**Implementation Strategy**:
- Use `bg-gradient-to-r from-indigo-500 to-purple-600` on a container
- Apply `bg-clip-padding` and `border` to create the gradient border effect
- Alternative: Use box-shadow with inset gradient

## Decision: Focus Glow Effect
**Rationale**: For a subtle glow effect on input focus, we can use Tailwind's ring utilities combined with opacity.

**Implementation Strategy**:
- Change current input background from `bg-white/[0.05]` to `bg-white/[0.03]`
- Add focus styling with `focus:ring-1 focus:ring-indigo-400/30` for subtle glow

## Decision: Plus Icon Integration
**Rationale**: The Plus icon from Lucide React needs to be imported and added to the header alongside the History and Close buttons.

**Implementation Strategy**:
- Import `Plus` icon: `import { X, Send, Bot, Circle, Sparkles, History, Menu, Plus } from 'lucide-react';`
- Add button next to History button with onClick handler that clears messages
- Position similar to other header buttons

## Decision: Dimension Reduction Impact
**Rationale**: Reducing height from 600px to 500px and width from 400px to 380px will affect message area space.

**Considerations**:
- Current message area has `flex-1` height allocation
- Need to ensure scrollable area remains usable with reduced dimensions
- Auto-resizing textarea should still function properly

## Alternatives Considered: Alternative to Gradient Borders
- CSS custom properties: Would require additional CSS classes
- SVG background: Would complicate responsive design
- Box-shadow technique: Chosen as the most Tailwind-compatible approach