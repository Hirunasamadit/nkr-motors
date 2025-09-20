"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  suffix: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix, 
  duration = 2,
  className = ""
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3
  });
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Extract numeric value and handle special cases
  const numericValue = parseInt(value);
  const isSpecial = value === "0" || suffix === "*"; // Handle "0*" case

  useEffect(() => {
    if (isInView) {
      if (isSpecial) {
        // For special cases like "0*", show with a slight delay for consistency
        setTimeout(() => {
          setCount(numericValue);
          setIsComplete(true);
        }, 200);
        return;
      }

      let startTime: number;
      const startValue = 0;
      const endValue = numericValue;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
        
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure we reach the exact final value
          setCount(endValue);
          setIsComplete(true);
        }
      };

      // Small delay before starting animation for better visual effect
      setTimeout(() => requestAnimationFrame(animate), 100);
    }
  }, [isInView, numericValue, duration, isSpecial]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.span
        animate={isComplete ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {count}
      </motion.span>
      <span className="text-[var(--primary-200)]">{suffix}</span>
    </motion.div>
  );
}
