"use client"

import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: "Cognizant",
    position: "Frontend Developer",
    period: "07.2022 - 05.2023",
    description: [
      "Implemented backend management system using React and Babylon.js.",
      "Integrated data from an Express.js backend via RESTful APIs and rendered it onto 3D model.",
      "Developed responsive and interactive user interfaces with React and Ant Design UI.",
      "Collaborated with the development team to implement version control best practices using GitHub."
    ]
  },
  {
    company: "Cognizant",
    position: "Frontend Development Trainee",
    period: "03.2022 - 07.2022",
    description: [
      "Implemented dynamic, responsive user interface components for a mobile e-commerce app.",
      "Integrated centralized state management with Vuex.",
      "Developed interactive data visualization features using ECharts and Leaflet.",
      "Collaborated in a Scrum development environment."
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-black dark:text-white font-serif">
          Work Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-blue-600"
            >
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-0" />
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-1 font-serif">{exp.position}</h3>
                <h4 className="text-lg text-blue-600 mb-2 font-serif">{exp.company}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-serif">{exp.period}</p>
                <ul className="list-disc list-inside space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 font-serif">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 