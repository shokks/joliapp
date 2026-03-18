# Joli — Design Principles

**Version:** 1.0
**Date:** 2026-03-18

---

## Design Identity

Joli exists to reduce mental load — not add to it. The visual language reflects this directly: warm, grounded, and calm. Nothing should feel like an inbox. Everything should feel like it has already been thought through.

The dominant aesthetic is **warm parchment meets quiet authority**. The palette is drawn from natural materials — cream paper, aged linen, forest moss — not from tech product defaults. The product should feel like it was designed to be opened at the kitchen table, not in a corporate dashboard.

The single most important design principle: **clarity over cleverness**. Every choice should reduce cognitive friction for a time-poor parent.

---

## Color System

### Palette

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `background` | `hsl(38 30% 97%)` / `#f8f3eb` | `hsl(25 12% 7%)` | Page background |
| `surface` | `hsl(38 20% 92%)` / `#efe7db` | `hsl(25 12% 11%)` | Card / container backgrounds |
| `surfaceStrong` | `#e5dac8` | `hsl(25 8% 17%)` | Pressed states, secondary buttons |
| `foreground` | `hsl(25 20% 10%)` / `#241c16` | `hsl(38 15% 93%)` | Primary text |
| `muted` | `hsl(30 10% 48%)` / `#70655b` | `hsl(30 10% 52%)` | Secondary text, labels |
| `accent` | `hsl(152 40% 38%)` / `#3f7a5d` | `hsl(152 38% 56%)` | Primary action, highlights |
| `accentText` | `#f8f3eb` | `hsl(22 16% 7%)` | Text on accent backgrounds |
| `border` | `hsl(38 12% 84%)` / `#ded2bf` | `hsl(25 8% 17%)` | Dividers, card outlines |
| `warning` | `#a95c42` | same | Overdue, urgent, error states |

### Color Rules

- **Warm, not cool.** All neutrals are warm-toned (brown-shifted). Never use gray that leans blue.
- **Accent is forest green — singular.** Do not introduce secondary accent colors. Accent signals action; its scarcity gives it meaning.
- **Danger/warning is terracotta (`#a95c42`).** Never use red — it reads as system error, not a missed deadline.
- **No purple gradients. No blue CTA buttons.** These are the hallmarks of generic AI product design.

### Background Texture

Apply a subtle noise grain overlay to full-bleed background surfaces. Use SVG fractal noise (opacity ~4%, mix-blend-mode: overlay). This adds material depth without visible pattern.

```js
// SVG inline grain — apply as a fixed overlay at z-index 50
backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
opacity: 0.04
```

---

## Typography

### Typeface Hierarchy

| Role | Typeface | Notes |
|------|----------|-------|
| Display / hero headings | **DM Serif Display** (serif, with italic variant) | Large headings, marketing copy, onboarding hero |
| UI / body / labels | **Geist Sans** | All application interface text |
| Monospaced accents | System mono | Numbered lists, timestamps, counts only |

### Scale

| Element | Size | Weight | Tracking | Line Height |
|---------|------|--------|----------|-------------|
| Hero title (display) | 34–62px | 700 | -1.2 to -0.02em | 0.9–1.0 |
| Section subtitle | 24px | 600 | -0.6 | 1.2 |
| Item title | 17px | 600 | 0 | 24px |
| Body copy | 15px | 400 | 0 | 23px |
| Section label | 12px | 700 | +2.0 to +2.2 | 1.0 |
| Caption / muted | 13–14px | 400–600 | 0 | 21px |

### Typography Rules

- **Section labels are always uppercase with wide tracking.** This creates visual hierarchy without relying on size alone.
- **Hero text uses tight negative tracking.** Large type (-1.2em letter-spacing) reads as confident and editorial, not heavy.
- **Do not use Inter, Arial, or Roboto** — these are the generic defaults that produce unmemorable interfaces.
- **Serif is for impact, not body.** DM Serif Display should appear in large hero contexts (onboarding splash, marketing). Body and UI text uses Geist Sans exclusively.
- **Italic serif connotes warmth and parenthood.** Use it intentionally in hero copy when emphasising the emotional core of the product (e.g., *second full-time job*).

---

## Layout & Spacing

### Grid

- Horizontal padding: 20px (mobile), 24px (tablet+)
- Maximum reading width for body copy: ~520px
- Vertical spacing between sections: 18px (tight), 24px (comfortable), 40px (section breaks)

### Cards

Cards use a large corner radius (`borderRadius: 28`) to read as soft and considered rather than box-like. Cards sit on the surface colour, with a 1px border at the `border` token. No drop shadows — the warm palette already provides depth through tone.

```
backgroundColor: palette.surface
borderRadius: 28
borderWidth: 1
borderColor: palette.border
padding: 18
```

