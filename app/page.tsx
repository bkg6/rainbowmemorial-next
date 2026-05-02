import Link from "next/link";
import { PawPrint } from "@/components/illustrations/PawPrint";
import { SleepingCat } from "@/components/illustrations/SleepingCat";
import { Button } from "@/components/ui/button";
import { HomepageHero } from "./homepage-hero";
import { HomepageFAQ } from "./homepage-faq";

function CandleIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Flame */}
      <path
        d="M10 1 C9 3 7.5 4.5 7.5 6 C7.5 7.7 8.6 9 10 9 C11.4 9 12.5 7.7 12.5 6 C12.5 4.5 11 3 10 1Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Candle body */}
      <rect x="8" y="9" width="4" height="13" rx="1.5" fill="currentColor" opacity="0.5" />
      {/* Wick */}
      <line x1="10" y1="9" x2="10" y2="10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

const GALLERY_PETS = [
  {
    name: "Buddy",
    years: "2010 — 2024",
    tribute: "The best friend I ever had",
    candles: 142,
    photo:
      "https://images.unsplash.com/photo-1768676758480-44e11e5c164a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Mochi",
    years: "2015 — 2024",
    tribute: "Softest paws, loudest purr",
    candles: 87,
    photo:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Bear",
    years: "2011 — 2023",
    tribute: "Always guarding the door",
    candles: 63,
    photo:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Marigold",
    years: "2016 — 2024",
    tribute: "She filled every room",
    candles: 44,
    photo:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Ollie",
    years: "2013 — 2024",
    tribute: "Our gentle giant",
    candles: 38,
    photo:
      "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Luna",
    years: "2018 — 2024",
    tribute: "Chased every sunbeam",
    candles: 29,
    photo:
      "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

export default function Homepage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-[--color-border] backdrop-blur-sm"
        style={{ backgroundColor: "rgba(250,246,239,0.95)" }}
      >
        <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <PawPrint size={22} className="text-[#2A2A2A]" />
            <span
              className="font-semibold text-[--color-text-primary]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              paws.memorial
            </span>
          </Link>
          <Link href="/create">
            <Button className="px-6 py-3.5 min-h-[44px] text-[15px]">Make a tribute</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <HomepageHero />

      {/* How It Works */}
      <section
        style={{ backgroundColor: "var(--color-background-alt)" }}
        className="py-[120px] px-6"
      >
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-[13px] tracking-[0.06em] uppercase text-[--color-text-secondary]">
              How it works
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
              Ninety seconds. A lifetime of love.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Share their photo",
                body: "Upload one favorite photo. We'll do the rest — crop, frame, and place their face inside a beautiful template.",
              },
              {
                step: "02",
                title: "Watch them appear",
                body: "Their face renders inside a dignified memorial template, in real time. You'll see it before you spend a cent.",
              },
              {
                step: "03",
                title: "Share with everyone who loved them",
                body: "Download the full-resolution file, post to Instagram Story, and send the memorial link to family.",
              },
            ].map((step) => (
              <div key={step.title} className="text-center space-y-5">
                <p
                  className="text-[40px] text-[--color-border]"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1 }}
                >
                  {step.step}
                </p>
                <h3 style={{ fontFamily: "var(--font-body)" }}>{step.title}</h3>
                <p className="text-[17px] text-[--color-text-secondary] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section
        style={{ backgroundColor: "var(--color-background)" }}
        className="py-[120px] px-6"
      >
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-[13px] tracking-[0.06em] uppercase text-[--color-text-secondary]">
              Four templates
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
              A tribute for every moment that matters.
            </h2>
            <p className="text-[18px] text-[--color-text-secondary] max-w-[580px] mx-auto leading-relaxed">
              Rainbow Bridge. Anniversary. Birthday in Heaven. Everyday memories. Each one designed
              to honor them properly.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Rainbow Bridge", image: "/templates/rainbow_bridge.png" },
              { label: "Anniversary", image: "/templates/anniversary.png" },
              { label: "Birthday in Heaven", image: "/templates/birthday_heaven.png" },
              { label: "In Memory", image: "/templates/memory.png" },
            ].map((t) => (
              <div key={t.label} className="space-y-3">
                <div className="aspect-[9/16] rounded-[16px] overflow-hidden border border-[--color-border] shadow-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="text-[15px] text-[--color-text-secondary] text-center"
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                >
                  {t.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remembered Here — Gallery */}
      <section
        style={{ backgroundColor: "var(--color-background-alt)" }}
        className="py-[120px] px-6"
      >
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-16 space-y-3">
            <p className="text-[13px] tracking-[0.04em] text-[--color-text-secondary]">
              remembered here
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
              The pets we&apos;ve all loved and lost.
            </h2>
            <p className="text-[17px] text-[--color-text-secondary] max-w-[520px] mx-auto leading-relaxed">
              Every tribute below was made by someone in grief. Every pet here was someone&apos;s
              whole world. You are not alone.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {GALLERY_PETS.map((pet) => (
              <div
                key={pet.name}
                className="bg-white rounded-2xl overflow-hidden border border-[--color-border] shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 space-y-1">
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: "20px",
                    }}
                  >
                    {pet.name}
                  </h3>
                  <p className="text-sm text-[--color-text-secondary]">{pet.years}</p>
                  <p
                    className="text-sm italic text-[--color-text-tertiary]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    &ldquo;{pet.tribute}&rdquo;
                  </p>
                  <div className="flex items-center gap-1.5 pt-2">
                    <CandleIcon size={14} className="text-[--color-accent-primary]" />
                    <span className="text-[12px] text-[--color-text-tertiary]">
                      {pet.candles} candles lit
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rainbow Bridge — type only */}
      <section
        className="py-[120px] px-6"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="max-w-[600px] mx-auto text-center space-y-8">
          <p className="text-[11px] tracking-[0.12em] uppercase text-[--color-text-tertiary]">
            An old story
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: "1.15",
            }}
          >
            Just this side of the Rainbow Bridge.
          </h2>
          <p
            className="text-[18px] text-[--color-text-secondary] leading-[1.8]"
          >
            There&apos;s a place pets go when they leave us — a meadow with soft grass and warm
            light, where they wait until we meet them again. The story has comforted families for
            decades. We made tributes for that meadow. Bring their face into it.
          </p>
          <p
            className="text-[11px] tracking-[0.1em] uppercase text-[--color-text-tertiary] leading-[1.7]"
          >
            Originally written in 1959 by Edna Clyne-Rekhy,<br />
            a 19-year-old Scottish girl mourning her Labrador, Major.
          </p>
        </div>
      </section>

      {/* Anniversary — with simplified calendar SVG */}
      <section
        className="py-[120px] px-6"
        style={{ backgroundColor: "var(--color-background-alt)" }}
      >
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-[13px] tracking-[0.06em] uppercase text-[--color-text-secondary]">
              Every year, we remember
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "40px",
              }}
            >
              You won&apos;t have to remember alone.
            </h2>
            <p className="text-[18px] text-[--color-text-secondary] leading-[1.7]">
              On the anniversary of their passing, a quiet tribute will arrive in your inbox.
              Already made. Ready to share. You won&apos;t have to do anything — and you
              won&apos;t have to remember the date by yourself.
            </p>
          </div>
          <div className="flex justify-center">
            {/* Simplified calendar SVG — single page, one date circled in rose */}
            <svg
              width="260"
              height="260"
              viewBox="0 0 260 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Calendar body */}
              <rect x="50" y="60" width="160" height="150" rx="10" stroke="#2A1F18" strokeWidth="1.5" fill="white" opacity="0.9" />
              {/* Header strip */}
              <rect x="50" y="60" width="160" height="36" rx="10" fill="#FAF6EF" stroke="#2A1F18" strokeWidth="1.5" />
              {/* Calendar tabs — outlined only */}
              <rect x="68" y="46" width="18" height="18" rx="4" stroke="#2A1F18" strokeWidth="1.5" fill="white" />
              <rect x="174" y="46" width="18" height="18" rx="4" stroke="#2A1F18" strokeWidth="1.5" fill="white" />
              {/* Month label */}
              <text x="130" y="84" textAnchor="middle" fontSize="11" fill="#7A6A5C" fontFamily="DM Sans, sans-serif" letterSpacing="0.06em">OCTOBER</text>
              {/* Divider */}
              <line x1="50" y1="96" x2="210" y2="96" stroke="#EDE3D5" strokeWidth="1" />
              {/* Day grid — dots for most dates */}
              {[0,1,2,3,4,5,6].map((col) =>
                [0,1,2,3].map((row) => {
                  const isCircled = col === 3 && row === 2;
                  const cx = 75 + col * 24;
                  const cy = 115 + row * 24;
                  if (isCircled) return null;
                  return <circle key={`${col}-${row}`} cx={cx} cy={cy} r={2.5} fill="#D4C9BD" />;
                })
              )}
              {/* Circled date — rose */}
              <circle cx={75 + 3 * 24} cy={115 + 2 * 24} r={11} fill="#C97B63" opacity="0.15" />
              <circle cx={75 + 3 * 24} cy={115 + 2 * 24} r={11} stroke="#C97B63" strokeWidth="1.5" fill="none" />
              <text x={75 + 3 * 24} y={115 + 2 * 24 + 4} textAnchor="middle" fontSize="10" fill="#C97B63" fontFamily="DM Sans, sans-serif">14</text>
              {/* Tiny paw beside circled date */}
              <g transform={`translate(${75 + 3 * 24 + 15}, ${115 + 2 * 24 - 6}) scale(0.42)`} opacity="0.5">
                <ellipse cx="12" cy="15" rx="4.2" ry="3.4" stroke="#C97B63" strokeWidth="2" />
                <ellipse cx="7.2" cy="9.8" rx="1.7" ry="2.2" transform="rotate(-15 7.2 9.8)" stroke="#C97B63" strokeWidth="2" />
                <ellipse cx="10.2" cy="8.2" rx="1.7" ry="2.2" stroke="#C97B63" strokeWidth="2" />
                <ellipse cx="13.8" cy="8.2" rx="1.7" ry="2.2" stroke="#C97B63" strokeWidth="2" />
                <ellipse cx="16.8" cy="9.8" rx="1.7" ry="2.2" transform="rotate(15 16.8 9.8)" stroke="#C97B63" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <HomepageFAQ />

      {/* Final CTA */}
      <section className="py-[120px] px-6" style={{ backgroundColor: "#2A1F18" }}>
        <div className="max-w-[640px] mx-auto text-center space-y-8">
          <div className="flex justify-center opacity-30">
            <PawPrint size={40} className="text-[--color-background]" />
          </div>
          <h2
            className="text-[36px] md:text-[56px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: "1.1",
              color: "var(--color-background)",
            }}
          >
            When you&apos;re ready, we&apos;re here.
          </h2>
          <p className="text-[18px] leading-relaxed" style={{ color: "rgba(250,246,239,0.7)" }}>
            Take 90 seconds. Make something beautiful for them.
          </p>
          <Link href="/create">
            <Button className="min-h-[56px] px-10 text-[17px]">Make their tribute</Button>
          </Link>
          <div className="pt-8 opacity-20">
            <SleepingCat size={72} className="text-[--color-background] mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "var(--color-background-alt)" }}
        className="py-[60px] px-6"
      >
        <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <PawPrint size={18} className="text-[#2A2A2A]" />
              <span
                className="font-semibold text-[--color-text-primary] text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                paws.memorial
              </span>
            </div>
            <p className="text-sm text-[--color-text-secondary]">
              Made with love, for the ones we lost.
            </p>
          </div>
          <div className="flex gap-8 text-[13px] text-[--color-text-secondary]">
            <a href="mailto:hello@paws.memorial" className="hover:text-[--color-accent-primary] transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-[--color-accent-primary] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[--color-accent-primary] transition-colors">Terms</a>
          </div>
        </div>
        <p className="text-center text-[11px] text-[--color-text-tertiary] mt-8">
          © 2026 paws.memorial
        </p>
      </footer>
    </div>
  );
}
