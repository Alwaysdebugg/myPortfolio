"use client";

import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`max-w-[90%] sm:max-w-[75%] ${isUser ? "order-first" : "order-last"}`}
    >
      <div
        className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl ${
          isUser
            ? "bg-blue-600 dark:bg-blue-500 text-white rounded-tr-sm"
            : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-tl-sm"
        }`}
      >
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </div>
        <div
          className={`text-xs mt-1 ${
            isUser
              ? "text-blue-100 dark:text-blue-200"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
}
