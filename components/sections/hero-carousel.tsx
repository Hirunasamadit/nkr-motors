"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroCarouselProps } from "@/lib/types";
import { BRAND } from "@/lib/constants";
import { TextReveal, floatingAnimation, floatingTransition } from "@/lib/animations";

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds for better viewing

    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle button actions
  const handleButtonAction = (action: string) => {
    switch (action) {
      case 'scrollToServices':
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'scrollToContact':
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'scrollToAbout':
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'callPhone':
        window.location.href = 'tel:+94112294142';
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 overflow-hidden theme-bg-hero"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 theme-bg-overlay"></div>

      {/* Background Subtitle - Consistent across all slides */}
      <motion.div 
        className="absolute inset-0 w-full flex justify-center items-start pt-32 z-0"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        <h2
          className="text-7xl md:text-9xl lg:text-[12rem] font-automotive text-transparent tracking-widest select-none text-right"
          style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)" }}
        >
          {BRAND.NAME}
        </h2>
      </motion.div>

      {/* Car Image - Absolute Positioned for Desktop - Consistent across all slides */}
      <motion.div 
        className="absolute right-8 -bottom-20 z-20 group cursor-pointer hidden lg:block"
        animate={floatingAnimation}
        transition={floatingTransition}
      >
        <div className="relative">
          {/* External Car Image - Base Layer */}
          <Image
            src="/car-external-alt.png"
            alt="Sleek dark sports car with transparent body revealing internal suspension and wheel components"
            width={624}
            height={416}
            className="h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-80"
          />
          {/* Internal Engine Image - Overlay Layer */}
          <Image
            src="/car-internal-alt.png"
            alt="Detailed V-engine with pulleys, suspension, and brake components"
            width={624}
            height={416}
            className="absolute inset-0 h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-60 group-hover:opacity-90"
          />
          {/* Pulley Component Image - Bottom Right */}
          <Image
            src="/car-pulley.png"
            alt="Metallic pulley component with bolt holes and polished surface"
            width={62}
            height={62}
            className="absolute bottom-50 right-70 h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-90 group-hover:opacity-100 animate-spin"
            style={{ animationDuration: '6s' }}
          />
          
          {/* Enhanced Headlight Effects */}
          <div className="absolute top-[42%] left-[5%] w-20 h-20 rounded-full opacity-0 group-hover:opacity-85 transition-all duration-700 ease-out group-hover:scale-175 group-hover:shadow-[0_30px_60px_rgba(255,255,255,0.5)] blur-sm z-30" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(248,248,255,0.8) 50%, rgba(230,243,255,0.6) 100%)' }}></div>
          <div className="absolute top-[42%] left-[82%] w-20 h-20 rounded-full opacity-0 group-hover:opacity-85 transition-all duration-700 ease-out group-hover:scale-175 group-hover:shadow-[0_30px_60px_rgba(255,255,255,0.5)] blur-sm z-30" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(248,248,255,0.8) 50%, rgba(230,243,255,0.6) 100%)' }}></div>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center min-h-[calc(100vh-6rem)] py-20">
            {/* Content Section */}
            <div className="flex-1 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="w-full flex-shrink-0 relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Left Column - Dynamic Content */}
                  <div className="space-y-8 text-left max-w-2xl">
                    <TextReveal
                      text={slides[currentSlide].title}
                      className="text-4xl md:text-7xl font-automotive text-white tracking-tight leading-tight"
                      highlightWords={slides[currentSlide].highlightWords}
                      highlightClass="theme-text-gradient-accent"
                      delay={0.2}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <p className="text-xl md:text-2xl text-[var(--dark-300)] leading-relaxed">
                        {slides[currentSlide].description}
                      </p>
                    </motion.div>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-6 pt-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <div>
                        <Button 
                          variant="filled"
                          onClick={() => handleButtonAction(slides[currentSlide].buttonAction)}
                          className="min-w-64 p-6"
                        >
                          {slides[currentSlide].buttonText}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Car Image - Mobile/Tablet - Bottom of hero section */}
            <motion.div 
              className="flex justify-center items-end mt-12 lg:hidden group cursor-pointer"
              animate={floatingAnimation}
              transition={floatingTransition}
            >
              <div className="relative max-w-md w-full">
                {/* External Car Image - Base Layer */}
                <Image
                  src="/car-external-alt.png"
                  alt="Sleek dark sports car with transparent body revealing internal suspension and wheel components"
                  width={400}
                  height={267}
                  className="w-full h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-80"
                />
                {/* Internal Engine Image - Overlay Layer */}
                <Image
                  src="/car-internal-alt.png"
                  alt="Detailed V-engine with pulleys, suspension, and brake components"
                  width={400}
                  height={267}
                  className="absolute inset-0 w-full h-auto object-contain transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-60 group-hover:opacity-90"
                />       
                {/* Enhanced Headlight Effects - Mobile */}
                <div className="absolute top-[42%] left-[8%] w-12 h-12 rounded-full opacity-0 group-hover:opacity-85 transition-all duration-700 ease-out group-hover:scale-150 group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.5)] blur-sm z-30" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(248,248,255,0.8) 50%, rgba(230,243,255,0.6) 100%)' }}></div>
                <div className="absolute top-[42%] left-[82%] w-12 h-12 rounded-full opacity-0 group-hover:opacity-85 transition-all duration-700 ease-out group-hover:scale-150 group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.5)] blur-sm z-30" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(248,248,255,0.8) 50%, rgba(230,243,255,0.6) 100%)' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
