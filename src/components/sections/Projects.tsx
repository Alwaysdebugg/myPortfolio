"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    title: "Logistics Management System",
    description: "Smart logistics system using Vue3, Vite, and TypeScript.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Back_system.png`,
    tags: ["Vue3", "Vite", "TypeScript", "UniApp", "Jenkins", "CI/CD"],
    link: "#"
  },
  {
    title: "Blog Website",
    description: "Blog website using React, Express, and MongoDB.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/medium-clone.jpg`,
    tags: ["React", "Express", "MongoDB", "Tailwind", "Node.js"],
    link: "https://github.com/Alwaysdebugg/myBlog"
  },
  {
    title: "RecruitPro",
    description: "Full-stack platform with resume parsing, interview scheduling, and candidate matching features.",
    image: "https://media2.giphy.com/media/1Or4ky3ZPIRerQMRe7/giphy.gif?cid=6c09b952jplewhopl1cqk72xju9o8nwo6pu22x3d28tfxf6g&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
    tags: ["React", "Tailwind", "NestJS", "PostgreSQL", "Supabase", "Redux Toolkit"],
    link: "https://github.com/Alwaysdebugg/recruitPro"
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
        <h2 className="text-xl md:text-3xl font-bold mb-12 text-center font-serif">
          {"<"}MyProjects {"/>"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* 图片遮罩层 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* 项目标签 - 悬停时显示在图片上方 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-500/80 text-white rounded-full text-xs backdrop-blur-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="w-full h-12 text-lg font-serif font-bold mb-4 text-black dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-lg font-serif text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* 链接按钮 */}
                <div className="flex justify-end space-x-3 mt-4">
                  {project.link && project.link !== "#" && (
                    <motion.a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.link && project.link !== "#" && !project.link.includes("github") && (
                    <motion.a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>
              
              {/* 卡片边框发光效果 */}
              <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/50 rounded-xl transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 