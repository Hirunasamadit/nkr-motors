import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer relative",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        filled:
          "text-white text-xl font-bold tracking-wider uppercase bg-[var(--primary-400)] hover:bg-transparent border-2 border-transparent hover:border-[var(--primary-400)] duration-300 ease-out [clip-path:polygon(8%_0%,100%_0%,100%_50%,92%_100%,0%_100%,0%_50%)] hover:[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] before:translate-y-[100%] before:rotate-30 before:scale-150 hover:before:translate-x-[100%] hover:before:translate-y-[-100%] before:transition-none hover:before:transition-transform hover:before:duration-1400 hover:before:ease-out",
        outlined:
          "text-white text-xl font-bold tracking-wider uppercase bg-transparent border-2 border-[var(--primary-400)] duration-300 ease-out [clip-path:polygon(8%_0%,100%_0%,100%_50%,92%_100%,0%_100%,0%_50%)] overflow-hidden relative before:absolute before:inset-0 before:bg-[var(--primary-400)] before:scale-x-0 before:origin-center before:transition-transform before:duration-300 before:ease-in hover:before:scale-x-100 before:z-[-1]",
        destructive:
          "text-white text-xl font-bold tracking-wider uppercase bg-[var(--destructive-600)] hover:bg-transparent border-2 border-transparent hover:border-[var(--destructive-600)] duration-300 ease-out [clip-path:polygon(8%_0%,100%_0%,100%_50%,92%_100%,0%_100%,0%_50%)] hover:[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)] overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] before:translate-y-[100%] before:rotate-30 before:scale-150 hover:before:translate-x-[100%] hover:before:translate-y-[-100%] before:transition-none hover:before:transition-transform hover:before:duration-1400 hover:before:ease-out",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
