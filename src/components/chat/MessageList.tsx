"use client";

import { motion } from "framer-motion";
import { PiRobotDuotone } from "react-icons/pi";
import MessageBubble from "./MessageBubble";

const USER_AVATAR_EMOJI = "👤";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  presetQuestions?: string[];
  onPresetClick?: (question: string) => void;
}

export default function MessageList({
  messages,
  isLoading,
  presetQuestions = [],
  onPresetClick,
}: MessageListProps) {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-3 sm:mb-4"
        >
          <PiRobotDuotone className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 dark:text-gray-600" />
        </motion.div>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-4 sm:mb-5 px-2">
          Ask me anything...
        </p>
        {presetQuestions.length > 0 && onPresetClick && (
          <div className="w-full max-w-md px-2 flex flex-wrap justify-center gap-2">
            {presetQuestions.map((q, i) => (
              <motion.button
                key={q}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                onClick={() => onPresetClick(q)}
                className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl
                         text-sm sm:text-base text-left
                         bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                         text-gray-700 dark:text-gray-300
                         border border-gray-200 dark:border-gray-700
                         active:scale-[0.98] transition-colors touch-manipulation
                         focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                {q}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`flex items-start gap-3 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <PiRobotDuotone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          )}

          <MessageBubble message={message} />

          {message.role === "user" && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg leading-none select-none">
              {USER_AVATAR_EMOJI}
            </div>
          )}
        </motion.div>
      ))}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <PiRobotDuotone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-center space-x-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
