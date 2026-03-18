# Joli Beta MVP v2 — Transition PRD

## Why Are We Building This?

Joli now needs a cleaner path from sign-up to real value. The missing piece is not the core task experience itself, but the transition into it: account creation, source connection, proof that message access works, and then AI-powered organization.

This PRD defines that transition clearly. Joli should add the missing operational steps around the existing product foundation: Clerk authentication, the `Firehose` organizing surface, Klapp connection as a post-signup step, raw message verification before AI, and then a smooth handoff into the real dashboard once extraction is working.

The value of this phase is simple: a parent signs in, connects their first inbound channel, sees that Joli can actually access and organize raw messages, and then lands in a calm task-first dashboard they can trust.

## Goals

- Replace the current “Klapp inside onboarding” model with a post-signup `Firehose` flow.
- Define the exact happy path from Clerk auth to Klapp connection to raw sync verification to extraction to dashboard.
- Make Klapp explicitly the first inbound channel, not the permanent only one.
- Add the minimum new surfaces and states needed to support real sync and extraction without turning Joli into a message feed.
- Give Task 4+ a clearer product contract so backend work can proceed without ambiguity.

## User Stories

- As a working parent, I want to create my Joli account first so I do not have to hand over school credentials before I understand the product.
- As a working parent, I want Joli to show me that message access is working before AI starts making claims about what matters.
- As a working parent, I want the first signed-in experience to feel like Joli is taking work off my plate, not like I have to set up another complicated inbox.
- As a working parent, I want Joli to move me naturally from setup into the real task dashboard once it has enough signal to be useful.
- As a working parent, I want the eventual dashboard and item detail experience to stay calm, clear, and trustworthy rather than being replaced by a raw message UI.

## Functional Requirements

1. The system must preserve the current task-first information architecture of settings, dashboard, and item detail unless a change is required by the new real-data flow.
2. The system must allow a parent to sign up or sign in with Clerk before any Klapp credential request is shown.
3. The system must land newly authenticated users on a signed-in surface called `Firehose`.
4. The `Firehose` surface must explain that Joli is organizing incoming family-admin communication and needs a connected source before it can help.
5. The system must support Klapp as the first inbound channel connected from `Firehose`.
6. The product language and architecture must leave room for future channels such as email or WhatsApp without requiring the dashboard model to change.
7. The system must keep Klapp connection out of the initial sign-up form and place it as the next step after Joli auth.
8. The system must exchange Klapp credentials for a `refresh_token` using `POST /v2/authenticate` and must not store the raw password after token exchange.
9. The system must store the Klapp `refresh_token` encrypted at rest.
10. The system must treat connection success as requiring message-detail fetch success, not just token issuance.
11. The `Firehose` surface must show raw sync progress before extraction begins.
12. The system must fetch the message list and message detail from Klapp before any LLM extraction call is made.
13. The system must keep raw sync state distinct from extraction state in both architecture and product logic.
14. The system must sync raw messages and supported attachments into Convex before extraction begins.
15. The system must use Anthropic to process synced message bodies and supported PDF attachments into `action` and `fyi` items.
16. The system must retry extraction silently first when raw sync succeeds but extraction fails.
17. The system must transition the user from `Firehose` to the real dashboard only after extraction completes successfully enough to render the existing task-first experience.
18. The real dashboard must continue to use the three-section structure: `Needs your attention`, `Coming up`, and `Taken care of`.
19. The real dashboard and item detail surfaces must remain the target surfaces for extracted items, with only the minimum necessary adjustments for real data.
20. The system must continue to show evidence on item detail rather than turning `Firehose` into a general-purpose message-reading surface.
21. The system must support zero extracted items after a technically successful sync and define a calm fallback state rather than failing the whole connection flow.
22. The system must support reconnecting a disconnected Klapp account from the `Firehose` or settings surfaces.
23. The system must maintain localization support for English and German throughout the transition flow.

## Non-Goals (Out of Scope)

- Replacing the task-first dashboard with a permanent raw inbox UI
- Supporting multiple real channels in this phase
- Broad archive/search experiences inherited from ParentBox
- Non-PDF attachment extraction
- Public launch concerns beyond the current beta scope

## Design Considerations

- `Firehose` should feel like Joli is quietly taking over the messy inbound stream, not like the user is being dropped into another message app.
- The transition from `Firehose` to dashboard should feel earned: first connection, then proof, then synthesis, then task-first clarity.
- `Firehose` may show status, counts, channel state, and progress, but it should not become a full browsing interface for every raw message.
- The real dashboard remains the primary product surface once useful items exist.

## Technical Considerations

- Use Clerk for auth, Convex EU for persistence/sync/orchestration, and Anthropic for extraction.
- Adjust routing and surfaces around the existing Expo client rather than introducing unnecessary structural churn.
- ParentBox should be used as a source of architectural and prompt-evaluation learnings, not copied literally.
- Keep the system separable into: Joli auth, provider connection, raw sync, extraction, normalized items, and user-facing dashboard.
- This phase should explicitly reduce ambiguity for Task 4 and later task rewriting.

## Success Metrics (Real User Feedback)

- At least 3 beta users can sign in and understand what `Firehose` is for without asking for help.
- At least 3 beta users connect Klapp after sign-up and say the flow feels more natural than entering Klapp credentials during onboarding.
- At least 3 beta users understand from the UI that Joli has successfully accessed their messages before AI extraction begins.
- At least 3 beta users reach the existing dashboard after the `Firehose` flow and feel the transition is smooth rather than confusing.
- At least 2 beta users explicitly say the new flow makes Joli feel more trustworthy.

## Open Questions

- What should the zero-extraction-but-successful-sync state look like inside `Firehose` before or instead of dashboard transition?
- How much raw-message visibility is helpful in `Firehose` without undermining the “tasks, not messages” principle?
- How many silent extraction retries should happen before the user is shown an issue?
- Should `Firehose` remain visible as a destination after setup, or only as an initial/connection-management surface?
