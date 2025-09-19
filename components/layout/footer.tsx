import { BRAND } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FooterLogo } from "@/components/ui/logo";
import { ContactInfoItem } from "@/components/cards/contact-info-item";
import { FaPhone } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative overflow-hidden theme-bg-hero">
      <div className="absolute inset-0 theme-bg-overlay-light"></div>
      <div className="absolute top-0 left-0 w-full h-1 theme-bg-component-1"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="group cursor-pointer">
              <FooterLogo />
            </div>
            <p className="text-lg text-[var(--dark-300)] leading-relaxed group-hover:text-[var(--dark-200)] transition-colors duration-300 ease-out">
              Every service is rigorously screened and constantly rated to
              ensure you get the best service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <ContactInfoItem
                  icon={<FaPhone className="w-6 h-6 text-white" />}
                  primaryText={BRAND.CONTACT.PHONE}
                  secondaryText="Support center"
                  iconThemeClass="theme-bg-component-1"
                  href={BRAND.CONTACT.PHONE_LINK}
                />
                <a
                  href={BRAND.SOCIAL.FACEBOOK}
                  className="flex items-center justify-center w-12 h-12 bg-[var(--primary-400)] border-2 border-[var(--primary-400)] hover:bg-transparent hover:border-[var(--primary-400)] transition-all duration-300 ease-out relative overflow-hidden before:absolute before:inset-0 before:bg-black/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:ease-out"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-industrial text-white">QUICK LINKS</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-industrial text-white">
              POPULAR SERVICES
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  Oil Change Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  Tire Repair
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  Brake Repair
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  Engine Repair
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-block text-lg font-industrial text-[var(--dark-300)] hover:text-[var(--primary-600)] relative group transition-all duration-300 ease-out after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:border-b-2 after:border-dashed after:border-[var(--primary-600)] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  EV Services
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-industrial text-white">SUBSCRIBE</h4>
            <p className="text-lg text-[var(--dark-300)] leading-relaxed">
              Stay updated with our latest offers and services.
            </p>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-6 theme-input"
                />
              </div>
              <div>
                <Button variant="filled" className="w-full p-6">
                  <span>SUBSCRIBE</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8">
          <Separator className="bg-white/20 mb-8" />
          <div className="flex justify-center">
            <p className="text-lg text-[var(--dark-300)] text-center">
              © {BRAND.COPYRIGHT_YEAR}{" "}
              <span className="font-bold text-[var(--primary-400)] hover:text-[var(--primary-300)] transition-colors duration-300 ease-out">{BRAND.NAME}</span>. All rights
              reserved. {BRAND.TAGLINE}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
