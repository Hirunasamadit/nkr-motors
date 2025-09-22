import { ReactNode, useRef } from "react";
import { CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

interface AboutCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconThemeClass: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageSubcaption?: string;
  isImageLeft?: boolean;
}

export function AboutCard({
  icon,
  title,
  description,
  iconThemeClass,
  imageUrl,
  imageAlt,
  imageCaption,
  imageSubcaption,
  isImageLeft = false,
}: AboutCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.2
  });

  return (
    <div ref={ref} className="group relative p-0 bg-black/20 transition-all duration-300 ease-out flex flex-col lg:flex-row overflow-hidden">
      {/* Image Section */}
      {imageUrl && (
        <motion.div
          className={`relative w-full lg:w-1/2 h-80 lg:h-120 overflow-hidden ${
            isImageLeft ? "lg:order-1" : "lg:order-2"
          }`}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={isImageLeft ? fadeInLeft : fadeInRight}
        >
          <Image
            src={imageUrl}
            alt={imageAlt || ""}
            width={600}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-lg font-industrial">{imageCaption}</h4>
            <p className="text-sm opacity-90">{imageSubcaption}</p>
          </div>
        </motion.div>
      )}

      {/* Content Section */}
      <motion.div
        className={`w-full lg:w-1/2 p-4 flex flex-col ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={isImageLeft ? fadeInRight : fadeInLeft}
      >
        <CardContent className="flex flex-col h-full justify-center space-y-8">
          {/* Icon and Title Section */}
          <div className="flex items-start space-x-6">
            <div
              className={`w-16 h-16 flex items-center justify-center flex-shrink-0 ${iconThemeClass} shadow-lg`}
            >
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-3xl font-industrial text-white group-hover:text-[var(--primary-300)] transition-colors duration-300 ease-out leading-tight mb-2">
                {title}
              </CardTitle>
              <div
                className={`w-12 h-0.5 ${iconThemeClass} opacity-80 group-hover:opacity-100 group-hover:w-20 transition-all duration-300 ease-out`}
              ></div>
            </div>
          </div>

          {/* Description Section */}
          <p className="text-[var(--dark-300)] leading-relaxed text-lg group-hover:text-[var(--dark-100)] transition-colors duration-300 ease-out">
            {description}
          </p>
        </CardContent>
      </motion.div>
    </div>
  );
}
