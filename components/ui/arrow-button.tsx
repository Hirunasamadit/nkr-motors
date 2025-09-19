import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArrowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  asChild?: boolean;
}

export function ArrowButton({
  children,
  href,
  onClick,
  className = "",
  asChild = false,
}: ArrowButtonProps) {
  const baseClasses = "group/btn inline-flex items-center font-bold transition-colors duration-300 ease-out p-0 h-auto hover:no-underline text-[var(--primary-600)] hover:text-[var(--primary-300)]";

  const buttonContent = (
    <>
      {children}
      <span className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300 ease-out">
        →
      </span>
    </>
  );

  if (asChild && href) {
    return (
      <Button
        asChild
        variant="link"
        className={cn(baseClasses, className)}
      >
        <a href={href}>
          {buttonContent}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant="link"
      onClick={onClick}
      className={cn(baseClasses, className)}
    >
      {buttonContent}
    </Button>
  );
}
