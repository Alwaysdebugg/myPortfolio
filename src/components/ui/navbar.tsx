"use client"

import { useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi"
import { motion } from "framer-motion"

const navItems = [
  { name: "Home", href: "/myPortfolio" },
  { name: "Project", href: "#projects" },
  { name: "Resume", href: "/resume" },
  { name: "Message", href: "#contact" },
]

export default function Navbar() {
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
    <nav className="flex justify-center py-4 md: max-w-4xl mx-auto">
      <div className="max-w-fit px-8 h-14 flex items-center gap-8 bg-black/20 backdrop-blur-sm rounded-full">
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="font-mono text-lg text-gray-600 hover:text-white dark:text-gray-300 transition-colors "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
          </motion.a>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-white/10 text-lg text-gray-600 dark:text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
        </motion.button>
      </div>
    </nav>
  )
}