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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Idempotency — if we already inserted this order, return the slug.
    const existing = await db
      .select({ slug: pets.slug })
      .from(pets)
      .where(eq(pets.stripeSessionId, razorpay_order_id))
      .limit(1);
    if (existing.length) {
      return NextResponse.json({ slug: existing[0].slug });
    }

    const order = await razorpay.orders.fetch(razorpay_order_id);
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
      stripeSessionId: razorpay_order_id,
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

    // Rendering happens on the success page via <SuccessPending>, which
    // POSTs /api/finalize/[slug] from the browser. We deliberately do NOT
    // kick that here: the in-process fetch would keep this lambda alive on
    // Netlify until the event loop drains, re-introducing the timeout the
    // split was meant to fix.
    return NextResponse.json({ slug });
  } catch (err) {
    console.error("Razorpay webhook error:", err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
