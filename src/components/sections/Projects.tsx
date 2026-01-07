"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    title: "Logistics Management System",
    description: "Smart logistics system using Vue3, Vite, and TypeScript.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/ulala_login.png`,
    image2: `${
      process.env.NEXT_PUBLIC_BASE_PATH || ""
    }/images/Back_system2.png`,
    tags: ["Vue3", "Vite", "TypeScript", "ElementUI", "RESTful API"],
    content:
      "This is a smart logistics management system using Vue3 and Vite. The system supports large-scale operations, including order management with a capacity for 100,000+ data entries, alongside features for delivery tracking, route planning, and user access control.",
    features: [
      "Order Management (100,000+ Data Capacity)",
      "Delivery Information Visualization",
      "Vehicle scheduling",
      "Route planning",
      "Approval workflow",
    ],
    link: "https://github.com/Alwaysdebugg/tms-backend-ui",
  },
  // {
  //   title: "Blog Website",
  //   description: "Blog website using React, Express, and MongoDB.",
  //   image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/medium-clone.jpg`,
  //   image2: `${
  //     process.env.NEXT_PUBLIC_BASE_PATH || ""
  //   }/images/medium-clone2.jpg`,
  //   tags: ["React", "Express", "MongoDB", "Tailwind", "Node.js"],
  //   content:
  //     "This is a blog website built with React, Express, and MongoDB. It is a blog website that uses React, Express, and MongoDB to manage the blog of a company.",
  //   features: [
  //     "User authentication",
  //     "Post management",
  //     "Comment management",
  //     "Tag management",
  //     "Report generation"
  //   ],
  //   link: "https://github.com/Alwaysdebugg/myBlog",
  // },
  {
    title: "RecruitPro",
    description:
      "Full-stack platform with resume parsing, interview scheduling, and candidate matching features.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/recruitPro.png`,
    image2: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/recruitPro.png`,
    tags: [
      "React",
      "Tailwind",
      "NestJS",
      "PostgreSQL",
      "Supabase",
      "Redux Toolkit",
    ],
    content:
      "This is a full-stack platform with resume parsing, interview scheduling, and candidate matching features.",
    features: [
      "Resume parsing",
      "Interview scheduling",
      "Candidate matching",
      "Role management",
    ],
    link: "https://github.com/Alwaysdebugg/recruitPro",
  },
  {
    title: "Portfolio Website",
    description:
      "My portfolio website built with React, Next.js, and Tailwind CSS.",
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/portfolio.png`,
    image2: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/portfolio2.png`,
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Framer Motion"],
    content:
      "This is my portfolio website built with React, Next.js, and Tailwind CSS.",
    features: [
      "Bento layout",
      "Animation",
      "Responsive design",
      "Resume download",
      "Project showcase",
    ],
    hostLink: "https://alwaysdebugg.github.io/myPortfolio/",
    link: "https://github.com/Alwaysdebugg/myPortfolio",
  },
];

interface Project {
  title: string;
  image: string;
  description: string;
  tags: string[];
  link?: string;
  content: string;
  image2: string;
  features: string[];
  hostLink?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-xl md:text-3xl text-[#393E46] dark:text-white font-bold mb-12 text-center font-serif">
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
              onClick={() => handleProjectClick(project)}
              className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
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

              <div className="p-6 relative z-10 hover:cursor-pointer">
                <h3 className="w-full h-12 text-lg font-serif font-bold mb-4 text-black dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-lg font-serif text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* 链接按钮 */}
                <div className="flex justify-end space-x-3 mt-4">
                  {project.link &&
                    project.link !== "#" &&
                    project.link.includes("github") && (
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
                  {project.link &&
                    project.link !== "#" &&
                    !project.link.includes("github") && (
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

      <ProjectModal
        project={selectedProject!}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
