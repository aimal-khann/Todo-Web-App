---
id: 1
title: "Aurora Agent UI Constitution Update"
stage: constitution
date_iso: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: aurora-agent-ui
branch: main
user: user
command: "sp.constitution"
labels:
  - constitution
  - aurora
  - frontend
  - ui
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - ".specify/memory/constitution.md"
tests_yaml: []
---

# Aurora Agent UI Constitution Update

## Outcome
Updated the project constitution to reflect the Aurora Agent UI frontend requirements, focusing on the Aurora Dark Mode aesthetic and frontend-only development approach.

## Evaluation
The constitution has been successfully updated to reflect the new requirements for the Aurora Agent UI:
- Changed focus from full-stack to frontend-only development
- Added Aurora Dark Mode aesthetic specifications
- Updated tech stack to match frontend requirements
- Modified folder structure to follow professional architecture
- Maintained agentic workflow principles

## Prompt Text
```
Create the Constitution for Phase 3: Frontend - Aurora Agent UI.

**1. Mission: The "Aurora" Experience**
- We are building the **Frontend Interface** for the AI Agent.
- **NO Backend Code:** Do not touch Python, FastAPI, or SQLModel in this sprint. Use mock data if necessary.
- **Visual Standard:** The UI MUST strictly follow the "Aurora Dark Mode" aesthetic:
  - Background: `#020204` (Deep Space Black).
  - Accents: Indigo (`#6366f1`) and Purple (`#a855f7`) gradients.
  - Effect: **Glassmorphism** (Backdrop blur, white transparency borders).
  - Animation: **Framer Motion** for all interactions (smooth entry, hover states).

**2. Professional Architecture (Monorepo - Frontend)**
- **Forbidden:** Do not use folder names like `phase1`, `phase2`, or `phase3`.
- **Allowed Structure:**
  - `src/components/ai/`: All AI-specific components (`ChatWindow`, `AiWidget`).
  - `src/components/ui/aurora/`: Reusable design tokens (`AuroraCard`, `GlowButton`).
  - `src/lib/ai/`: Frontend logic/clients for the agent.

**3. Tech Stack Mandate**
- Framework: Next.js 16 (App Router).
- Styling: Tailwind CSS.
- Animation: Framer Motion (`framer-motion`).
- Icons: Lucide React (`lucide-react`).
- Markdown: React Markdown (`react-markdown`) for rendering bot responses.

**4. Spec-Driven Workflow**
- Implement exactly what is defined in `/specs/003-agent-ui/`.
- Ensure all components are fully responsive (Mobile/Desktop).
```

## Response Text
Updated the constitution file to reflect the Aurora Agent UI frontend requirements with the following key changes:
- Changed from full-stack to frontend-only focus
- Added Aurora Dark Mode aesthetic specifications with precise color values
- Updated tech stack to match requirements (Next.js 16, Tailwind, Framer Motion, etc.)
- Modified folder structure to follow professional architecture guidelines
- Maintained agentic workflow principles (Specify → Plan → Tasks → Implement)
- Ensured version was updated from 2.0.0 to 3.0.0 with proper governance details