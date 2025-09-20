"use client";

import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Reusable animation components
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.2
  });

  const variants = {
    up: fadeInUp,
    left: fadeInLeft,
    right: fadeInRight,
    scale: scaleIn
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredContainer({ 
  children, 
  className = "",
  staggerDelay = 0.1
}: StaggeredContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StaggeredItem({ 
  children, 
  className = "",
  delay = 0
}: StaggeredItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll effect
interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ 
  children, 
  className = "",
  speed = 0.5
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export function TextReveal({ 
  text, 
  className = "",
  delay = 0,
  highlightWords = [],
  highlightClass = "theme-text-gradient-accent"
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3
  });

  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99]
              }
            }
          }}
          className="inline-block mr-2"
        >
          {highlightWords.includes(word) ? (
            <span className={highlightClass}>{word}</span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Content-only animation wrapper (doesn't affect section backgrounds)
interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export function AnimatedContent({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: AnimatedContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.2
  });

  const variants = {
    up: fadeInUp,
    left: fadeInLeft,
    right: fadeInRight,
    scale: scaleIn
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper with canvas opening animation
interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Left curtain panel */}
      <motion.div
        className="fixed inset-y-0 left-0 w-1/2 z-[9999] bg-[var(--background)] canvas-overlay"
        initial={{ 
          x: 0,
        }}
        animate={{ 
          x: "-100%",
          transition: {
            duration: 1.2,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: 0.3
          }
        }}
      />
      
      {/* Right curtain panel */}
      <motion.div
        className="fixed inset-y-0 right-0 w-1/2 z-[9999] bg-[var(--background)] canvas-overlay"
        initial={{ 
          x: 0,
        }}
        animate={{ 
          x: "100%",
          transition: {
            duration: 1.2,
            ease: [0.6, -0.05, 0.01, 0.99],
            delay: 0.3
          }
        }}
      />
      
      {/* Content that is revealed as curtains open */}
      <div>
        {children}
      </div>
    </div>
  );
}

// Floating animation for decorative elements
export const floatingAnimation = {
  y: [0, -8, 0]
};

export const floatingTransition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut" as const
};

// Pulse animation for interactive elements
export const pulseAnimation = {
  scale: [1, 1.05, 1]
};

export const pulseTransition = {
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut" as const
};

// Hover animations
export const hoverScale = {
  scale: 1.05
};

export const hoverScaleTransition = {
  duration: 0.2,
  ease: "easeOut" as const
};

export const hoverLift = {
  y: -5
};

export const hoverLiftTransition = {
  duration: 0.2,
  ease: "easeOut" as const
};
