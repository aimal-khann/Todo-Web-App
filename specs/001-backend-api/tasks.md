# Task Checklist: Professional Todo Manager (Backend API)

**Feature**: 001-backend-api | **Date**: 2026-01-02

## Implementation Strategy

**MVP Approach**: Implement the authentication system first (User Story 1) to provide a foundation for the task management system (User Story 2). Each user story should be independently testable and deliver value.

**Parallel Opportunities**: Database models, security utilities, and API schemas can be developed in parallel once the foundational setup is complete.

## Phase 1: Setup (Project Initialization)

### Goal
Initialize the backend project structure with all necessary dependencies and configuration.

### Independent Test Criteria
- Project can be created and basic dependencies installed
- Development server can start without errors

### Tasks

- [x] T001 Create `backend/` directory structure with all required subdirectories
- [x] T002 Create `backend/requirements.txt` with FastAPI, SQLModel, Uvicorn, Python-Jose, Passlib, Bcrypt
- [x] T003 Create `backend/src/main.py` with FastAPI app instance and CORS middleware (allowing localhost:3000)
- [x] T004 Create `backend/src/core/config.py` to load Environment Variables (DB URL, Secret Key) using `pydantic-settings`
- [x] T005 Create `backend/.env.example` with template for environment variables
- [x] T006 Create `backend/Dockerfile` for containerization
- [x] T007 Create `backend/docker-compose.yml` for local development services

## Phase 2: Foundational (Blocking Prerequisites)

### Goal
Establish the database connection, models, and security infrastructure needed for all user stories.

### Independent Test Criteria
- Database connection can be established
- User and Task models can be created and manipulated
- Security functions (password hashing, JWT) work correctly

### Tasks

- [x] T008 [P] Create `backend/src/db/session.py` with the async engine for Neon PostgreSQL
- [x] T009 [P] Define `User` model in `backend/src/models/user.py` (UUID, email, hashed_password, full_name, timestamps)
- [x] T010 [P] Define `Task` model in `backend/src/models/task.py` (foreign key to User, title, description, status, priority, due_date, timestamps)
- [x] T011 [P] Create Pydantic schemas for User in `backend/src/schemas/user.py` (UserCreate, UserRead, UserUpdate)
- [x] T012 [P] Create Pydantic schemas for Task in `backend/src/schemas/task.py` (TaskCreate, TaskRead, TaskUpdate)
- [x] T013 [P] Implement `backend/src/core/security.py` (Password hashing functions + JWT token creation/verification)
- [x] T014 [P] Initialize Alembic and generate the initial migration script to create tables in Neon
- [x] T015 [P] Create `backend/src/api/deps.py` with `get_current_user` dependency (validates Bearer token)

## Phase 3: User Story 1 - User Registration and Authentication (Priority: P1)

### Goal
Enable users to register, authenticate, and access their profile information.

### Independent Test Criteria
- Can register a new user with email, password, and full name
- Can authenticate with valid credentials and receive a JWT token
- Can access user profile information with a valid token

### User Story Mapping
- **US1**: User Registration and Authentication (P1)
- **Acceptance**: Given a user is not registered, When they submit valid registration details (email, password, full name), Then a new account is created with hashed password and a JWT token is returned

### Tasks

- [x] T016 [US1] Build Auth Router endpoints in `backend/src/api/v1/endpoints/auth.py` - register endpoint
- [x] T017 [US1] Build Auth Router endpoints in `backend/src/api/v1/endpoints/auth.py` - login endpoint
- [x] T018 [US1] Build Auth Router endpoints in `backend/src/api/v1/endpoints/auth.py` - get current user endpoint
- [x] T019 [US1] Implement user registration logic with password hashing
- [x] T020 [US1] Implement user authentication logic with JWT token generation
- [x] T021 [US1] Implement get current user logic with JWT validation
- [x] T022 [US1] Add proper error handling for authentication failures
- [x] T023 [US1] Wire up auth router in `main.py` under prefix `/api/v1`

## Phase 4: User Story 2 - Secure Task Management (Priority: P1)

### Goal
Enable authenticated users to create, view, update, and delete their own tasks with proper data isolation.

### Independent Test Criteria
- Can create a task when authenticated and associate it with the user
- Can view only tasks that belong to the authenticated user
- Cannot access tasks belonging to other users
- Can update and delete own tasks

