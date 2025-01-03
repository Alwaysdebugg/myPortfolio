"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const projects = [
  {
    title: "3D Factory Management Visualization System",
    description: "Implemented an industrial-grade 3D visualization platform for a food factory's backend management system using React and Babylon.js.",
    image: "/images/factory.jpg",
    tags: ["React", "Babylon.js", "Express.js"],
    link: "#"
  },
  {
    title: "E-Commerce Mobile Platform",
    description: "Implemented a mobile e-commerce app with dynamic and responsive user interface components using Vue and Element UI.",
    image: "/images/ecommerce-mobile.jpg",
    tags: ["Vue", "Element UI", "Vuex", "Axios", "Pinia"],
    link: "#"
  },
  {
    title: "Medium Clone (Blog Website)",
    description: "Developed a full-stack blogging platform inspired by Medium using the MERN stack.",
    image: "/images/medium-clone.jpg",
    tags: ["MERN"],
    link: "https://github.com/Alwaysdebugg/myBlog"
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-block bg-white hover:bg-gray-200 dark:bg-blue-600 dark:hover:bg-blue-700 text-black dark:text-white px-4 py-2 rounded-full transition-colors"
                >
                  View Details
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 