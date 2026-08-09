"use client";

import type { ChatStatus } from "ai";
import { motion } from "framer-motion";
import type { TraceChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: TraceChatMessage[];
  status: ChatStatus;
  error?: Error;
  presetQuestions?: string[];
  onPresetClick?: (question: string) => void;
}

export default function MessageList({
  messages,
  status,
  error,
  presetQuestions = [],
  onPresetClick,
}: MessageListProps) {
  if (messages.length === 0 && status === "ready") {
    return (
      <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-center py-8 sm:py-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400 sm:text-xs">
          Trace / Opening note
        </p>
        <p className="mt-5 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.03em] text-neutral-950 dark:text-[#f5f2ea] sm:text-5xl">
          I&apos;m here to add context—not to speak for Jacky.
        </p>
        <p className="mt-5 max-w-2xl font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
          Ask about evidence, experience, projects, or gaps. Answers are grounded
          in dated portfolio records, and the exact evidence appears with each
          response.
        </p>

        {presetQuestions.length > 0 && onPresetClick ? (
          <div className="mt-9 grid gap-px bg-black/10 dark:bg-white/10 sm:grid-cols-2">
            {presetQuestions.map((question, index) => (
              <motion.button
                key={question}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 + index * 0.04 }}
                type="button"
                onClick={() => onPresetClick(question)}
                className="group flex min-h-24 flex-col justify-between bg-[#f4f1eb] p-4 text-left transition-colors hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:bg-[#080808] dark:hover:bg-white/[0.06] dark:focus-visible:ring-indigo-400"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 font-sans text-sm leading-5 text-neutral-700 transition-colors group-hover:text-neutral-950 dark:text-neutral-300 dark:group-hover:text-white">
                  {question} →
                </span>
              </motion.button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl border-t border-black/10 dark:border-white/10">
      {messages.map((message) => (
        <motion.article
          key={message.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-3 border-b border-black/10 py-6 dark:border-white/10 sm:grid-cols-[5rem_1fr] sm:gap-6"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 sm:pt-1 sm:text-[10px]">
            {message.role === "assistant" ? "Trace" : "You"}
          </div>
          <MessageBubble message={message} />
        </motion.article>
      ))}

      {status === "submitted" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-3 border-b border-black/10 py-6 dark:border-white/10 sm:grid-cols-[5rem_1fr] sm:gap-6"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 sm:pt-1 sm:text-[10px]">
            Trace
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-500">
            Retrieving dated evidence<span className="animate-pulse">…</span>
          </span>
        </motion.div>
      ) : null}

      {error ? (
        <div className="border-b border-red-600/20 py-5 font-sans text-sm leading-6 text-red-700 dark:border-red-400/20 dark:text-red-300">
          {error.message || "Trace could not complete that answer."}
        </div>
      ) : null}
    </div>
  );
}
