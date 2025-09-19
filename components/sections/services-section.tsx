"use client";

import { useState } from "react";
import { ServiceCard } from "@/components/cards/service-card";
import { servicesData } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export function ServicesSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedServices = isExpanded ? servicesData : servicesData.slice(0, 6);

  const handleBookNow = (serviceTitle: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("service", serviceTitle);
      window.history.replaceState({}, "", url.toString());
    }
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden theme-bg-section"
    >
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="OUR SERVICES"
          title="Professional"
          titleAccent="Auto Services"
          description="We provide comprehensive auto repair and maintenance services to keep your vehicle running smoothly and safely."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              buttonText={service.buttonText}
              index={index}
              onClick={() => handleBookNow(service.title)}
            />
          ))}
        </div>

        {servicesData.length > 6 && (
          <div className="text-center mt-12">
            <Button
              variant="outlined"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-6 hover:opacity-80 transition-opacity duration-300"
            >
              {isExpanded ? "SHOW LESS" : `VIEW ALL SERVICES`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
