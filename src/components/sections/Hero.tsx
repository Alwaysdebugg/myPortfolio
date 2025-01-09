"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Hero() {
  const [imageError, setImageError] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const fullText = "<Developer />"
  
  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    
    const interval = setInterval(() => {
      if (!isDeleting) {
        // 打字过程
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          // 打字完成后直接切换到删除状态
          isDeleting = true
        }
      } else {
        // 删除过程
        if (currentIndex >= 0) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex--
        } else {
          // 删除完成后直接重新开始
          isDeleting = false
          currentIndex = 0
        }
      }
    }, 100) // 打字速度

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl mx-auto gap-16 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start space-y-8 w-full md:w-1/2"
      >
        <div className="space-y-4">
          <h1 className="w-full text-4xl md:text-5xl font-mono text-gray-400">
            Hi, I'm Jiaqi
          </h1>
          <div className="h-10 font-mono text-2xl md:text-3xl text-gray-500">
            {displayText}
          </div>
          <div className="flex gap-2 text-green-500 font-mono text-xl">
            #FullStack #React #Frontend
          </div>
          <p className="text-gray-400 font-mono text-sm md:text-base max-w-xl leading-relaxed">
            I'm a passionate front-end developer with a love for exploring diverse technologies.
            On a journey to becoming a full-stack developer. My goal is to build applications that merge purpose with aesthetics. 
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:your.email@example.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <HiMail className="w-6 h-6" />
          </motion.a>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-64 h-64 md:w-80 md:h-80"
      >
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full" />
        <div className="relative z-10 w-[80%] h-[80%] mx-auto rounded-full overflow-hidden shadow-2xl">
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