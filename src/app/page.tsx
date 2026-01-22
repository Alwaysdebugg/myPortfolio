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
              className="min-h-screen bg-white dark:bg-black transition-colors duration-300"
            >
              {/* Navbar - Center aligned */}
              <Navbar />
              <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-10">
                <div className="space-y-16 w-full">
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
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            onClick={() => setShowChatModal(true)}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full 
                     bg-gradient-to-r from-blue-500 to-purple-600 
                     text-white shadow-lg hover:shadow-xl 
                     flex items-center justify-center
                     transition-all duration-300 hover:scale-110
                     dark:from-blue-600 dark:to-purple-700"
            aria-label="打开聊天窗口"
          >
            <FiMessageCircle className="w-6 h-6" />
          </motion.button>
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
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setShowChatModal(false)}
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full 
                           bg-white dark:bg-gray-800 
                           text-gray-700 dark:text-gray-200
                           shadow-lg hover:shadow-xl
                           flex items-center justify-center
                           transition-all duration-200 hover:scale-110
                           hover:bg-gray-100 dark:hover:bg-gray-700
                           z-10"
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
