"use client"

import React from 'react'
import { motion } from 'framer-motion'

const education = [
  {
    school: "某某大学",
    degree: "计算机科学与技术学士",
    period: "2015 - 2019",
    description: [
      "主修课程：数据结构、算法、计算机网络、操作系统",
      "GPA: 3.8/4.0",
      "获得优秀毕业生称号",
      "参与多个校园技术创新项目"
    ]
  },
  {
    school: "某某培训机构",
    degree: "Web全栈开发认证",
    period: "2019",
    description: [
      "完成为期6个月的全栈开发培训",
      "掌握前端和后端开发技术",
      "独立完成多个实战项目",
      "获得最佳学员称号"
    ]
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          教育背景
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
              <ul className="list-disc list-inside space-y-2">
                {edu.description.map((item, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 