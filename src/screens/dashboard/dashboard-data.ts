export type MockItemType = "action" | "fyi";
export type MockItemStatus = "open" | "done" | "snoozed";

export type MockItem = {
  id: string;
  type: MockItemType;
  status: MockItemStatus;
  title: string;
  childName?: string | null;
  date: string | null;
  dueLabel: string;
  source: string;
  sourceMessageId: string;
  evidenceSnippet: string;
  messageBody: string;
  updatedLabel: string;
  snoozedUntil: string | null;
};

export const mockItems: MockItem[] = [
  {
    id: "action-permission-slip",
    type: "action",
    status: "open",
    title: "Sign permission slip — Science Museum trip",
    childName: "Luca",
    date: "2026-03-18",
    dueLabel: "Due today",
    source: "Lincoln Elementary · Mar 17",
    sourceMessageId: "msg-science-museum",
    evidenceSnippet: "Bitte unterschreiben Sie den Erlaubnisschein bis Mittwoch und geben Sie ihn zurück.",
    messageBody:
      "Dear parents, we are excited to announce that our class will be visiting the Science Museum on Thursday, March 20. Please sign and return the permission slip by Wednesday to confirm your child's participation. The cost is $12 per student.",
    updatedLabel: "Updated today",
    snoozedUntil: null,
  },
  {
    id: "action-rsvp-party",
    type: "action",
    status: "open",
    title: "RSVP for Maya's birthday party",
    childName: "Maya",
    date: "2026-03-21",
    dueLabel: "Due Friday",
    source: "Sarah Johnson · Mar 16",
    sourceMessageId: "msg-maya-party",
    evidenceSnippet: "Bitte gebt uns bis Freitag Bescheid, ob Maya kommen kann.",
    messageBody:
      "Hi everyone, Maya would love to celebrate with the class this Saturday. Please let us know by Friday if Maya can make it so we can plan food and crafts.",
    updatedLabel: "Updated yesterday",
    snoozedUntil: null,
  },
  {
    id: "action-checkup",
    type: "action",
    status: "open",
    title: "Confirm appointment — Dr. Patel, checkup",
    childName: "Luca",
    date: "2026-03-22",
    dueLabel: "Due this week",
    source: "PedsHealth Portal · Mar 15",
    sourceMessageId: "msg-checkup",
    evidenceSnippet: "Bitte bestätigen Sie den Termin bis Ende dieser Woche.",
    messageBody:
      "Your annual pediatric checkup is booked for next Tuesday. Please confirm the appointment by the end of this week or we may need to release the slot.",
    updatedLabel: "Updated 2 days ago",
    snoozedUntil: null,
  },
  {
    id: "action-library-books",
    type: "action",
    status: "snoozed",
    title: "Return library books — Olivia",
    childName: "Olivia",
    date: "2026-03-20",
    dueLabel: "Snoozed until tomorrow",
    source: "Lincoln Elementary · Mar 14",
    sourceMessageId: "msg-library-books",
    evidenceSnippet: "Bitte bringt die ausgeliehenen Bücher bis Donnerstag zurück.",
    messageBody:
      "Friendly reminder that Olivia still has two library books checked out. Please return them by Thursday so the next group can borrow them.",
    updatedLabel: "Snoozed 1 day",
    snoozedUntil: "2026-03-19",
  },
  {
    id: "fyi-maths-test",
    type: "fyi",
    status: "open",
    title: "Maths test",
    childName: "Olivia",
    date: "2026-03-19",
    dueLabel: "Wed, Mar 19",
    source: "Lincoln Elementary · Mar 17",
    sourceMessageId: "msg-maths-test",
    evidenceSnippet: "Am Mittwoch schreiben wir den Mathetest zu Brüchen.",
    messageBody:
      "This Wednesday the class will sit their fractions test. Please make sure Olivia has a good night's sleep and brings a sharpened pencil.",
    updatedLabel: "Updated today",
    snoozedUntil: null,
  },
  {
    id: "fyi-science-trip",
    type: "fyi",
    status: "open",
    title: "Science Museum trip",
    childName: "Luca",
    date: "2026-03-20",
    dueLabel: "Thu, Mar 20",
    source: "Lincoln Elementary · Mar 17",
    sourceMessageId: "msg-science-trip",
    evidenceSnippet: "Der Ausflug ins Technikmuseum findet am Donnerstag statt.",
    messageBody:
      "The class trip to the Science Museum will take place this Thursday. Students should bring a packed lunch and arrive by 8:15.",
    updatedLabel: "Updated today",
    snoozedUntil: null,
  },
  {
    id: "fyi-book-fair",
    type: "fyi",
    status: "open",
    title: "Book fair ends",
    childName: "Olivia",
    date: "2026-03-20",
    dueLabel: "Thu, Mar 20",
    source: "Lincoln Elementary · Mar 12",
    sourceMessageId: "msg-book-fair",
    evidenceSnippet: "Die Buchmesse endet am Donnerstag nach der Schule.",
    messageBody:
      "The spring book fair will stay open until Thursday after school. Families are welcome to browse before pickup.",
    updatedLabel: "Updated 5 days ago",
    snoozedUntil: null,
  },
  {
    id: "action-art-museum",
    type: "action",
    status: "done",
    title: "Sign permission slip — Art Museum visit",
    childName: "Luca",
    date: "2026-03-14",
    dueLabel: "Done yesterday",
    source: "Lincoln Elementary · Mar 14",
    sourceMessageId: "msg-art-museum",
    evidenceSnippet: "Bitte geben Sie den unterschriebenen Zettel bis Freitag zurück.",
    messageBody:
      "We are visiting the Art Museum next week. Please return the signed permission slip by Friday.",
    updatedLabel: "Done yesterday",
    snoozedUntil: null,
  },
  {
    id: "action-football-rsvp",
    type: "action",
    status: "done",
    title: "RSVP for Luca's football tournament",
    childName: "Luca",
    date: "2026-03-13",
    dueLabel: "Done 2 days ago",
    source: "FC Tigers · Mar 13",
    sourceMessageId: "msg-football-rsvp",
    evidenceSnippet: "Bitte bestätigt bis Donnerstag, ob Luca beim Turnier dabei ist.",
    messageBody:
      "Please confirm by Thursday whether Luca will join Saturday's football tournament so we can finalise transport.",
    updatedLabel: "Done 2 days ago",
    snoozedUntil: null,
  },
  {
    id: "action-lunch-topup",
    type: "action",
    status: "done",
    title: "Top up school lunch account",
    childName: "Olivia",
    date: "2026-03-10",
    dueLabel: "Done last week",
    source: "Lincoln Elementary · Mar 10",
    sourceMessageId: "msg-lunch-topup",
    evidenceSnippet: "Bitte laden Sie das Essenskonto diese Woche wieder auf.",
    messageBody:
      "Olivia's lunch account has fallen below the weekly threshold. Please add funds this week to avoid interruptions next Monday.",
    updatedLabel: "Done last week",
    snoozedUntil: null,
  },
];

export const mockActionItems = mockItems.filter((item) => item.type === "action" && item.status === "open");
export const mockSnoozedItems = mockItems.filter((item) => item.status === "snoozed");
export const mockUpcomingItems = mockItems.filter((item) => item.type === "fyi" && item.status === "open");
export const mockDoneItems = mockItems.filter((item) => item.status === "done");
export const mockEmptyStateItems: MockItem[] = [];

export function getMockItemById(itemId: string) {
  return mockItems.find((item) => item.id === itemId) ?? null;
}
