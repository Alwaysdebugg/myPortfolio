"use client"

import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaReact, FaVuejs, FaHtml5, FaCss3Alt, FaJs, FaNode, FaPython } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMongodb, SiMysql, SiVite, SiAmazon, SiNestjs } from "react-icons/si";

export default function About() {
  const items = [
    {
      title: "",
      description: "",
      header: (
        <div className="w-full p-6 md:px-20 flex-row items-center justify-center rounded-xl">
          <ul className="space-y-4 my-4 text-black dark:text-white text-base">
            <li className="flex items-center">
              <Image
                src="https://img.icons8.com/?size=100&id=H1TKqeNpWLQj&format=png&color=000000"
                alt="Software Developer"
                width={50}
                height={50}
              />
              <span className="font-bold text-2xl font-serif ml-2">
                Software Developer
              </span>
            </li>
            <li className="flex items-center">
              <Image
                src="https://img.icons8.com/?size=100&id=B2kE1iYkRIiw&format=png&color=000000"
                alt="Software Developer"
                width={50}
                height={50}
              />
              <span className="font-bold text-xl font-serif ml-2">
                3+ years of experience
              </span>
            </li>
            <li className="flex items-center">
              <Image
                src="https://img.icons8.com/?size=100&id=63765&format=png&color=000000"
                alt="Software Developer"
                width={50}
                height={50}
              />
              <span className="font-bold text-xl font-serif ml-2">
                Journey to Full Stack Developer
              </span>
            </li>
            <li className="flex items-center">
              <Image
                src="https://img.icons8.com/?size=100&id=L4yt8J49G4uU&format=png&color=000000"
                alt="Software Developer"
                width={50}
                height={50}
              />
              <i className="font-bold font-serif ml-2">
                "Practise makes perfect - My motto"
              </i>
            </li>
          </ul>
        </div>
      ),
      className: "md:col-span-2 hover:shadow-xl transition-shadow duration-300",
    },
    {
      title: "",
      description: "",
      header: (
        <div className="w-full h-full flex items-center justify-center rounded-xl">
          <div className="relative w-full h-full transition-all duration-300">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/images/mountain.jpeg`}
              alt="bg-picture"
              fill
              className="object-cover z-0 rounded-xl cursor-pointer brightness-50 hover:brightness-100 transition-all duration-300"
              priority
            />
            <div className="relative z-10 p-4">
              <h1 className="text-white text-3xl font-bold font-serif">
                Burnaby
              </h1>
              <h1 className="text-white text-3xl font-bold font-serif">
                British Columbia, Canada
              </h1>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "",
      description: "",
      header: (
        <div className="w-full h-full rounded-xl px-8 py-8 md:py-6 md:px-6">
          {/* <div className="w-full h-auto flex flex-row items-center justify-center">
            <Image
              src="https://img.icons8.com/?size=100&id=65445&format=png&color=000000"
              alt="Tech Stack"
              width={30}
              height={30}
            />
            <h1 className="text-xl font-bold font-serif">
              Tech Stack
            </h1>
          </div> */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaJs className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaHtml5 className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaCss3Alt className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://www.typescriptlang.org/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoTypescript className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaReact className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaVuejs className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://vitejs.dev/guide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiVite className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://tailwindcss.com/docs/installation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTailwindCssFill className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://nodejs.org/en/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaNode className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://www.mongodb.com/docs/manual/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiMongodb className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://dev.mysql.com/doc/refman/8.0/en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiMysql className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            <a
              href="https://www.python.org/doc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPython className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            {/* aws */}
            <a
              href="https://aws.amazon.com/cn/what-is-aws/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiAmazon className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
            {/* nestjs */}
            <a
              href="https://docs.nestjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiNestjs className="w-10 h-10 text-gray-700 dark:text-gray-300 dark:hover:scale-150 transition-all duration-300" />
            </a>
          </div>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "",
      description: "",
      header: (
        <div className="w-full h-full flex items-center justify-center rounded-xl">
          <div className="relative w-full h-full min-h-[350px] md:min-h-[300px] transition-all duration-300 group">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/images/fishing.jpeg`}
              alt="life hobby"
              fill
              className="object-cover z-0 rounded-xl cursor-pointer brightness-50 group-hover:brightness-100 transition-all duration-300"
              priority
            />
            <div className="absolute inset-0 flex items-end justify-center z-10 px-4 cursor-pointer">
              <p className="text-white text-3xl font-serif font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_BASE_PATH || ""
                  }/images/lure.png`}
                  alt="life hobby"
                  width={50}
                  height={50}
                  className="object-cover z-0 rounded-xl cursor-pointer brightness-50 group-hover:brightness-100 transition-all duration-300"
                  priority
                />
                After coding... <br />
                What else can I do?
              </p>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "",
      description: "",
      header: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 rounded-xl py-6 px-2">
          <i className="font-serif text-lg text-black dark:text-white text-center">
            "When something is important enough, you do it even if the odds are
            not in your favor."
          </i>
          <i className="w-full font-serif text-sm text-black dark:text-white text-right mr-6">
            —— Elon Musk
          </i>
        </div>
      ),
      className: "md:col-span-1",
    },
  ];

  return (
    <section id="about" className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
      {/* line */}
      {/* <div className="relative">
        <div className="border-t-2 border-gray-300 dark:border-gray-700 mt-10 mb-20 w-[80%] mx-auto"></div>
        <div className="absolute inset-x-[10%] top-0 h-3 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
        <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      </div> */}

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