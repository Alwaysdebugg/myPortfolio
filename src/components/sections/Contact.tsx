"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里添加表单提交逻辑
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className="min-h-screen py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-800 dark:text-white">
          联系我
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">联系方式</h3>
            <div className="space-y-4 text-[0.8em]">
              <p className="flex items-center space-x-2">
                <MdEmail className="w-[1em] h-[1em] text-blue-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">example@email.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <MdPhone className="w-[1em] h-[1em] text-blue-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">+86 123 4567 8900</span>
              </p>
              <p className="flex items-center space-x-2">
                <MdLocationOn className="w-[1em] h-[1em] text-blue-600 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">北京市朝阳区</span>
              </p>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">社交媒体</h3>
              <div className="flex space-x-3 text-[0.8em]">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FaGithub className="w-[1em] h-[1em]" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FaLinkedin className="w-[1em] h-[1em]" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
          >
            {/* <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/5 dark:bg-gray-700/5 border border-white/10 dark:border-gray-600/10 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/5 dark:bg-gray-700/5 border border-white/10 dark:border-gray-600/10 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  留言
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 dark:bg-gray-700/5 border border-white/10 dark:border-gray-600/10 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600/80 hover:bg-blue-700/80 text-white font-medium py-3 px-4 rounded-lg transition-colors backdrop-blur-sm"
              >
                发送消息
              </motion.button>
            </form> */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 