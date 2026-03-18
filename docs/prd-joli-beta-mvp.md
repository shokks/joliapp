# Joli Beta MVP — Product Requirements Document

## Why Are We Building This?

Working parents carry critical family admin in their heads because school messages, appointments, forms, RSVPs, and deadlines arrive across fragmented channels. Joli beta exists to prove that one focused mobile product can reduce that mental load by extracting what matters from Klapp messages, surfacing only actionable and useful items, and notifying parents at the right time without creating more noise.

The expected value in beta is simple: a parent connects Klapp once, sees the important tasks and upcoming events in one calm dashboard, trusts the extraction enough to act from Joli, and feels that fewer things are at risk of falling through.

## Goals

- Let a parent connect their Klapp account and complete first sync in one onboarding flow.
- Extract high-confidence `action` and `fyi` items from Klapp messages and PDF attachments.
- Show extracted items in a native mobile dashboard with the three core sections from the product spec.
- Let parents open an item detail view, review the supporting message context, and manage action items.
- Send native push notifications only for new action items and deadline reminder windows.
- Validate with beta users that Joli feels trustworthy, useful, and lighter-weight than checking raw messages.

## User Stories

- As a working parent, I want to connect Klapp once so I do not need to manually check every school message.
- As a working parent, I want Joli to show me only what needs action so I can focus on today’s important tasks.
- As a working parent, I want to see upcoming school and family events without opening a calendar or inbox.
- As a working parent, I want to inspect the exact source message and highlighted evidence so I can trust what Joli extracted.
- As a working parent, I want to mark something done or snooze it so the dashboard stays current.
- As a working parent, I want timely push reminders before deadlines so important family admin does not slip.

## Functional Requirements

1. The system must allow a parent to sign up with email.
2. The system must detect device locale during onboarding and default the app language to English or German accordingly.
3. The system must allow the parent to connect a Klapp account using email and password.
4. The system must exchange Klapp credentials for a `refresh_token` using `POST /v2/authenticate` and must not store the raw password after token exchange.
5. The system must store the Klapp `refresh_token` encrypted at rest.
6. The system must trigger the first Klapp sync immediately after account connection and show blocking progress feedback until the first items are ready or the sync fails.
7. The system must poll Klapp every 30 minutes for new messages using the required Klapp headers from the spec.
8. The system must track `lastSyncAt` per user and only process messages newer than the last successful sync.
9. The system must fetch full message detail for each relevant Klapp message before extraction.
10. The system must read the message body from `replies[0].body`.
11. The system must include PDF attachments in extraction input and ignore non-PDF attachments in beta.
12. The system must send the message body and PDF attachment content to the extraction pipeline in one request.
13. The system must create zero or more items per message based on the extraction rules in the spec.
14. The system must create only `action` or `fyi` item types.
15. The system must skip extraction when confidence is low, when content is pure noise, or when the action is already completed in the message context.
16. The system must apply the RSVP split rule and create both an `action` item and an `fyi` item when an RSVP deadline and event date are both present.
17. The system must store each extracted item with the fields defined in the spec: `id`, `userId`, `type`, `title`, `date`, `status`, `snoozedUntil`, `sourceMessageId`, `evidenceSnippet`, `createdAt`, and `updatedAt`.
18. The system must localize UI strings, item titles, and notification copy to English or German based on the user’s preferred language.
19. The system must always store and display `evidenceSnippet` in original German.
20. The dashboard must show `action` items with `status: open` under `Needs your attention`, ordered by earliest date first and undated items last.
21. The dashboard must show `fyi` items dated within the next 14 days under `Coming up`, ordered by date.
22. The dashboard must show completed `action` items under `Taken care of`, most recent first, capped at 10 items.
23. The dashboard must hide `Coming up` when there are no qualifying FYI items.
24. The dashboard must hide `Taken care of` when there are no completed action items.
25. The dashboard must show the empty-state message “Nothing needs your attention right now.” when there are no open action items.
26. Each item card on the dashboard must show a due label, item title, and source line.
27. Tapping an item card must open an item detail view.
28. The item detail view must show the full item title and date.
29. The item detail view must show the full Klapp message body with extracted sentence(s) highlighted inline.
30. The item detail view must allow due date editing for action items only.
31. The item detail view must allow the parent to mark an action item as done.
32. The item detail view must allow the parent to snooze an action item for 1 day, 3 days, or 1 week.
33. Marking an action item done must move it to `Taken care of`.
34. Snoozing an action item must set `status` to `snoozed`, set `snoozedUntil`, and remove it from active notification eligibility until snooze expiry.
35. The system must send native push notifications for each new action item.
36. The system must send additional push notifications 48 hours, 24 hours, and 12 hours before an action item deadline, if the item is still eligible.
37. The system must never notify for FYI items.
38. The system must never notify for action items that are done or snoozed.
39. The system must deduplicate push notifications using an idempotency key per item and notification window.
40. Push notifications must deep link directly to the relevant item detail view.
41. If Klapp returns `401`, the system must flag the account as disconnected and notify the parent to reconnect.
42. The app must support beta distribution via TestFlight on iOS and EAS Internal Distribution on Android.

## Non-Goals (Out of Scope)

- Providers other than Klapp
- Non-PDF attachment extraction
- WhatsApp notifications
- Calendar integrations or `.ics` export
- Confidence tiers or a “Needs review” queue
- Multi-child or multi-account support
- Sharing items with a partner
- In-app replying to Klapp messages
- Public App Store or Play Store launch flows
- Home screen widgets
- French localisation

## Design Considerations

- The product surface must feel calm, focused, and action-first rather than inbox-like.
- The dashboard must keep the three-section hierarchy from the spec: `Needs your attention`, `Coming up`, `Taken care of`.
- The dashboard card should stay lightweight, with evidence shown on tap in detail rather than directly on the card.
- The item detail view is the trust surface: it should make the extracted evidence easy to verify.
- Onboarding should feel short and direct: sign up, connect Klapp, wait for first sync, land on the dashboard.

## Technical Considerations

- Use the existing Expo app as the native beta client surface.
- The beta should prioritize the happy path and avoid over-engineered abstractions, following the MVP lesson from `~/.factory/lessons.md`.
- The PRD keeps a strong why-first framing based on the goal clarity lesson from `~/.factory/lessons.md`.
- Secure token storage is required because Klapp refresh tokens are sensitive credentials.
- The extraction pipeline must support message body plus PDF attachment input in one call.
- Push notifications and deep linking are core product requirements, not post-beta enhancements.
- The data model should stay intentionally simple: one `date` field, one `type` field, and minimal item state.

## Success Metrics (Real User Feedback)

- At least 3 beta users complete onboarding, connect Klapp, and reach a populated dashboard without asking for help.
- At least 3 beta users report that the extracted items match what they would have manually tracked from the same messages.
- At least 3 beta users successfully open an item detail view, review evidence, and mark an item done or snooze it.
- At least 3 beta users receive push notifications at the right time and return to the app from those notifications.
- At least 2 beta users explicitly say Joli reduces the mental load of keeping up with family admin.

## Open Questions

- Which backend stack will own user accounts, encrypted token storage, sync scheduling, and extraction orchestration?
- What exact highlighting treatment should be used in the detail view when the evidence snippet spans multiple non-contiguous parts of the message?
- How should the app behave when first sync succeeds technically but produces zero items?
- What reconnect UX should be shown when Klapp authentication expires or fails with `401`?
- How much manual observability or admin tooling is needed during beta to review sync and extraction failures?
