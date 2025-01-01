"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const projects = [
  {
    title: "电商平台",
    description: "基于Next.js和TailwindCSS开发的现代电商平台，支持商品展示、购物车、支付等功能",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    link: "#"
  },
  {
    title: "企业管理系统",
    description: "一个完整的企业资源管理系统，包含人事管理、财务管理、项目管理等模块",
    image: "/projects/management.jpg",
    tags: ["React", "Ant Design", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "社交媒体应用",
    description: "类似Instagram的社交媒体应用，支持图片上传、滤镜、评论等功能",
    image: "/projects/social.jpg",
    tags: ["React Native", "Firebase", "Redux", "Express"],
    link: "#"
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
          项目经验
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
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  查看详情
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 