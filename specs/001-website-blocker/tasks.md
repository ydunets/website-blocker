# Tasks: Website Blocker Extension

**Input**: Design documents from `specs/001-website-blocker/`
**Prerequisites**: plan.md (✅), spec.md (✅), research.md (✅), data-model.md (✅), contracts/ (✅), quickstart.md (✅)

**Tests**: Success criteria validation tasks included (T106-T115) to validate measurable performance requirements

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Server**: `server/src/` (NestJS + FSD architecture)
- **Client**: `client/src/` (Next.js + FSD architecture)  
- **Extension**: `extension/src/` (Vite + React + FSD architecture)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and three-tier structure

- [X] T001 Create three-tier project structure per plan.md (server/, client/, extension/)
- [X] T002 [P] Initialize NestJS project in server/ with TypeScript 5.3+ and dependencies
- [X] T003 [P] Initialize Next.js 15+ project in client/ with TypeScript and FSD structure
- [X] T004 [P] Initialize Vite + React extension in extension/ with @crxjs/vite-plugin
- [X] T005 [P] Setup PostgreSQL database with Docker Compose in server/docker-compose.yml
- [ ] T006 [P] Configure ESLint and Prettier for all three tiers
- [ ] T007 [P] Setup npm workspaces in root package.json for monorepo management
- [ ] T008 [P] Create environment configuration files (.env.example) for all tiers

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Setup Prisma ORM in server/prisma/schema.prisma with database models
- [ ] T010 [P] Implement JWT authentication middleware in server/src/shared/auth/
- [ ] T011 [P] Setup NestJS modules structure in server/src/app/app.module.ts
- [ ] T012 [P] Create base API routing and validation in server/src/shared/filters/
- [ ] T013 [P] Setup Swagger API documentation in server/src/app/swagger.config.ts
- [ ] T014 [P] Configure CORS for extension and client origins in server/src/app/cors.config.ts
- [ ] T015 Run database migrations and generate Prisma client in server/prisma/
- [ ] T016 [P] Generate OpenAPI specification in server/swagger.json
- [ ] T017 [P] Setup Orval API client generation for client/ and extension/
- [ ] T018 [P] Create shared types and validation schemas in server/src/shared/dto/
- [ ] T019 [P] Setup error handling and logging infrastructure in server/src/shared/filters/
- [ ] T020 [P] Create extension manifest.json with Chrome Manifest V3 configuration

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Website Blocking (Priority: P1) 🎯 MVP

**Goal**: Individual users can install the extension and block distracting websites immediately

**Independent Test**: Install extension, add "facebook.com" to blocklist, verify facebook.com shows blocking page

### Implementation for User Story 1

- [ ] T021 [P] [US1] Create User entity in server/src/entities/user/user.entity.ts
- [ ] T022 [P] [US1] Create Blocklist entity in server/src/entities/blocklist/blocklist.entity.ts  
- [ ] T023 [P] [US1] Create Website entity in server/src/entities/website/website.entity.ts
- [ ] T024 [US1] Implement UserService in server/src/entities/user/user.service.ts
- [ ] T025 [US1] Implement BlocklistService in server/src/entities/blocklist/blocklist.service.ts
- [ ] T026 [US1] Implement authentication endpoints in server/src/features/auth/auth.controller.ts
- [ ] T027 [US1] Implement blocklist CRUD endpoints in server/src/features/blocklist/blocklist.controller.ts
- [ ] T028 [P] [US1] Create extension popup UI in extension/src/pages/popup/popup.tsx
- [ ] T029 [P] [US1] Create extension blocklist management in extension/src/features/blocking/components/BlocklistManager.tsx
- [ ] T030 [P] [US1] Create blocking page template in extension/public/blocked.html
- [ ] T031 [US1] Implement declarative Net Request API integration in extension/src/app/background/service-worker.ts
- [ ] T032 [US1] Create extension storage utilities in extension/src/shared/storage/extensionStorage.ts
- [ ] T033 [US1] Implement website blocking logic in extension/src/features/blocking/services/blockingService.ts
- [ ] T034 [P] [US1] Create basic authentication UI in client/src/pages/auth/login.tsx
- [ ] T035 [P] [US1] Create user profile page in client/src/pages/profile/profile.tsx
- [ ] T036 [US1] Implement API client integration in extension/src/shared/api/blocklistApi.ts
- [ ] T037 [US1] Add subdomain blocking support (*.facebook.com) in extension blocking service
- [ ] T038 [US1] Create extension installation and setup flow in extension/src/pages/onboarding/

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Time-Based Scheduling (Priority: P2)

