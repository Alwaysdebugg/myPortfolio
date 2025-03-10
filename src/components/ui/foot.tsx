"use client"

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="w-full text-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* line */}
        <div className="relative">
          <div className="border-t-2 border-gray-300 dark:border-gray-700 mt-10 mb-20 w-[80%] mx-auto"></div>
          <div className="absolute inset-x-[10%] top-0 h-3 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
          <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        </div>
        <div className="space-y-3 text-sm md:text-base">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium">Jacky Feng</span>. All rights
            reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            Keep hungry, keep foolish..
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
