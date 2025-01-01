"use client"

import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    company: "科技有限公司",
    position: "高级前端开发工程师",
    period: "2021 - 至今",
    description: [
      "负责公司核心产品的前端架构设计和开发",
      "优化前端性能，提升页面加载速度和用户体验",
      "指导初级开发人员，组织技术分享会",
      "引入新技术栈，提升开发效率"
    ]
  },
  {
    company: "互联网公司",
    position: "前端开发工程师",
    period: "2019 - 2021",
    description: [
      "参与电商平台的开发和维护",
      "实现响应式设计，确保跨平台兼容性",
      "开发和维护公共组件库",
      "与后端团队协作，优化API接口"
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          工作经验
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
                <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                <h4 className="text-lg text-blue-600 mb-2">{exp.company}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.period}</p>
                <ul className="list-disc list-inside space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300">
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