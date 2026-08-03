import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface JournalMarkdownProps {
  content: string;
}

export default function JournalMarkdown({ content }: JournalMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }: { children?: ReactNode }) => (
          <h2 className="mb-5 mt-14 font-serif text-3xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-[#f5f2ea] sm:text-4xl">
            {children}
          </h2>
        ),
        h3: ({ children }: { children?: ReactNode }) => (
          <h3 className="mb-4 mt-10 font-serif text-2xl font-semibold text-neutral-950 dark:text-[#f5f2ea]">
            {children}
          </h3>
        ),
        p: ({ children }: { children?: ReactNode }) => (
          <p className="mb-6 font-sans text-base leading-8 text-neutral-700 dark:text-neutral-300 sm:text-lg">
            {children}
          </p>
        ),
        ul: ({ children }: { children?: ReactNode }) => (
          <ul className="mb-8 space-y-3 font-sans text-base leading-7 text-neutral-700 dark:text-neutral-300 sm:text-lg">
            {children}
          </ul>
        ),
        ol: ({ children }: { children?: ReactNode }) => (
          <ol className="mb-8 list-decimal space-y-3 pl-6 font-sans text-base leading-7 text-neutral-700 dark:text-neutral-300 sm:text-lg">
            {children}
          </ol>
        ),
        li: ({ children }: { children?: ReactNode }) => (
          <li className="relative pl-6 before:absolute before:left-0 before:top-[0.75rem] before:h-px before:w-3 before:bg-indigo-500">
            {children}
          </li>
        ),
        strong: ({ children }: { children?: ReactNode }) => (
          <strong className="font-semibold text-neutral-950 dark:text-white">
            {children}
          </strong>
        ),
        blockquote: ({ children }: { children?: ReactNode }) => (
          <blockquote className="my-9 border-l-2 border-indigo-500 py-1 pl-6 font-serif text-xl italic text-neutral-700 dark:text-neutral-300">
            {children}
          </blockquote>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          return isInline ? (
            <code
              className="rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700 dark:text-indigo-300"
              {...props}
            >
              {children}
            </code>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }: { children?: ReactNode }) => (
          <pre className="my-8 overflow-x-auto border border-black/10 bg-black p-5 font-mono text-sm leading-6 text-neutral-200 dark:border-white/10">
            {children}
          </pre>
        ),
        a: ({ href, children }) => {
          const isExternal = href?.startsWith("http");
          return (
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="font-medium text-indigo-700 underline decoration-indigo-500/40 underline-offset-4 transition-colors hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
