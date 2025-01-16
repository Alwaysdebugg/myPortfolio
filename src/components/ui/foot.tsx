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
        <div className="border-t border-gray-300 dark:border-gray-700 my-6 md:my-8 w-[90%] md:w-[80%] mx-auto"></div>
        
        <div className="space-y-3 text-sm md:text-base">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-medium">Jacky Feng</span>. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            Keep hungry, keep foolish..
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
