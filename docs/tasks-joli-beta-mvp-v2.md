## Relevant Files

- `App.tsx` - Root Expo shell that may need routing or provider adjustments for the new signed-in flow.
- `app/(app)/*` or existing route files - Likely home for the authenticated `Firehose`, dashboard, settings, and item-detail route changes.
- `src/screens/onboarding/*` - Existing onboarding screens that need to be reduced to Clerk-first account creation and locale defaults.
- `src/screens/firehose/*` - Likely new home for the `Firehose` organizing surface and its connection/sync states.
- `src/screens/dashboard/*` - Existing task-first dashboard that should become the post-extraction destination.
- `src/screens/settings/*` - Existing settings surface that should support reconnecting channels and exposing connection state.
- `src/lib/state/app-context.tsx` - Current app state boundary that may need to split auth/setup/raw-sync/extraction/dashboard readiness states.
- `src/lib/klapp/*` - New Klapp auth, fetch, and sync client logic for real provider connection.
- `src/lib/extraction/*` - New extraction orchestration, prompt formatting, schema validation, and retry logic.
- `src/lib/storage/*` - Secure token storage and any lightweight local persistence helpers used during transition states.
- `src/types/domain.ts` - Core domain types already started for sessions, Klapp messages, extracted items, and sync state.
- `convex/**` - Convex functions, schema, and scheduling logic for raw sync, storage, extraction orchestration, and reconnect state.
- `docs/spec.md` - Source spec for the Firehose transition and staged sync/extraction flow.
- `docs/decisions.md` - Product decision log for Firehose, connection verification, retries, and prompt strategy.
- `docs/prd-joli-beta-mvp-v2.md` - Transition PRD that this task list implements.
- `docs/roadmap.md` - Roadmap row that should track the v2 task file status.

### Notes

