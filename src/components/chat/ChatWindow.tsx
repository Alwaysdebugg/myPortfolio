"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

// 消息类型
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 发送消息
  const handleSend = async (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 调用 API 路由
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages, // 传递对话历史
        }),
      });

      // 检查 HTTP 状态码
      if (!response.ok) {
        // 尝试解析错误响应（429 或其他错误）
        let errorMessage = "oops, exceeded the limit";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // 如果无法解析 JSON，使用状态文本
          errorMessage = `oops, failed to send message (${response.status}): ${response.statusText}`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: errorMessage,
            timestamp: new Date(),
          },
        ]);
        return;
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("oops, failed to read response stream");
      }
      const decoder = new TextDecoder();
      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              assistantMessage.content += data.text;
              // 更新消息
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { ...assistantMessage };
                return newMessages;
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto h-[600px] flex flex-col 
                 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 
                 rounded-2xl shadow-lg overflow-hidden"
    >
      {/* 头部 */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Chat with Jacky's AI assistant
        </h2>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <MessageList messages={messages} isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <MessageInput onSend={handleSend} disabled={isLoading} />
    </motion.div>
  );
}
