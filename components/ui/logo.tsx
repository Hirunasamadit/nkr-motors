import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type LogoVariant = "navigation" | "footer" | "mobile";

export interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  href?: string;
  onClick?: () => void;
}

const logoConfig = {
  navigation: {
    size: 64,
    containerClass: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
    textSize: "text-2xl sm:text-3xl md:text-4xl",
    taglineSize: "text-sm sm:text-base",
    spacing: "space-x-2 sm:space-x-3 md:space-x-4",
  },
  footer: {
    size: 48,
    containerClass: "w-12 h-12",
    textSize: "text-3xl",
    taglineSize: "text-lg",
    spacing: "space-x-3",
  },
  mobile: {
    size: 48,
    containerClass: "w-12 h-12",
    textSize: "text-3xl",
    taglineSize: "text-base",
    spacing: "space-x-3",
  },
} as const;

export function Logo({
  variant = "navigation",
  className,
  showText = true,
  showTagline = true,
  href,
  onClick,
}: LogoProps) {
  const config = logoConfig[variant];
  const isClickable = href || onClick;

  const LogoContent = () => (
    <div className={cn("flex items-center", config.spacing, className)}>
      <div className={cn("flex-shrink-0 overflow-hidden", config.containerClass)}>
        <Image
          src="/logo.jpeg"
          alt={`${BRAND.NAME} Logo`}
          width={config.size}
          height={config.size}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      {showText && (
        <div>
          <h1 className={cn(
            "font-automotive text-white tracking-tight",
            config.textSize
          )}>
            <span className="theme-text-gradient">
              NKR
            </span>
            <span className="text-white"> MOTORS</span>
          </h1>
          {showTagline && (
            <p className={cn(
              "text-[var(--dark-300)] font-industrial -mt-1",
              config.taglineSize
            )}>
              {BRAND.TAGLINE}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (isClickable) {
    const Component = href ? "a" : "button";
    return (
      <Component
        {...(href ? { href } : {})}
        {...(onClick ? { onClick } : {})}
        className="group cursor-pointer"
      >
        <LogoContent />
      </Component>
    );
  }

  return <LogoContent />;
}

// Convenience components for common use cases
export function NavigationLogo({ className, href = "#home" }: Omit<LogoProps, "variant">) {
  return <Logo variant="navigation" className={className} href={href} />;
}

export function FooterLogo({ className }: Omit<LogoProps, "variant" | "showText" | "showTagline">) {
  return <Logo variant="footer" className={className} showText={true} showTagline={false} />;
}

export function MobileLogo({ className }: Omit<LogoProps, "variant" | "showText" | "showTagline">) {
  return <Logo variant="mobile" className={className} showText={true} showTagline={false} />;
}