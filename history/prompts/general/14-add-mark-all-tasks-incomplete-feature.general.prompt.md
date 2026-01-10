---
id: 14
title: "Add mark all tasks as incomplete feature"
stage: refactor
date: 2026-01-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: user
command: "sp.implement"
labels: [backend, agent, tasks, feature]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/src/mcp/tools.py"
  - "backend/src/api/v1/endpoints/agent.py"
  - "history/prompts/general/14-add-mark-all-tasks-incomplete-feature.general.prompt.md"
tests: []
---

## Prompt

mark all task as incomplete
I have marked all tasks as incomplete. it says it marked all the tasks as incomplete but in reality the tasks still mark sa completed

## Response snapshot

Implemented the missing "mark all tasks as incomplete" feature to address the user's need. Previously, the system only had functions to mark all tasks as completed but no function to reverse this action.

Changes made:

1. **Added `mark_all_tasks_incomplete` function in `backend/src/mcp/tools.py`**:
   - Creates a new function that queries all tasks for a user
   - Updates all tasks to "pending" status (incomplete)
   - Updates the timestamp for each task
   - Commits the changes to the database
   - Returns a success message with the count of updated tasks

2. **Updated `backend/src/api/v1/endpoints/agent.py`**:
   - Added the new function to the import statement
   - Added the new tool to the TOOLS_SCHEMA with proper function definition
   - Added the function call handling in the tool processing section
   - The function is now available for OpenAI function calling

The implementation follows the same pattern as the existing `complete_all_tasks` function but sets the status to "pending" instead of "completed". Users can now use commands like "mark all tasks as incomplete" or "mark all tasks as pending" to revert completed tasks back to pending status.

## Outcome

- ✅ Impact: Added mark all tasks as incomplete functionality
- 🧪 Tests: No specific tests mentioned
- 📁 Files: 2 files modified to add the new feature
- 🔁 Next prompts: Ready for user testing
- 🧠 Reflection: Bidirectional operations (complete/incomplete) improve UX

## Evaluation notes (flywheel)

- Failure modes observed: Missing inverse operation for task completion
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Add support for other status changes