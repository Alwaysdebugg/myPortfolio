import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JournalMarkdown from "@/components/journal/JournalMarkdown";
import {
  getJournalEntryBySlug,
  getPublishedJournalEntries,
} from "@/lib/journal";

interface JournalEntryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedJournalEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: JournalEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) return { title: "Journal Entry Not Found" };

  return {
    title: `${entry.title} | Debug Journal`,
    description: entry.summary,
  };
}

export default async function JournalEntryPage({
  params,
}: JournalEntryPageProps) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) notFound();

  const formattedDate = entry.publishedAt.replaceAll("-", ".");

  return (
    <article className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <Link
        href="/journal"
        className="inline-flex items-center gap-3 rounded-sm font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:hover:text-indigo-400 dark:focus-visible:ring-offset-black sm:text-xs"
      >
        <span aria-hidden="true">←</span>
        Journal index
      </Link>

      <header className="mt-16 grid gap-9 border-b border-black/15 pb-12 dark:border-white/15 sm:mt-24 sm:grid-cols-[8rem_1fr] sm:pb-16">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
          <p>{formattedDate}</p>
          <p className="mt-2 text-indigo-600 dark:text-indigo-400">
            {entry.type} / {entry.status.replace("-", " ")}
          </p>
          {entry.version ? <p className="mt-2">{entry.version}</p> : null}
        </div>

        <div>
          <h1 className="max-w-4xl font-serif text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
            {entry.title}
            <span className="text-indigo-600 dark:text-indigo-400">.</span>
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:text-xl">
            {entry.summary}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 sm:text-xs">
            <span>{entry.readingTime} min read</span>
            {entry.tags.map((tag) => (
              <span key={tag}>#{tag.replaceAll(" ", "-")}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="grid gap-10 py-12 sm:grid-cols-[8rem_minmax(0,46rem)] sm:py-16">
        <aside className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
          <span>Field note</span>
          <div className="mt-4 h-16 w-px bg-indigo-500" />
        </aside>
        <div>
          <JournalMarkdown content={entry.content} />

          {entry.links.length > 0 ? (
            <section className="mt-16 border-t border-black/15 pt-8 dark:border-white/15">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
                Related
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {entry.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="border border-black/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-indigo-500 hover:text-indigo-600 dark:border-white/15 dark:hover:text-indigo-400 sm:text-xs"
                    >
                      {link.label} ↗
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
