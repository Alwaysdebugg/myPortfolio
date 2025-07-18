"use client"

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6'
import { HiMail } from 'react-icons/hi'
import { useState } from 'react'

interface SplashScreenProps {
  onDragDown?: () => void;
}

export default function SplashScreen({ onDragDown }: SplashScreenProps) {
  const [dragY, setDragY] = useState(0);

  return (
    <motion.section 
      className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing"
      drag="y"
      dragConstraints={{ top: 0, bottom: 200 }}
      onDrag={(_, info) => {
        setDragY(info.offset.y);
        if (info.offset.y > 100) {
          onDragDown?.();
        }
      }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100) {
          onDragDown?.();
        }
        setDragY(0);
      }}
      style={{ y: dragY }}
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black"></div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* First line with emoji animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 text-white font-serif flex-wrap">
            <span className="text-5xl md:text-7xl font-bold">Frontend</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-5xl md:text-7xl"
            >
              💻
            </motion.span>
            <span className="text-5xl md:text-7xl font-bold">Developer</span>
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
              className="text-5xl md:text-7xl"
            >
              ⚡
            </motion.span>
            <span className="text-5xl md:text-7xl font-bold">,</span>
          </div>
        </motion.div>

        {/* Second line with emoji animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 text-white font-serif flex-wrap">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-5xl md:text-7xl"
            >
              🚀
            </motion.span>
            <span className="text-5xl md:text-7xl font-bold">Problem</span>
            <span className="text-5xl md:text-7xl font-bold">Solver</span>
            <span className="text-5xl md:text-7xl font-bold">&</span>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, delay: 1 }}
              className="text-5xl md:text-7xl"
            >
              🎯
            </motion.span>
            <span className="text-5xl md:text-7xl font-bold">Innovator</span>
            <span className="text-5xl md:text-7xl font-bold">.</span>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-6"
        >
          <span className="text-gray-400 font-serif text-xl mr-4">Jacky Feng</span>
          <motion.a
            href="mailto:fengjacky84@gmail.com"
            whileHover={{ scale: 1.2, color: '#6366f1' }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <HiMail className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://github.com/Alwaysdebugg"
            whileHover={{ scale: 1.2, color: '#6366f1' }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/jfeng-307210291"
            whileHover={{ scale: 1.2, color: '#6366f1' }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </motion.a>
          {/* <motion.a
            href="https://x.com/none168902"
            whileHover={{ scale: 1.2, color: '#6366f1' }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaXTwitter className="w-6 h-6" />
          </motion.a> */}
        </motion.div>
      </div>

      {/* Drag indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 text-center"
        >
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
            </motion.div>
            <p className="text-sm font-serif">Drag down to explore</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
    </motion.section>
  )
}