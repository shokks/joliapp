# Joli — Product Spec

**Version:** 0.2
**Date:** 2026-03-17
**Status:** Beta scope

---

## Changelog

- **v0.2** — Simplified task model (one date field, type instead of categories), dropped French for beta, device locale replaces language onboarding step, removed Dismiss action, Coming up redefined as FYI items, RSVP splits into action + FYI pair
- **v0.1** — Initial spec

---

## 1. Problem + User

Working parents carry a second full-time job in their heads — school forms, permission slips, appointments, RSVPs, and deadlines that arrive across multiple channels and require action before a hard date. The cost of missing one is real: a child excluded from a school trip, a missed doctor window, a fine for a late payment. There is no single place where all of this lives, so it lives in the parent's head.

**User:** The default parent in a household — the one who ends up being the family's operating system. Time-poor, attention-scarce, already overwhelmed by notification volume.

---

## 2. Core Flow (Happy Path)

```
1. Parent connects Klapp account (email + password → refresh token)
2. Joli syncs messages periodically (every 30 min)
3. Each new message is passed through the extraction pipeline
4. LLM extracts zero or more items (action or fyi) from the message
5. Action items appear under "Needs your attention", FYI items under "Coming up"
6. Parent receives a native push notification for new action items only
7. Parent opens app, sees task card, and either acts from the dashboard or taps for detail
8. Detail view shows full Klapp message with the extracted sentence highlighted when more context is needed
9. Parent marks action item done / snoozes it from the dashboard or detail view
10. Done items move to "Taken care of"
```

This is the only flow that needs to work for beta.

---

## 3. Data Source

**Provider:** Klapp (`https://api.klapp.mobi`)
**Scope:** Beta — Klapp only.

### Authentication
```
POST /v2/authenticate
Body: { email, password, grant_type: "authenticate" }
Returns: { refresh_token }
```
Store `refresh_token` encrypted at rest. Never store the raw password after token exchange.

Required headers for all subsequent calls:
```
Authorization: Bearer <refresh_token>
App-Version: 4.6.2 (web)
App-Os: web
User-Role: parent
```

### Message Sync
```
POST /v4/messages/parent?include_drafts=true   → list of message metadata
GET  /v4/messages/{messageId}/parent            → full message detail
```

Message body lives in `replies[0].body`. Attachments in `replies[0].files[]` with `file_name` and `file_draft_id`.

### Sync Schedule
- Poll every 30 minutes via scheduled job
- Track `lastSyncAt` per user; only fetch messages with `sentAt > lastSyncAt`
- On 401: flag account as disconnected, notify user to reconnect

### Attachments
Download PDF attachments and include them in the extraction call via Claude's native PDF support. Base64-encode the file and attach as a `document` content block alongside the message body — Claude reads both in a single call. Skip non-PDF attachments for beta.

---

## 4. Task Model

```ts
type Item = {
  id: string;
  userId: string;
  type: "action" | "fyi";
  title: string;               // In user's preferred language
  date: Date | null;           // action: when parent must act by. fyi: when the event happens
  status: "open" | "done" | "snoozed";
  snoozedUntil: Date | null;   // action items only
  sourceMessageId: string;     // Link back to the Klapp message
  evidenceSnippet: string;     // The original German sentence(s) that produced this item
  createdAt: Date;
  updatedAt: Date;
};
```

**One date field for everything.** For action items, `date` is the deadline. For FYI items, `date` is when the event happens. The title carries any additional context (e.g. "RSVP for Science Museum trip — due Friday").

---

## 5. Extraction Rules

The LLM receives the full message body (German) + any PDF attachments and outputs items in the user's preferred language.

**Extract an `action` item when:**
- There is a clear action the parent must take (sign, pay, reply, bring, book)
- Confidence is high — if unsure, skip it entirely

**Extract a `fyi` item when:**
- The message contains an event or date a parent should know about (test, class photo, trip, school event)
- No action is required from the parent

**Do not extract when:**
- The message is pure noise (general newsletter content, no event or deadline)
- The action is already confirmed as done in the message context

**RSVP rule — always split into two items:**
When a message contains an RSVP deadline AND an event date, extract both:
1. `action` — "RSVP for Science Museum trip — due [RSVP deadline]"
2. `fyi` — "Science Museum trip — [event date]"

**Per item output:**
```ts
{
  type: "action" | "fyi";
  title: string;               // Specific — include child name, event, subject where available
  date: string | null;         // ISO date string or null
  evidenceSnippet: string;     // Original German sentence(s) that justify this item
}
```

**Prompt principles:**
- Output language = user's preferred language (EN / DE)
- Evidence snippet always in original German regardless of output language
- One message can produce zero or multiple items
- Titles must be specific — "Sign permission slip — Science Museum trip" not "Sign form"

---

## 6. Notification Rules

**Channel:** Native push (TestFlight on iOS, EAS Internal Distribution on Android for beta).

**Notify on:**
1. New `action` item created
2. Deadline window: 48h / 24h / 12h before `date` on action items

**Never notify on:**
- FYI items
- Action items already marked done or snoozed
- Duplicate triggers (idempotency key per item + window)

**Push notification content:**
- Title: item title. e.g. "Sign permission slip — Science Museum trip"
- Body: due context. e.g. "Due tomorrow"
- Tap: deep links directly to item detail in app

---

## 7. Dashboard

### 7.1 Sections (in order)

**Needs your attention**
`type: "action"` items, `status: "open"`, ordered by earliest `date` first, then no-date items last.

**Coming up**
`type: "fyi"` items with `date` in the next 14 days, ordered by date. Read-only — no actions.

**Taken care of**
`type: "action"` items with `status: "done"`, most recent first, capped at 10.

### 7.2 Item Card

```
[Due label]
Item title
Source: Sender name · Date
[optional quick actions for action items]
```

Tap card → Item Detail.

### 7.3 Item Detail

- Full item title + date
- Full Klapp message body with extracted sentence(s) highlighted inline
- Editable due date (tap to edit — action items only)
- Actions: Mark done · Snooze (1 day / 3 days / 1 week) — action items only, available from detail and optionally surfaced as quick actions on dashboard cards in beta

### 7.4 Empty States

- No open action items → "Nothing needs your attention right now."
- No upcoming FYI items → "Coming up" section hidden
- No done items → "Taken care of" section hidden

---

## 8. Onboarding Flow

1. Sign up with email
2. Connect Klapp account (email + password)
3. Joli runs first sync immediately (blocking — user waits with progress indicator)
4. First items appear → land on dashboard

Language is detected from device locale (EN → English, DE → German). User can override in settings.

---

## 9. Localisation

Supported languages for beta: **English, German.**
French added post-beta.

UI strings, item titles, and notification copy output in user's preferred language.
Evidence snippets always shown in original German.
Language defaulted from device locale. Overridable in settings.

---

## 10. Out of Scope (Beta)

- Any provider other than Klapp
- Non-PDF attachments (images, etc.)
- Calendar integration / .ics export
- WhatsApp notifications
- Confidence tiers / "Needs review" bucket
- Multi-child or multi-account support
- Sharing items with a partner
- In-app messaging or replying to Klapp messages
- App Store / Play Store public release (TestFlight + EAS Internal Distribution for beta)
- Home screen widget
- French localisation

---

## 11. Resolved Decisions

- **Snooze UX:** Re-notify via push at snooze expiry. Same format as original notification.
- **Item correction:** Due date editable on detail view (action items only). Title and type not editable in beta.
- **Section naming:** "Taken care of" — accurate regardless of who acted, scales with product.
- **Quiet hours:** Deferred. iOS/Android Focus modes handle this at OS level.
