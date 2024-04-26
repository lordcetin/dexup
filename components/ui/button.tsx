import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-zinc-50 shadow bg-zinc-50 text-zinc-900 hover:bg-zinc-50/90",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm bg-red-900 text-zinc-50 hover:bg-red-900/90",
        outline:
          "border border-zinc-200 shadow-sm hover:bg-zinc-100 border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:text-zinc-50",
        secondary:
          "bg-zinc-100 text-zinc-900 shadow-sm bg-zinc-800 text-zinc-50 hover:bg-zinc-800/80",
        ghost: "hover:text-zinc-900 hover:bg-zinc-800 hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline text-zinc-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
