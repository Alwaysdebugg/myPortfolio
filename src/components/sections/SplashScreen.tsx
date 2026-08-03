"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";

interface SplashScreenProps {
  onDragDown?: () => void;
}

const ENTER_THRESHOLD = 110;

const TRACE_POINTS = [
  { left: "8%", top: "18%", size: 2 },
  { left: "17%", top: "72%", size: 3 },
  { left: "31%", top: "12%", size: 2 },
  { left: "43%", top: "82%", size: 2 },
  { left: "58%", top: "22%", size: 3 },
  { left: "69%", top: "68%", size: 2 },
  { left: "81%", top: "14%", size: 2 },
  { left: "91%", top: "78%", size: 3 },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Email Jacky",
    href: "mailto:fengjacky84@gmail.com",
    icon: HiMail,
  },
  {
    label: "Jacky on GitHub",
    href: "https://github.com/Alwaysdebugg",
    icon: FaGithub,
  },
  {
    label: "Jacky on LinkedIn",
    href: "https://www.linkedin.com/in/jfeng-307210291",
    icon: FaLinkedin,
  },
] as const;

const headlineLines = ["Still learning.", "Still building."] as const;

export default function SplashScreen({ onDragDown }: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasEntered = useRef(false);
  const dragY = useMotionValue(0);
  const contentOpacity = useTransform(dragY, [0, ENTER_THRESHOLD], [1, 0.35]);
  const contentScale = useTransform(dragY, [0, ENTER_THRESHOLD], [1, 0.97]);
  const progressScale = useTransform(
    dragY,
    [0, ENTER_THRESHOLD],
    [0.08, 1]
  );

  const enterPortfolio = useCallback(() => {
    if (hasEntered.current) return;
    hasEntered.current = true;
    onDragDown?.();
  }, [onDragDown]);

  return (
    <motion.section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] cursor-grab flex-col overflow-hidden bg-[#f2f0ea] text-neutral-950 active:cursor-grabbing dark:bg-[#050505] dark:text-[#f5f2ea]"
      drag={prefersReducedMotion ? false : "y"}
      dragConstraints={{ top: 0, bottom: 170 }}
      dragElastic={{ top: 0, bottom: 0.12 }}
      onDrag={(_, info) => {
        if (info.offset.y >= ENTER_THRESHOLD) enterPortfolio();
      }}
      onDragEnd={(_, info) => {
        if (info.offset.y >= ENTER_THRESHOLD) enterPortfolio();
      }}
      style={{ y: dragY }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] dark:opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 24%, black 76%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.07] blur-[130px] dark:bg-indigo-400/[0.09]"
      />

      {TRACE_POINTS.map((point, index) => (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full bg-current opacity-30"
          key={`${point.left}-${point.top}`}
          style={{
            left: point.left,
            top: point.top,
            width: point.size,
            height: point.size,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.14, 0.5, 0.14], y: [0, -8, 0] }
          }
          transition={{
            duration: 3.6 + index * 0.22,
            repeat: Infinity,
            delay: index * 0.18,
          }}
        />
      ))}

      <header className="relative z-10 flex items-center justify-between px-5 py-5 font-mono text-[10px] uppercase tracking-[0.22em] sm:px-8 sm:py-7 sm:text-xs lg:px-12">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          <span>Always debugging</span>
        </div>
        <div className="flex items-center gap-5 text-neutral-500 dark:text-neutral-400">
          <span className="hidden sm:inline">Vancouver · PST</span>
          <span>Intro / 01</span>
        </div>
      </header>

      <motion.div
        className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-24 pt-10 sm:px-8 sm:pb-28 lg:px-12"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        <div className="mx-auto w-full max-w-[1120px]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mb-7 font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400 sm:mb-9 sm:text-xs"
          >
            A living technical journal by Jacky Feng
          </motion.p>

          <h1 className="font-serif text-[clamp(2.9rem,8.8vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
            {headlineLines.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.72,
                  delay: 0.18 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="block text-indigo-600 dark:text-indigo-400"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.72,
                delay: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Still debugging.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.78 }}
            className="mt-9 flex flex-col gap-6 border-t border-black/15 pt-5 dark:border-white/15 sm:mt-12 sm:flex-row sm:items-end sm:justify-between sm:pt-6"
          >
            <p className="max-w-md font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
              I build thoughtful interfaces and reliable systems, one question,
              one iteration, and one bug at a time.
            </p>

            <nav aria-label="Social links" className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-neutral-600 transition-colors hover:border-indigo-500 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-white/15 dark:text-neutral-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400 dark:focus-visible:ring-offset-black"
                  whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center px-5 sm:bottom-7">
        <motion.div
          className="flex w-full max-w-xs flex-col items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          <button
            type="button"
            onClick={enterPortfolio}
            className="group flex min-h-11 items-center gap-3 rounded-full px-4 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:text-neutral-400 dark:hover:text-white dark:focus-visible:ring-offset-black sm:text-xs"
          >
            <motion.span
              aria-hidden="true"
              animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="text-base text-indigo-600 dark:text-indigo-400"
            >
              ↓
            </motion.span>
            <span>
              {prefersReducedMotion
                ? "Enter portfolio"
                : "Drag or click to enter"}
            </span>
          </button>

          <div className="h-px w-full overflow-hidden bg-black/15 dark:bg-white/15">
            <motion.div
              aria-hidden="true"
              className="h-full origin-left bg-indigo-600 dark:bg-indigo-400"
              style={{ scaleX: progressScale }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
