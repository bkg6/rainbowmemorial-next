import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MemorialPageClient } from "./memorial-client";

interface Props {
  params: { slug: string };
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Format a YYYY-MM-DD date string. If the day is the 1st, format as
 * "Month YYYY" (covers seed data where only month/year is known and we
 * stored day=01). Otherwise full "Month D, YYYY".
 *
 * Real customer dates that happen to fall on the 1st of the month will
 * read as "Month YYYY" instead of "Month 1, YYYY" — acceptable side
 * effect, both forms are natural English.
 */
function formatFullDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const year = m[1];
  const month = MONTHS[parseInt(m[2], 10) - 1] ?? "";
  const day = parseInt(m[3], 10);
  if (!month) return iso;
  if (day === 1) return `${month} ${year}`;
  return `${month} ${day}, ${year}`;
}

function buildDateRange(
  bornText: string | null,
  diedText: string | null,
  bornIso: string | null,
  diedIso: string | null
): string {
  const born = bornText ?? formatFullDate(bornIso);
  const died = diedText ?? formatFullDate(diedIso) ?? "";
  return born ? `${born} — ${died}` : died;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await db
    .select()
    .from(pets)
    .where(eq(pets.slug, params.slug))
    .limit(1);

  if (!found.length) return { title: "Memorial not found" };

  const p = found[0];
  const dateRange = buildDateRange(
    p.bornDateText,
    p.diedDateText,
    p.bornDate,
    p.diedDate
  );
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
  const ogImage = p.ogImageUrl ?? p.renderedImageUrl;

  // Seed/composite memorials are noindex (they're product demos, not
  // real customer content). Real customer rows default isSample=false
  // and stay indexable.
  const robots = p.isSample ? { index: false, follow: false } : undefined;

  return {
    title: `In loving memory of ${p.petName}`,
    description: `${dateRange}${p.tributeLine ? ` · "${p.tributeLine}"` : ""}`,
    robots,
    openGraph: {
      title: `In loving memory of ${p.petName}`,
      description: dateRange,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      url: `${appUrl}/m/${params.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `In loving memory of ${p.petName}`,
      description: dateRange,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function MemorialPage({ params }: Props) {
  const found = await db
    .select()
    .from(pets)
    .where(eq(pets.slug, params.slug))
    .limit(1);

  // 404 if no pet, or if not a sample and never paid (real customers must
  // have paid_at set). Sample pets bypass the paid gate so seed pages
  // render even though they have no real payment.
  if (!found.length) notFound();
  const p = found[0];
  if (!p.isSample && !p.paidAt) notFound();

  const bornFormatted = p.bornDateText ?? formatFullDate(p.bornDate);
  const diedFormatted = p.diedDateText ?? formatFullDate(p.diedDate) ?? "";
  const dateRange = bornFormatted
    ? `${bornFormatted} — ${diedFormatted}`
    : diedFormatted;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

  return (
    <MemorialPageClient
      petName={p.petName}
      species={p.species ?? undefined}
      bornFormatted={bornFormatted}
      diedFormatted={diedFormatted}
      dateRange={dateRange}
      tributeLine={p.tributeLine ?? undefined}
      renderedImageUrl={p.renderedImageUrl ?? ""}
      slug={p.slug}
      initialCandleCount={p.candleCount}
      isSample={p.isSample}
      memorialUrl={`${appUrl}/m/${p.slug}`}
    />
  );
}
