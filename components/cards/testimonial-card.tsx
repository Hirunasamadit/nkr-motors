"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialCardProps } from "@/lib/types";
import { FiStar } from "react-icons/fi";

const MAX_LENGTH = 256;

export function TestimonialCard({
  stars,
  quote,
  name,
  role,
  photoUrl,
  initials,
  index,
}: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = quote.length > MAX_LENGTH;
  const truncatedText = quote.substring(0, MAX_LENGTH);

  return (
    <Card className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-md p-8 theme-shadow-card transition-all duration-300 ease-out border-2 border-white/20 hover:border-[var(--primary-600)] h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <div className="flex text-xl gap-1">
          {Array.from({ length: stars }, (_, i) => {
            // Gold color progression using CSS variables
            const goldColors = [
              'var(--gold-100)', 
              'var(--gold-200)',
              'var(--gold-300)', 
              'var(--gold-400)', 
              'var(--gold-500)'  
            ];
            const colorIndex = Math.min(i, goldColors.length - 1);
            const starColor = goldColors[colorIndex];
            
            return (
              <FiStar 
                key={i} 
                className="w-5 h-5 fill-current star-hover transition-all duration-300 ease-out" 
                style={{ 
                  color: starColor
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex-1 mb-4">
        <p className="text-[var(--dark-200)] group-hover:text-white leading-relaxed text-lg transition-colors duration-300 ease-out">
          &quot;{isExpanded || !isLong ? quote : truncatedText}
          {isLong && !isExpanded && "..."}
          &quot;
          {isLong && !isExpanded && (
            <>
              {" "}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[var(--primary-400)] hover:text-[var(--primary-300)] cursor-pointer transition-colors duration-300 ease-out"
              >
                More
              </button>
            </>
          )}
          {isLong && isExpanded && (
            <>
              {" "}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[var(--primary-400)] hover:text-[var(--primary-300)] cursor-pointer transition-colors duration-300 ease-out"
              >
                Less
              </button>
            </>
          )}
        </p>
      </div>
      <div className="flex items-center mt-auto">
        <div className="p-0.5 mr-4 theme-gradient-primary-light">
          <Avatar
            className={`w-16 h-16 theme-bg-component-${index + 1}`}
          >
            {photoUrl && (
              <AvatarImage 
                src={photoUrl} 
                alt={`${name} profile photo`}
                className="object-cover"
              />
            )}
            <AvatarFallback className="text-[var(--primary-300)] font-industrial text-xl">
              {initials || name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="font-industrial text-white group-hover:text-[var(--primary-300)] text-lg transition-colors duration-300 ease-out">{name}</div>
          <div className="font-industrial text-[var(--primary-600)] group-hover:text-[var(--primary-500)] transition-colors duration-300 ease-out">{role}</div>
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
