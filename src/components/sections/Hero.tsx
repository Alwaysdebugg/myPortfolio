"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa6'
import { HiMail } from 'react-icons/hi'
import { RiTimeZoneLine } from "react-icons/ri";

export default function Hero() {
  const [imageError, setImageError] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const fullText = "<Thinker. Maker. Doer. />"
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
    <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full max-w-7xl mx-auto gap-8 md:gap-16 min-h-[90vh] px-4 bg-black text-white relative overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black"></div>
      
      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center md:items-start space-y-6 w-full md:w-1/2 relative z-10"
      >
        <div className="space-y-6 text-center md:text-left">
          <div className="flex flex-wrap items-baseline gap-2 md:gap-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-fluid-4xl font-bold text-white font-serif"
            >
              Hello World.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-fluid-2xl font-bold text-white hover:text-blue-400 transition-all duration-300 cursor-pointer hover:scale-105 transform font-serif"
            >
              I’m Jacky
            </motion.span>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-12 font-serif text-fluid-2xl text-gray-400"
          >
            {displayText}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center md:justify-start gap-2 items-center"
          >
            {['Lifelong Learner', "Frontend Developer", "React", "Technical Blogs", "AI Explorer "].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                className="px-2 text-white backdrop-blur-sm text-sm font-bold font-serif"
              >
                #{tech}
              </motion.span>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-6 text-white text-fluid-lg max-w-2xl leading-relaxed font-serif"
          >
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap gap-6 items-center"
        >
          <div className="flex gap-4">
            <motion.a
              href="https://www.linkedin.com/in/jfeng-307210291"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-800/50"
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://github.com/Alwaysdebugg"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-800/50"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
            {/* <motion.a
              href="https://x.com/none168902"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-800/50"
            >
              <FaXTwitter className="w-6 h-6" />
            </motion.a> */}
            <motion.a
              href="mailto:fengjacky84@gmail.com"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-800/50"
            >
              <HiMail className="w-6 h-6" />
            </motion.a>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-gray-600/50">
            <RiTimeZoneLine className="w-4 h-4" />
            <span className="font-serif">
              {currentTime + " (PST)" || "Loading..."}
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-48 h-48 md:w-80 md:h-80 mb-8 md:mb-0 z-10"
      >
        <div className="relative z-10 w-[85%] h-[85%] mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-400/20 hover:ring-blue-400/40 transition-all duration-300">
          {imageError ? (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          ) : (
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/images/avatar_new.png`}
              // src="/images/avatar.jpg"
              alt="Profile picture"
              width={320}
              height={320}
              className="object-cover transition-all duration-300 hover:scale-110 hover:rotate-5"
              onError={() => setImageError(true)}
              priority
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}