import Link from "next/link";
import { PawPrint } from "@/components/illustrations/PawPrint";
import { SleepingCat } from "@/components/illustrations/SleepingCat";
import { Button } from "@/components/ui/button";
import { HomepageHero } from "./homepage-hero";
import { HomepageFAQ } from "./homepage-faq";
import { TEMPLATES } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";

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
      <path
        d="M10 1 C9 3 7.5 4.5 7.5 6 C7.5 7.7 8.6 9 10 9 C11.4 9 12.5 7.7 12.5 6 C12.5 4.5 11 3 10 1Z"
        fill="currentColor"
        opacity="0.9"
      />
      <rect x="8" y="9" width="4" height="13" rx="1.5" fill="currentColor" opacity="0.5" />
      <line x1="10" y1="9" x2="10" y2="10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

interface GalleryPet {
  name: string;
  bornYear: string;
  diedYear: string;
  tribute: string;
  candles: number;
  photo: string;
  templateId: TemplateId;
}

// Real American pet names with breed-appropriate stock photos and a template
// each, so the gallery doubles as a "this is what your memorial will look like"
// proof-of-product.
const GALLERY_PETS: GalleryPet[] = [
  {
    name: "Buddy",
    bornYear: "2010",
    diedYear: "2024",
    tribute: "The best friend I ever had",
    candles: 142,
    photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    templateId: "rainbow_bridge",
  },
  {
    name: "Whiskers",
    bornYear: "2015",
    diedYear: "2025",
    tribute: "Softest paws, loudest purr",
    candles: 87,
    photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    templateId: "anniversary",
  },
  {
    name: "Duke",
    bornYear: "2011",
    diedYear: "2023",
    tribute: "Always guarding the door",
    candles: 219,
    photo: "https://images.unsplash.com/photo-1568572933382-74d440642117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    templateId: "classic",
  },
  {
    name: "Simba",
    bornYear: "2013",
    diedYear: "2026",
    tribute: "King of the sunny spot",
    candles: 63,
    photo: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    templateId: "birthday_heaven",
  },
  {
    name: "Shadow",
    bornYear: "2009",
    diedYear: "2024",
    tribute: "Fifteen years wasn't enough",
    candles: 341,
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    templateId: "memory",
  },
  {
    name: "Daisy",
    bornYear: "2016",
    diedYear: "2025",
    tribute: "Every walk was an adventure",
    candles: 108,
    photo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    templateId: "rainbow_bridge",
  },
];

/**
 * Renders a memorial card the way the user's actual purchase will look —
 * template PNG as background, circular photo composited at the template's
 * photoZone, name/dates/tribute below at their respective zones.
 *
 * Position percentages are derived directly from the template config on a
 * 1080x1920 canvas, so any future tweak to TEMPLATES[].photoZone or text
 * zones flows through here automatically.
 */
