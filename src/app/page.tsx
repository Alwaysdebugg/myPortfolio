"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "../components/sections/SplashScreen";
import Hero from "../components/sections/Hero";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/foot";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragDown = () => {
    setShowContent(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Splash Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: showContent ? 0 : 1,
          y: showContent ? -100 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`fixed inset-0 z-40 ${
          showContent ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <SplashScreen onDragDown={handleDragDown} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="min-h-screen bg-white dark:bg-black transition-colors duration-300"
            >
              {/* Navbar - Center aligned */}
              <Navbar />
              <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-10">
                <div className="space-y-16 w-full">
                  <Hero />
                  {/* <About />
                  <Projects /> */}
                </div>
              </div>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
