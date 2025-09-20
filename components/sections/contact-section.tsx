"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { SectionHeader } from "@/components/ui/section-header";
import { BRAND, servicesData } from "@/lib/constants";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { ContactInfoItem } from "@/components/cards/contact-info-item";
import { AnimatedContent, StaggeredContainer, StaggeredItem } from "@/lib/animations";

export function ContactSection() {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const serviceTitles = useMemo(
    () => new Set(servicesData.map((s) => s.title)),
    []
  );

  useEffect(() => {
    const fromQuery = searchParams.get("service") || undefined;
    if (fromQuery && serviceTitles.has(fromQuery)) {
      setSelectedService(fromQuery);
      // Clear the URL parameter after preselection
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("service");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, [searchParams, serviceTitles]);

  return (
    <section
      id="contact"
      className="py-24 theme-bg-hero relative overflow-hidden"
    >
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="absolute top-0 left-0 w-full h-1 theme-bg-component-1"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedContent delay={0.2}>
          <SectionHeader
            badge="CONTACT US"
            title="Request an"
            titleAccent="Appointment"
            description="Request an appointment online. After you submit the form, a representative will call you back with the information you'll need to make an appointment."
            gradientClass="theme-text-gradient-accent"
          />
        </AnimatedContent>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedContent delay={0.4} direction="left" className="relative flex">
            <div id="booking-form" className="bg-white/10 backdrop-blur-md p-8 theme-shadow-card border border-white/20 w-full flex flex-col">
              <h3 className="text-3xl font-industrial text-white mb-8">
                Book Your Service
              </h3>
              <form className="flex flex-col h-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="YOUR NAME"
                      className="w-full px-6 py-6 theme-input"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="YOUR EMAIL"
                      className="w-full px-6 py-6 theme-input"
                    />
                  </div>
                </div>
                <div>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-full px-6 py-6 theme-input">
                      <SelectValue placeholder="SELECT SERVICE" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--dark-800)] border-[var(--dark-600)]">
                      {servicesData.map((service) => (
                        <SelectItem
                          key={service.title}
                          value={service.title}
                          className="text-white hover:bg-[var(--dark-700)]"
                        >
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <DateTimePicker />
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="YOUR MESSAGE"
                    rows={8}
                    className="w-full h-full px-6 py-6 resize-none theme-input"
                  />
                </div>
                <Button variant="filled" type="submit" className="p-6">SEND MESSAGE</Button>
              </form>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.6} direction="right" className="flex flex-col h-full space-y-6">
            <div className="p-8 bg-white/10 border border-white/20 backdrop-blur-md theme-shadow-card flex flex-col">
              <h3 className="mb-6 text-3xl font-industrial text-white">
                Contact Information
              </h3>
              <StaggeredContainer className="flex flex-col space-y-6" staggerDelay={0.1}>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<FaPhone className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.PHONE}
                    secondaryText="Call us anytime"
                    iconThemeClass="theme-bg-component-1"
                    href={BRAND.CONTACT.PHONE_LINK}
                  />
                </StaggeredItem>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<MdEmail className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.EMAIL}
                    secondaryText="Email us"
                    iconThemeClass="theme-bg-component-2"
                    href={`mailto:${BRAND.CONTACT.EMAIL}`}
                  />
                </StaggeredItem>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<FaLocationDot className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.ADDRESS.LINE_1}
                    secondaryText={BRAND.CONTACT.ADDRESS.LINE_2}
                    iconThemeClass="theme-bg-component-3"
                  />
                </StaggeredItem>
                <StaggeredItem>
                  <ContactInfoItem
                    icon={<FaClock className="w-6 h-6 text-white" />}
                    primaryText={BRAND.CONTACT.HOURS.DAYS}
                    secondaryText={BRAND.CONTACT.HOURS.TIMES}
                    iconThemeClass="theme-bg-component-4"
                  />
                </StaggeredItem>
              </StaggeredContainer>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md theme-shadow-card overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <h3 className="text-2xl font-industrial text-white mb-2">
                  Find Us
                </h3>
                <p className="text-sm text-[var(--dark-400)]">
                  Visit our location at {BRAND.CONTACT.ADDRESS.LINE_2}
                </p>
              </div>
              <div className="relative w-full h-64">
                <iframe
                  src={BRAND.CONTACT.GOOGLE_MAPS.EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
