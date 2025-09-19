"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeroCarouselProps } from "@/lib/types";
import { BRAND } from "@/lib/constants";

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
      className="relative flex items-center min-h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 theme-bg-hero"></div>
      <div className="absolute inset-0 theme-bg-overlay"></div>

      {/* Background Subtitle - Consistent across all slides */}
      <div className="absolute inset-0 w-full flex justify-center items-start pt-20 z-0">
        <h2
          className="text-8xl md:text-9xl lg:text-[12rem] font-automotive text-transparent tracking-widest select-none text-right"
          style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)" }}
        >
          {BRAND.NAME}
        </h2>
      </div>

      {/* Car Image - Absolute Positioned - Consistent across all slides */}
      <div className="absolute right-8 -bottom-20 z-20 group cursor-pointer hidden lg:block">
        <div className="relative animate-bounce-subtle">
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
          <div className="absolute top-[42%] left-[5%] w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-200 group-hover:shadow-[0_40px_80px_rgba(255,255,255,0.8)] blur-sm z-30" style={{ background: 'radial-gradient(circle, #ffffff 0%, #f8f8ff 50%, #e6f3ff 100%)' }}></div>
          <div className="absolute top-[42%] left-[82%] w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-200 group-hover:shadow-[0_40px_80px_rgba(255,255,255,0.8)] blur-sm z-30" style={{ background: 'radial-gradient(circle, #ffffff 0%, #f8f8ff 50%, #e6f3ff 100%)' }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full overflow-hidden">
        <div
          className="flex transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            filter: "blur(0px)",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative"
              style={{
                opacity: index === currentSlide ? 1 : 0.7,
                transform: `scale(${index === currentSlide ? 1 : 0.95})`,
                transition: "all 1000ms cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex items-center">
                  {/* Left Column - Dynamic Content */}
                  <div className="space-y-8 text-left max-w-2xl">
                    <div className="overflow-hidden">
                      <h1
                        className="text-5xl md:text-7xl font-automotive text-white tracking-tight leading-tight transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{
                          transform: `translateY(${
                            index === currentSlide ? "0" : "50px"
                          })`,
                          opacity: index === currentSlide ? 1 : 0.8,
                        }}
                      >
                        {slide.title.split(" ").map((word, wordIndex) => (
                          <span
                            key={wordIndex}
                            className="inline-block transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] mr-4"
                            style={{
                              transform: `translateY(${
                                index === currentSlide ? "0" : "30px"
                              })`,
                              transitionDelay: `${wordIndex * 100}ms`,
                            }}
                          >
                            {slide.highlightWords.includes(word) ? (
                              <span className="theme-text-gradient-accent">
                                {word}
                              </span>
                            ) : (
                              word
                            )}
                          </span>
                        ))}
                      </h1>
                    </div>

                    <div className="overflow-hidden">
                      <p
                        className="text-xl md:text-2xl text-[var(--dark-300)] leading-relaxed transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{
                          transform: `translateY(${
                            index === currentSlide ? "0" : "40px"
                          })`,
                          opacity: index === currentSlide ? 1 : 0.7,
                          transitionDelay: "200ms",
                        }}
                      >
                        {slide.description}
                      </p>
                    </div>

                    <div
                      className="flex flex-col sm:flex-row gap-6 pt-8 transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        transform: `translateY(${
                          index === currentSlide ? "0" : "30px"
                        })`,
                        opacity: index === currentSlide ? 1 : 0.8,
                        transitionDelay: "400ms",
                      }}
                    >
                      <Button 
                        variant="filled"
                        onClick={() => handleButtonAction(slide.buttonAction)}
                        className="min-w-64 p-6"
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
