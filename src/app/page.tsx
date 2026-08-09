"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import Hero from "@/components/sections/Hero";
import SplashScreen from "@/components/sections/SplashScreen";
import Footer from "@/components/ui/foot";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTraceOpen, setIsTraceOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isTraceOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsTraceOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isTraceOpen]);

  const openTrace = (question?: string) => {
    setInitialQuestion(question ?? null);
    setIsTraceOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#f4f1eb] text-neutral-950 dark:bg-[#080808] dark:text-[#f5f2ea]">
      <AnimatePresence>
        {!showContent ? (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-40"
          >
            <SplashScreen onDragDown={() => setShowContent(true)} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showContent ? (
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="relative z-10 min-h-screen"
          >
            <Navbar />
            <Hero onAskAI={openTrace} />
            <Footer />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isTraceOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-neutral-950/45 p-0 backdrop-blur-sm dark:bg-black/70 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setIsTraceOpen(false)}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="trace-dialog-title"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onMouseDown={(event) => event.stopPropagation()}
              className="flex h-[92dvh] w-full max-w-5xl flex-col overflow-hidden border border-black/15 bg-[#f4f1eb] text-neutral-950 shadow-2xl transition-colors duration-300 dark:border-white/15 dark:bg-[#080808] dark:text-[#f5f2ea] sm:h-[min(760px,88dvh)]"
            >
              <header className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10 sm:px-7">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  <div>
                    <h2 id="trace-dialog-title" className="font-mono text-[10px] uppercase tracking-[0.22em] sm:text-xs">
                      Trace / Second perspective
                    </h2>
                    <p className="mt-1 font-sans text-[11px] text-neutral-600 dark:text-neutral-500 sm:text-xs">
                      An AI guide grounded in Jacky&apos;s public portfolio evidence.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTraceOpen(false)}
                  className="flex h-9 w-9 items-center justify-center border border-black/15 font-mono text-lg text-neutral-600 transition-colors hover:border-indigo-600 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/15 dark:text-neutral-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400 dark:focus-visible:ring-indigo-400"
                  aria-label="Close Trace"
                >
                  ×
                </button>
              </header>
              <ChatWindow initialQuestion={initialQuestion} />
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
