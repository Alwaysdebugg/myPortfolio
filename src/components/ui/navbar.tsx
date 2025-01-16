"use client"

import { useEffect, useState } from "react"
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home", href: "/myPortfolio" },
  { name: "Project", href: "/myPortfolio#projects" },
  { name: "Resume", href: "/myPortfolio/resume" },
  { name: "Message", href: "/myPortfolio#contact" },
]

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="relative flex justify-center py-4 md:max-w-4xl mx-auto">
      {/* Desktop Navigation */}
      <div className="hidden md:flex max-w-fit px-8 h-14 items-center gap-8 bg-black/20 backdrop-blur-sm rounded-full">
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="font-mono text-lg text-gray-600 hover:text-white dark:text-gray-300 transition-colors"
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
          className="p-2 rounded-full hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full px-4">
        <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="text-gray-600 dark:text-gray-300 p-2"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-gray-600 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="font-mono text-base text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}