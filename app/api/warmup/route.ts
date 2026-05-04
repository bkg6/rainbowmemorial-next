import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";

// Trivial query to wake Neon compute (free tier auto-suspends after ~5 min).
// Called from /create on mount and from any client wanting to pre-warm before
// a transactional flow. Cheap when warm (~50ms), pays the wake-up cost when
// cold (~5-10s) — but we never block the user on it.
export async function GET() {
  const startedAt = Date.now();
  try {
    const result = await db.execute(sql`SELECT 1 as ok`);
    return NextResponse.json({
      ok: true,
      ms: Date.now() - startedAt,
      rows: Array.isArray(result) ? result.length : undefined,
    });
  } catch (err) {
    console.error("warmup failed:", err);
    return NextResponse.json(
      { ok: false, ms: Date.now() - startedAt, error: String(err) },
      { status: 500 }
    );
  }
}
