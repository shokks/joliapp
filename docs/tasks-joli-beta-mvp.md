## Relevant Files

- `App.tsx` - Current Expo shell that will evolve from a static mock into the first native beta surface.
- `app.json` - Expo app configuration for app identity, deep linking, and beta distribution setup.
- `package.json` - Scripts and app dependencies for the Expo client.
- `index.ts` - Expo entry point for the app.
- `docs/spec.md` - Source product spec that defines the beta scope.
- `docs/decisions.md` - Product decisions log that should be consulted whenever implementation details or scope choices are unclear.
- `docs/prd-joli-beta-mvp.md` - PRD describing the full beta MVP goals and requirements.
- `docs/roadmap.md` - Roadmap row that tracks spec, PRD, tasks, and status.
- `src/screens/onboarding/*` - Likely home for sign-up, Klapp connect, and first-sync screens.
- `src/screens/dashboard/*` - Likely home for dashboard sections and item detail screens.
- `src/components/*` - Shared UI building blocks for cards, buttons, section headers, and states.
- `src/lib/i18n/*` - Locale detection and string management for English and German.
- `src/lib/items/*` - Item shaping, grouping, sorting, and formatting utilities.
- `src/lib/notifications/*` - Push notification registration, scheduling, and deep-link handling.
- `src/lib/klapp/*` - Klapp auth, sync, and message parsing client logic.
- `src/lib/storage/*` - Secure token storage and local persistence helpers.
- `src/lib/extraction/*` - Extraction pipeline adapters, prompt formatting, and output validation.
- `src/types/*` - Shared types for items, messages, auth state, and app flows.
- `src/**/*.(test|spec).ts(x)` - Unit tests for critical item logic, extraction normalization, and app helpers.

### Notes

- No project-specific lessons file exists yet, so task structure only incorporates lessons from `~/.factory/lessons.md`.
- The task order follows MVP-first and frontend-first guidance: prove the core user value early, then add backend and notification wiring.
- Unit tests should live next to the code they validate when test infrastructure is added.
- Refer back to `docs/decisions.md` during implementation whenever a task touches product behavior, scope boundaries, notification behavior, dashboard structure, or trust/evidence UX.
- Each parent task must run on its own dedicated feature branch and never share a branch with another parent task.
- Each parent task must be fully tested before review, including frontend/device validation wherever that task affects the user surface.
- Only tick a parent task after the user confirms it works, the branch is merged back to `main`, and all of its sub-tasks are already ticked.
- Keep every local task branch after merge so it remains available if we need to revert or compare later.
- Tick each sub-task immediately when it is completed; never wait until the end of the parent task to update checkboxes.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Update the file after completing each sub-task, not just after completing an entire parent task.

After each sub-task completion, run the most relevant tests/validation for that sub-task, then mark it completed.

Do not proceed to the next parent task until the user confirms the current task works.

Do not mark a parent task complete until:

- every sub-task beneath it has been checked off
- the task has been fully tested
- the user has confirmed the task works
- the branch has been merged back to `main`

Keep the local task branch after merge.

## Development Workflow Guidance

### Branch Strategy

Every parent task should be developed on its own dedicated feature branch, never directly on `main`.

- Required naming format: `feature/[parent-task-number]-[short-description]`
- Create a new branch for every parent task, for example `feature/1-0-app-shell` and `feature/2-0-onboarding-klapp`
- Do not reuse a branch across multiple parent tasks
- After approval, merge the branch back to `main` and keep the local branch instead of deleting it

### Frontend-First Development Approach

For this feature, build the mobile UI and flows with mock or fixture data first, then implement Klapp/extraction/backend logic, then wire the app to real data and notifications.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for task planning and the first implementation slice (e.g. `git checkout -b feature/0-setup-and-navigation`) (~30 min)
  - [x] 0.2 Confirm branch naming convention for all remaining parent tasks in this file before implementation starts (~30 min)
  - [x] 0.3 Verify: Branch workflow is documented and a feature branch can be created for each parent task without ambiguity (~30 min)
- [x] 1.0 Build the core app structure and navigation shell
  - [x] 1.1 Create the app folder structure for screens, components, lib, and types so the Expo project is ready for multi-screen development (~30 min)
  - [x] 1.2 Add app navigation with the minimum route structure for onboarding, dashboard, item detail, and settings placeholders (~1-2 hrs)
  - [x] 1.3 Move the current single-screen shell into reusable layout and screen components instead of one monolithic `App.tsx` (~1-2 hrs)
  - [x] 1.4 Create shared design primitives for section headers, cards, buttons, spacing, and typography that match the calm Joli visual direction (~1-2 hrs)
  - [x] 1.5 Add app-level state boundaries for auth/session, locale, and item data using the simplest viable pattern (~1-2 hrs)
  - [x] 1.6 Verify: The app can navigate between placeholder onboarding, dashboard, item detail, and settings screens on a device without crashes (~30 min)
