"use client";

import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !disabled) {
      onSend(trimmedInput);
      setInput("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-shrink-0 px-3 py-3 sm:px-4 sm:py-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-end gap-2 sm:gap-3">
        <div className="flex-1 min-w-0 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-11 sm:pr-12 bg-gray-50 dark:bg-gray-900
                     border border-gray-200 dark:border-gray-700
                     rounded-xl sm:rounded-2xl text-black dark:text-white text-base
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed
                     resize-none overflow-hidden
                     max-h-28 sm:max-h-32 touch-manipulation"
            style={{
              minHeight: "44px",
              height: "auto",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        </div>

        <motion.button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full
                   bg-blue-600 dark:bg-blue-500
                   text-white
                   flex items-center justify-center
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200
                   hover:bg-blue-700 dark:hover:bg-blue-600
                   active:scale-95
                   shadow-lg hover:shadow-xl touch-manipulation"
          aria-label="Send message"
        >
          <FiSend className="w-5 h-5" />
        </motion.button>
      </div>

      <p className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
        Press Enter to send, Shift + Enter to newline
      </p>
    </div>
  );
}
