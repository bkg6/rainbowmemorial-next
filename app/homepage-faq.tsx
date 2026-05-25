"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "How much does it cost?",
    a: "$24.99 once. No subscription, ever. You pay once and the memorial is yours forever.",
  },
  {
    q: "Do I need an account?",
    a: "No account needed to make one. You upload your photo, enter a few details, pay, and receive the tribute. That's the entire flow. We use your email from payment to send you the files.",
  },
  {
    q: "What file formats can I upload?",
    a: "JPEG, PNG, HEIC (iPhone photos), and WebP. We recommend the clearest photo you have — the closer to their face, the better the tribute.",
  },
  {
    q: "How do I share to Instagram?",
    a: 'After payment, tap "Share to Instagram Story" on your phone. On desktop, download the file and upload it from your phone. The 1080×1920 format is made exactly for Instagram Stories.',
  },
  {
    q: "What's the anniversary email?",
    a: "You won't have to remember alone. One year after the date you entered, we'll send you a freshly rendered tribute with a different template. It arrives ready to share — you don't have to do anything.",
  },
];

export function HomepageFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{ backgroundColor: "var(--color-background)" }}
      className="py-[120px] px-6"
    >
      <div className="max-w-[720px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[13px] tracking-[0.06em] uppercase text-[--color-text-secondary]">
            Questions
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
            A few things people ask.
          </h2>
        </div>
        <div className="space-y-0">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="border-b border-[--color-border]">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left py-6 flex items-start justify-between gap-4 group"
                aria-expanded={open === idx}
              >
                <span
                  className="text-[18px] text-[--color-text-primary] group-hover:text-[--color-accent-primary] transition-colors"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                >
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "text-[--color-text-secondary] shrink-0 mt-1 transition-transform duration-[220ms]",
                    open === idx && "rotate-180"
                  )}
                />
              </button>
              {open === idx && (
                <p className="text-[16px] text-[--color-text-secondary] leading-relaxed pb-6">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
