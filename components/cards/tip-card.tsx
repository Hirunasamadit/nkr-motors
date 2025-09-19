import { Badge } from "@/components/ui/badge";
import { CardDescription } from "@/components/ui/card";
import { TipCardProps } from "@/lib/types";

export function TipCard({
  icon,
  category,
  title,
  description,
  index,
}: TipCardProps) {
  return (
    <article className="group relative bg-[var(--dark-800)] hover:bg-[var(--dark-700)] theme-shadow-card overflow-hidden transition-all duration-300 ease-out border-2 border-[var(--dark-700)] hover:border-[var(--primary-600)] flex h-40">
      <div
        className={`relative w-40 flex-shrink-0 theme-bg-component-${index + 1} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="w-16 h-16 bg-white/20 flex items-center justify-center">
          {icon}
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="px-3 py-1 text-sm font-bold border-0 bg-white/20 backdrop-blur-sm text-[var(--dark-700)] group-hover:text-white transition-colors duration-300 ease-out">
            {category}
          </Badge>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-industrial text-white group-hover:text-[var(--primary-300)] mb-4 transition-colors duration-300 ease-out">
          {title}
        </h3>
        <CardDescription className="text-[var(--dark-300)] leading-relaxed text-base group-hover:text-[var(--dark-100)] transition-colors duration-300 ease-out">
          {description}
        </CardDescription>
      </div>
    </article>
  );
}