**Goal**: Users can configure work hours when blocking should be active

**Independent Test**: Set blocking schedule for 9 AM - 5 PM weekdays, verify sites blocked during work hours, accessible outside

### Implementation for User Story 2

- [ ] T039 [P] [US2] Create Schedule entity in server/src/entities/schedule/schedule.entity.ts
- [ ] T040 [P] [US2] Create ScheduleSession entity in server/src/entities/schedule/schedule-session.entity.ts
- [ ] T041 [US2] Implement ScheduleService in server/src/entities/schedule/schedule.service.ts
- [ ] T042 [US2] Implement schedule endpoints in server/src/features/schedule/schedule.controller.ts
- [ ] T043 [P] [US2] Create schedule configuration UI in extension/src/features/scheduling/components/ScheduleManager.tsx
- [ ] T044 [P] [US2] Create time picker components in extension/src/shared/ui/TimePicker.tsx
- [ ] T045 [US2] Implement schedule evaluation logic in extension/src/features/scheduling/services/scheduleService.ts
- [ ] T046 [US2] Integrate schedule checking with blocking service in extension/src/features/blocking/services/blockingService.ts
- [ ] T047 [P] [US2] Create schedule management page in client/src/pages/schedules/schedules.tsx
- [ ] T048 [US2] Add schedule validation and conflict detection in server/src/entities/schedule/
- [ ] T049 [US2] Implement timezone handling for schedule evaluation in extension scheduling service
- [ ] T050 [US2] Add schedule status display in extension popup UI

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Temporary Disable Override (Priority: P3)

**Goal**: Users can temporarily disable blocking for legitimate access needs

**Independent Test**: Activate "disable for 15 minutes", access blocked sites, verify auto-reactivation

### Implementation for User Story 3

- [ ] T051 [P] [US3] Create override session storage in extension/src/features/override/storage/overrideStorage.ts
- [ ] T052 [P] [US3] Create temporary disable UI in extension/src/features/override/components/DisableControls.tsx
- [ ] T053 [US3] Implement override timer logic in extension/src/features/override/services/overrideService.ts
- [ ] T054 [US3] Integrate override checking with blocking service in extension/src/features/blocking/services/blockingService.ts
- [ ] T055 [P] [US3] Add override duration selection (5min, 15min, 1hour) in extension disable UI
- [ ] T056 [US3] Implement auto-reactivation with Chrome alarms API in extension service worker
- [ ] T057 [P] [US3] Create override status indicator in extension popup
- [ ] T058 [US3] Add override session tracking for analytics in extension/src/features/override/
- [ ] T059 [P] [US3] Create override history display in client/src/pages/usage/overrides.tsx

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Usage Analytics and Insights (Priority: P4)

**Goal**: Users can view analytics about their browsing habits and productivity improvements

**Independent Test**: Use extension for several days, verify analytics show blocked attempts and time savings

### Implementation for User Story 4

- [ ] T060 [P] [US4] Create AnalyticsEvent entity in server/src/entities/analytics/analytics-event.entity.ts
- [ ] T061 [US4] Implement AnalyticsService in server/src/entities/analytics/analytics.service.ts
- [ ] T062 [US4] Implement analytics endpoints in server/src/features/analytics/analytics.controller.ts
- [ ] T063 [P] [US4] Create analytics tracking in extension/src/features/analytics/services/analyticsService.ts
- [ ] T064 [P] [US4] Create analytics dashboard in client/src/pages/analytics/analytics.tsx
- [ ] T065 [P] [US4] Create analytics charts components in client/src/features/analytics/components/
- [ ] T066 [US4] Implement event batching and offline queue in extension analytics service
- [ ] T067 [US4] Add analytics data aggregation queries in server analytics service
- [ ] T068 [P] [US4] Create analytics privacy controls in client/src/pages/analytics/privacy.tsx
- [ ] T069 [US4] Implement 30-day retention policy with user controls in server analytics service
- [ ] T070 [P] [US4] Create time savings calculation logic in server/src/features/analytics/
- [ ] T071 [P] [US4] Add analytics export functionality in client analytics page
- [ ] T072 [US4] Integrate analytics tracking with all extension blocking actions

**Checkpoint**: At this point, User Stories 1-4 should all work independently with full analytics

---

## Phase 7: User Story 5 - Organization Admin Dashboard (Priority: P5)

**Goal**: Organization admins can manage company-wide policies and view team insights

**Independent Test**: Create organization account, set company policies, verify they override personal settings

### Implementation for User Story 5

