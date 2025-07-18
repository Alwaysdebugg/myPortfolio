"use client"

import { motion } from 'framer-motion'
import { FiDownload, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import Navbar from '@/components/ui/navbar'

export default function Resume() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement("a");
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    link.href = `${basePath}/resume.pdf`;
    link.download = "JackyFeng_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 使用 useEffect 添加超时保护
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2秒后强制结束加载状态

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20 ${
            isFullscreen ? "fixed inset-0 z-50 m-0 rounded-none" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              className="text-3xl font-bold font-serif text-gray-800 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              My Resume
            </motion.h1>
            <div className="flex items-center gap-4">
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600/20 backdrop-blur-sm text-gray-800 dark:text-white rounded-full hover:bg-gray-700/30 transition-all"
              >
                {isFullscreen ? (
                  <>
                    <FiMinimize2 className="w-4 h-4" />
                    <span className="font-serif text-sm">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <FiMaximize2 className="w-4 h-4" />
                    <span className="font-serif text-sm">Fullscreen</span>
                  </>
                )}
              </motion.button> */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-full hover:bg-blue-700 transition-all"
              >
                <FiDownload className="w-4 h-4" />
                <span className="font-serif text-sm">Download</span>
              </motion.button>
            </div>
          </div>

          <div
            className={`relative ${
              isFullscreen ? "h-[calc(100vh-8rem)]" : "aspect-[1/1.414]"
            } w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden`}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
            <iframe
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume.pdf`}
              className="w-full h-full"
              title="Resume Preview"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}