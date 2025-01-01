"use client"

import { useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi"
import { motion } from "framer-motion"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-inherit backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-end">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
          whileTap={{ scale: 0.9, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-800 dark:text-white hover:bg-white/20 transition-all duration-200 ease-in-out"
          aria-label="Toggle theme"
        >
          {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </motion.button>
      </div>
    </nav>
  )
}