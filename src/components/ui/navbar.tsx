"use client"

import { useEffect, useState } from "react"
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { FaHome, FaProjectDiagram, FaFileAlt, FaCode } from "react-icons/fa"
const navItems = [
  { name: "Home", icon: <FaHome />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/` },
  { name: "Project", icon: <FaProjectDiagram />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/#projects` },
  { name: "Resume", icon: <FaFileAlt />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/resume` },
  { name: "Contributions", icon: <FaCode />, href: `${process.env.NEXT_PUBLIC_BASE_PATH}/#contributions` },
]

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // useEffect(() => {
  //   const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  //   setIsDark(isDarkMode)
  //   document.documentElement.classList.toggle('dark', isDarkMode)
  // }, [])

  // const toggleTheme = () => {
  //   setIsDark(!isDark)
  //   document.documentElement.classList.toggle('dark')
  // }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center py-4">
      {/* Logo */}
      {/* <div className="flex-none p-4">
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100 font-serif ml-4">
          {"<"}JF World{">"}
        </span>
      </div> */}
      {/* Desktop Navigation */}
      <div className="flex items-center justify-center w-full max-w-8xl mx-auto p-4">    
        {/* Navigation Items - Centered */}
        <div className="flex justify-center flex-grow">
          <div className="flex max-w-fit px-8 h-14 items-center gap-8 bg-black/20 backdrop-blur-sm rounded-full border border-gray-700/20">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="font-mono text-lg text-gray-600 hover:text-white dark:text-gray-300 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </div>
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
          {/* <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-gray-600 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </motion.button> */}
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