# Joli — Product Decisions

A running log of key product decisions, the reasoning behind them, and any subsequent changes.

**Format:** Each decision is dated. If a decision changes, an `Updated` note is added below the original — the original is never deleted.

---

## Domain

**Date:** 2026-03-17
**Decision:** joli.help

---

## Platform

**Date:** 2026-03-17
**Decision:** Web now, Expo for the actual product.

Web (Next.js) handles the landing page, waitlist, and dashboard mockup. The real product ships as a native Expo (React Native) app.

**Why:** Joli's core value is timely notifications — a permission slip due today is useless to flag tomorrow. That requires proper native push notifications, which PWA on iOS still doesn't deliver reliably. Web is fast to iterate on for landing + beta validation; Expo is where the product lives for real users.

---

## Mobile Widget

**Date:** 2026-03-17
**Decision:** Build a home screen widget after the Expo app is stable.

**Why:** A glanceable widget showing today's 1-2 action items is the highest-leverage surface Joli could have — it puts the product into the parent's daily view without requiring them to open anything. But widget code is separate from the main app (native Swift/Kotlin with shared data via app groups) and requires a development build, not Expo Go. Wrong thing to build before the core app is solid.

---

## Dashboard Structure

**Date:** 2026-03-17
**Decision:** Three sections only — Needs your attention / Coming up / Handled by Joli.

**Why:** Keeps the dashboard focused on action, not information. Each section has a clear job: act on this, know what's coming, trust that Joli handled the rest.

---

## No Calendar View

**Date:** 2026-03-17
**Decision:** No calendar grid in the dashboard.

**Why:** The "Coming up" list answers the question parents actually ask: what's happening soon? A calendar grid requires scanning rows and columns to extract the same information. More importantly, Joli's value is reducing cognitive load — a calendar view adds it back. There are already great calendar apps. Joli is an action surface, not a scheduling tool.

---

## Core Product Principle: Tasks, Not Messages

**Date:** 2026-03-17
**Decision:** Joli never shows a message feed. It surfaces tasks extracted from messages.

**Why:** The ICP is time-poor and already drowning in email. Showing another inbox or feed means they stop opening it within a week. The only thing that earns daily opens is: here are the 2 things you need to do today. Learned from ParentBox which validated this as the core insight.

---

## Notification Policy

**Date:** 2026-03-17
**Decision:** Only notify on: new task created, material change (due date, status), and deadline windows (48h / 24h / 12h before due).

**Why:** Working parents hate notification spam more than they hate missing things. Get this wrong once and they mute Joli permanently. Silence is a feature. Learned from ParentBox's explicit notification policy design.

---

## Evidence on Tap, Not on Card

**Date:** 2026-03-17
**Decision:** Dashboard card shows task + due date + source line only. Tap/click reveals full email with the extracted sentence highlighted.

**Why:** Respects two things simultaneously — time-poor parents don't want to read emails to act, but trust-sensitive parents need full context available if something feels off. The tap-to-detail pattern is the feedback loop for when Joli gets something wrong: parent taps, reads the email, corrects it. Clean on the surface, full context on demand.

**Updated:** 2026-03-18
**Decision:** Allow inline quick actions for action items on the dashboard in beta while keeping the detail view as the trust surface.

**Why:** Beta users already get a filtered list of high-confidence action items. Requiring every completion or snooze to route through detail adds friction at the exact moment Joli should save time. The dashboard still shows only lightweight task data, and tapping the card still opens detail for evidence review, due-date edits, and trust-sensitive verification. This preserves the trust model while adding a fast path for obvious tasks.

**Updated:** 2026-03-18
**Decision:** Move the dashboard visual direction away from warm yellow paper and overly rounded UI toward a lighter paper background, brighter sage accent, and sharper component corners inspired by the `joli` web theme.

**Why:** The warmer, more orangish palette in the Expo app made the dashboard feel softer and more decorative than intended. For beta, Joli should feel calm, clear, and efficient. A whiter paper background improves readability, the brighter sage gives action states more clarity, and tighter radii reduce the generic “bubbly UI kit” effect.

**Updated:** 2026-03-18
**Decision:** Distinguish the `Coming up` section from `Needs your attention` with a lighter editorial date-rail treatment and an optional quiet child avatar on the far edge when child context is available.

**Why:** `Coming up` is secondary to action items and should feel more like a calm glance surface than a task list. A date-first layout reinforces chronology, while a subtle initial avatar gives parents child context without bloating titles or increasing visual noise. This keeps the hierarchy clear: action rows stay primary, upcoming items stay lighter and easier to scan.

