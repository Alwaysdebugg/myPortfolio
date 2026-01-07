"use client"

import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaReact, FaVuejs, FaHtml5, FaCss3Alt, FaJs, FaNode, FaPython } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMongodb, SiMysql, SiVite, SiAmazon, SiNestjs } from "react-icons/si";

export default function About() {
  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
            className="absolute w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  const aboutItems = [
    {
      icon: "https://img.icons8.com/?size=100&id=H1TKqeNpWLQj&format=png&color=000000",
      title: "Software Developer",
      description: "Passionate about creating digital experiences"
    },
    {
      icon: "https://img.icons8.com/?size=100&id=B2kE1iYkRIiw&format=png&color=000000",
      title: "3+ years of experience",
      description: "Building robust web applications"
    },
    {
      icon: "https://img.icons8.com/?size=100&id=L4yt8J49G4uU&format=png&color=000000",
      title: "\"Practice makes perfect - My motto\"",
      description: "Continuous improvement mindset"
    },
  ];

  const techStack = [
    { icon: FaJs, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", name: "JavaScript", color: "text-yellow-500" },
    { icon: FaHtml5, href: "https://developer.mozilla.org/en-US/docs/Web/HTML", name: "HTML", color: "text-orange-500" },
    { icon: FaCss3Alt, href: "https://developer.mozilla.org/en-US/docs/Web/CSS", name: "CSS", color: "text-blue-500" },
    { icon: BiLogoTypescript, href: "https://www.typescriptlang.org/docs/", name: "TypeScript", color: "text-blue-600" },
    { icon: FaReact, href: "https://react.dev/", name: "React", color: "text-cyan-500" },
    { icon: FaVuejs, href: "https://vuejs.org/", name: "Vue", color: "text-green-500" },
    { icon: SiVite, href: "https://vitejs.dev/guide/", name: "Vite", color: "text-purple-500" },
    { icon: RiTailwindCssFill, href: "https://tailwindcss.com/docs/installation", name: "Tailwind", color: "text-teal-500" },
    { icon: FaNode, href: "https://nodejs.org/en/docs/", name: "Node.js", color: "text-green-600" },
    { icon: SiMongodb, href: "https://www.mongodb.com/docs/manual/", name: "MongoDB", color: "text-green-700" },
    { icon: SiMysql, href: "https://dev.mysql.com/doc/refman/8.0/en/", name: "MySQL", color: "text-blue-700" },
    { icon: FaPython, href: "https://www.python.org/doc/", name: "Python", color: "text-blue-400" },
    { icon: SiAmazon, href: "https://aws.amazon.com/cn/what-is-aws/", name: "AWS", color: "text-orange-600" },
    { icon: SiNestjs, href: "https://docs.nestjs.com/", name: "NestJS", color: "text-red-500" },
  ];

  const items = [
    {
      title: "About Me",
      description: "",
      header: (
        <div className="w-full p-6 md:p-8 flex flex-col justify-center rounded-xl bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50">
          <div className="mb-6">
            {/* <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4"></div> */}
          </div>
          <div className="space-y-4">
            {aboutItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-start space-x-4 p-3"
              >
                <div className="flex-shrink-0 p-2 rounded-full bg-blue-400/10">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-fluid-base text-black dark:text-white font-serif">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-serif">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
      className: "md:col-span-2 hover:shadow-xl transition-all duration-300 border border-gray-300/50 dark:border-gray-700/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 bg-gray-100/30 dark:bg-gray-900/30 backdrop-blur-sm",
    },
    {
      title: "Location",
      description: "",
      header: (
        <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
          <div className="relative w-full h-full transition-all duration-300 group">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/images/mountain.jpeg`}
              alt="Location - Burnaby, BC"
              fill
              className="object-cover z-0 rounded-xl cursor-pointer brightness-50 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-5"></div>
            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-black/80 dark:text-white/80 text-sm font-medium font-serif">LOCATION</span>
                </div>
                <h3 className="text-black dark:text-white text-fluid-xl font-bold drop-shadow-lg font-serif">
                  Burnaby
                </h3>
                <p className="text-black/90 dark:text-white/90 text-fluid-sm font-medium drop-shadow-lg font-serif">
                  British Columbia, Canada
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-1 hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-blue-400/50 bg-gray-900/30 backdrop-blur-sm",
    },
    {
      title: "Tech Stack",
      description: "",
      header: (
        <div className="w-full h-full rounded-xl p-6 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50">
          <div className="mb-6">
            <h3 className="text-fluid-lg font-bold text-black dark:text-white mb-2 font-serif">
              Tech Stack
            </h3>
            {/* <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div> */}
          </div>
          <div className="flex flex-wrap gap-3 max-h-[260px] overflow-y-auto custom-scrollbar">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <motion.a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="group relative p-3 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 transition-all duration-300 border border-gray-400/50 dark:border-gray-600/50 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-sm hover:shadow-md backdrop-blur-sm"
                >
                  <IconComponent className={`w-7 h-7 ${tech.color} transition-all duration-300`} />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-serif">
                    {tech.name}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      ),
      className: "md:col-span-1 hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-blue-400/50 bg-gray-900/30 backdrop-blur-sm",
    },
    {
      title: "Life & Hobbies",
      description: "",
      header: (
        <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
          <div className="relative w-full h-full min-h-[350px] md:min-h-[300px] transition-all duration-300 group">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/images/fishing.jpeg`}
              alt="Life & Hobbies - Fishing"
              fill
              className="object-cover z-0 rounded-xl cursor-pointer brightness-50 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-5"></div>
            <div className="absolute inset-0 flex items-end justify-center z-10 px-4 cursor-pointer">
              <div className="text-center pb-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 flex justify-center"
                >
                  <div className="p-3 bg-blue-400/20 rounded-full backdrop-blur-sm">
                    <Image
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_PATH || ""
                      }/images/lure.png`}
                      alt="Fishing lure"
                      width={40}
                      height={40}
                      className="object-cover rounded-xl drop-shadow-lg"
                      priority
                    />
                  </div>
                </motion.div>
                <h3 className="text-black dark:text-white text-fluid-lg font-bold drop-shadow-lg mb-2 font-serif">
                  Life Beyond Code
                </h3>
                <p className="text-black/90 dark:text-white/90 text-fluid-sm drop-shadow-lg font-serif">
                  After coding... <br />
                  What else can I do?
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-1 hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-blue-400/50 bg-gray-900/30 backdrop-blur-sm",
    },
    {
      title: "Philosophy",
      description: "",
      header: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-6 rounded-xl py-6 px-6 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 relative overflow-hidden">
          {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="w-12 h-12 mx-auto bg-blue-400/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💭</span>
            </div>
            <blockquote className="text-fluid-base text-black dark:text-white text-center leading-relaxed font-medium italic font-serif">
              "When something is important enough, you do it even if the odds are
              not in your favor."
            </blockquote>
            <div className="flex justify-end">
              <div className="bg-blue-400/10 px-3 py-1 rounded-full">
                <cite className="text-sm text-black dark:text-white font-medium not-italic font-serif">
                  — Elon Musk
                </cite>
              </div>
            </div>
          </motion.div>
        </div>
      ),
      className: "md:col-span-1 hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-blue-400/50 bg-gray-900/30 backdrop-blur-sm",
    },
  ];

  return (
    <section id="about" className="w-full flex flex-col items-center bg-white dark:bg-black text-black dark:text-white relative overflow-hidden py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/20 via-white to-white dark:from-gray-900/20 dark:via-black dark:to-black"></div>
      
      {/* Floating particles */}
      <FloatingParticles />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full relative z-10"
      >
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[25rem]">
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