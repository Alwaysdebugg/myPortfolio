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
      className="border-t border-white/10 bg-[#080808] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-5"
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
          className="min-h-12 flex-1 resize-none border border-white/15 bg-transparent px-4 py-3 font-sans text-base text-[#f5f2ea] placeholder:text-neutral-600 focus:border-indigo-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="flex h-12 min-w-12 items-center justify-center border border-white/20 bg-transparent px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-300 transition-colors hover:border-indigo-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:min-w-28"
            aria-label="Stop response"
          >
            <span className="hidden sm:inline">Stop </span>■
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="flex h-12 min-w-12 items-center justify-center bg-[#f5f2ea] px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-950 transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-30 sm:min-w-28"
            aria-label="Send message"
          >
            <span className="hidden sm:inline">Send </span>→
          </button>
        )}
      </div>
      <p className="mx-auto mt-2 hidden max-w-3xl font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-700 sm:block">
        Enter to send · Shift + Enter for a new line
      </p>
    </form>
  );
}
