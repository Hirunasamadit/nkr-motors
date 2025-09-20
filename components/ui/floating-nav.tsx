"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IoTriangleSharp } from "react-icons/io5";

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };

    // Check initial scroll position
    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-40"
        >
          {/* Scroll to Top Button with Progress Ring */}
          <div className="relative">
            {/* Progress Ring */}
            <svg
              className="w-16 h-16 transform -rotate-90"
              viewBox="0 0 64 64"
              fill="none"
            >
              {/* Gradient definition */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary-900)" />
                  <stop offset="100%" stopColor="var(--primary-300)" />
                </linearGradient>
              </defs>
              
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
                fill="none"
              />
              {/* Progress circle with gradient */}
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300 ease-out"
              />
            </svg>
            
            {/* Button */}
            <motion.button
              onClick={scrollToTop}
              className="absolute inset-0 w-14 h-14 bg-[var(--dark-800)] hover:bg-[var(--dark-700)] text-white hover:text-[var(--primary-300)] rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 m-auto cursor-pointer"
              aria-label={`Scroll to top - ${Math.round(scrollProgress)}% scrolled`}
            >
              <IoTriangleSharp className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