- This v2 task list is additive and should not overwrite the original `tasks-joli-beta-mvp.md` history.
- The highest-value path is: preserve existing frontend surfaces, add Firehose, prove raw Klapp access, then wire extraction and transition into the existing dashboard.
- ParentBox should inform architecture and prompt evaluation, but not be copied one-to-one.
- Unit tests should live next to the logic they validate when test infrastructure is added.
- Every parent task must stay on its own dedicated branch from start to finish.
- After each sub-task, pause and ask the user whether to move forward before starting the next sub-task.
- After each parent task, pause for user confirmation before committing or moving on.
- Keep every parent task branch after merge unless the user explicitly asks to delete it.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`.

Update the file after completing each sub-task, not just after completing an entire parent task.

After each sub-task completion, run the most relevant tests/validation for that sub-task, then mark it completed immediately.

Before starting the next sub-task, ask the user whether to move forward.

Do not proceed to the next parent task until the user confirms the current parent task works.

Do not commit a parent task branch until its final verification step has been completed and the user confirms everything is fine.

After the user confirms a parent task works, ask whether they want that branch merged back to `main` before doing the merge.

## Development Workflow Guidance

### Branch Strategy

Every parent task should be developed on its own dedicated feature branch, never directly on `main`.

- Required naming format: `feature/[parent-task-number]-[short-description]`
- Create a new branch for every parent task, for example `feature/1-0-firehose-entry` and `feature/2-0-klapp-raw-sync`
- Do not reuse a branch across multiple parent tasks
- Complete the full sub-task sequence and verification for that parent task on the same branch before any commit/merge decision is made
- After approval, merge the branch back to `main` and keep the local branch instead of deleting it unless the user explicitly asks otherwise

### Task Execution Contract

For every parent task in this file, follow this exact sequence:

1. Create and stay on that parent task's dedicated branch
2. Complete one sub-task
3. Test or validate that sub-task immediately
4. Tick that sub-task off immediately
5. Ask the user whether to move to the next sub-task
6. After the parent task's final verification step passes, ask the user to confirm the whole parent task works
7. Only after user confirmation, finish the commit step for that branch
8. Ask the user whether they want the branch merged back to `main`

### Frontend-First Development Approach

For this transition feature, preserve and adapt the existing frontend first, then implement the real backend/sync logic, then wire the preserved dashboard to real data.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for the transition task planning and first implementation slice (e.g. `git checkout -b feature/0-firehose-transition`) (~30 min)
  - [ ] 0.2 Verify: The v2 transition work is isolated on its own branch and can proceed without disturbing the original task history (~30 min)

- [ ] 1.0 Replace onboarding-to-Klapp flow with Clerk-first entry into `Firehose`
  - [ ] 1.1 Audit the existing onboarding, auth, and route flow to identify exactly which current screens remain, move, or shrink under the new Firehose model (~30 min)
  - [ ] 1.2 Refactor onboarding so it handles Joli account creation and locale defaults only, without requesting Klapp credentials in that initial flow (~1-2 hrs)
  - [ ] 1.3 Add the authenticated route handoff so newly signed-in users land in `Firehose` instead of going straight to the current dashboard/onboarding continuation (~1-2 hrs)
  - [ ] 1.4 Verify: A newly signed-in user can reach `Firehose` without seeing Klapp credential entry inside onboarding (~30 min)

- [ ] 2.0 Build the `Firehose` setup/sync surface and channel connection states
  - [ ] 2.1 Create the `Firehose` screen structure and copy that explains Joli is organizing inbound family-admin communication, with Klapp as the first channel (~1-2 hrs)
  - [ ] 2.2 Implement Firehose states for no channel connected, connecting, raw sync in progress, sync succeeded, sync succeeded with zero extracted items, and reconnect required (~half day)
  - [ ] 2.3 Add clear but calm progress/status UI that proves raw message access is working without turning Firehose into a general-purpose message feed (~1-2 hrs)
  - [ ] 2.4 Verify: Firehose communicates the staged flow (connect -> sync -> organize) clearly on device-sized layouts and does not feel like a message inbox (~30 min)

- [ ] 3.0 Implement real Klapp connection verification and raw message sync before extraction
  - [ ] 3.1 Implement the Klapp authentication client contract using `POST /v2/authenticate` and the required request headers, scoped to the post-signup Firehose flow (~1-2 hrs)
  - [ ] 3.2 Implement message list and message detail fetchers using the Klapp endpoints from the spec, including the detail-fetch connection gate (~1-2 hrs)
  - [ ] 3.3 Add sync orchestration that tracks `lastSyncAt`, fetches only new messages, stores raw sync state separately from extraction state, and handles first sync separately from incremental syncs (~half day)
  - [ ] 3.4 Add disconnected-account handling for Klapp `401` responses and surface reconnect-required state to Firehose and settings (~1 hr)
  - [ ] 3.5 Verify: A connected user can complete real token exchange, message-list fetch, and detail fetch before extraction begins (~30 min)

- [ ] 4.0 Implement extraction orchestration and transition from `Firehose` to the real dashboard
  - [ ] 4.1 Implement PDF attachment inclusion and non-PDF skipping behavior for extraction input (~1-2 hrs)
  - [ ] 4.2 Implement extraction request/response normalization that enforces the `action`/`fyi` model, RSVP split rule, and balanced precision/recall prompt strategy (~half day)
  - [ ] 4.3 Add silent-first extraction retry behavior and clear internal state boundaries between raw sync success and extraction success (~1-2 hrs)
  - [ ] 4.4 Replace mock dashboard sourcing with real persisted item queries while preserving the existing dashboard structure and item-detail trust surface (~half day)
  - [ ] 4.5 Verify: After Firehose sync and extraction succeed, the user transitions smoothly into the real dashboard with correctly shaped items (~30 min)

- [ ] 5.0 Adapt reconnect, zero-item, and persistence flows around the new architecture
  - [ ] 5.1 Add item persistence and retrieval helpers for open, done, and snoozed items using the chosen beta storage strategy (~1-2 hrs)
  - [ ] 5.2 Define and implement the zero-extracted-items state so a technically successful sync does not feel like a product failure (~1 hr)
  - [ ] 5.3 Update settings and any existing connection UI so reconnect flows route back into Firehose/channel setup cleanly (~1 hr)
  - [ ] 5.4 Connect item actions (done, snooze, due-date edit) to real persistence updates and refresh the dashboard sections accordingly (~1-2 hrs)
  - [ ] 5.5 Verify: Reconnect, zero-item, done, snoozed, and due-date flows all work correctly within the Firehose-to-dashboard architecture (~30 min)

- [ ] 6.0 Verify the end-to-end Firehose transition and refresh planning artifacts
  - [ ] 6.1 Build a prompt-evaluation fixture set informed by ParentBox learnings but adapted to Joli’s narrower scope (~1-2 hrs)
  - [ ] 6.2 Run device-level validation of the happy path: Clerk auth -> Firehose -> Klapp connect -> raw sync -> extraction -> dashboard (~half day)
  - [ ] 6.3 Run the project validators and any targeted tests for sync logic, extraction normalization, and navigation state (~1-2 hrs)
  - [ ] 6.4 Refresh `docs/tasks-joli-beta-mvp-v2.md`, `docs/roadmap.md`, and any related planning notes to reflect actual implementation status (~30 min)
  - [ ] 6.5 Verify: The v2 transition is documented accurately and the end-to-end flow works as intended for beta (~30 min)
