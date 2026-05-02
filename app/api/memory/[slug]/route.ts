import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pets, candles } from "@/db/schema";
import { eq, and, isNotNull, desc } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const pet = await db
    .select({ id: pets.id })
    .from(pets)
    .where(eq(pets.slug, params.slug))
    .limit(1);

  if (!pet.length) return NextResponse.json({ memories: [] });

  const rows = await db
    .select({
      id: candles.id,
      visitorName: candles.visitorName,
      message: candles.message,
      createdAt: candles.createdAt,
    })
    .from(candles)
    .where(and(eq(candles.petId, pet[0].id), isNotNull(candles.message)))
    .orderBy(desc(candles.createdAt))
    .limit(50);

  return NextResponse.json({ memories: rows });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const pet = await db
    .select({ id: pets.id })
    .from(pets)
    .where(eq(pets.slug, params.slug))
    .limit(1);

  if (!pet.length) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const { visitorName, message } = body as { visitorName?: string; message?: string };

  if (!message?.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });

  await db.insert(candles).values({
    petId: pet[0].id,
    visitorName: visitorName?.slice(0, 100) ?? null,
    message: message.slice(0, 200),
  });

  return NextResponse.json({ ok: true });
}
