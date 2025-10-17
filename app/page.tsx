"use client";

import { useState, useEffect, Suspense } from "react";
import { Navigation } from "@/components/layout/navigation";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { StatisticsSection } from "@/components/sections/statistics-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TipsSection } from "@/components/sections/tips-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { carouselSlides } from "@/lib/constants";
import { PageTransition } from "@/lib/animations";
import { FloatingNav } from "@/components/ui/floating-nav";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--background)]">
        <Navigation isScrolled={isScrolled} />
        <HeroCarousel slides={carouselSlides} />
        <StatisticsSection />
        <ServicesSection />
        <AboutSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <TipsSection />
        <Suspense fallback={<div className="py-24 text-center text-white">Loading contact form...</div>}>
          <ContactSection />
        </Suspense>
        <Footer />
        <FloatingNav />
      </div>
    </PageTransition>
  );
}
