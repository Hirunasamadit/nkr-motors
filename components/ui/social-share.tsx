"use client";

import { BRAND } from "@/lib/constants";
import { FaFacebook, FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SocialShareOptionsProps {
  onShare?: () => void;
  className?: string;
  variant?: "default" | "mobile";
}

export function SocialShareOptions({ onShare, className = "", variant = "default" }: SocialShareOptionsProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${BRAND.NAME} - ${BRAND.DESCRIPTION}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  };

  const shareOptions = [
    { platform: "facebook" as const, label: "Facebook", icon: FaFacebook, hoverColorClass: "group-hover:text-[#1877F2]" },
    { platform: "twitter" as const, label: "X", icon: FaXTwitter, hoverColorClass: "group-hover:text-black" },
    { platform: "linkedin" as const, label: "LinkedIn", icon: FaLinkedin, hoverColorClass: "group-hover:text-[#0077B5]" },
    { platform: "whatsapp" as const, label: "WhatsApp", icon: FaWhatsapp, hoverColorClass: "group-hover:text-[#25D366]" },
  ];

  const handleShare = (platform: keyof typeof shareLinks) => {
    const url = shareLinks[platform];
    window.open(url, "_blank", "width=600,height=400");
    onShare?.();
  };

  const isCompact = variant === "mobile";
  const containerClass = isCompact 
    ? `flex flex-row gap-2 justify-center ${className}`
    : `flex flex-col gap-1 ${className}`;
  
  const buttonClass = isCompact
    ? "group flex items-center justify-center w-10 h-10 rounded-md bg-[var(--dark-800)] hover:bg-[var(--dark-700)] transition-colors duration-200"
    : "group flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--dark-700)] transition-colors duration-200 text-left";

  return (
    <div className={containerClass}>
      {shareOptions.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.platform}
            onClick={() => handleShare(option.platform)}
            className={buttonClass}
            aria-label={`Share on ${option.label}`}
          >
            <Icon className={`w-5 h-5 text-[var(--dark-300)] ${option.hoverColorClass} transition-colors`} />
            {!isCompact && (
              <span className={`text-sm font-medium text-white ${option.hoverColorClass} transition-colors`}>{option.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface SocialShareProps {
  className?: string;
}

export function SocialShare({ className = "" }: SocialShareProps) {
  const isLightContext = className?.includes('text-white');
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`w-8 h-8 p-0 ${isLightContext ? 'text-white hover:text-[var(--primary-300)]' : 'text-[var(--dark-300)] hover:text-[var(--primary-400)]'} hover:bg-transparent transition-all duration-300 ${className}`}
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-[var(--dark-800)] border-[var(--dark-600)]" align="start">
        <SocialShareOptions />
      </PopoverContent>
    </Popover>
  );
}

