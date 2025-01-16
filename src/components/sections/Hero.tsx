"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Hero() {
  const [imageError, setImageError] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const fullText = "<Frontend Developer />"
  
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

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full max-w-6xl mx-auto gap-8 md:gap-16 min-h-100vh px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center md:items-start space-y-8 w-full md:w-1/2"
      >
        <div className="space-y-4 text-center md:text-left">
          <h1 className="w-full text-4xl font-bold md:text-5xl font-mono text-gray-800 dark:text-gray-100">
            Hi, I'm Jiaqi.
          </h1>
          <div className="h-10 font-mono text-2xl md:text-3xl text-gray-800 dark:text-gray-100">
            {displayText}
          </div>
          <div className="flex justify-center md:justify-start gap-2 text-green-400 font-bold font-mono text-xl items-center">
            #React #Frontend #FullStack
          </div>
          <p className="text-gray-800 dark:text-gray-100 font-mono text-sm md:text-base max-w-xl leading-relaxed">
            I'm a passionate front-end developer with a love for exploring diverse technologies.
            On a journey to becoming a full-stack developer. My goal is to build applications that merge purpose with aesthetics. 
          </p>
        </div>

        <div className="flex gap-6">
          <motion.a
            href="https://www.linkedin.com/in/jfeng-307210291"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://github.com/Alwaysdebugg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:fengjacky84@gmail.com"
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
        className="relative w-48 h-48 md:w-80 md:h-80 mb-8 md:mb-0"
      >
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] rounded-full" />
        <div className="relative z-10 w-[80%] h-[80%] mx-auto rounded-full overflow-hidden shadow-2xl">
          {imageError ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/avatar.jpg`}
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