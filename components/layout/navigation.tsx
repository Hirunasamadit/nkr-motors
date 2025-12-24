"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BRAND } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "@/components/ui/nav-link";
import { NavigationLogo } from "@/components/ui/logo";
import { SocialShareOptions } from "@/components/ui/social-share";
import { Share2 } from "lucide-react";
import { FaPhone } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";

interface NavigationProps {
  isScrolled: boolean;
}

export function Navigation({ isScrolled }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed z-50 w-full border-b transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-[var(--dark-900)] border-[var(--primary-20)] backdrop-blur-xl shadow-2xl"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-24">
          <NavigationLogo href="#home" />

          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-baseline space-x-2">
                <NavigationMenuItem>
                  <NavLink href="#home">Home</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink href="#services">Services</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink href="#about">About</NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink href="#contact">Contact</NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Button variant="outlined" className="p-6" asChild>
              <a href={BRAND.CONTACT.PHONE_LINK} className="group relative">
                <div className="flex items-center space-x-2 relative z-10">
                  <FaPhone className="w-6 h-6" />
                  <span>{BRAND.CONTACT.PHONE}</span>
                </div>
              </a>
            </Button>
          </div>

          <div className="lg:hidden ml-auto">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="group relative p-3 text-[var(--dark-300)] bg-transparent shadow-lg hover:text-white hover:shadow-xl focus:outline-none transition-all duration-300 ease-out"
                >
                  <FiMenu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] bg-[var(--dark-900)] border-l border-[var(--dark-700)] p-0"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                {/* Mobile Menu Header */}
                <div className="sticky top-0 z-10 bg-[var(--dark-900)] border-b border-[var(--dark-700)] h-24 px-4 sm:px-6">
                  <div className="flex items-center justify-between h-full">
                    <h2 className="text-lg font-automotive theme-text-gradient tracking-wide">
                      Menu
                    </h2>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="group relative p-3 text-[var(--dark-300)] bg-transparent shadow-lg hover:text-white hover:shadow-xl focus:outline-none transition-all duration-300 ease-out"
                      >
                        <FiX className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6">
                  <nav className="space-y-2">
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex items-center w-full px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--dark-700)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-white group-hover:text-[var(--primary-300)] transition-colors duration-300">
                        Home
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex items-center w-full px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--dark-700)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-white group-hover:text-[var(--primary-300)] transition-colors duration-300">
                        Services
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex items-center w-full px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--dark-700)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-white group-hover:text-[var(--primary-300)] transition-colors duration-300">
                        About
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group flex items-center w-full px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--dark-700)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-white group-hover:text-[var(--primary-300)] transition-colors duration-300">
                        Contact
                      </span>
                    </button>
                  </nav>
                </div>

                {/* Phone Action Section */}
                <div className="bg-[var(--dark-900)] border-t border-[var(--dark-700)] p-6 mx-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-[var(--dark-400)] mb-2">
                        Need immediate assistance?
                      </p>
                      <p className="text-xs text-[var(--dark-500)]">
                        Call us now for expert service
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <Button variant="outlined" className="p-6" asChild>
                        <a
                          href={BRAND.CONTACT.PHONE_LINK}
                          className="group relative"
                        >
                          <div className="flex items-center space-x-2 relative z-10">
                            <FaPhone className="w-6 h-6" />
                            <span>{BRAND.CONTACT.PHONE}</span>
                          </div>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Social Share Footer */}
                <div className="sticky bottom-0 bg-[var(--dark-900)] border-t border-[var(--dark-700)] p-6">
                  <div className="px-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Share2 className="w-4 h-4 text-[var(--primary-400)]" />
                      <h3 className="text-base font-industrial text-white">Share on social media</h3>
                    </div>
                    <SocialShareOptions onShare={closeMobileMenu} variant="mobile" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
