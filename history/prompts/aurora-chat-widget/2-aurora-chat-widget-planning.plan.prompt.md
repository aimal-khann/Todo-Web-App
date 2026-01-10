---
id: 2
title: "Aurora Chat Widget Planning"
stage: plan
date_iso: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: aurora-chat-widget
branch: 003-aurora-chat-widget
user: user
command: "sp.plan"
labels:
  - aurora
  - chat
  - widget
  - frontend
  - ui
  - planning
links:
  spec: specs/003-aurora-chat-widget/spec.md
  plan: specs/003-aurora-chat-widget/impl-plan.md
  adr: null
  pr: null
files_yaml:
  - "specs/003-aurora-chat-widget/impl-plan.md"
  - "specs/003-aurora-chat-widget/research.md"
  - "specs/003-aurora-chat-widget/data-model.md"
  - "specs/003-aurora-chat-widget/contracts/chat-api.md"
  - "specs/003-aurora-chat-widget/quickstart.md"
  - ".specify/memory/agent-context-claude.md"
tests_yaml: []
---

# Aurora Chat Widget Planning

## Outcome
Completed comprehensive planning for the Aurora Chat Widget, including technical context, research findings, data models, API contracts, and implementation guidance.

## Evaluation
The planning phase has produced all required artifacts:
- Implementation plan with constitutional compliance check
- Research document resolving all unknowns
- Data model defining key entities
- API contracts for future backend implementation
- Quickstart guide for developers
- Agent context update with new patterns

## Prompt Text
```
Name: Phase 3.1 - Frontend Aurora UI Implementation

**1. Infrastructure & Dependencies**
*Strategy: Prepare the environment for advanced animations and markdown rendering.*
- Install `framer-motion` (animations), `react-markdown` (bot text), and `lucide-react` (icons).
- Establish the **Domain-Driven Directory Structure**:
  - `src/components/ai/` for the Agent Widget.
  - `src/components/ui/aurora/` for shared glassmorphism styles.

**2. Core Component Development**
*Strategy: Build from the inside out. Create the Chat Interface first, then wrap it in the Floating Widget.*
- **Step A:** Implement `ChatWindow`. This is the complex view containing the message list, auto-expanding input, and Markdown rendering. We will port the logic from your provided `chat-window.tsx` but clean up imports.
- **Step B:** Implement `AiAssistant`. This is the container (Floating Action Button). It handles the open/close state and the smooth "pop-up" animation using `AnimatePresence`.

**3. Application Integration**
*Strategy: Make the Agent omnipresent.*
- Integrate the `AiAssistant` into `src/app/dashboard/layout.tsx`. This ensures the bot remains active and keeps conversation history even when the user navigates between "Overview" and "My Tasks".

**4. Visual Verification**
*Strategy: Ensure the "Aurora" aesthetic matches the Dashboard.*
- Verify the z-index stacking (Chatbot must float *above* the dashboard content).
- Verify the Glassmorphism effect against the dark background.
```

## Response Text
Successfully completed the planning phase for the Aurora Chat Widget with the following deliverables:

1. **Implementation Plan** - Detailed technical context, constitutional compliance check, and phased approach
2. **Research Findings** - Resolved all unknowns including task store integration, layout structure, and dependency needs
3. **Data Model** - Defined entities (ChatMessage, ChatSession, AuroraWidgetState) with validation rules and relationships
4. **API Contracts** - Specified interface for future backend implementation with mock service notes
5. **Quickstart Guide** - Developer documentation for implementation and integration
6. **Agent Context** - Updated patterns and best practices for continued development

Key findings include:
- Framer Motion and Lucide React are already installed
- Need to install react-markdown for AI response rendering
- Existing useTaskStore provides necessary task context
- Should create dashboard layout to house the persistent AI assistant
- Aurora aesthetic requirements clearly defined