function MemorialCard({ pet }: { pet: GalleryPet }) {
  const tpl = TEMPLATES[pet.templateId];
  const photoTopPct = (tpl.photoZone.y / tpl.canvasHeight) * 100;
  const photoSizePct = (tpl.photoZone.width / tpl.canvasWidth) * 100;
  const nameTopPct = (tpl.nameZone.y / tpl.canvasHeight) * 100;
  const datesTopPct = (tpl.datesZone.y / tpl.canvasHeight) * 100;
  const tributeTopPct = (tpl.tributeZone.y / tpl.canvasHeight) * 100;

  return (
    <div className="space-y-2">
      <div
        className="relative aspect-[9/16] rounded-[12px] overflow-hidden border border-[--color-border] shadow-card"
        style={{
          backgroundImage: `url('${tpl.background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Photo */}
        <div
          className="absolute"
          style={{
            top: `${photoTopPct}%`,
            left: "50%",
            transform: "translateX(-50%)",
            width: `${photoSizePct}%`,
            aspectRatio: "1",
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-[2px] border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Name */}
        <div
          className="absolute w-full text-center px-3"
          style={{
            top: `${nameTopPct}%`,
            left: 0,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(14px, 3.5vw, 22px)",
            fontWeight: 400,
            color: tpl.nameZone.color,
            lineHeight: 1.1,
          }}
        >
          {pet.name}
        </div>

        {/* Dates */}
        <div
          className="absolute w-full text-center"
          style={{
            top: `${datesTopPct}%`,
            left: 0,
            fontSize: "clamp(9px, 1.8vw, 12px)",
            color: tpl.datesZone.color,
            letterSpacing: "0.02em",
          }}
        >
          {pet.bornYear} — {pet.diedYear}
        </div>

        {/* Tribute */}
        <div
          className="absolute w-full text-center px-4"
          style={{
            top: `${tributeTopPct}%`,
            left: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(8px, 1.5vw, 11px)",
            color: tpl.tributeZone.color,
            lineHeight: 1.3,
          }}
        >
          &ldquo;{pet.tribute}&rdquo;
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <CandleIcon size={12} className="text-[--color-accent-primary]" />
        <span className="text-[12px] text-[--color-text-tertiary]">
          {pet.candles} candles lit
        </span>
      </div>
    </div>
  );
}

/**
 * Phone-frame mockup of an anniversary email. Replaces the abstract calendar
 * SVG — shows the user what they actually receive, not what scheduling
 * something abstractly looks like.
 */
function AnniversaryEmailMockup() {
  return (
    <div className="relative mx-auto w-[260px] md:w-[280px]">
      {/* Phone frame */}
      <div className="rounded-[36px] bg-[#2A2A2A] p-[6px] shadow-[0_24px_60px_rgba(80,60,40,0.18)]">
        <div className="rounded-[30px] bg-white overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-2 text-[10px] text-[--color-text-primary] bg-[--color-background]">
            <span className="font-semibold">9:41</span>
            <span className="opacity-60">●●● ▮</span>
          </div>
          {/* Email header */}
          <div className="px-4 py-3 border-b border-[--color-border] space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[--color-accent-primary] flex items-center justify-center">
                <PawPrint size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-[--color-text-primary] truncate">
                  rainbow.memorial
                </p>
                <p className="text-[9px] text-[--color-text-tertiary] truncate">
                  hello@rainbow.memorial
                </p>
              </div>
              <span className="text-[9px] text-[--color-text-tertiary]">9:00 AM</span>
            </div>
            <p
              className="text-[13px] text-[--color-text-primary] pt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A year with Buddy in our hearts
            </p>
          </div>
          {/* Email body */}
          <div className="p-4 space-y-3">
            <p className="text-[11px] leading-relaxed text-[--color-text-secondary]">
              Buddy,
            </p>
            <p className="text-[10px] leading-relaxed text-[--color-text-secondary]">
              It&apos;s been one year since you crossed the rainbow bridge.
            </p>
            {/* Embedded memorial mini-render */}
            <div
              className="relative aspect-[9/16] w-full rounded-[6px] overflow-hidden"
              style={{
                backgroundImage: "url('/templates/rainbow_bridge.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="absolute rounded-full overflow-hidden border-[1.5px] border-white/60"
                style={{
                  top: "31.7%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "44%",
                  aspectRatio: "1",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300"
                  alt="Buddy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute w-full text-center"
                style={{
                  top: "60%",
                  left: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "13px",
                  color: "#2A2A2A",
                }}
              >
                Buddy
              </div>
              <div
                className="absolute w-full text-center"
                style={{ top: "65%", left: 0, fontSize: "8px", color: "#5A5A5A" }}
              >
                2010 — 2024
              </div>
            </div>
            <button className="w-full bg-[--color-accent-primary] text-white text-[10px] font-medium py-2 rounded-full">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
              rainbow.memorial
            </span>
          </Link>
          <Link href="/create">
            <Button className="px-6 py-3.5 min-h-[44px] text-[15px]">Make a tribute</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <HomepageHero />

      {/* Gallery — pre-rendered memorials showing the templates in action */}
      <section className="pt-[60px] pb-[80px] px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "36px" }}
            >
              The pets we&apos;ve all loved and lost.
            </h2>
            <p className="text-[16px] text-[--color-text-secondary] max-w-[520px] mx-auto leading-relaxed">
              Every tribute below was made by someone in grief. Every pet here was someone&apos;s
              whole world. You are not alone.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {GALLERY_PETS.map((pet) => (
              <MemorialCard key={pet.name} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-[80px] px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "32px" }}>
              Ninety seconds. A lifetime of love.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
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
              <div key={step.title} className="text-center space-y-4">
                <p
                  className="text-[36px] text-[--color-border]"
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1 }}
                >
                  {step.step}
                </p>
                <h3 style={{ fontFamily: "var(--font-body)" }}>{step.title}</h3>
                <p className="text-[16px] text-[--color-text-secondary] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anniversary — phone email mockup */}
      <section className="py-[80px] px-6">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          <div className="space-y-5">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "36px",
                lineHeight: 1.15,
              }}
            >
              You won&apos;t have to remember alone.
            </h2>
            <p className="text-[17px] text-[--color-text-secondary] leading-[1.7] max-w-[520px]">
              On the anniversary of their passing, a quiet tribute will arrive in your inbox.
              Already made. Ready to share. You won&apos;t have to do anything — and you
              won&apos;t have to remember the date by yourself.
            </p>
          </div>
          <div className="flex justify-center">
            <AnniversaryEmailMockup />
          </div>
        </div>
      </section>

      {/* Rainbow Bridge story — type with a Rainbow Bridge memorial floating to the right */}
      <section className="py-[80px] px-6">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center">
          <div className="space-y-5 max-w-[600px]">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: 1.2,
              }}
            >
              Just this side of the Rainbow Bridge.
            </h2>
            <p className="text-[17px] text-[--color-text-secondary] leading-[1.8]">
              There&apos;s a place pets go when they leave us — a meadow with soft grass and warm
              light, where they wait until we meet them again. The story has comforted families
              for decades. We made tributes for that meadow. Bring their face into it.
            </p>
            <p
              className="text-[11px] tracking-[0.08em] uppercase text-[--color-text-tertiary] leading-[1.7] pt-2"
            >
              Originally written in 1959 by Edna Clyne-Rekhy,<br />
              a 19-year-old Scottish girl mourning her Labrador, Major.
            </p>
          </div>
          <div className="max-w-[260px] mx-auto md:mx-0 md:ml-auto">
            <MemorialCard pet={GALLERY_PETS[5]} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <HomepageFAQ />

      {/* Final CTA */}
      <section className="py-[100px] px-6" style={{ backgroundColor: "#2A1F18" }}>
        <div className="max-w-[640px] mx-auto text-center space-y-7">
          <div className="flex justify-center opacity-30">
            <PawPrint size={40} className="text-[--color-background]" />
          </div>
          <h2
            className="text-[36px] md:text-[52px]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-background)",
            }}
          >
            When you&apos;re ready, we&apos;re here.
          </h2>
          <p className="text-[17px] leading-relaxed" style={{ color: "rgba(250,246,239,0.7)" }}>
            Take 90 seconds. Make something beautiful for them.
          </p>
          <Link href="/create">
            <Button className="min-h-[56px] px-10 text-[17px]">Make their tribute</Button>
          </Link>
          <div className="pt-6 opacity-20">
            <SleepingCat size={64} className="text-[--color-background] mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "var(--color-background-alt)" }}
        className="py-[48px] px-6"
      >
        <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <PawPrint size={18} className="text-[#2A2A2A]" />
              <span
                className="font-semibold text-[--color-text-primary] text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                rainbow.memorial
              </span>
            </div>
            <p className="text-sm text-[--color-text-secondary]">
              Made with love, for the ones we lost.
            </p>
          </div>
          <div className="flex gap-8 text-[13px] text-[--color-text-secondary]">
            <a href="mailto:hello@rainbow.memorial" className="hover:text-[--color-accent-primary] transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-[--color-accent-primary] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[--color-accent-primary] transition-colors">Terms</a>
          </div>
        </div>
        <p className="text-center text-[11px] text-[--color-text-tertiary] mt-6">
          © 2026 rainbow.memorial
        </p>
      </footer>
    </div>
  );
}
