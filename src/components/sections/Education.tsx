"use client"

import React from 'react'
import { motion } from 'framer-motion'

const education = [
  {
    school: "New York Institute of Technology (Vancouver) ",
    degree: "Master of Cybersecurity",
    image: "https://www.internationalexperience.ca/wp-content/uploads/2020/06/logo-3.png",
    period: "2023.09 - 2024.12",
    coursework: "Web Development Security, Network Security, Cryptography, Data Center Security, Intrusion Detection, Security Risk Management"
  }
]

export default function Education() {
  return (
    <section id="education" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-xl md:text-3xl font-bold mb-12 text-center font-serif">
          {"<"}MyEducation {"/>"}
        </h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center space-x-10 mb-4">
                  <img
                    src={edu.image}
                    alt="Education"
                    className="w-20 h-20 rounded-full mb-4"
                  />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold font-serif">{edu.school}</h1>
                  <p className="text-lg font-serif text-yellow-500">
                    {edu.degree}
                  </p>
                  <span className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                    {edu.period}
                  </span>
                  {/* coursework */}
                  <div className="flex flex-wrap">
                    <p className="text-sm font-serif font-bold text-gray-600 dark:text-gray-400">
                      Coursework:
                    </p>
                    <p className="text-sm font-serif text-gray-600 dark:text-gray-400">
                      {edu.coursework}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 