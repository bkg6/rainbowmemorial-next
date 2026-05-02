import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "featured";
  children: ReactNode;
}

export function Card({ className, variant = "standard", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[--color-surface] rounded-[20px] p-6 md:p-8 shadow-card",
        variant === "standard" && "border border-[--color-border]",
        variant === "featured" &&
          "border-2 border-[--color-accent-warmth] bg-[--color-accent-warmth-light]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
