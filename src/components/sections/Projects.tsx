"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const projects = [
  {
    title: "3D Management Visualization System",
    description: "Implemented an industrial-grade 3D visualization platform for a food factory's backend management system using React and Babylon.js.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/factory.jpg`,
    tags: ["React", "Babylon.js", "Express.js", "Redux", "TailwindCSS", "Websocket"],
    link: "#"
  },
  {
    title: "E-Commerce Mobile Platform",
    description: "Implemented a mobile e-commerce app with dynamic and responsive user interface components using Vue and Element UI.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/ecommerce-mobile.jpg`,
    tags: ["Vue", "Element UI", "Axios", "Pinia", "Vite", "TailwindCSS"],
    link: "#"
  },
  {
    title: "Medium Clone (Blog Website)",
    description: "Developed a full-stack blogging platform inspired by Medium using the MERN stack.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/medium-clone.jpg`,
    tags: ["React","Node.js","Express","MongoDB","TailwindCSS","Vite","Redux"],
    link: "https://github.com/Alwaysdebugg/myBlog"
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        {/* line */}
        <div className="relative">
          <div className="border-t-2 border-gray-300 dark:border-gray-700 mt-10 mb-20 w-[80%] mx-auto"></div>
          <div className="absolute inset-x-[10%] top-0 h-3 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
          <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
        </div>
        <h2 className="text-xl md:text-3xl font-bold mb-12 text-center font-serif">
          {"<"}MyProjects..{"/>"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer">
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
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {project.link && project.link !== "#" && (
                    <a href={project.link}></a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 