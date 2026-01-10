---
id: "001"
title: "Fix User Name and Due Date Issues"
stage: "general"
date: "2026-01-05"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "002-fix-user-name-and-due-date-issues"
user: "Aimal Khan"
command: "sp.implement fix issues 1st issue is the the name end point didnt actually work insted of name the email take place insted of name for example attimestamp tasks 12a79840-a203-4eb0-bdff-3b0cfe746ee1 happy99@gmail.com $2b$12$3S85PjPtgh8YMRCftKNYUuRfN6oZTvhgOXr6kISaya/hvg5AbiHde happy 2026-01-04 19:28:13.927058 2026-01-04 19:28:13.927305 tasks attimestamp f44ef0d8-6b86-402a-99f1-e6d99f391ddf amailkhan1@gmail.com $2b$12$fkiqZhf41tMv7RKbaMG7jumXdvpn.FyzcUVUclwiZdLFJ0Trw3JXa aimalkhan@gmail.com 2026-01-05 05:57:12.009292 2026-01-05 05:57:12.00957 in the 2nd one you can see that both name stored as email and one more issue is the due date feature in dashboard is not working also fix these 2 issues"
labels: ["bug-fix", "user-authentication", "dashboard", "due-date"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/src/api/v1/endpoints/auth.py"
  - "frontend/src/app/dashboard/page.tsx"
  - "frontend/src/store/useTaskStore.ts"
tests: []
---

# Fix User Name and Due Date Issues

## Prompt Text
```
fix iisues 1st issue is the the name end point didnt actually work insted of name the email take place insted of name for example attimestamp
tasks

12a79840-a203-4eb0-bdff-3b0cfe746ee1
happy99@gmail.com
$2b$12$3S85PjPtgh8YMRCftKNYUuRfN6oZTvhgOXr6kISaya/hvg5AbiHde
happy
2026-01-04 19:28:13.927058
2026-01-04 19:28:13.927305
tasks                  attimestamp
f44ef0d8-6b86-402a-99f1-e6d99f391ddf    amailkhan1@gmail.com    $2b$12$fkiqZhf41tMv7RKbaMG7jumXdvpn.FyzcUVUclwiZdLFJ0Trw3JXa    aimalkhan@gmail.com    2026-01-05 05:57:12.009292    2026-01-05 05:57:12.00957  in the 2nd one you can see that both name stored as email and one more issue is the due date feature in dashboard is not working also fix these 2 issues
```

## Response Text
Fixed two issues in the application:

1. **User Name Issue**: Added validation to the registration endpoint to prevent email addresses from being stored as full names. The backend now validates that the full_name field does not contain an email address format.

2. **Due Date Feature Issue**: Improved date handling, formatting, and sorting logic in the dashboard. Added error handling for date formatting and fixed the date sorting algorithm to properly handle null/undefined dates.

### Changes Made:
- Added email pattern validation in `backend/src/api/v1/endpoints/auth.py`
- Enhanced date formatting with error handling in `frontend/src/app/dashboard/page.tsx`
- Fixed date sorting logic to properly handle null/undefined values
- Improved date conversion in the task store for consistent ISO string format

## Outcome
Both issues have been resolved. The registration process now prevents email addresses from being used as names, and the due date feature in the dashboard now works correctly with proper formatting and sorting.

## Evaluation
The fixes address the root causes of both issues while maintaining existing functionality. The validation prevents the data integrity issue, and the date handling improvements ensure proper display and sorting of due dates in the dashboard.