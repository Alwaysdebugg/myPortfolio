"use client";

import type { TraceChatMessage } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: TraceChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const text = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
  const sourcePart = message.parts.find((part) => part.type === "data-sources");
  const sources = sourcePart?.data ?? [];
  const createdAt = message.metadata?.createdAt;

  return (
    <div className="min-w-0">
      {text ? (
        <div
          className={`break-words font-sans text-sm leading-7 sm:text-base ${
            message.role === "assistant" ? "text-neutral-200" : "text-neutral-400"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
              ul: ({ children }) => (
                <ul className="mb-3 ml-4 list-disc space-y-1 marker:text-indigo-400 last:mb-0">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 ml-4 list-decimal space-y-1 marker:text-indigo-400 last:mb-0">
                  {children}
                </ol>
              ),
              strong: ({ children }) => (
                <strong className="font-medium text-[#f5f2ea]">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-indigo-400/60 underline-offset-4 hover:text-white"
                >
                  {children}
                </a>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">
          Checking the record…
        </p>
      )}

      {message.role === "assistant" && sources.length > 0 ? (
        <div className="mt-5 border-l border-indigo-400/50 pl-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600">
            Records checked
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sources.map((source) => {
              return (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 border border-white/10 px-2.5 py-1.5 font-mono text-[9px] leading-4 text-neutral-500 transition-colors hover:border-indigo-400/60 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  title={`${source.label} · verified ${source.lastVerified}`}
                >
                  <span className="text-indigo-400">{source.id}</span>
                  <span className="max-w-48 truncate">{source.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      ) : null}

      {createdAt ? (
        <time className="mt-3 block font-mono text-[9px] uppercase tracking-[0.16em] text-neutral-700">
          {new Date(createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      ) : null}
    </div>
  );
}
