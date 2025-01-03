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
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            <span className="text-4xl text-white">👋</span>
            <span className="ml-2">Hello, I'm</span>
            <span className="text-black dark:text-white ml-2 text-4xl italic font-medium tracking-wide">Jacky</span>
          </h1>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto leading-relaxed text-start">
          🌟 Passionate Front-end developer with a love for exploring diverse technologies. 
          On a journey to becoming a full-stack developer.
          </p>
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