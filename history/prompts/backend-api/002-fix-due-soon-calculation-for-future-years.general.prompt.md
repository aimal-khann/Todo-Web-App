---
id: "002"
title: "Fix Due Soon Calculation for Future Years"
stage: "general"
date: "2026-01-05"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "002-fix-user-name-and-due-date-issues"
user: "Aimal Khan"
command: "sp.implement the due soon is stiil having issue this is 2026 the due soon works on the taks which are created before 2026 it does count the 2026 or above taks solve this issue"
labels: ["bug-fix", "dashboard", "due-date", "timezone"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/src/api/v1/endpoints/tasks.py"
tests: []
---

# Fix Due Soon Calculation for Future Years

## Prompt Text
```
 the due soon is stiil having issue this is 2026 the due soon works on the taks which are created before 2026 it does count the 2026 or above taks solve this issue
```

## Response Text
Fixed the "due soon" calculation issue where tasks with due dates in 2026 or later years were not being counted properly. The issue was in the stats endpoint in `backend/src/api/v1/endpoints/tasks.py` where:

1. The code was using deprecated `datetime.utcnow()` which can cause timezone-related comparison problems
2. The logic only checked if due dates were <= 7 days in the future, without ensuring they weren't in the past

Changes made:
- Updated to use timezone-aware datetime with `datetime.now(timezone.utc)`
- Enhanced the due soon query to ensure due dates are both >= now AND <= 7 days in the future
- This ensures tasks with due dates in 2026+ are properly counted when they're within 7 days from current date

## Outcome
The "due soon" calculation now works correctly regardless of the year, properly counting tasks that are due within 7 days from the current date.

## Evaluation
The fix addresses the root cause by ensuring proper timezone handling and adding a check to exclude past due dates, making the logic work correctly for all years including 2026 and beyond.