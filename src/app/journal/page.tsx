import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedJournalEntries } from "@/lib/journal";
import type {
  JournalEntryStatus,
  JournalEntryType,
} from "@/types/journal";

export const metadata: Metadata = {
  title: "Debug Journal | Jacky Feng",
  description:
    "Build logs, engineering decisions, bugs, and learning notes from Jacky Feng.",
};

const typeLabels: Record<JournalEntryType, string> = {
  build: "Build log",
  decision: "Decision",
  bug: "Bug note",
  learning: "Learning",
};

const statusStyles: Record<JournalEntryStatus, string> = {
  open: "bg-amber-500",
  "in-progress": "bg-blue-500",
  shipped: "bg-emerald-500",
  revisited: "bg-violet-500",
};

function formatDate(date: string) {
  return date.replaceAll("-", ".");
}

export default function JournalPage() {
  const entries = getPublishedJournalEntries();
  const latestEntry = entries[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <section aria-labelledby="journal-heading" className="max-w-4xl">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400 sm:text-xs">
          Build logs · Decisions · Bugs · Learning
        </p>
        <h1
          id="journal-heading"
          className="font-serif text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.86] tracking-[-0.06em]"
        >
          Debug
          <br />
          Journal<span className="text-indigo-600 dark:text-indigo-400">.</span>
        </h1>
        <p className="mt-9 max-w-2xl font-sans text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:mt-12 sm:text-lg">
          A living record of what I am building, why I made certain decisions,
          what broke along the way, and how my thinking changed afterward.
        </p>
      </section>

      {latestEntry ? (
        <aside className="mt-14 flex flex-col gap-4 border-y border-black/10 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:border-white/10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <span className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${statusStyles[latestEntry.status]}`}
            />
            Current build · {latestEntry.status.replace("-", " ")}
          </span>
          <span>
            Latest entry · {formatDate(latestEntry.publishedAt)}
            {latestEntry.version ? ` · ${latestEntry.version}` : ""}
          </span>
        </aside>
      ) : null}

      <section aria-labelledby="entries-heading" className="mt-16 sm:mt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2
            id="entries-heading"
            className="font-mono text-xs uppercase tracking-[0.24em]"
          >
            Entries / {String(entries.length).padStart(2, "0")}
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
            Newest first
          </span>
        </div>

        <ol className="border-t border-black/15 dark:border-white/15">
          {entries.map((entry, index) => (
            <li key={entry.id}>
              <Link
                href={`/journal/${entry.slug}`}
                className="group grid gap-7 border-b border-black/15 py-9 transition-colors hover:bg-black/[0.025] focus-visible:bg-black/[0.025] focus-visible:outline-none dark:border-white/15 dark:hover:bg-white/[0.035] dark:focus-visible:bg-white/[0.035] sm:grid-cols-[7rem_1fr_auto] sm:px-4 sm:py-12"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                  <div>{formatDate(entry.publishedAt)}</div>
                  <div className="mt-2 text-indigo-600 dark:text-indigo-400">
                    {String(index + 1).padStart(2, "0")} / {typeLabels[entry.type]}
                  </div>
                </div>

                <article>
                  <h3 className="font-serif text-3xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:text-5xl">
                    {entry.title}
                  </h3>
                  <p className="mt-4 max-w-2xl font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
                    {entry.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-black/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500 dark:border-white/10 sm:text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>

                <div className="flex items-center justify-between gap-4 self-center font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:flex-col sm:items-end sm:text-xs">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${statusStyles[entry.status]}`}
                    />
                    {entry.status.replace("-", " ")}
                  </span>
                  <span className="text-lg text-indigo-600 transition-transform group-hover:translate-x-1 dark:text-indigo-400">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
