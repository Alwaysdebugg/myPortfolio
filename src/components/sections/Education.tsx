"use client"

import React from 'react'
import { motion } from 'framer-motion'

const education = [
  {
    school: "New York Institute of Technology(Vancouver)",
    degree: "Master of Cybersecurity",
    period: "2023 - 2024",
  },
  {
    school: "Shanghai Sanda University",
    degree: "Bachelor of Software Engineering",
    period: "2018 - 2022",
  }
]

export default function Education() {
  return (
    <section id="education" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-black dark:text-white font-sans">
          Education  
        </h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{edu.school}</h3>
                  <h4 className="text-lg text-blue-600">{edu.degree}</h4>
                </div>
                <span className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  {edu.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 