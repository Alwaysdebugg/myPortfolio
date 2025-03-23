"use client"

import { useEffect, useState } from "react"
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { FaHome, FaProjectDiagram, FaFileAlt, FaCode } from "react-icons/fa"
const navItems = [
  { name: "Home", icon: <FaHome />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/` },
  { name: "Project", icon: <FaProjectDiagram />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/#projects` },
  { name: "Resume", icon: <FaFileAlt />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/resume` },
  { name: "Education", icon: <FaCode />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/#education` },
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

  // 添加点击外部关闭菜单的功能
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu')
      if (menu && !menu.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // 添加滚动时自动关闭菜单
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Logo */}
      {/* <div className="flex-none p-4">
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100 font-serif ml-4">
          {"<"}JF World{">"}
        </span>
      </div> */}
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center w-full max-w-8xl mx-auto p-4">    
        <div className="flex max-w-fit px-8 h-14 items-center gap-8 bg-black/20 backdrop-blur-sm rounded-full border border-gray-700/20">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="font-serif text-lg text-thin text-gray-600 hover:text-white dark:text-gray-300 transition-colors relative group flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Theme Toggle - Right */}
      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-white transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
      </motion.button> */}

      {/* Mobile Navigation */}
      <div className="md:hidden w-full px-4 py-2">
        <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="text-gray-600 dark:text-gray-300 p-2 hover:text-white transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-18 left-4 right-4 bg-black/90 backdrop-blur-lg rounded-xl shadow-lg p-4 z-50 border border-gray-700/20"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="font-mono text-base text-gray-300 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/10 flex items-center gap-3"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
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