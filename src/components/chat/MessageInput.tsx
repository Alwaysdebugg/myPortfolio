"use client";

import { FormEvent, KeyboardEvent, useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
  onStop: () => void;
  disabled: boolean;
  isStreaming: boolean;
}

export default function MessageInput({
  onSend,
  onStop,
  disabled,
  isStreaming,
}: MessageInputProps) {
  const [input, setInput] = useState("");

  const send = () => {
    const content = input.trim();
    if (!content || disabled) return;
    onSend(content);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-black/10 bg-[#f4f1eb] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-colors duration-300 dark:border-white/10 dark:bg-[#080808] sm:px-8 sm:py-5"
    >
      <label htmlFor="trace-message" className="sr-only">
        Ask Trace a question
      </label>
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <textarea
          id="trace-message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask for evidence, not a sales pitch…"
          disabled={disabled}
          rows={1}
          className="min-h-12 flex-1 resize-none border border-black/15 bg-transparent px-4 py-3 font-sans text-base text-neutral-950 placeholder:text-neutral-500 focus:border-indigo-600 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:text-[#f5f2ea] dark:placeholder:text-neutral-600 dark:focus:border-indigo-400"
          onInput={(event) => {
            const target = event.currentTarget;
            target.style.height = "auto";
            target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
          }}
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="flex h-12 min-w-12 items-center justify-center border border-black/20 bg-transparent px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-700 transition-colors hover:border-indigo-600 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/20 dark:text-neutral-300 dark:hover:border-indigo-400 dark:hover:text-white dark:focus-visible:ring-indigo-400 sm:min-w-28"
            aria-label="Stop response"
          >
            <span className="hidden sm:inline">Stop </span>■
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="flex h-12 min-w-12 items-center justify-center bg-neutral-950 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1eb] disabled:cursor-not-allowed disabled:opacity-30 dark:bg-[#f5f2ea] dark:text-neutral-950 dark:hover:bg-indigo-400 dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-black sm:min-w-28"
            aria-label="Send message"
          >
            <span className="hidden sm:inline">Send </span>→
          </button>
        )}
      </div>
      <p className="mx-auto mt-2 hidden max-w-3xl font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-700 sm:block">
        Enter to send · Shift + Enter for a new line
      </p>
    </form>
  );
}
