"use client";

import { motion } from "framer-motion";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const navItems = [
  { name: "Home", href: `${BASE_PATH}/#hero` },
  { name: "Journal", href: `${BASE_PATH}/journal` },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const themeLabel =
    theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
      ? "Switch to system theme"
      : "Switch to light mode";

  return (
    <header className="relative z-30 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-7">
        <a
          href={`${BASE_PATH}/#hero`}
          className="group flex items-center gap-3 rounded-sm font-mono text-[10px] uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-black sm:text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          <span className="hidden transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:inline">
            Always debugging
          </span>
          <span className="transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:hidden">
            AD
          </span>
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Primary" className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:gap-6 sm:text-[10px]">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-indigo-400"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center border border-black/15 text-neutral-600 transition-colors hover:border-indigo-500 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/15 dark:text-neutral-300 dark:hover:text-indigo-400"
            aria-label={themeLabel}
          >
            {mounted ? (
              theme === "light" ? (
                <FiSun className="h-3.5 w-3.5" />
              ) : theme === "dark" ? (
                <FiMoon className="h-3.5 w-3.5" />
              ) : (
                <FiMonitor className="h-3.5 w-3.5" />
              )
            ) : (
              <span className="h-3.5 w-3.5" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
