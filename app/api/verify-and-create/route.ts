import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { razorpay } from "@/lib/razorpay";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { slugify } from "@/lib/templates";
import { eq } from "drizzle-orm";
import type { TemplateId } from "@/lib/templates";

export const runtime = "nodejs";

async function generateUniqueSlug(
  petName: string,
  bornDate?: string | null,
  diedDate?: string
): Promise<string> {
  const bornYear = bornDate ? new Date(bornDate).getFullYear().toString() : undefined;
  const diedYear = diedDate ? new Date(diedDate).getFullYear().toString() : undefined;
  const base = slugify(petName, bornYear, diedYear);

  let candidate = base;
  let suffix = 2;
  while (true) {
    const existing = await db
      .select({ id: pets.id })
      .from(pets)
      .where(eq(pets.slug, candidate))
      .limit(1);
    if (existing.length === 0) return candidate;
    candidate = `${base}-${suffix++}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { order_id, payment_id, signature } = await req.json();

    if (!order_id || !payment_id || !signature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Idempotent — return the existing slug if we've already created the row.
    const existing = await db
      .select({ slug: pets.slug })
      .from(pets)
      .where(eq(pets.stripeSessionId, order_id))
      .limit(1);
    if (existing.length) {
      return NextResponse.json({ slug: existing[0].slug, status: "exists" });
    }

    const order = await razorpay.orders.fetch(order_id);
    const notes = (order.notes ?? {}) as Record<string, string>;

    const petName = notes.petName;
    const bornDate = notes.bornDate || null;
    const diedDate = notes.diedDate;
    const tributeLine = notes.tributeLine || null;
    const templateId = (notes.templateId as TemplateId) ?? "rainbow_bridge";
    const originalPhotoUrl = notes.originalPhotoUrl;
    const croppedPhotoUrl = notes.croppedPhotoUrl;

    if (!petName || !diedDate || !croppedPhotoUrl || !originalPhotoUrl) {
      return NextResponse.json({ error: "Order missing metadata" }, { status: 400 });
    }

    const slug = await generateUniqueSlug(petName, bornDate, diedDate);

    await db.insert(pets).values({
      email: "",
      stripeSessionId: order_id,
      petName,
      bornDate,
      diedDate,
      tributeLine,
      originalPhotoUrl,
      croppedPhotoUrl,
      renderedImageUrl: null,
      ogImageUrl: null,
      templateId,
      slug,
      paidAt: new Date(),
    });

    return NextResponse.json({ slug, status: "created" });
  } catch (err) {
    console.error("verify-and-create error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
