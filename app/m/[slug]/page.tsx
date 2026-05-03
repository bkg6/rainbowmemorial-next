import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MemorialPageClient } from "./memorial-client";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pet = await db
    .select()
    .from(pets)
    .where(eq(pets.slug, params.slug))
    .limit(1);

  if (!pet.length) return { title: "Memorial not found" };

  const p = pet[0];
  const bornYear = p.bornDate ? new Date(p.bornDate).getFullYear() : null;
  const diedYear = new Date(p.diedDate).getFullYear();
  const dateStr = bornYear ? `${bornYear} – ${diedYear}` : diedYear.toString();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

  // Prefer the dedicated 1200x630 OG image; fall back to the Story image if missing
  const ogImage = p.ogImageUrl ?? p.renderedImageUrl;

  return {
    title: `In loving memory of ${p.petName}`,
    description: `${dateStr}${p.tributeLine ? ` · "${p.tributeLine}"` : ""}`,
    openGraph: {
      title: `In loving memory of ${p.petName}`,
      description: dateStr,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : [],
      url: `${appUrl}/m/${params.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `In loving memory of ${p.petName}`,
      description: dateStr,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function MemorialPage({ params }: Props) {
  const pet = await db
    .select()
    .from(pets)
    .where(eq(pets.slug, params.slug))
    .limit(1);

  if (!pet.length || !pet[0].paidAt) notFound();

  const p = pet[0];
  const bornYear = p.bornDate ? new Date(p.bornDate).getFullYear() : null;
  const diedYear = new Date(p.diedDate).getFullYear();
  const dateStr = bornYear ? `${bornYear} — ${diedYear}` : diedYear.toString();
  return (
    <MemorialPageClient
      petName={p.petName}
      dateStr={dateStr}
      tributeLine={p.tributeLine ?? undefined}
      renderedImageUrl={p.renderedImageUrl ?? ""}
      slug={p.slug}
      initialCandleCount={p.candleCount}
    />
  );
}
