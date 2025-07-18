"use client"

import { motion } from "framer-motion"
import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-surface-light/80 dark:bg-surface-dark/80 border border-border-light/30 dark:border-border-dark/30 hover:border-accent-primary/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 180,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FiSun className="w-5 h-5 text-accent-warning" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -180,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FiMoon className="w-5 h-5 text-accent-primary" />
        </motion.div>
      </div>
    </motion.button>
  )
} 