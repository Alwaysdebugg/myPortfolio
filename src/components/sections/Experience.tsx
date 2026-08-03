"use client"

import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: "AlphaPay",
    position: "Software Developer",
    period: "10.2025 - Present",
    description: [
      "Developed a 60+ screen React Native (Expo) app for iOS and Android with Redux Toolkit and React Context.",
      "Automated TestFlight and Google Play delivery with Expo EAS, shell scripts, and in-app OTA update detection.",
      "Led an AI-assisted migration from PHP to Java and Spring Boot, while supporting merchant API integrations and internal payment sandbox testing."
    ]
  },
  {
    company: "Ulala Technologies",
    position: "Software Developer - Frontend / Mobile",
    period: "01.2025 - 05.2025",
    description: [
      "Built responsive logistics dashboards for 100K+ records using virtual scrolling, pagination, and lazy loading.",
      "Implemented a resilient AWS S3 upload pipeline with validation, chunked uploads, and retry handling, reducing failures by 80%.",
      "Established Jenkins CI/CD, reached 95% Jest coverage, and developed real-time delivery tracking with OpenLayers."
    ]
  },
  {
    company: "New York Institute of Technology - Vancouver",
    position: "Full-Stack Developer",
    period: "09.2024 - 12.2024",
    description: [
      "Deployed a RAG-based campus support chatbot with LangChain and a vector store.",
      "Embedded institutional documents to deliver accurate, around-the-clock responses to student inquiries."
    ]
  },
  {
    company: "Cognizant",
    position: "Frontend Developer",
    period: "05.2022 - 05.2023",
    description: [
      "Built React and Babylon.js components that rendered 100+ CAD-derived machine nodes for real-time factory monitoring.",
      "Integrated Redux Toolkit and WebSocket clients supporting 1,000+ concurrent connections.",
      "Worked with backend teams on streaming APIs, helping reduce front-end update latency by more than 40%."
    ]
  },
  {
    company: "Cognizant",
    position: "Frontend Developer Intern",
    period: "03.2022 - 05.2022",
    description: [
      "Developed mobile-first e-commerce modules with Vue.js and Element UI.",
      "Built reusable components and managed application data with Vue Router, Vuex/Pinia, Axios, and REST APIs.",
      "Translated Figma designs into responsive interfaces and collaborated with 4-5 peers through Git and code reviews."
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
