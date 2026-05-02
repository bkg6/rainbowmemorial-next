"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomepageHero() {
  return (
    <section className="min-h-[85vh] flex items-center px-6 md:px-20 pt-32 pb-[120px]">
      <div className="max-w-[1180px] mx-auto w-full grid md:grid-cols-[55fr_45fr] gap-16 items-center">
        {/* Left */}
        <div className="space-y-8">
          <p className="text-[13px] tracking-[0.06em] uppercase text-[--color-text-secondary]">
            For the ones who made life bigger
          </p>
          <h1
            className="text-[44px] md:text-[72px]"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            For the day you weren&apos;t ready for.
          </h1>
          <p className="text-[19px] text-[--color-text-secondary] leading-relaxed max-w-[480px]">
            Upload your favorite photo. Watch their face appear inside a Rainbow Bridge tribute.
            Share it with everyone who loved them.
          </p>
          <div className="space-y-3">
            <Link href="/create">
              <Button className="text-[17px] min-h-[56px] px-9 py-[18px]">
                Make their tribute
              </Button>
            </Link>
            <p className="text-[14px]" style={{ color: "#888888" }}>
              Free preview — no signup needed
            </p>
          </div>
        </div>

        {/* Right — Product Preview Card */}
        <div className="relative flex justify-center">
          <div className="bg-white rounded-xl shadow-memorial w-[300px] md:w-[320px] aspect-[9/16] overflow-hidden flex flex-col">
            {/* Photo zone — 65% */}
            <div className="flex-[65] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1768676758480-44e11e5c164a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                alt="Buddy, a golden retriever"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-[#D4C9BD]" />

            {/* Text zone — 35% */}
            <div className="flex-[35] flex flex-col items-center justify-center px-6 py-4 text-center gap-1">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "28px",
                  lineHeight: "1.2",
                  color: "var(--color-text-primary)",
                }}
              >
                Buddy
              </h3>
              <p style={{ fontSize: "16px", color: "#5A5A5A", lineHeight: "1.4" }}>
                2010 — 2024
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "#888888",
                  paddingTop: "6px",
                  fontFamily: "var(--font-display)",
                }}
              >
                &ldquo;The best friend I ever had&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