### Hierarchy Principle

Three levels of visual surface:
1. `background` — the page, always the warmest and lightest
2. `surface` — cards, containers, grouped sections
3. `surfaceStrong` — interactive states (pressed, active), secondary buttons

Never go deeper than three levels.

---

## Motion

### Philosophy

A single well-choreographed animation is more valuable than many small effects. Prioritise **entry animations** — the moment a screen appears is the highest-leverage motion moment.

### Approved Patterns

| Effect | Use Case | Spec |
|--------|----------|------|
| Fade-up entry | Screen load, new content reveal | `opacity: 0 → 1`, `translateY: 24px → 0`, 0.8s, `cubic-bezier(0.16, 1, 0.3, 1)` |
| Staggered list entry | Dashboard item cards loading in | Delay each item by ~60ms |
| Press feedback | Tappable surfaces | Scale to 0.97, duration 120ms |
| Progress pulse | First-sync loading state | Soft opacity pulse, not spinning indicators |

### Rules

- No spinning loaders for progress states. Use a pulsing opacity or a progress bar.
- Animations should feel **unhurried** (800ms entry, not 200ms). The product is calm, not snappy.
- Never animate between every state change — animation signals something meaningful happened.

---

## Component Design Language

### Buttons

Two variants only:

**Primary (action):** Pill-shaped (`borderRadius: 999`), accent green fill, accentText. Used for the single most important action on a screen.

**Secondary (navigate / contextual):** Pill-shaped, `surfaceStrong` fill, 1px border, foreground text. Used for supporting actions, navigation, and non-destructive choices.

No tertiary button styles. No outlined-primary, no ghost variants in the native app.

### Item Cards

```
[Due label — muted, uppercase, 12px]
Item title — foreground, 17px, weight 600
Source: Sender · Date — muted, 14px
```

Row dividers at `palette.border`, 1px. Padding: 14px vertical. Tap targets span the full card width.

### Section Labels

Uppercase, 12px, weight 700, `letterSpacing: 2`, `palette.muted`. Always rendered above card content. Creates scannable hierarchy without large headings.

### Evidence Highlighting (Item Detail)

The extracted German sentence inside the Klapp message body must be visually distinguished. Use a warm amber tint (`palette.accent` at 12–15% opacity) as a background highlight on the inline text span. Never use yellow or box outline — the highlight should feel like a reading annotation, not a search result.

### Destructive / Warning States

Overdue items and warnings use `palette.warning` (`#a95c42`). Apply to due labels and icon accents only — do not paint entire cards in warning colour.

---

## Empty States

Empty states should read as positive, not as absence. Copy follows the product voice: calm and matter-of-fact.

- No open action items: "Nothing needs your attention right now."
- No items ever extracted: "Joli is reading your Klapp messages. Check back soon."

Do not use illustrations or emoji in empty states. The text alone is sufficient.

---

## Design Voice

| Quality | What it means |
|---------|--------------|
| **Calm** | Never urgent-feeling. Notifications are a feature of the product, not the UI itself. |
| **Direct** | Short, specific copy. "Sign permission slip — Science Museum trip" not "New item requires attention". |
| **Trustworthy** | Evidence is always one tap away. The product shows its work. |
| **Unhurried** | Spacious layout, large type, generous padding. Never cramped. |

### Copy Principles

- Titles are specific: include the child name, event, and action type where available.
- Section names are action-oriented: "Needs your attention", "Taken care of" — not "Open Tasks" or "Done".
- Onboarding copy is direct and short. The product earns trust by being useful, not by over-explaining.
- Evidence snippets always appear in the original German, never translated. This is intentional — it signals that Joli is reading the real source, not paraphrasing.

---

## What to Avoid

These are signs of generic AI-generated product design. None should appear in Joli.

- Purple gradients or blue primary buttons
- Inter, Arial, or Roboto as the main typeface
- Dark navy + white as the default colour scheme
- Drop shadows on cards (use tone contrast instead)
- Excessive icon usage — Joli's UI communicates through copy and layout
- Tab bars with 5 items — the product has a narrow, focused surface
- Spinning loading indicators
- Motivational or gamified UI language ("Great job!", streaks, badges)
- Any layout that resembles an email inbox or feed

---

## Platform Notes (Expo / React Native)

- The theme is implemented via `palette.ts` — all colour values reference named tokens, never raw hex in component files.
- Font weights in React Native require explicit font files for each weight. Do not rely on system font weight synthesis.
- Border radii: use `borderRadius: 28` for cards, `borderRadius: 999` for pills/chips.
- No shadows (`elevation: 0`) — the warm palette handles depth through tone.
- Safe areas are always respected via `SafeAreaView`.
