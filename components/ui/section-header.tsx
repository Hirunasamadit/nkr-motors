
interface SectionHeaderProps {
  badge: string;
  title: string;
  titleAccent?: string;
  description: string;
  className?: string;
  gradientClass?: string;
}

export function SectionHeader({
  badge,
  title,
  titleAccent,
  description,
  className = "",
  gradientClass = "theme-text-gradient-primary",
}: SectionHeaderProps) {
  return (
    <div className={`text-left mb-20 relative group ${className}`}>
      {/* Background text positioned behind the main title */}
      <div className="absolute inset-0 w-full flex justify-start items-start -top-4 z-0 group">
        <div className="text-4xl md:text-5xl font-automotive text-transparent tracking-widest select-none transition-transform duration-300 ease-in-out group-hover:-translate-y-4"
             style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)" }}>
          {badge}
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <h2 className="mb-6 text-5xl md:text-6xl font-industrial text-white tracking-tight">
          {title}{" "}
          {titleAccent && (
            <span className={gradientClass}>{titleAccent}</span>
          )}
        </h2>
        <p className="max-w-3xl text-xl text-[var(--dark-300)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