**Updated:** 2026-03-18
**Decision:** Use a subtle child-name badge in `Coming up` instead of an initial avatar when child context is shown.

**Why:** A child initial was too ambiguous at a glance and added a small decoding step. A quiet name badge keeps the secondary hierarchy intact while making the context immediately useful to parents.

**Updated:** 2026-03-18
**Decision:** In item detail, show the actual item date as the only primary date reference; keep message-source timing secondary in the evidence metadata, and reveal due-date edit presets from the date row itself.

**Why:** The detail page is the trust surface. Repeating dates in the header and source metadata made it harder to tell which date mattered. Parents need one clear answer to "when does this matter?" The source/message date still matters as provenance, but it should sit lower in the hierarchy. Keeping due-date edit tied directly to the date row also makes the edit affordance easier to understand.

---

## Beta Notification Stack

**Date:** 2026-03-17
**Decision:** Native push from day one. iOS via TestFlight, Android via EAS Internal Distribution. No email notifications.

**Why:** Email contradicts Joli's core promise of reducing inbox noise — sending more email is the wrong channel for a product that exists to get things out of your inbox. TestFlight is the standard iOS beta channel (lightweight Apple review, usually same-day, no UDID friction for testers). EAS Internal Distribution covers Android without Play Store submission. Both support full native push, which is the notification channel the product actually needs.

---

## Calendar Integration

**Date:** 2026-03-17
**Decision:** Google Calendar API for v1, not .ics, not beta.

**Why:** .ics is a file download the user manually imports — poor UX. Google Calendar API is a single API call that adds the event instantly with reminders set. One tap "Add to Google Calendar" from task detail. Requires OAuth (one extra onboarding step) but that's a standard "Sign in with Google" flow. Outlook Calendar API is equivalent for non-Google users — add post-v1 if beta users need it.

**Scope:** Event-like items (trips, appointments, parent-teacher conferences) from the "Coming up" section. Reminders set to 24h before, matching Joli's notification policy.

---

## Deferred Features (Revisit Post-Beta)

**Date:** 2026-03-17
**Decision:** The following are explicitly out of scope until post-beta:

- **WhatsApp as interaction surface** — adds auth/API complexity, not blocking for beta
- **Confidence tiers / "Needs review" bucket** — for beta: if unsure, don't surface it
- **Skill/modular AI architecture** — start with one extraction prompt, refactor when adding a second domain
- **.ics / calendar export** — replaced by Google Calendar API in v1

**Why:** All of these add real value but none are blocking for the first 5-10 users. Shipping something simple that works beats a complex system that handles everything.

---

## Localisation

**Date:** 2026-03-17
**Decision:** Support English, German, and French. User sets preferred language during onboarding.

**Why:** Beta user mix is English and German speakers. Klapp messages are in German — the LLM extraction already handles German input, outputting in the user's preferred language is a one-line prompt change. French added for broader European reach at near-zero extra cost. UI string count for a focused dashboard is small (~20-30 strings), making i18n cheap to add from day one and painful to retrofit later. Evidence snippets always show in the original German regardless of language preference — this is intentional and correct.

---

## Agentic Vision

**Date:** 2026-03-17
**Decision:** Joli's north star is approval-gated agency — Joli proposes actions, parent confirms with one tap, Joli executes. Not full autonomy.

**Why:** The product promise ("let this part be handled") implies doing the work, not just flagging it. But actions involving children have a higher trust bar than scheduling assistants like Clara. Full autonomy (Joli acts without asking) is wrong for this domain — an unwanted RSVP or an incorrect form submission has real consequences. Approval-gated earns trust incrementally and keeps the parent in control.

**Build order:**
1. **Beta** — Extract and surface tasks only. Validate extraction accuracy and build trust.
2. **v1** — One-tap RSVP (yes/no) from push notification. Lowest-effort write action.
3. **v2** — Pre-fill and submit simple forms using stored family profile data.
4. **Later** — Appointment booking, payments, multi-portal support.

**Why this order:** Parents need to trust that Joli reads things correctly before they'll let it act. The evidence snippet and tap-to-detail being built for beta are the trust-building foundation for agency.

---

## AI Architecture

**Date:** 2026-03-17
**Decision:** Start with a single extraction prompt. Refactor to Router → Skill Module → Executor when adding a second domain.

**Why:** Clara V1 had to do a full reset because a monolithic policy prompt became unstable as domains were added. The right architecture is modular — but premature modularity is its own form of over-engineering. One prompt for one domain is fine for beta. The refactor trigger is: adding a second domain (e.g. health or social comms).
