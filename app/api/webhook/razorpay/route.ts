import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { razorpay } from "@/lib/razorpay";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { renderMemorial, renderOgImage } from "@/lib/render";
import { uploadToR2 } from "@/lib/r2";
import { resend } from "@/lib/resend";
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
      email,
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

    // Idempotency — if we already processed this order, return its slug.
    const existing = await db
      .select()
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

    const renderedBuffer = await renderMemorial({
      photoUrl: croppedPhotoUrl,
      name: petName,
      bornDate,
      diedDate,
      tributeLine,
      templateId,
      watermark: false,
    });
    const renderedKey = `rendered/${razorpay_order_id}.png`;
    const renderedImageUrl = await uploadToR2(renderedKey, renderedBuffer, "image/png");

    const ogBuffer = await renderOgImage({
      photoUrl: croppedPhotoUrl,
      name: petName,
      bornDate,
      diedDate,
      tributeLine,
      templateId,
    });
    const ogKey = `og/${razorpay_order_id}.png`;
    const ogImageUrl = await uploadToR2(ogKey, ogBuffer, "image/png");

    const slug = await generateUniqueSlug(petName, bornDate, diedDate);
    const customerEmail = (email ?? "").toString();

    await db.insert(pets).values({
      email: customerEmail,
      stripeSessionId: razorpay_order_id,
      petName,
      bornDate,
      diedDate,
      tributeLine,
      originalPhotoUrl,
      croppedPhotoUrl,
      renderedImageUrl,
      ogImageUrl,
      templateId,
      slug,
      paidAt: new Date(),
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

    if (customerEmail) {
      await resend.emails.send({
        from: "rainbow.memorial <hello@rainbow.memorial>",
        to: customerEmail,
        subject: `${petName}'s tribute is ready`,
        html: `
          <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #FAF6EF;">
            <p style="font-size: 18px; color: #2A1F18; line-height: 1.65;">
              ${petName}'s tribute is yours.
            </p>
            <p style="color: #7A6A5C; line-height: 1.65;">
              We made something beautiful for them. It's ready whenever you'd like to share it.
            </p>
            <a href="${appUrl}/success?slug=${slug}"
               style="display: inline-block; background: #C97B63; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-size: 16px; margin: 24px 0;">
              View &amp; Download
            </a>
            <p style="color: #7A6A5C; line-height: 1.65;">
              You can also visit their memorial page anytime at:<br>
              <a href="${appUrl}/m/${slug}" style="color: #C97B63;">${appUrl}/m/${slug}</a>
            </p>
            <p style="color: #A89B8B; font-size: 14px; margin-top: 40px;">
              — The rainbow.memorial team
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ slug });
  } catch (err) {
    console.error("Razorpay webhook error:", err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