- [ ] 2.0 Implement onboarding, locale selection defaults, and Klapp connect flow
  - [x] 2.1 Build email sign-up UI states for beta onboarding, including loading and simple error messaging (~1-2 hrs)
  - [x] 2.2 Detect the device locale on first launch and default the app language to English or German, with a settings override placeholder (~1 hr)
  - [x] 2.3 Build the Klapp connect screen with email/password inputs, submit state, and copy that explains what connection enables (~1-2 hrs)
  - [x] 2.4 Implement secure refresh-token storage behavior and the client-side auth handoff contract for Klapp connection (~1-2 hrs)
  - [x] 2.5 Create the first-sync loading experience that blocks forward progress until sync completes, fails, or returns zero items (~1 hr)
  - [x] 2.6 Add explicit onboarding error states for invalid credentials, connection failure, and disconnected-account recovery entry points (~1 hr)
  - [x] 2.7 Verify: A beta user can complete onboarding from launch through Klapp connect and reach the post-sync state in both English and German flows (~30 min)
- [ ] 3.0 Build the dashboard, item detail, and action-management experience with mock data
  - [x] 3.1 Create typed mock item fixtures for action, FYI, done, snoozed, and empty-state scenarios (~30 min)
  - [x] 3.2 Implement the `Needs your attention` section with correct ordering, due labels, empty state behavior, and inline quick actions for action items (~1-2 hrs)
  - [x] 3.3 Implement the `Coming up` section with 14-day filtering and hidden-section behavior when no FYI items qualify (~1 hr)
  - [x] 3.4 Implement the `Taken care of` section with most-recent-first ordering and the 10-item cap (~1 hr)
  - [x] 3.5 Build tappable item cards that show due label, title, and source line without surfacing full evidence on the card (~1 hr)
  - [ ] 3.6 Build the item detail screen with title, date, full source message, highlighted evidence snippet, and edit controls for action items (~1-2 hrs)
  - [ ] 3.7 Implement local mock interactions for mark done, snooze for 1 day / 3 days / 1 week, and due-date edits (~1-2 hrs)
  - [ ] 3.8 Add settings placeholders for language override, connection state, and future beta preferences (~30 min)
  - [ ] 3.9 Verify: The dashboard and detail flows work correctly on device for action, FYI, done, snoozed, and empty states with mock data (~30 min)
- [ ] 4.0 Implement Klapp sync, extraction pipeline, and item persistence
  - [ ] 4.1 Define the core TypeScript models for user session, Klapp messages, extracted items, and sync status from the spec (~30 min)
  - [ ] 4.2 Implement the Klapp authentication client contract using `POST /v2/authenticate` and the required request headers (~1-2 hrs)
  - [ ] 4.3 Implement message list and message detail fetchers using the Klapp endpoints from the spec (~1-2 hrs)
  - [ ] 4.4 Add sync orchestration that tracks `lastSyncAt`, fetches only new messages, and handles initial sync separately from incremental syncs (~1-2 hrs)
  - [ ] 4.5 Implement PDF attachment inclusion and non-PDF skipping behavior for beta extraction input (~1-2 hrs)
  - [ ] 4.6 Implement extraction request/response normalization that enforces the `action`/`fyi` model and RSVP split rule (~half day)
  - [ ] 4.7 Add item persistence and retrieval helpers for open, done, and snoozed items using the simplest viable storage strategy for beta (~1-2 hrs)
  - [ ] 4.8 Add disconnected-account handling for Klapp `401` responses and surface reconnect-required state to the app (~1 hr)
  - [ ] 4.9 Verify: Running a sync against test data creates correctly shaped items, ignores unsupported content, and preserves evidence snippets in original German (~30 min)
- [ ] 5.0 Add push notifications, deep linking, and reconnection handling
  - [ ] 5.1 Set up push notification permissions, registration, and app-level token capture for iOS and Android beta builds (~1-2 hrs)
  - [ ] 5.2 Implement notification scheduling rules for new action items and 48h / 24h / 12h deadline windows (~1-2 hrs)
  - [ ] 5.3 Add idempotency handling so the same item/window combination is never notified twice (~1 hr)
  - [ ] 5.4 Implement deep linking from push notifications into the correct item detail screen (~1 hr)
  - [ ] 5.5 Ensure snoozed and done items are excluded from notification eligibility until they become relevant again (~1 hr)
  - [ ] 5.6 Build the disconnected-account and reconnect UX that routes users back into the Klapp connection flow safely (~1 hr)
  - [ ] 5.7 Verify: Notification taps open the correct item, reminder windows fire only when eligible, and reconnect UX appears after forced auth failure (~30 min)
- [ ] 6.0 Wire the app end-to-end with real data and complete beta validation
  - [ ] 6.1 Replace mock dashboard sourcing with real persisted item queries and loading states (~1-2 hrs)
  - [ ] 6.2 Connect onboarding completion to real auth/session state so returning users bypass onboarding appropriately (~1 hr)
  - [ ] 6.3 Connect item actions (done, snooze, due-date edit) to real persistence updates and refresh the dashboard sections accordingly (~1-2 hrs)
  - [ ] 6.4 Add practical logging and debugging surfaces for sync state, extraction failures, and notification state during beta (~1 hr)
  - [ ] 6.5 Run device-level validation of the happy path, empty states, auth failure path, and reconnect path on both iOS and Android where available (~half day)
  - [ ] 6.6 Run the project validators and any targeted tests for critical item logic, extraction normalization, and navigation state (~1-2 hrs)
  - [ ] 6.7 Prepare a beta demo checklist that lets a user verify onboarding, dashboard trust, and notification usefulness before merge (~30 min)
  - [ ] 6.8 Verify: End-to-end beta flow works from Klapp connect through sync, dashboard review, item actions, notification return, and reconnect handling (~30 min)
