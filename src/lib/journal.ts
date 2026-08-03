import generatedEntries from "@/data/generated-journal.json";
import type { JournalEntry } from "@/types/journal";

const entries = generatedEntries as JournalEntry[];

export function getPublishedJournalEntries(): JournalEntry[] {
  return entries.filter((entry) => entry.isPublished);
}

export function getJournalEntryBySlug(slug: string): JournalEntry | null {
  return (
    getPublishedJournalEntries().find((entry) => entry.slug === slug) ?? null
  );
}
