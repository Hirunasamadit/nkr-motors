import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowButton } from "@/components/ui/arrow-button";
import { ServiceCardProps } from "@/lib/types";

export function ServiceCard({
  icon,
  title,
  description,
  buttonText,
  index,
  onClick,
}: ServiceCardProps) {
  return (
    <Card
      className={`group relative p-8 border-2 border-[var(--primary-400)] theme-shadow-card bg-gradient-to-br from-[var(--dark-800)] to-[var(--dark-900)] hover:from-[var(--dark-600)] hover:to-[var(--dark-600)] hover:border-[var(--primary-300)] transition-all duration-300 ease-out`}
    >
      <CardContent className="p-0">
        <div
          className={`w-16 h-16 flex items-center justify-center mb-6 theme-bg-component-${index + 1}`}
        >
          {icon}
        </div>
        <CardTitle className="text-2xl font-industrial text-white group-hover:text-[var(--primary-300)] mb-4 transition-colors duration-300 ease-out">
          {title}
        </CardTitle>
        <CardDescription className="text-[var(--dark-300)] mb-6 leading-relaxed group-hover:text-[var(--dark-100)] transition-colors duration-300 ease-out">
          {description}
        </CardDescription>
        <ArrowButton 
          className="hover:opacity-80 cursor-pointer" 
          onClick={onClick}
        >
          {buttonText}
        </ArrowButton>
      </CardContent>
    </Card>
  );
}
