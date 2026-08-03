import Link from "next/link";
import type { ReactNode } from "react";

export default function JournalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f4f1eb] text-neutral-950 dark:bg-[#080808] dark:text-[#f5f2ea]">
      <header className="relative z-10 border-b border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 font-mono text-[10px] uppercase tracking-[0.2em] sm:px-8 sm:py-7 sm:text-xs">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-black"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Always debugging
            </span>
          </Link>
          <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
            <span className="hidden sm:inline">Jacky Feng</span>
            <span>Journal / Index</span>
          </div>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-xs">
          <span>A living record of work in progress.</span>
          <Link
            href="/"
            className="w-fit text-neutral-700 transition-colors hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-400"
          >
            Return home ↗
          </Link>
        </div>
      </footer>
    </div>
  );
}
