import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pets, memories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  // The memorial page Guestbook tab fetches its memories list here. Returns
  // the latest 50, most recent first.
  const rows = await db
    .select({
      id: memories.id,
      visitorName: memories.authorName,
      message: memories.body,
      createdAt: memories.createdAt,
    })
    .from(memories)
    .where(eq(memories.petSlug, params.slug))
    .orderBy(desc(memories.createdAt))
    .limit(50);

  return NextResponse.json({ memories: rows });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const pet = await db
    .select({ slug: pets.slug })
    .from(pets)
    .where(eq(pets.slug, params.slug))
    .limit(1);

  if (!pet.length) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const { visitorName, message } = body as {
    visitorName?: string;
    message?: string;
  };

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  await db.insert(memories).values({
    petSlug: pet[0].slug,
    authorName: visitorName?.trim().slice(0, 100) || "Anonymous",
    body: message.slice(0, 200),
  });

  return NextResponse.json({ ok: true });
}
