---
id: 1
title: Evolution of Todo Full Stack Constitution Update
stage: constitution
date_iso: 2026-01-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: evolution-of-todo
branch: 001-todo-frontend-ui
user: Claude
command: /sp.constitution
labels: ["constitution", "full-stack", "todo-app"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - .specify/memory/constitution.md
tests_yaml: |
  - constitution validation
prompt_text: |
  Update the constitution for "Evolution of Todo" to Phase II - Full Stack.

  # Project: Evolution of Todo (Phase II) - Full Stack Implementation
  # Type: Full-Stack Web Application (Next.js + FastAPI)

  ## 1. Guiding Principles
  - **Full-Stack Integration:** We are now building the **Backend**. The frontend must eventually consume real APIs, removing mock data.
  - **Type Parity:** TypeScript interfaces (Frontend) and Pydantic models (Backend) must stay synchronized.
  - **Stateless Architecture:** The backend must be stateless, verifying JWT tokens on every protected request.
  - **Agentic Workflow:** Cycle: Specify → Plan → Tasks → Implement.

  ## 2. Technology Stack
  ### Frontend (Existing)
  - **Framework:** Next.js 16+ (App Router)
  - **State:** React Query (Server State) + Zustand (Client State)
  - **Auth:** Better Auth (Client SDK)
  - **UI:** Tailwind + Shadcn/UI + Framer Motion

  ### Backend (New)
  - **Framework:** FastAPI
  - **Language:** Python 3.10+
  - **Database:** Neon Serverless PostgreSQL
  - **ORM:** SQLModel (SQLAlchemy + Pydantic)
  - **Auth Verification:** `python-jose` (for decoding Better Auth JWTs)
  - **Migrations:** Alembic

  ## 3. Architecture Rules
  - **Folder Structure:**
    - `/frontend`: Next.js code (Keep existing).
    - `/backend`: Python FastAPI service (New).
  - **API Standards:** RESTful endpoints returning JSON. Snake_case for Python, camelCase for JSON responses.
  - **Database:** All tables must have `created_at` and `updated_at` timestamps.
  - **Security:** Never commit `.env` files. Use environment variables for DB URLs.

  ## 4. Coding Standards
  - **Backend:** Strict Type Hints (Python). Modular routers (`/api/v1/...`).
  - **Frontend:** Replace `MockAuthService` with `Axios` or `Fetch` calls to the backend.
response_text: |
  Successfully updated the constitution file to reflect full-stack implementation requirements. The constitution was updated from version 1.0.0 to 2.0.0, changing from a frontend-only approach to a full-stack approach. Key changes include:

  - Changed "Frontend Isolation" to "Full-Stack Integration" principle
  - Added "Type Parity" and "Stateless Architecture" principles
  - Updated technology stack to include backend technologies
  - Added folder structure requirements for both frontend and backend
  - Updated API standards and database constraints
  - Updated development workflow to include backend development
  - Updated governance to reflect full-stack requirements

  The constitution now properly reflects the project's evolution from frontend-only to full-stack implementation with Next.js and FastAPI.
outcome: |
  Constitution successfully updated to version 2.0.0 with full-stack implementation guidelines.
evaluation: |
  The updated constitution properly reflects the requirements for a full-stack implementation, maintaining the agentic workflow while expanding the scope to include backend development.
---