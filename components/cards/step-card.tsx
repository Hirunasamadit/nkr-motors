import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { StepCardProps } from "@/lib/types";

export function StepCard({
  title,
  description,
  stepNumber,
}: StepCardProps) {
  return (
    <div className="group relative flex flex-col text-center h-full">
      {/* Step Number */}
      <div className="relative z-20 flex justify-center mb-6">
        <div className="w-16 h-16 bg-[var(--primary-500)] flex items-center justify-center border-4 border-[var(--dark-800)] shadow-lg group-hover:bg-[var(--primary-300)] transition-all duration-300 ease-out">
          <span className="text-2xl font-bold text-white">
            {stepNumber}
          </span>
        </div>
      </div>

       {/* Connecting Line */}
       {(
         <div className="absolute top-8 w-full h-0.5 hidden md:block">
           {/* Base line */}
           <div className={`absolute inset-0 bg-gradient-to-r from-[var(--primary-400)] via-[var(--primary-300)] to-[var(--primary-400)] opacity-20`}></div>
           {/* Animated progress line */}
           <div className={`absolute inset-0 bg-gradient-to-r from-[var(--primary-400)] via-[var(--primary-300)] to-[var(--primary-400)] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform origin-center scale-x-0 group-hover:scale-x-100`}></div>
         </div>
       )}

      <div className="relative z-10 flex flex-col h-full flex-1">
        <Card className="p-8 border-2 border-[var(--primary-500)] theme-shadow-card bg-gradient-to-br from-[var(--dark-700)] to-[var(--dark-800)] group-hover:from-[var(--dark-600)] group-hover:to-[var(--dark-600)] group-hover:border-[var(--primary-300)] transition-all duration-300 ease-out h-full flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
          <CardTitle className="text-2xl font-industrial text-white group-hover:text-[var(--primary-300)] mb-4 transition-colors duration-300 ease-out">
            {title}
          </CardTitle>
          <p className="text-[var(--dark-300)] leading-relaxed group-hover:text-[var(--dark-100)] transition-colors duration-300 ease-out flex-1">
            {description}
          </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
