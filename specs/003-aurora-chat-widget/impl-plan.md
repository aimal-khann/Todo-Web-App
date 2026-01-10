# Implementation Plan: Aurora Chat Widget

**Feature**: Aurora Chat Widget
**Branch**: 003-aurora-chat-widget
**Created**: 2026-01-09
**Status**: Draft

## Technical Context

### Current State
- **Frontend Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with existing atomic/molecular/organism structure
- **Animation**: Framer Motion already installed (v11.0.0)
- **Icons**: Lucide React already installed (v0.390.0)
- **State Management**: Zustand for task store (useTaskStore)
- **Current Components**: Atomic, Molecular, Organism structure in components/
- **Aesthetic**: Aurora Dark Mode with #020204 background, indigo/purple accents

### Dependencies Status
- **framer-motion**: ✓ Already installed (v11.0.0)
- **lucide-react**: ✓ Already installed (v0.390.0)
- **react-markdown**: ❌ Not installed - [NEEDS CLARIFICATION: Will need to install for AI response rendering]

### Architecture Context
- **Component Location**: `src/components/ai/` for AI-specific components
- **UI Tokens**: `src/components/ui/aurora/` for Aurora-themed components
- **Dashboard Integration**: `src/app/dashboard/layout.tsx` (may need to be created)

### Unknowns to Resolve
- **Task Store**: Need to examine existing `useTaskStore` implementation to understand how to connect with it
- **Chat API**: Need to understand if there's an existing mock API or if we need to create one
- **Dashboard Layout**: Need to check if dashboard layout exists or needs to be created

## Constitution Check

### Compliance Verification
- ✅ **Frontend-Only Focus**: Implementation will be client-side only with mock data
- ✅ **Aurora Dark Mode Aesthetic**: Will implement #020204 background, indigo/purple accents, glassmorphism
- ✅ **Aurora Design System**: Will create reusable AuroraCard component with glass effect
- ✅ **Client-Side State Management**: Will use Zustand with existing useTaskStore
- ✅ **Professional Architecture**: Will follow specified folder structure (ai/, ui/aurora/)
- ✅ **Tech Stack Mandate**: Using Next.js 16, Tailwind, Framer Motion, Lucide React
- ✅ **Folder Structure**: Will create components in specified locations (ai/, ui/aurora/)
- ✅ **Component Architecture**: Will follow Atomic Design principles
- ✅ **Mock Data Strategy**: Will implement proper mock patterns for AI responses

### Potential Violations
- **None identified**: All requirements align with constitution

## Gates

### Entry Gate: Specification Compliance
- **Status**: PASSED
- **Verification**: All functional requirements from spec can be implemented within constitutional constraints

### Architecture Gate: Technical Feasibility
- **Status**: PASSED
- **Verification**: All required technologies are either available or installable

### Dependency Gate: Prerequisites
- **Status**: CONDITIONAL PASS
- **Condition**: Need to install react-markdown for AI response rendering

## Phase 0: Research & Discovery

### Research Tasks
1. **Task Store Integration**: Examine existing `useTaskStore` to understand data structure
2. **Dashboard Layout**: Locate and examine dashboard layout for integration point
3. **Component Structure**: Review existing component architecture to maintain consistency
4. **Install Dependencies**: Add react-markdown for AI response rendering

### Research Plan
- Research existing task store implementation
- Identify dashboard layout structure
- Plan AuroraCard component implementation
- Plan ChatWindow component implementation
- Plan AiAssistant widget implementation

## Phase 1: Design & Contracts

### Data Model: chat-message.md
- **ChatMessage**: { id, content, sender (user/ai), timestamp, status (sent/pending/error) }
- **ChatSession**: { id, messages[], createdAt, updatedAt, isActive }
- **AuroraWidgetState**: { isOpen, position, animationState }

### API Contracts: contracts/chat-api.md
- **POST /api/chat/send**: Send message to AI assistant
- **GET /api/chat/history**: Retrieve conversation history
- **MOCK IMPLEMENTATION**: Since backend is out of scope, implement mock service

### Quickstart Guide: quickstart.md
- How to run the Aurora Chat Widget
- Configuration options
- Integration with existing dashboard

### Agent Context Update
- Add Aurora Chat Widget patterns to agent memory
- Update component creation guidelines