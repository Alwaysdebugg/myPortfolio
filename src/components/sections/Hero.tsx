"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Hero() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl mx-auto gap-16 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-8 w-full md:w-1/2"
      >
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-400/80">
            <span className="text-4xl text-white">👋</span>
            <span className="ml-2">Hello, I'm</span>
            <span className="text-white ml-2">Jacky</span>
          </h1>
          <p className="text-xl text-gray-400/80 max-w-2xl mx-auto leading-relaxed text-balance">
            I'm a frontend developer who loves creating beautiful user interfaces and focusing on developing high-performance, accessible web applications.
          </p>
        </div>
        <div className="flex gap-6 justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
          >
            Contact Me
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-64 h-64 md:w-80 md:h-80"
      >
        {/* 发光效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50" />
        
        {/* 头像容器 */}
        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
          {imageError ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          ) : (
            <Image
              src="/images/avatar.jpg"
              alt="Profile picture"
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />
          )}
        </div>
      </motion.div>
    </div>
  )
} 