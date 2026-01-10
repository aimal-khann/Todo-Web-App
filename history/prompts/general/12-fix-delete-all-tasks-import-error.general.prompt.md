---
id: 12
title: "Fix delete all tasks import error"
stage: refactor
date: 2026-01-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: user
command: "sp.implement"
labels: [backend, agent, bug-fix, imports]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/src/api/v1/endpoints/agent.py"
  - "history/prompts/general/12-fix-delete-all-tasks-import-error.general.prompt.md"
tests: []
---

## Prompt

delete all my tasks
I encountered an error processing your request: name 'delete_all_tasks' is not defined still not working

## Response snapshot

Fixed the import error in the agent endpoint by adding the missing functions to the import statement. The issue was that while the delete_all_tasks and complete_all_tasks functions were implemented in the tools module and the agent endpoint had proper handling logic for them, they weren't being imported correctly.

Updated the import statement in backend/src/api/v1/endpoints/agent.py to include:
- delete_all_tasks
- complete_all_tasks

The import statement now includes: add_task, list_tasks, delete_task, get_analytics, delete_all_tasks, complete_all_tasks

This resolves the "name 'delete_all_tasks' is not defined" error and allows the bulk operations to work properly.

## Outcome

- ✅ Impact: Fixed import error allowing bulk operations to work
- 🧪 Tests: No specific tests mentioned
- 📁 Files: 1 file modified to fix the import
- 🔁 Next prompts: Ready for further testing
- 🧠 Reflection: Missing imports can cause runtime errors even when functions exist

## Evaluation notes (flywheel)

- Failure modes observed: Import error causing undefined function
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Test the bulk operations to confirm they work