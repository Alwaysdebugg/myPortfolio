export type JournalEntryType = "build" | "decision" | "bug" | "learning";

export type JournalEntryStatus =
  | "open"
  | "in-progress"
  | "shipped"
  | "revisited";

export interface JournalLink {
  label: string;
  href: string;
}

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  type: JournalEntryType;
  status: JournalEntryStatus;
  version?: string;
  tags: string[];
  links: JournalLink[];
  readingTime: number;
  isPublished: boolean;
}
