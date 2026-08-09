"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useCallback, useEffect, useRef } from "react";
import type { TraceChatMessage } from "@/types/chat";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const PRESET_QUESTIONS = [
  "What is Jacky's strongest engineering evidence?",
  "Tell me about Jacky's current work experience",
  "Which projects best show product judgment?",
  "Where is the public record still thin?",
];

const transport = new DefaultChatTransport<TraceChatMessage>({
  api: "/api/chat",
});

interface ChatWindowProps {
  initialQuestion?: string | null;
}

export default function ChatWindow({ initialQuestion }: ChatWindowProps) {
  const { messages, sendMessage, status, error, stop, clearError } =
    useChat<TraceChatMessage>({ transport, throttle: 30 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sentInitialQuestion = useRef(false);
  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSend = useCallback(
    (content: string) => {
      const text = content.trim();
      if (!text || isBusy) return;
      clearError();
      void sendMessage({
        metadata: { createdAt: new Date().toISOString() },
        parts: [{ type: "text", text }],
      });
    },
    [clearError, isBusy, sendMessage]
  );

  useEffect(() => {
    if (!initialQuestion || sentInitialQuestion.current) return;
    sentInitialQuestion.current = true;
    handleSend(initialQuestion);
  }, [handleSend, initialQuestion]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f4f1eb] transition-colors duration-300 dark:bg-[#080808]">
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
        <MessageList
          messages={messages}
          status={status}
          error={error}
          presetQuestions={PRESET_QUESTIONS}
          onPresetClick={handleSend}
        />
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        onSend={handleSend}
        onStop={() => void stop()}
        disabled={isBusy}
        isStreaming={isBusy}
      />
    </div>
  );
}