- [ ] T073 [P] [US5] Create Organization entity in server/src/entities/organization/organization.entity.ts
- [ ] T074 [P] [US5] Create OrganizationMember entity in server/src/entities/organization/organization-member.entity.ts
- [ ] T075 [US5] Implement OrganizationService in server/src/entities/organization/organization.service.ts
- [ ] T076 [US5] Implement organization endpoints in server/src/features/organization/organization.controller.ts
- [ ] T077 [P] [US5] Create organization admin dashboard in client/src/pages/organization/dashboard.tsx
- [ ] T078 [P] [US5] Create company policy management UI in client/src/features/organization/components/PolicyManager.tsx
- [ ] T079 [US5] Implement policy override logic in extension blocking service
- [ ] T080 [US5] Add organization policy sync in extension/src/features/organization/services/policySync.ts
- [ ] T081 [P] [US5] Create team analytics aggregation in server/src/features/analytics/team-analytics.service.ts
- [ ] T082 [P] [US5] Create team insights dashboard in client/src/pages/organization/insights.tsx
- [ ] T083 [US5] Implement policy conflict resolution (company always overrides personal)
- [ ] T084 [P] [US5] Create organization member management in client/src/features/organization/components/MemberManager.tsx
- [ ] T085 [US5] Add organization authentication and role-based access control

**Checkpoint**: At this point, User Stories 1-5 should work with full organization support

---

## Phase 8: User Story 6 - Cross-Device Synchronization (Priority: P6)

**Goal**: Users can sync blocklist and preferences across all their devices

**Independent Test**: Add website to blocklist on device A, verify it automatically appears blocked on devices B and C

### Implementation for User Story 6

- [ ] T086 [US6] Implement real-time sync logic in server/src/features/sync/sync.service.ts
- [ ] T087 [US6] Create sync endpoints in server/src/features/sync/sync.controller.ts
- [ ] T088 [P] [US6] Implement extension sync client in extension/src/features/sync/services/syncService.ts
- [ ] T089 [US6] Add conflict resolution for concurrent changes in server sync service
- [ ] T090 [P] [US6] Create sync status indicator in extension popup
- [ ] T091 [US6] Implement incremental sync with timestamps in extension sync service
- [ ] T092 [US6] Add sync error handling and retry logic in extension
- [ ] T093 [P] [US6] Create sync settings page in client/src/pages/sync/sync-settings.tsx
- [ ] T094 [US6] Implement offline-first sync with local queue in extension
- [ ] T095 [US6] Add sync diagnostics and troubleshooting in client sync settings

**Checkpoint**: All user stories should now be independently functional with cross-device sync

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T096 [P] Create comprehensive API documentation in server/docs/api.md
- [ ] T097 [P] Add comprehensive error handling across all tiers
- [ ] T098a [P] Implement JWT authentication with 15-minute access tokens and 7-day refresh tokens in server/src/shared/auth/
- [ ] T098b [P] Configure TLS 1.3 encryption and HTTPS enforcement in server/src/shared/security/
- [ ] T098c [P] Add AES-256 database encryption at rest and in-transit security in server/prisma/
- [ ] T098d [P] Implement API rate limiting (100 req/min per user, 1000/min per org) in server/src/shared/guards/
- [ ] T099 [P] Create extension store assets (icons, screenshots) in extension/assets/
- [ ] T100 [P] Add performance monitoring and metrics collection
- [ ] T101 [P] Create deployment documentation in docs/deployment.md
- [ ] T102 Run quickstart.md validation and end-to-end testing
- [ ] T103 [P] Create Chrome Web Store listing materials
- [ ] T104 [P] Implement data backup and export features
- [ ] T105 [P] Add accessibility improvements across all UI components

### Success Criteria Validation (Quality Assurance)

- [ ] T106 [SC-001] Validate 5-second blocklist addition timing in extension/tests/performance/blocklist-timing.test.ts
- [ ] T107 [SC-002] Validate 2-second extension startup performance in extension/tests/performance/startup-timing.test.ts  
- [ ] T108 [SC-003] Validate 95% blocking success rate in extension/tests/performance/blocking-accuracy.test.ts
- [ ] T109 [SC-004] Validate 3-minute schedule configuration UX in client/tests/e2e/schedule-usability.test.ts
- [ ] T110 [SC-005] Validate 30-second cross-device sync timing in tests/integration/sync-performance.test.ts
- [ ] T111 [SC-006] Validate 24-hour analytics availability in server/tests/performance/analytics-latency.test.ts
- [ ] T112 [SC-007] Validate <50MB extension memory usage in extension/tests/performance/memory-usage.test.ts
- [ ] T113 [SC-008] Validate 99.9% temporary disable timer accuracy in extension/tests/performance/timer-accuracy.test.ts
- [ ] T114 [SC-009] Validate 1000+ user organization dashboard performance in client/tests/load/dashboard-scalability.test.ts
- [ ] T115 [SC-010] Validate 90% user setup completion in 2 minutes in tests/e2e/onboarding-success-rate.test.ts

