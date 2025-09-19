import { Separator } from "@/components/ui/separator";

interface StatsCardProps {
  value: string;
  suffix: string;
  title: string;
  description: string;
  index: number;
}

export function StatsCard({ value, suffix, title, description, index }: StatsCardProps) {
  return (
    <div className="text-center group">
      <div className="mb-4 text-6xl md:text-7xl font-automotive text-white group-hover:text-[var(--primary-200)] transition-colors duration-300 ease-out">
        {value}
        <span className="text-[var(--primary-200)]">{suffix}</span>
      </div>
      <div className="mb-4 relative overflow-hidden">
        <Separator className="bg-white/30 transition-colors duration-300 ease-out" />
        <div className="absolute inset-0 bg-[var(--primary-200)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></div>
      </div>
      <h3 className="mb-2 text-xl font-industrial text-white">
        {title}
      </h3>
      <p className="text-sm text-[var(--primary-100)]">
        {description}
      </p>
    </div>
  );
}
