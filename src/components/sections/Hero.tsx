"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { HiMail } from 'react-icons/hi'
import { RiTimeZoneLine } from "react-icons/ri";

export default function Hero() {
  const [imageError, setImageError] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const fullText = "<Frontend Developer />"
  const [currentTime, setCurrentTime] = useState<string>('')
  
  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    
    const interval = setInterval(() => {
      if (!isDeleting) {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          isDeleting = true
        }
      } else {
        if (currentIndex >= 0) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex--
        } else {
          isDeleting = false
          currentIndex = 0
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // 仅在客户端更新时间
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }
    
    updateTime() // 初始化
    const timer = setInterval(updateTime, 1000) // 每秒更新
    
    return () => clearInterval(timer) // 清理定时器
  }, [])

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full max-w-6xl mx-auto gap-8 md:gap-16 min-h-100vh px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center md:items-start space-y-8 w-full md:w-1/2"
      >
        <div className="space-y-4 text-center md:text-left">
          <span className="w-full text-4xl font-bold md:text-5xl font-serif text-gray-800 dark:text-gray-100">
            Hola, I'm
          </span>
          <span className="ml-5 text-4xl font-bold md:text-5xl font-serif text-gray-800 dark:text-gray-100 italic hover:not-italic transition-all duration-300 cursor-pointer">Jiaqi</span>
          <div className="h-10 font-mono text-2xl md:text-2xl text-gray-800 dark:text-gray-100">
            {displayText}
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-green-400 font-bold font-mono text-lg items-center">
            <span className="px-3 py-1 bg-green-400/10 rounded-full hover:bg-green-400/20 transition-all duration-300 cursor-pointer">#React</span>
            <span className="px-3 py-1 bg-green-400/10 rounded-full hover:bg-green-400/20 transition-all duration-300 cursor-pointer">#Frontend</span>
            <span className="px-3 py-1 bg-green-400/10 rounded-full hover:bg-green-400/20 transition-all duration-300 cursor-pointer">#FullStack</span>
            <span className="px-3 py-1 bg-green-400/10 rounded-full hover:bg-green-400/20 transition-all duration-300 cursor-pointer">#Code</span>
          </div>
          <div className="space-y-6 text-gray-800 dark:text-gray-100 text-base md:text-lg max-w-xl leading-relaxed font-mono">
            <div className="group flex items-start space-x-2 hover:translate-x-2 transition-all duration-300">
              <span className="text-green-500 dark:text-green-400 opacity-70">//</span>
              <p className="group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">
                Bringing ideas to life through code excites me the most—I enjoy the process of turning concepts into functional and engaging experiences.
              </p>
            </div>
            
            <div className="group flex items-start space-x-2 hover:translate-x-2 transition-all duration-300">
              <span className="text-green-500 dark:text-green-400 opacity-70">//</span>
              <p className="group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors duration-300">
                Whether it's a small feature or a full-fledged application, I thrive on solving problems and crafting seamless user interfaces.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <motion.a
            href="https://www.linkedin.com/in/jfeng-307210291"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors hover:scale-210"
          >
            <FaLinkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://github.com/Alwaysdebugg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors hover:scale-210"
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
          {/* Twitter */}
          <motion.a
            href="https://x.com/none168902"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors hover:scale-210"
          >
            <FaXTwitter className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:fengjacky84@gmail.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors hover:scale-210"
          >
            <HiMail className="w-6 h-6" />
          </motion.a>
          {/* 所处时区 */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <RiTimeZoneLine className="w-6 h-6" />
            <span>{currentTime + ' (PST)' || '加载中...'}</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-48 h-48 md:w-80 md:h-80 mb-8 md:mb-0"
      >
        <div className="relative z-10 w-[80%] h-[80%] mx-auto rounded-full overflow-hidden shadow-2xl">
          {imageError ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/avatar.jpg`}
              // src="/images/avatar.jpg"
              alt="Profile picture"
              fill
              className="object-cover transition-all duration-300 hover:scale-110 hover:rotate-5"
              onError={() => setImageError(true)}
              priority
            />
          )}
        </div>
      </motion.div>
    </div>
  )
} 