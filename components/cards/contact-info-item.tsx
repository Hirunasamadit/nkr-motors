import { ReactNode } from "react";

interface ContactInfoItemProps {
  icon: ReactNode;
  primaryText: string;
  secondaryText: string;
  iconThemeClass?: string;
  href?: string;
}

export function ContactInfoItem({
  icon,
  primaryText,
  secondaryText,
  iconThemeClass = "theme-bg-component-1",
  href,
}: ContactInfoItemProps) {
  const content = (
    <div className="flex items-center group">
      <div className={`flex items-center justify-center w-12 h-12 mr-4 ${iconThemeClass} group-hover:bg-[var(--primary-600)] transition-colors duration-300 ease-out`}>
        {icon}
      </div>
      <div>
        <div className="text-base sm:text-lg font-industrial text-white group-hover:text-[var(--primary-300)] transition-colors duration-300 ease-out">
          {primaryText}
        </div>
        <div className="text-sm text-[var(--dark-400)] group-hover:text-[var(--dark-300)] transition-colors duration-300 ease-out">
          {secondaryText}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
