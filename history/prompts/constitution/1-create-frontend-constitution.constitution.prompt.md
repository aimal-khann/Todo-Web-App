---
id: 1
title: Create Frontend Constitution
stage: constitution
date: 2026-01-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: sp.constitution
labels: ["constitution","frontend","todo-app"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

Create a constitution for the "Evolution of Todo" Phase II - Frontend Only.

# Project: Evolution of Todo (Phase II) - Frontend Implementation
# Type: Web Application Frontend (Next.js)

## 1. Guiding Principles
- **Frontend Isolation:** We are building the **Frontend ONLY**. Do NOT generate, reference, or plan for Python, FastAPI, or Database code.
- **Mock-First Architecture:** All data fetching must use mock interfaces. The app must be fully functional visually without a real backend.
- **"Hot" UI/UX Priority:** The interface must be visually stunning, using modern design trends (glassmorphism, gradients, smooth animations).
- **Agentic Workflow:** Cycle: Specify → Plan → Tasks → Implement.

## 2. Technology Stack (Frontend Only)
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + **Shadcn/UI** (Components) + **Lucide React** (Icons)
- **Animations:** Framer Motion (Required for page transitions and micro-interactions)
- **State Management:** React Query (for managing async mock data) + Zustand (for global UI state)
- **Authentication:** **Better Auth** (Client SDK only - implementing custom UI forms)
- **Validation:** Zod + React Hook Form

## 3. Design & Architecture Rules
- **Visuals:** Use a "Cyberpunk/Modern" aesthetic. Dark mode by default. High-contrast accents.
- **Component Structure:** Use Atomic Design (atoms/molecules/organisms).
- **Responsive:** Mobile-first design is mandatory.
- **Routing:**
  - `/` (Landing Page - Marketing style)
  - `/login` & `/register` (Custom animated auth forms)
  - `/dashboard` (The main app interface)

## 4. Coding Standards
- **Imports:** Use absolute imports (`@/components/...`).
- **No Backend Logic:** Do not write any API routes (`/api/...`) that contain server-side logic. Mock everything on the client or via simple static JSON.

## Response snapshot

I have successfully created the constitution for "Evolution of Todo (Phase II) - Frontend Only" project. Here are the key details:

**New Version**: 1.0.0 (initial version)
**Bump Rationale**: This is the first version of the constitution for this project, establishing foundational principles for the frontend-only implementation.

**Key Features of the Constitution**:
- 6 core principles aligned with the user's requirements: Frontend Isolation, Mock-First Architecture, Hot UI/UX Priority, Agentic Workflow, Modern Technology Stack, and Cyberpunk Design Aesthetic
- Technology & Architecture Constraints section outlining frontend-specific requirements
- Development Workflow section specifying the agentic approach
- Governance section with compliance requirements

**Files Updated**:
- `.specify/memory/constitution.md` - The complete constitution file

**Templates Alignment**:
- All existing templates (plan, spec, tasks) are compatible with the new frontend-focused constitution
- The plan template's Constitution Check will reference these principles during future planning

The constitution is now ready for use in the project and will guide all future development decisions according to the specified frontend-only, modern design approach.

## Outcome

- ✅ Impact: Created initial project constitution for frontend-only todo app
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with complete constitution
- 🔁 Next prompts: Plan and spec creation can proceed based on this constitution
- 🧠 Reflection: Constitution properly captures frontend isolation and technology stack requirements

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none