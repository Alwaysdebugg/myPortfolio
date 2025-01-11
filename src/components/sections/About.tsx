"use client"

import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaReact, FaVuejs, FaHtml5, FaCss3Alt, FaJs, FaNode } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMongodb, SiMysql, SiVite} from "react-icons/si";

export default function About() {
  const items = [
    {
      title: "👨‍💻 About Me",
      description: "",
      header: (
        <div className="flex items-center justify-center w-full h-full rounded-xl p-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            A passionate frontend developer with a love for creating beautiful and functional user interfaces. Currently pursuing Master's degree in Cybersecurity at NYIT.
          </p>
        </div>
      ),
      className: "md:col-span-2",
    },
    {
      title: "🌏 Current in Burnaby",
      description: "",
      header: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
          <div className="relative w-full h-full">
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/Burnaby.png`} 
              alt="Burnaby" 
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "🎓 Graduated from NYIT",
      description: "",
      header: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-wrap">
              Graduated from NYIT with a Master's degree in Cybersecurity.
            </p>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "💪 Work Experience",
      description:
        "",
      header: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-wrap">
               Focused on frontend development and cybersecurity.
            </p>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "💻 Tech Stack",
      description:
        "",
      header: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8">
          <div className="flex flex-wrap gap-2">
          <FaJs className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <FaHtml5 className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <FaCss3Alt className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <BiLogoTypescript className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <FaReact className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <FaVuejs className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <SiVite className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <RiTailwindCssFill className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <FaNode className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <SiMongodb className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          <SiMysql className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      ),
      className: "md:col-span-1",
    },
  ];

  return (
    <section id="about" className="w-full flex flex-col items-center py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 mb-20 w-[80%] mx-auto"></div>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
    </motion.div>
    </section>
  )
} 