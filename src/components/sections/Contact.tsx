"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id="contact" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16"
      >
        <div className="border-t border-gray-300 dark:border-gray-700 my-8"></div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-lg mx-auto">
          Feel free to reach out to me through any of these channels
        </p>
        
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 dark:bg-gray-800/10 rounded-2xl p-8 shadow-lg transition-all duration-300 w-full max-w-xl"
          >
            <div className="w-full space-y-2">
              <div className="group flex items-center space-x-4 p-2 rounded-xl transition-all duration-300">
                <div className="p-3 bg-blue-100/10 dark:bg-blue-900/10 rounded-lg">
                  <MdEmail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-300 text-sm">fengjacky84@gmail.com</span>
              </div>
              <a 
                href="https://www.linkedin.com/in/jfeng-307210291" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-4 p-2 rounded-xl transition-all duration-300"
              >
                <div className="p-3 bg-blue-100/10 dark:bg-blue-900/10 rounded-lg">
                  <FaLinkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-300 text-sm">https://www.linkedin.com/in/jfeng-307210291</span>
              </a>
              <a 
                href="https://github.com/Alwaysdebugg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center space-x-4 p-2 rounded-xl transition-all duration-300"
              >
                <div className="p-3 bg-blue-100/10 dark:bg-blue-900/10 rounded-lg">
                  <FaGithub className="w-6 h-6 hover:underline text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-600 dark:text-gray-300 text-sm">Alwaysdebugg</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 