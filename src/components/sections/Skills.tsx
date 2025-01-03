"use client"

import React from 'react'
import { motion } from 'framer-motion'

const skills = {
  "Frontend Development": [
    { name: "HTML5/CSS3", level: 95 },
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "React", level: 90 },
    { name: "Vue", level: 85 },
    { name: "TailwindCSS", level: 90 }
  ],
  "Backend Development": [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "MySQL", level: 85 }
  ],
  "Development Tools": [
    { name: "Git", level: 90 },
    { name: "Vite", level: 80 },
    { name: "Webpack", level: 80 },
    { name: "Docker", level: 70 }
  ]
}

export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Tech Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6">{category}</h3>
              <div className="space-y-4">
                {items.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-blue-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 