"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const base =
      "rounded-full px-8 py-4 min-h-[52px] transition-[background-color] duration-[200ms] ease-out cursor-pointer font-body text-[16px] font-medium leading-snug";

    const variants = {
      primary:
        "bg-[--color-accent-primary] text-white hover:bg-[--color-accent-primary-hover] active:scale-[0.98] shadow-[0_4px_12px_rgba(80,60,40,0.12)] disabled:bg-[#E4B5A5] disabled:text-white disabled:cursor-not-allowed disabled:shadow-none",
      secondary:
        "bg-transparent border-[1.5px] border-[--color-accent-primary] text-[--color-accent-primary] hover:bg-[--color-accent-primary-light] disabled:opacity-50 disabled:cursor-not-allowed",
      ghost:
        "bg-transparent text-[--color-text-secondary] hover:bg-[rgba(42,31,24,0.04)] disabled:opacity-50 disabled:cursor-not-allowed",
      destructive:
        "bg-transparent text-[--color-error] hover:bg-[rgba(200,120,110,0.04)] disabled:opacity-50 disabled:cursor-not-allowed",
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
