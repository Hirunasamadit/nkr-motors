import { ReactNode } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface AboutCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconThemeClass: string;
}

export function AboutCard({ icon, title, description, iconThemeClass }: AboutCardProps) {
  return (
    <Card className="group relative p-8 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-[var(--primary-600)] backdrop-blur-md theme-shadow-card transition-all duration-300 ease-out h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <div className={`w-16 h-16 flex items-center justify-center mr-4 ${iconThemeClass}`}>
          {icon}
        </div>
        <CardTitle className="text-2xl font-industrial text-white group-hover:text-[var(--primary-300)] transition-colors duration-300 ease-out">
          {title}
        </CardTitle>
      </div>
      <p className="text-[var(--dark-300)] leading-relaxed group-hover:text-[var(--dark-100)] transition-colors duration-300 ease-out flex-1">
        {description}
      </p>
      </CardContent>
    </Card>
  );
}
