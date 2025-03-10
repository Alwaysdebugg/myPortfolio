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
      title: "",
      description: "",
      header: (
        <div className="flex-row items-center justify-center w-full h-full rounded-xl p-8 transition-all duration-300 dark:bg-gray-800 dark:hover:bg-gray-700">
          <ul className="list-none space-y-2 my-4 text-gray-700 dark:text-gray-300 text-base transition-transform duration-300 group-hover:translate-x-2">
            <li className="flex items-center">
              <span className="mr-2">👋</span>
              Also can call me <i className="ml-2 font-bold">Jacky</i>
            </li>
            <li className="flex items-center">
              <span className="mr-2">👨‍💻</span>
              Frontend Developer
            </li>
            <li className="flex items-center">
              <span className="mr-2">🎓</span>
              {"<"}Software Engineer{">"}&{"<"}Cybersecurity{">"}
            </li>
            <li className="flex items-center">
              <span className="mr-2">🚀</span>
              Journey to a <i className="ml-2 mr-2 font-bold">self-taught</i> developer
            </li>
            <li className="flex items-center">
              <span className="mr-2">🏞️</span>
              Outdoor Enthusiast
            </li>
            <li className="flex items-center">
              <span className="mr-2">💪</span>
              <i className="font-bold">"Practise makes perfect"</i>
            </li>
            <li className="flex items-center">
              <span className="mr-2">🏠</span>
              <a href="https://alwaysdebugg.github.io/hexoBlog2025" target="_blank" rel="noopener noreferrer">
                <i className="font-bold">My Blog</i>
              </a>
            </li>
          </ul>
        </div>
      ),
      className: "md:col-span-2 hover:shadow-xl transition-shadow duration-300",
    },
    {
      title: "🌏 Current in Vancouver",
      description: "",
      header: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
          <div className="relative w-full h-full transition-all duration-300">
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Burnaby.png`} 
              alt="Burnaby" 
              fill
              className="object-cover rounded-xl brightness-50 hover:brightness-100 transition-all duration-300"
              priority
            />
          </div>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "💻 Tech Stack",
      description: "Click the icons to learn more..",
      header: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8">
          <div className="flex flex-wrap gap-2">
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
              <FaJs className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">
              <FaHtml5 className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">
              <FaCss3Alt className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer">
              <BiLogoTypescript className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
              <FaReact className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
              <FaVuejs className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer">
              <SiVite className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://tailwindcss.com/docs/installation" target="_blank" rel="noopener noreferrer">
              <RiTailwindCssFill className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://nodejs.org/en/docs/" target="_blank" rel="noopener noreferrer">
              <FaNode className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://www.mongodb.com/docs/manual/" target="_blank" rel="noopener noreferrer">
              <SiMongodb className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
            <a href="https://dev.mysql.com/doc/refman/8.0/en/" target="_blank" rel="noopener noreferrer">
              <SiMysql className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-110 transition-all duration-300" />
            </a>
          </div>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "🧑‍💼 Work Experience",
      description:
        "Life is short, practice more.....",
      header: (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-2">
            <p className="text-lg text-gray-700 dark:text-gray-300 text-left">
               2 yoe in Web Dev.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-left">
               EX worked in Cognizant as a <i className="font-bold">Software Engineer</i>
            </p>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "💡 Motto",
      description:
        "Good ideas are like good friends.",
      header: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8">
          <i className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            " Turning life's fun ideas into reality with technology "
          </i>
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
      {/* line */}
      <div className="relative">
        <div className="border-t-2 border-gray-300 dark:border-gray-700 mt-10 mb-20 w-[80%] mx-auto"></div>
        <div className="absolute inset-x-[10%] top-0 h-3 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
        <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      </div>

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