'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  content: string
  className?: string
}

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-white mb-4 mt-6">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-2xl font-bold text-white mb-3 mt-5">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-xl font-bold text-white mb-2 mt-4">{children}</h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-gray-300">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-gray-800/50 rounded-r-lg">
      <p className="text-gray-300 italic">{children}</p>
    </blockquote>
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-6">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        {children}
      </pre>
    </div>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="text-blue-400 hover:text-blue-300 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-gray-200">{children}</em>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <div className="my-6">
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg max-w-full h-auto mx-auto shadow-lg"
      />
    </div>
  ),
}

export const MarkdownRenderer: React.FC<MarkdownProps> = ({
  content,
  className = '',
}) => {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
