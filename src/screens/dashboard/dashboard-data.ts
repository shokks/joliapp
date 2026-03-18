export type ActionRow = { kind: "action"; n: string; title: string; source: string; when: string };
export type UpcomingRow = { kind: "upcoming"; date: string; event: string };
export type DoneRow = { kind: "done"; title: string; source: string; when: string };
export type DashboardRow = ActionRow | UpcomingRow | DoneRow;

export const ALL_ACTIONS: ActionRow[] = [
  { kind: "action", n: "01", title: "Sign permission slip — Science Museum trip", source: "Lincoln Elementary · Mar 17", when: "Due today" },
  { kind: "action", n: "02", title: "RSVP for Maya's birthday party", source: "Sarah Johnson · Mar 16", when: "Due Friday" },
  { kind: "action", n: "03", title: "Confirm appointment — Dr. Patel, checkup", source: "PedsHealth Portal · Mar 15", when: "Due this week" },
  { kind: "action", n: "04", title: "Return library books — Olivia", source: "Lincoln Elementary · Mar 14", when: "Due this week" },
  { kind: "action", n: "05", title: "Top up lunch account before Friday", source: "Lincoln Elementary · Mar 13", when: "Due this week" },
];

export const COMING_UP: UpcomingRow[] = [
  { kind: "upcoming", date: "Wed, Mar 19", event: "Maths test — Olivia" },
  { kind: "upcoming", date: "Thu, Mar 20", event: "Science Museum trip — Luca's class" },
  { kind: "upcoming", date: "Thu, Mar 20", event: "Book fair ends — Lincoln Elementary" },
  { kind: "upcoming", date: "Sat, Mar 22", event: "Maya's birthday party" },
  { kind: "upcoming", date: "Mon, Mar 24", event: "Spring break starts" },
];

export const TAKEN_CARE_OF: DoneRow[] = [
  { kind: "done", title: "Sign permission slip — Art Museum visit", source: "Lincoln Elementary · Mar 14", when: "Yesterday" },
  { kind: "done", title: "RSVP for Luca's football tournament", source: "FC Tigers · Mar 13", when: "2 days ago" },
  { kind: "done", title: "Top up school lunch account", source: "Lincoln Elementary · Mar 10", when: "Last week" },
];

export const dashboardSections: Array<{ key: string; title: string; data: readonly DashboardRow[] }> = [
  { key: "attention", title: "Needs your attention", data: ALL_ACTIONS },
  { key: "upcoming", title: "Coming up", data: COMING_UP },
  { key: "done", title: "Taken care of", data: TAKEN_CARE_OF },
];
