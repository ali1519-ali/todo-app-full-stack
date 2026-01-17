# Tasks: Multi-User Todo Application

**Input**: Design documents from `/specs/01-multi-user-todo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend project structure with FastAPI dependencies
- [X] T002 Create frontend project structure with Next.js dependencies
- [X] T003 [P] Set up project configuration files (.env, .gitignore, etc.)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T004 Set up database schema and migrations framework for Neon PostgreSQL
- [X] T005 [P] Implement JWT authentication middleware for FastAPI backend
- [X] T006 [P] Set up Better Auth integration with Next.js frontend
- [X] T007 Create base User and Task models using SQLModel
- [X] T008 Configure error handling and logging infrastructure
- [X] T009 Set up environment configuration management

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Registration and Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable new users to create accounts and authenticate to access their personal todo list

**Independent Test**: Can be fully tested by registering a new user account and verifying successful login, delivering the ability for users to have their own secure space.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for signup endpoint in backend/tests/contract/test_auth.py
- [ ] T011 [P] [US1] Contract test for signin endpoint in backend/tests/contract/test_auth.py

### Implementation for User Story 1

- [X] T012 [P] [US1] Create User model in backend/src/models/user.py
- [X] T013 [US1] Implement authentication service in backend/src/services/auth_service.py
- [X] T014 [US1] Implement signup/signin endpoints in backend/src/api/auth.py
- [X] T015 [US1] Create authentication components in frontend/src/components/auth/
- [X] T016 [US1] Implement signup/signin pages in frontend/src/app/auth/
- [X] T017 [US1] Add authentication state management in frontend/src/lib/auth.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management (Priority: P1)

**Goal**: Allow logged-in users to create, view, update, and delete their tasks to manage responsibilities effectively

**Independent Test**: Can be fully tested by creating, viewing, updating, and deleting tasks for a single user, delivering the core todo management functionality.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for tasks endpoints in backend/tests/contract/test_tasks.py
- [ ] T019 [P] [US2] Integration test for user task isolation in backend/tests/integration/test_task_isolation.py

### Implementation for User Story 2

- [X] T020 [P] [US2] Create Task model in backend/src/models/task.py
- [X] T021 [US2] Implement task service in backend/src/services/task_service.py
- [X] T022 [US2] Implement task CRUD endpoints in backend/src/api/tasks.py
- [X] T023 [US2] Create task management components in frontend/src/components/tasks/
- [X] T024 [US2] Implement task management pages in frontend/src/app/tasks/
- [X] T025 [US2] Add task API integration in frontend/src/app/api/tasks.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Completion and Filtering (Priority: P2)

**Goal**: Allow users to mark tasks as complete and filter tasks by status to track progress and focus on pending items

**Independent Test**: Can be fully tested by marking tasks as complete and filtering tasks by status, delivering improved organization and progress tracking.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T026 [P] [US3] Contract test for task completion endpoint in backend/tests/contract/test_tasks.py
- [ ] T027 [P] [US3] Integration test for task filtering in backend/tests/integration/test_task_filtering.py

### Implementation for User Story 3

- [X] T028 [P] [US3] Implement task completion endpoint in backend/src/api/tasks.py
- [X] T029 [US3] Add task filtering logic in backend/src/services/task_service.py
- [X] T030 [US3] Create task filtering components in frontend/src/components/tasks/
- [X] T031 [US3] Implement task completion UI in frontend/src/components/tasks/
- [X] T032 [US3] Add filtering functionality to task management pages in frontend/src/app/tasks/,

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T033 [P] Documentation updates in docs/
- [ ] T034 Code cleanup and refactoring
- [ ] T035 Performance optimization across all stories
- [ ] T036 [P] Additional unit tests (if requested) in tests/unit/
- [ ] T037 Security hardening
- [ ] T038 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for signup endpoint in backend/tests/contract/test_auth.py"
Task: "Contract test for signin endpoint in backend/tests/contract/test_auth.py"

# Launch all models for User Story 1 together:
Task: "Create User model in backend/src/models/user.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence