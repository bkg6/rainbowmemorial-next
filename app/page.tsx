import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint } from "@/components/illustrations/PawPrint";
import { SleepingCat } from "@/components/illustrations/SleepingCat";
import { Button } from "@/components/ui/button";
import { HomepageHero } from "./homepage-hero";
import { HomepageFAQ } from "./homepage-faq";

const HOME_TITLE = "Rainbow Memorial — A Place to Remember the Pet You Lost";
const HOME_DESCRIPTION =
  "Make a permanent memorial page for the pet you lost. Upload one photo and they live at their own link, yours to keep and share.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};


// V1 close gallery: each card links to a real /m/[slug] page seeded into
// the database by scripts/seed-memorials.ts. The image is the rendered
// PNG produced by the same pipeline a real customer payment runs through,
// so the gallery is literal proof of what they'll get.
//
// Order chosen for visual variety in the first row (alternating species
// and templates visible at first glance).
interface GalleryMemorial {
  slug: string;
  name: string;
  dates: string;
  image: string;
}

const V1_MEMORIALS: GalleryMemorial[] = [
  {
    slug: "charlie-2009-2024",
    name: "Charlie",
    dates: "2009 — 2024",
    image: "/samples/memorial-charlie.png",
  },
  {
    slug: "hazel-2010-2024",
    name: "Hazel",
    dates: "2010 — 2024",
    image: "/samples/memorial-hazel.png",
  },
  {
    slug: "mochi-2018-2025",
    name: "Mochi",
    dates: "2018 — 2025",
    image: "/samples/memorial-mochi.png",
  },
  {
    slug: "otis-2019-2024",
    name: "Otis",
    dates: "2019 — 2024",
    image: "/samples/memorial-otis.png",
  },
  {
    slug: "bodhi-2017-2025",
    name: "Bodhi",
    dates: "2017 — 2025",
    image: "/samples/memorial-bodhi.png",
  },
  {
    slug: "pepper-2008-2024",
    name: "Pepper",
    dates: "2008 — 2024",
    image: "/samples/memorial-pepper.png",
  },
];

/**
 * Clickable card: rendered memorial PNG, then pet name + dates underneath
 * in serif. Whole card is the link target. Subtle lift on hover, no
 * cheesy effects.
 */
function MemorialCard({ memorial }: { memorial: GalleryMemorial }) {
  return (
    <Link
      href={`/m/${memorial.slug}`}
      className="group block space-y-3 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[9/16] rounded-[10px] overflow-hidden bg-white border border-[--color-border] shadow-card group-hover:shadow-[0_12px_28px_rgba(80,60,40,0.12)] transition-shadow duration-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={memorial.image}
          alt={`Memorial for ${memorial.name}, ${memorial.dates}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center space-y-0.5">
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            color: "var(--color-text-primary)",
          }}
        >
          {memorial.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            color: "var(--color-text-tertiary)",
            letterSpacing: "0.02em",
          }}
        >
          {memorial.dates}
        </p>
      </div>
    </Link>
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
                  hannah@rainbow.memorial
                </p>
              </div>
              <span className="text-[9px] text-[--color-text-tertiary]">9:00 AM</span>
            </div>
            <p
              className="text-[13px] text-[--color-text-primary] pt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A year with Charlie in our hearts
            </p>
          </div>
          {/* Email body */}
          <div className="p-4 space-y-3">
            <p className="text-[11px] leading-relaxed text-[--color-text-secondary]">
              Charlie,
            </p>
            <p className="text-[10px] leading-relaxed text-[--color-text-secondary]">
              It&apos;s been one year since you crossed the rainbow bridge.
            </p>
            {/* Embedded memorial mini-render — uses the actual rendered PNG */}
            <div className="relative aspect-[9/16] w-full rounded-[6px] overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/samples/memorial-charlie.png"
                alt="Memorial for Charlie"
                className="w-full h-full object-cover"
              />
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
            <Button className="px-6 py-3.5 min-h-[44px] text-[15px]">Make their memorial</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <HomepageHero />

      {/* Gallery — clickable memorials, each links to /m/[slug] */}
      <section className="pt-[60px] pb-[80px] px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-12 space-y-3">
            <p
              className="text-[11px] tracking-[0.18em] uppercase"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-tertiary)",
              }}
            >
              Memorials
            </p>
            <p
              className="text-[16px] max-w-[520px] mx-auto"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-secondary)",
                fontStyle: "italic",
              }}
            >
              Real memorials from families who came back to share them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 max-w-[920px] mx-auto">
            {V1_MEMORIALS.map((m) => (
              <MemorialCard key={m.slug} memorial={m} />
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
                title: "Share one photo",
                body: "Upload your favorite. We crop, frame, and place them inside a quiet memorial template.",
              },
              {
                step: "02",
                title: "See it before you pay",
                body: "The memorial renders in real time. If it doesn't feel right, you don't pay. It's that simple.",
              },
              {
                step: "03",
                title: "Share the link, or keep it close",
                body: "Post it to Instagram. Send it to family. Or just keep it for yourself — the page stays at the same link, always.",
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
              On the anniversary of their passing, a quiet email arrives. The memorial is
              already there, ready when you are. You don&apos;t have to do anything. You
              don&apos;t have to remember the date alone.
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
              light, where they wait until we meet them again. The story is older than the
              internet. We made a memorial template for that meadow. Bring their face into it.
            </p>
            <p
              className="text-[11px] tracking-[0.08em] uppercase text-[--color-text-tertiary] leading-[1.7] pt-2"
            >
              Originally written in 1959 by Edna Clyne-Rekhy,<br />
              a 19-year-old Scottish girl mourning her Labrador, Major.
            </p>
          </div>
          <div className="max-w-[260px] mx-auto md:mx-0 md:ml-auto">
            <MemorialCard memorial={V1_MEMORIALS[0]} />
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
            <Button className="min-h-[56px] px-10 text-[17px]">Make their memorial</Button>
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
            <a href="mailto:hannah@rainbow.memorial" className="hover:text-[--color-accent-primary] transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-[--color-accent-primary] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[--color-accent-primary] transition-colors">Terms</a>
          </div>
        </div>
        <p className="text-center text-[11px] text-[--color-text-tertiary] mt-6">
          © 2026 rainbow.memorial
        </p>
        <p className="text-center text-[11px] text-[--color-text-tertiary] mt-2">
          Informed by the work of Marty Tousley and Wallace Sife.
        </p>
      </footer>
    </div>
  );
}
