"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { HERO_CONTENT } from "@/constants/heroContent";

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // 光标闪烁效果
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // 打字机效果
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeSpeed = 100; // 打字速度
    const deleteSpeed = 50; // 删除速度
    const pauseTime = 2000; // 暂停时间

    const type = () => {
      const currentText = HERO_CONTENT.typewriterText[currentTextIndex];

      if (!isDeleting) {
        // 正在打字
        setDisplayText(currentText.slice(0, currentCharIndex));
        currentCharIndex++;

        if (currentCharIndex > currentText.length) {
          // 打字完成，暂停后开始删除
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, pauseTime);
          return;
        }
      } else {
        // 正在删除
        currentCharIndex--;
        setDisplayText(currentText.slice(0, currentCharIndex));

        if (currentCharIndex === 0) {
          // 删除完成，切换到下一个文本
          isDeleting = false;
          currentTextIndex =
            (currentTextIndex + 1) % HERO_CONTENT.typewriterText.length;
        }
      }

      // 继续动画
      timeoutId = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    };

    // 开始动画
    timeoutId = setTimeout(type, typeSpeed);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      id="hero"
      className="flex flex-col md:flex-row justify-center items-center w-full gap-8 md:gap-20 min-h-[70vh] py-20 md:py-0 px-4 sm:px-6 text-black dark:text-white relative overflow-visible"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/20 via-transparent to-transparent dark:from-gray-900/20 dark:via-transparent dark:to-transparent"></div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
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

      {/* Left side - Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-12 relative w-48 md:w-80 mb-8 md:mb-0 z-10"
      >
        <div className="relative z-10 w-[85%] h-[85%] mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-400/20">
          {imageError ? (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
          ) : (
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/images/avatar_2025.png`}
              // src="/images/avatar.jpg"
              alt="Profile picture"
              width={320}
              height={320}
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />
          )}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap gap-6 items-center"
        >
          <div className="flex gap-4">
            <motion.a
              href={HERO_CONTENT.social.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={HERO_CONTENT.social.linkedin.label}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href={HERO_CONTENT.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={HERO_CONTENT.social.github.label}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
            <motion.a
              href={HERO_CONTENT.social.email.url}
              aria-label={HERO_CONTENT.social.email.label}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
            >
              <HiMail className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side - Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center md:items-start space-y-6 w-full md:w-1/2 relative z-10"
      >
        <div className="space-y-6 text-center md:text-left">
          <div className="flex flex-col gap-2 md:gap-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-fluid-4xl font-bold text-black dark:text-white font-serif"
            >
              {HERO_CONTENT.greeting}
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="h-12 font-serif text-fluid-2xl text-gray-600 dark:text-gray-400"
            >
              {displayText}
              <span
                className={`${
                  showCursor ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              >
                |
              </span>
            </motion.div>

            {/* Introduction paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4 max-w-2xl text-left"
            >
              {HERO_CONTENT.introduction.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 font-sans"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-6 text-black dark:text-white text-fluid-lg max-w-2xl leading-relaxed font-serif"
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
}
