"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "../components/sections/SplashScreen";
import Hero from "../components/sections/Hero";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/foot";
import ChatWindow from "../components/chat/ChatWindow";
import { FiMessageCircle, FiX } from "react-icons/fi";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragDown = () => {
    setShowContent(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Splash Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: showContent ? 0 : 1,
          y: showContent ? -100 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`fixed inset-0 z-40 ${
          showContent ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <SplashScreen onDragDown={handleDragDown} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300 flex flex-col"
            >
              {/* Navbar - Center aligned */}
              <Navbar />
              <div className="flex-1 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
                <div className="w-full">
                  <Hero />
                  {/* <ChatWindow /> */}
                </div>
              </div>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Icon Button */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="group fixed bottom-8 right-8 z-50 flex items-center gap-0"
          >
            {/* Pulse glow ring */}
            <span
              aria-hidden
              className="absolute inset-0 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-xl animate-chat-glow pointer-events-none"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.5rem] h-[4.5rem] rounded-full border-2 border-blue-400/40 dark:border-blue-400/30 animate-chat-glow pointer-events-none"
            />
            {/* Label on hover (desktop) */}
            <span
              className="absolute right-full mr-3 hidden sm:flex items-center px-3 py-1.5 rounded-full
                         bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                         text-sm font-medium text-gray-700 dark:text-gray-200
                         shadow-lg border border-gray-200/50 dark:border-gray-700/50
                         whitespace-nowrap pointer-events-none
                         opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
                         transition-all duration-200"
            >
              Chat
            </span>
            <motion.button
              onClick={() => setShowChatModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-14 h-14 rounded-full
                       bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
                       dark:from-blue-600 dark:via-indigo-600 dark:to-purple-700
                       text-white shadow-chat hover:shadow-chat-hover
                       flex items-center justify-center
                       transition-shadow duration-300
                       ring-2 ring-white/20 dark:ring-white/10"
              aria-label="打开聊天窗口"
            >
              <motion.span
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block"
              >
                <FiMessageCircle className="w-6 h-6" />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowChatModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4,
              }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full sm:max-h-[90vh] max-w-4xl flex flex-col bg-white dark:bg-black sm:bg-transparent">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setShowChatModal(false)}
                  className="absolute top-3 right-3 sm:-top-12 sm:right-0 w-10 h-10 rounded-full
                           bg-gray-100 dark:bg-gray-800 sm:bg-white
                           text-gray-700 dark:text-gray-200
                           shadow-lg hover:shadow-xl
                           flex items-center justify-center
                           transition-all duration-200 hover:scale-110
                           hover:bg-gray-200 dark:hover:bg-gray-700 sm:hover:bg-gray-100
                           z-10 touch-manipulation"
                  aria-label="关闭聊天窗口"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>

                {/* Chat Window */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-full h-full"
                >
                  <ChatWindow />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
