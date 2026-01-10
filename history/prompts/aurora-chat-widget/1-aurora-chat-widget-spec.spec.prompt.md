---
id: 1
title: "Aurora Chat Widget Spec"
stage: spec
date_iso: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: aurora-chat-widget
branch: 003-aurora-chat-widget
user: user
command: "sp.specify"
labels:
  - aurora
  - chat
  - widget
  - frontend
  - ui
links:
  spec: specs/003-aurora-chat-widget/spec.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/003-aurora-chat-widget/spec.md"
  - "specs/003-aurora-chat-widget/checklists/requirements.md"
tests_yaml: []
---

# Aurora Chat Widget Specification

## Outcome
Created comprehensive specification for the Aurora Chat Widget, a floating AI assistant interface with glassmorphic design following the Aurora aesthetic.

## Evaluation
The specification includes:
- Three prioritized user stories covering access, messaging, and contextual features
- Ten functional requirements defining the core behavior
- Three key entities for data modeling
- Six measurable success criteria
- Edge case considerations

## Prompt Text
```
Name: Frontend - Aurora Chat Widget

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
- **Motion:** Elements must fade in (`opacity: 0 -> 1`) and slide up (`y: 20 -> 0`).
```

## Response Text
Created a comprehensive specification for the Aurora Chat Widget feature with the following elements:
- User stories prioritized by importance (P1-P3) covering access, messaging, and contextual features
- Functional requirements defining the core behavior (FR-001 to FR-011) including UI, animation, and integration requirements
- Key entities for data modeling (ChatMessage, ChatSession, AuroraWidgetState)
- Success criteria with measurable outcomes (SC-001 to SC-006)
- Edge cases consideration for various scenarios
- Quality checklist to ensure specification completeness