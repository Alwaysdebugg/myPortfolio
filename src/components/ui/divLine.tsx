"use client"

import { motion } from 'framer-motion'

export const DivLine = () => {
  return (
    <motion.div className="w-full h-full" >
      <div className="relative">
        <div className="border-t-2 border-gray-300 dark:border-gray-700 mt-10 mb-20 w-[80%] mx-auto"></div>
        <div className="absolute inset-x-[10%] top-0 h-3 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
        <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      </div>
    </motion.div>
  );
}