import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { NavLinkProps } from "@/lib/types";

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <NavigationMenuLink
      href={href}
      className="relative block px-6 py-3 text-xl font-industrial text-white hover:bg-transparent hover:text-[var(--primary-400)] focus:bg-transparent focus:text-[var(--primary-400)] transition-all duration-300 ease-out before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-0.5 before:bg-[var(--primary-400)] before:transition-all before:duration-300 before:ease-out hover:before:left-0 hover:before:w-full"
    >
      <span className="relative z-10">{children}</span>
    </NavigationMenuLink>
  );
}
