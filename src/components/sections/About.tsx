"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="w-full flex flex-col items-center py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl mx-auto px-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center font-sans">
          About Me
        </h2>
        <motion.div 
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-6 text-lg leading-relaxed text-black dark:text-white">
            <p className="text-center">
              I am a passionate frontend developer with 3 years of experience in web development. I focus on creating intuitive, responsive user interfaces and am passionate about using the latest web technologies to provide an outstanding user experience.
            </p>
            <p className="text-center">
              In my career, I have participated in the development of multiple large projects, including e-commerce platforms, enterprise management systems, and social media applications. I am proficient in using modern frontend frameworks such as React, Next.js, and have a deep understanding of performance optimization and accessibility.
            </p>
            <p className="text-center">
              In addition to technical skills, I am also a great team collaborator. I believe that good communication and a positive attitude are key to project success. In my free time, I enjoy researching new technologies, participating in open source projects, and sharing my knowledge and experience through technical blogs.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
} 