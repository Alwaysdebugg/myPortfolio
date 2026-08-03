export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-xs">
        <span>© {new Date().getFullYear()} Jacky Feng</span>
        <span>Still learning · Still building · Still debugging</span>
      </div>
    </footer>
  );
}
