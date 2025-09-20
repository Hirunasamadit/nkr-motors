"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "@/components/ui/nav-link";
import { NavigationLogo, MobileLogo } from "@/components/ui/logo";
import { FaPhone } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";

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
                  <FaPhone className="w-5 h-5" />
                  <span>{BRAND.CONTACT.PHONE}</span>
                </div>
              </a>
            </Button>
          </div>

          <div className="lg:hidden">
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
                className="w-[300px] sm:w-[400px] bg-[var(--dark-800)] border-[var(--dark-700)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <MobileLogo />
                </div>

                <nav className="space-y-4">
                  <a
                    href="#home"
                    className="block px-6 py-4 text-xl font-industrial theme-mobile-bg-1 hover:shadow-lg transition-all duration-300 ease-out"
                  >
                    Home
                  </a>
                  <a
                    href="#services"
                    className="block px-6 py-4 text-xl font-industrial theme-mobile-bg-2 hover:shadow-lg transition-all duration-300 ease-out"
                  >
                    Services
                  </a>
                  <a
                    href="#about"
                    className="block px-6 py-4 text-xl font-industrial theme-mobile-bg-3 hover:shadow-lg transition-all duration-300 ease-out"
                  >
                    About
                  </a>
                  <a
                    href="#contact"
                    className="block px-6 py-4 text-xl font-industrial theme-mobile-bg-4 hover:shadow-lg transition-all duration-300 ease-out"
                  >
                    Contact
                  </a>
                </nav>

                <div className="mt-8 pt-8">
                  <Separator className="bg-[var(--dark-700)] mb-8" />
                  <Button variant="outlined" className="p-6" asChild>
                    <a
                      href={BRAND.CONTACT.PHONE_LINK}
                      className="flex items-center justify-center space-x-2"
                    >
                      <FaPhone className="w-5 h-5" />
                      <span>{BRAND.CONTACT.PHONE}</span>
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
