"use client";

import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // 根据当前主题选择图标
  const getIcon = () => {
    switch (theme) {
      case "light":
        return <FiSun className="w-5 h-5 text-accent-warning" />;
      case "dark":
        return <FiMoon className="w-5 h-5 text-accent-primary" />;
      case "system":
        return <FiMonitor className="w-5 h-5 text-accent-secondary" />;
    }
  };

  const getAriaLabel = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system theme";
      case "system":
        return "Switch to light mode";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-surface-light/80 dark:bg-surface-dark/80 border border-border-light/30 dark:border-border-dark/30 hover:border-accent-primary/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
      aria-label={getAriaLabel()}
    >
      <div className="relative w-5 h-5">
        <motion.div
          key={theme}
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {getIcon()}
        </motion.div>
      </div>
    </motion.button>
  );
}
