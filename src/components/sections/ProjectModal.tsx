// 项目详情弹窗
"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Image from 'next/image'   

interface ProjectModalProps {
    project?: {
        title: string;
        image: string;
        description: string;
        tags: string[];
        link?: string;
        content: string;
        image2: string;
        features: string[];
        hostLink?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    if (!isOpen || !project) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed px-6 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-xl h-[85vh] md:h-[80vh] max-h-[700px] overflow-hidden bg-[#DFD0B8] dark:bg-gray-900 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 项目图片 */}
            <div className="relative h-64">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-2xl"
                />
            </div>

            {/* 项目信息 */}
            <div className="p-6 h-[calc(100%-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-gray-100 dark:scrollbar-track-gray-900">
                <h2 className="text-[16px] md:text-2xl font-bold mb-2 font-serif text-black dark:text-white">{project.title}</h2>
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-[#F4CE14] text-[#379777] dark:text-green-400 dark:bg-green-400/10 rounded-full font-serif text-sm font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
                {/* 项目介绍 */}
                <div className="mb-4">
                    <h3 className="text-[16px] md:text-xl font-bold mb-2 font-serif text-black dark:text-white">Introduction</h3>
                    <p className="text-[14px] md:text-base text-gray-600 dark:text-gray-400 font-serif">{project.content}</p>
                    <h3 className="text-[16px] md:text-xl font-bold mb-2 mt-4 font-serif text-black dark:text-white">Features</h3>
                    {project.features.map((feature,index) => {
                        return (
                            <li key={index} className="text-[14px] md:text-base text-gray-600 dark:text-gray-400 font-serif">
                                {feature}
                            </li>
                        )
                    })}
                </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
}

export default ProjectModal;

