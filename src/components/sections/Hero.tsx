"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import { HERO_CONTENT } from "@/constants/heroContent";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const AVATAR_IMAGE_SRC = `${BASE_PATH}/images/avatar_2025.png`;

const evidence = [
  { value: "3+", label: "years building across Canada & Asia" },
  { value: "100K+", label: "records handled in a production UI" },
  { value: "30%", label: "fewer manual inquiries with a RAG assistant" },
];

const tracePrompts = [
  "What is Jacky's strongest engineering evidence?",
  "How does Jacky approach product decisions?",
  "Which project should I ask him about?",
];

interface HeroProps {
  onAskAI: (question?: string) => void;
}

export default function Hero({ onAskAI }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const handleImageError = useCallback(() => setImageError(true), []);

  const reveal = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: "easeOut" as const };

  return (
    <main id="hero" className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reveal}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-black/10 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:border-white/10 dark:text-neutral-400 sm:text-xs">
          <span>01 / Home</span>
          <span>Vancouver, BC · Frontend / Mobile / Full Stack</span>
        </div>

        <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:gap-16 lg:py-16">
          <section aria-labelledby="jacky-heading" className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-indigo-600 dark:text-indigo-400 sm:text-xs">
                Jacky Feng / Software developer
              </p>
              <h1
                id="jacky-heading"
                className="mt-6 max-w-4xl font-serif text-[clamp(3.6rem,9vw,7.8rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-neutral-950 dark:text-[#f5f2ea]"
              >
                I build,
                <br />
                then I question
                <br />
                what I built<span className="text-indigo-600 dark:text-indigo-400">.</span>
              </h1>

              <p className="mt-8 max-w-2xl font-sans text-base leading-8 text-neutral-600 dark:text-neutral-400 sm:mt-10 sm:text-lg">
                I&apos;m Jacky, a Vancouver-based developer working across React,
                React Native, backend systems, and AI products. This site is not
                a finished portrait. It is a record of the decisions, mistakes,
                and revisions behind the work.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-xs">
              <a
                href={HERO_CONTENT.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-black/25 pb-1 transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-white/25 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
              >
                LinkedIn ↗
              </a>
              <a
                href={HERO_CONTENT.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-black/25 pb-1 transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-white/25 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
              >
                GitHub ↗
              </a>
              <a
                href={HERO_CONTENT.social.email.url}
                className="border-b border-black/25 pb-1 transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-white/25 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
              >
                Email ↗
              </a>
              <a
                href={`${BASE_PATH}/resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-black/25 pb-1 transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-white/25 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
              >
                Résumé ↗
              </a>
            </div>
          </section>

          <aside className="flex flex-col gap-6" aria-label="Portrait and current focus">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 dark:bg-neutral-900">
                {imageError ? (
                  <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Portrait unavailable
                  </div>
                ) : (
                  <Image
                    src={AVATAR_IMAGE_SRC}
                    alt="Jacky Feng"
                    fill
                    priority
                    sizes="(min-width: 1024px) 360px, 80vw"
                    className="object-cover object-center grayscale-[20%] contrast-[1.03]"
                    onError={handleImageError}
                  />
                )}
                <span className="absolute left-4 top-4 bg-[#f4f1eb] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-900 dark:bg-[#080808] dark:text-neutral-100">
                  Subject / 01
                </span>
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:text-[10px]">
                <span>Jacky, in progress</span>
                <span>2026</span>
              </figcaption>
            </figure>

            <div className="border-l-2 border-indigo-500 pl-4 font-sans text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              Currently interested in interfaces that make complex systems feel
              legible—and AI features that earn their place in the product.
            </div>
          </aside>
        </div>

        <section aria-labelledby="evidence-heading" className="border-t border-black/10 dark:border-white/10">
          <div className="grid lg:grid-cols-[0.55fr_1.45fr]">
            <div className="border-b border-black/10 py-8 dark:border-white/10 lg:border-b-0 lg:border-r lg:pr-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-500 sm:text-xs">
                02 / Selected evidence
              </p>
              <h2 id="evidence-heading" className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Claims need receipts<span className="text-indigo-600 dark:text-indigo-400">.</span>
              </h2>
            </div>
            <dl className="grid sm:grid-cols-3 lg:pl-10">
              {evidence.map((item) => (
                <div
                  key={item.value}
                  className="border-b border-black/10 py-7 last:border-b-0 dark:border-white/10 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500 sm:text-xs">
                    {item.label}
                  </dt>
                  <dd className="mt-3 font-serif text-4xl font-semibold tracking-[-0.04em] text-indigo-600 dark:text-indigo-400 sm:text-5xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="trace-heading"
          className="mt-12 bg-neutral-950 text-[#f5f2ea] dark:bg-[#f5f2ea] dark:text-neutral-950 sm:mt-16"
        >
          <div className="grid lg:grid-cols-[0.55fr_1.45fr]">
            <div className="flex flex-col justify-between border-b border-white/15 p-6 dark:border-black/15 sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] sm:text-xs">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  </span>
                  Trace / Online
                </div>
                <h2 id="trace-heading" className="mt-6 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  A second
                  <br />
                  perspective<span className="text-indigo-400 dark:text-indigo-600">.</span>
                </h2>
              </div>
              <p className="mt-8 font-mono text-[9px] uppercase leading-5 tracking-[0.16em] opacity-55 sm:text-[10px]">
                AI voice · Grounded in Jacky&apos;s public notes · Not Jacky
              </p>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="max-w-3xl font-serif text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">
                “Jacky says he is always debugging. My job is to show you the
                evidence—and point out where the work is still unfinished.”
              </p>
              <p className="mt-6 max-w-2xl font-sans text-sm leading-7 opacity-65 sm:text-base">
                I read the curated portfolio knowledge base and answer as an
                independent guide. Ask me for the thread between projects,
                decisions, and the way Jacky works.
              </p>

              <div className="mt-8 grid gap-px bg-white/15 dark:bg-black/15 sm:grid-cols-3">
                {tracePrompts.map((question, index) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => onAskAI(question)}
                    className="group flex min-h-28 flex-col justify-between bg-neutral-950 p-4 text-left transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400 dark:bg-[#f5f2ea] dark:hover:bg-indigo-200 dark:focus-visible:ring-indigo-600"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-50">
                      Prompt / {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-5 font-sans text-sm leading-5">
                      {question}
                    </span>
                    <span aria-hidden="true" className="mt-4 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onAskAI()}
                className="mt-7 border-b border-current pb-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:text-indigo-600 sm:text-xs"
              >
                Open a conversation with Trace ↗
              </button>
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-col gap-4 border-y border-black/10 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <span>The work changes. The record stays.</span>
          <Link
            href={`${BASE_PATH}/journal`}
            className="w-fit text-neutral-800 transition-colors hover:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400"
          >
            Read the Debug Journal →
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
