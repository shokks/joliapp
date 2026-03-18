import type { SupportedLocale } from "@/src/lib/i18n/translations";

export type KlappAuthState = "connected" | "disconnected" | "expired";

export type SessionProfile = {
  userId: string;
  name: string;
  email: string;
  preferredLocale: SupportedLocale;
  klappAuthState: KlappAuthState;
  createdAt: string;
  updatedAt: string;
};

export type KlappAttachment = {
  fileDraftId: string;
  fileName: string;
  mimeType?: string | null;
  downloadUrl?: string | null;
};

export type KlappMessageReply = {
  body: string;
  sentAt?: string | null;
  files: KlappAttachment[];
};

export type KlappMessageSummary = {
  id: string;
  subject: string;
  senderName: string;
  sentAt: string;
  updatedAt?: string | null;
};

export type KlappMessageDetail = KlappMessageSummary & {
  replies: KlappMessageReply[];
};

export type ExtractedItemType = "action" | "fyi";
export type ExtractedItemStatus = "open" | "done" | "snoozed";

export type ExtractedItem = {
  id: string;
  userId: string;
  type: ExtractedItemType;
  title: string;
  date: string | null;
  status: ExtractedItemStatus;
  snoozedUntil: string | null;
  sourceMessageId: string;
  evidenceSnippet: string;
  createdAt: string;
  updatedAt: string;
};

export type ExtractionCandidate = {
  type: ExtractedItemType;
  title: string;
  date: string | null;
  evidenceSnippet: string;
};

export type SyncStatus = {
  state: "idle" | "running" | "success" | "error" | "reconnect_required";
  lastSyncAt: string | null;
  lastSuccessfulSyncAt: string | null;
  lastErrorAt: string | null;
  lastErrorMessage: string | null;
  processedMessageCount: number;
};
