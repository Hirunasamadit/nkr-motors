"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "@/components/ui/nav-link";
import { NavigationLogo } from "@/components/ui/logo";
import { FaPhone } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";

interface NavigationProps {
  isScrolled: boolean;
}

export function Navigation({ isScrolled }: NavigationProps) {
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
            <Sheet>
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
                <div className="sticky top-0 z-10 bg-[var(--dark-900)] border-b border-[var(--dark-700)] p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-automotive text-white tracking-wide">
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
                    <a
                      href="#home"
                      className="group flex items-center px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--primary-500)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-[var(--dark-200)] group-hover:text-white transition-colors duration-300">
                        Home
                      </span>
                    </a>
                    <a
                      href="#services"
                      className="group flex items-center px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--primary-500)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-[var(--dark-200)] group-hover:text-white transition-colors duration-300">
                        Services
                      </span>
                    </a>
                    <a
                      href="#about"
                      className="group flex items-center px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--primary-500)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-[var(--dark-200)] group-hover:text-white transition-colors duration-300">
                        About
                      </span>
                    </a>
                    <a
                      href="#contact"
                      className="group flex items-center px-4 py-4 bg-[var(--dark-800)] hover:bg-[var(--primary-500)] transition-all duration-300 ease-out"
                    >
                      <span className="text-lg font-industrial text-[var(--dark-200)] group-hover:text-white transition-colors duration-300">
                        Contact
                      </span>
                    </a>
                  </nav>
                </div>

                {/* Phone Action Section */}
                <div className="sticky bottom-0 bg-[var(--dark-900)] border-t border-[var(--dark-700)] p-6">
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
