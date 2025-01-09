"use client"

import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import Navbar from '@/components/ui/navbar'

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'JackyFeng_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              My Resume
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
              Download PDF
            </motion.button>
          </div>
          
          <div className="aspect-[1/1.414] w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="/resume.pdf"
              className="w-full h-full"
              title="Resume Preview"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}