### Productivity Tips Implementation

- [ ] T116 [P] Create tip content management system with CRUD operations in server/src/features/tips/
- [ ] T117 [US1] Implement tip rotation algorithm with daily rotation and user feedback in extension/src/features/blocking/services/tipService.ts
- [ ] T118 [P] Build tip curation admin interface for quarterly updates in client/src/pages/admin/tips.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5 → P6)
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Integrates with US1 blocking service but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US1 blocking service but independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Tracks events from US1-3 but independently testable
- **User Story 5 (P5)**: Can start after Foundational (Phase 2) - Uses US1 blocklist structure but independently testable
- **User Story 6 (P6)**: Can start after Foundational (Phase 2) - Syncs US1-5 data but independently testable

### Within Each User Story

- Entity models before services that depend on them
- Services before controllers that use them
- API endpoints before frontend/extension clients
- Core implementation before integration points
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Entity models within a story marked [P] can run in parallel
- UI components within a story marked [P] can run in parallel
- Different tiers (server/client/extension) can often work in parallel within a story

---

## Parallel Example: User Story 1

```bash
# Launch all entity models for User Story 1 together:
Task: "Create User entity in server/src/entities/user/user.entity.ts"
Task: "Create Blocklist entity in server/src/entities/blocklist/blocklist.entity.ts"
Task: "Create Website entity in server/src/entities/website/website.entity.ts"

# Launch all security tasks together:
Task: "Implement JWT authentication with 15-minute access tokens in server/src/shared/auth/"
Task: "Configure TLS 1.3 encryption and HTTPS enforcement in server/src/shared/security/"
Task: "Add AES-256 database encryption at rest in server/prisma/"
Task: "Implement API rate limiting in server/src/shared/guards/"

# Launch all tip-related tasks together:
Task: "Create tip content management system in server/src/features/tips/"
Task: "Build tip curation admin interface in client/src/pages/admin/tips.tsx"

# Launch all UI components for User Story 1 together:
Task: "Create extension popup UI in extension/src/pages/popup/popup.tsx"
Task: "Create extension blocklist management in extension/src/features/blocking/components/BlocklistManager.tsx"
Task: "Create blocking page template in extension/public/blocked.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (3-tier project structure)
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Basic Website Blocking)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Package extension and deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Three-tier foundation ready
2. Add User Story 1 → Test independently → Package extension (MVP!)
3. Add User Story 2 → Test independently → Release v1.1
4. Add User Story 3 → Test independently → Release v1.2
5. Add User Story 4 → Test independently → Release v1.3 (Analytics)
6. Add User Story 5 → Test independently → Release v2.0 (Enterprise)
7. Add User Story 6 → Test independently → Release v2.1 (Sync)
8. Polish Phase → Security hardening and performance validation → Release v2.2 (Production-Ready)
9. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Basic Blocking)
   - Developer B: User Story 2 (Scheduling)
   - Developer C: User Story 4 (Analytics)
3. Stories complete and integrate independently

---

## Task Summary

- **Total Tasks**: 121
- **Setup Phase**: 8 tasks
- **Foundational Phase**: 12 tasks (BLOCKING)
- **User Story 1 (P1)**: 19 tasks - Basic Website Blocking 🎯 MVP (includes T117)
- **User Story 2 (P2)**: 12 tasks - Time-Based Scheduling
- **User Story 3 (P3)**: 9 tasks - Temporary Disable Override
- **User Story 4 (P4)**: 13 tasks - Usage Analytics and Insights
- **User Story 5 (P5)**: 13 tasks - Organization Admin Dashboard
- **User Story 6 (P6)**: 10 tasks - Cross-Device Synchronization
- **Polish Phase**: 25 tasks (includes security expansion, tips implementation, and success criteria validation)

**Parallel Opportunities**: 50+ tasks marked [P] for concurrent execution  
**MVP Scope**: Phases 1-3 (39 tasks) deliver a functional website blocker extension with tip rotation  
**Enterprise Ready**: Phases 1-7 (95 tasks) include full organization features  
**Complete Feature**: All 121 tasks implement the full specification with validated success criteria and detailed security

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability  
- Each user story should be independently completable and testable
- Three-tier architecture allows frontend and backend work to proceed in parallel
- Extension can work offline after initial setup, making it resilient to backend issues
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence