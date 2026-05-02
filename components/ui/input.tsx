"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium tracking-[0.06em] uppercase text-[--color-text-secondary]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "bg-white border-[1.5px] border-[--color-border] rounded-xl px-[18px] py-4",
            "text-[16px] text-[--color-text-primary] placeholder:text-[--color-text-tertiary]",
            "focus:outline-none focus:border-[--color-border-focus] focus:ring-4 focus:ring-[rgba(123,154,171,0.15)]",
            "transition-all duration-[220ms]",
            error && "border-[--color-error]",
            className
          )}
          {...props}
        />
        {error && <span className="text-sm text-[--color-error]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