### User Story Mapping
- **US2**: Secure Task Management (P1)
- **Acceptance**: Given a user is authenticated with a valid JWT token, When they create a new task, Then the task is saved and associated with their user ID

### Tasks

- [x] T024 [US2] Build Tasks Router endpoints in `backend/src/api/v1/endpoints/tasks.py` - list user's tasks
- [x] T025 [US2] Build Tasks Router endpoints in `backend/src/api/v1/endpoints/tasks.py` - create new task
- [x] T026 [US2] Build Tasks Router endpoints in `backend/src/api/v1/endpoints/tasks.py` - get specific task
- [x] T027 [US2] Build Tasks Router endpoints in `backend/src/api/v1/endpoints/tasks.py` - update task
- [x] T028 [US2] Build Tasks Router endpoints in `backend/src/api/v1/endpoints/tasks.py` - delete task
- [x] T029 [US2] Implement task creation logic with user association
- [x] T030 [US2] Implement task listing logic with user filtering (ensure `current_user.id` filtering)
- [x] T031 [US2] Implement task retrieval with user ownership validation
- [x] T032 [US2] Implement task update logic with user ownership validation
- [x] T033 [US2] Implement task deletion logic with user ownership validation
- [x] T034 [US2] Ensure all Task queries filter by `current_user.id` (Data Isolation Check)
- [x] T035 [US2] Wire up tasks router in `main.py` under prefix `/api/v1`

## Phase 5: User Story 3 - User Profile Access (Priority: P2)

### Goal
Enable authenticated users to retrieve their profile information.

### Independent Test Criteria
- Can retrieve authenticated user's profile information via the /me endpoint

### User Story Mapping
- **US3**: User Profile Access (P2)
- **Acceptance**: Given a user is authenticated with a valid JWT token, When they request their profile via the /me endpoint, Then their user details (email, full name) are returned

### Tasks

- [x] T036 [US3] Enhance user profile endpoint to return complete user information
- [x] T037 [US3] Add proper validation and error handling to profile access

## Phase 6: Frontend Integration (The "Synapse")

### Goal
Connect the frontend to the backend API, replacing mock data with real API calls.

### Independent Test Criteria
- Frontend can communicate with backend API
- User authentication works end-to-end
- Task management works end-to-end with real data persistence

### Tasks

- [x] T038 [P] Create `frontend/src/lib/api-client.ts` (Axios instance with Interceptor to inject JWT from storage)
- [x] T039 Refactor `frontend/src/store/useTaskStore.ts` to replace `dummyData` and `MockAuthService` with real API calls
- [x] T040 Update `frontend/src/app/login/page.tsx` to handle real API errors (e.g., "Invalid email or password")
- [x] T041 Update `frontend/src/app/register/page.tsx` to handle real API errors (e.g., "Email already exists")
- [x] T042 Update `frontend/src/app/dashboard/page.tsx` to use real API data instead of mock data
- [x] T043 Test complete authentication flow: Create a user -> Log in -> Create a task -> Refresh page (Persistence check)

## Dependencies

### User Story Completion Order
1. **Setup Phase** must complete before any user story
2. **Foundational Phase** must complete before any user story
3. **User Story 1** (Authentication) must complete before User Story 2 (Task Management)
4. **User Story 2** (Task Management) can proceed independently after authentication
5. **User Story 3** (Profile Access) can proceed after authentication

### Critical Path
T001 → T002 → T003 → T008 → T009 → T010 → T013 → T015 → T016 → T017 → T018 → T024 → T025 → T026 → T027 → T028

## Parallel Execution Examples

### By User Story
- **US1 Parallel Tasks**: T016, T017, T018 can be developed in parallel
- **US2 Parallel Tasks**: T024, T025, T026, T027, T028 can be developed in parallel

### By Component Type
- **Models**: T009, T010 can be developed in parallel with security components
- **Schemas**: T011, T012 can be developed in parallel with models
- **Security**: T013 can be developed in parallel with models and schemas
- **Frontend**: T038, T039, T040, T041 can be developed in parallel after backend is functional

## Quality Gates

- **Swagger Check**: `/docs` must be accessible and show all endpoints
- **Type Parity**: The TypeScript `Task` interface must match the Python `TaskRead` model response
- **Data Isolation**: A user MUST NOT be able to access or delete another user's tasks
- **Performance**: All endpoints must respond in <200ms