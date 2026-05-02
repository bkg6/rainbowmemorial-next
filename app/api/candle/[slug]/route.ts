import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pets, candles } from "@/db/schema";
import { eq, and, gte, count, sql } from "drizzle-orm";

const RATE_LIMIT_PER_HOUR = 3;

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const pet = await db
    .select({ id: pets.id, petName: pets.petName })
    .from(pets)
    .where(eq(pets.slug, slug))
    .limit(1);

  if (!pet.length) {
    return NextResponse.json({ error: "Memorial not found" }, { status: 404 });
  }

  const petId = pet[0].id;

  // IP rate limit: 3 per IP per hour per pet
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentCount = await db
    .select({ value: count() })
    .from(candles)
    .where(
      and(
        eq(candles.petId, petId),
        gte(candles.createdAt, oneHourAgo)
      )
    );

  // Silently ignore if rate limit exceeded (no error shown to user)
  if ((recentCount[0]?.value ?? 0) >= RATE_LIMIT_PER_HOUR) {
    const currentPet = await db
      .select({ candleCount: pets.candleCount })
      .from(pets)
      .where(eq(pets.id, petId))
      .limit(1);
    return NextResponse.json({ count: currentPet[0]?.candleCount ?? 0 });
  }

  const body = await req.json().catch(() => ({}));
  const { visitorName, message } = body as {
    visitorName?: string;
    message?: string;
  };

  await db.insert(candles).values({
    petId,
    visitorName: visitorName?.slice(0, 100) ?? null,
    message: message?.slice(0, 200) ?? null,
  });

  // Increment candle count
  await db
    .update(pets)
    .set({ candleCount: sql`${pets.candleCount} + 1` })
    .where(eq(pets.id, petId));

  const updated = await db
    .select({ candleCount: pets.candleCount })
    .from(pets)
    .where(eq(pets.id, petId))
    .limit(1);

  return NextResponse.json({ count: updated[0]?.candleCount ?? 0 });
}
