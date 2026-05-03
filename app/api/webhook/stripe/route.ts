import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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

  // Check for collision and append suffix if needed
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
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: ReturnType<typeof stripe.webhooks.constructEvent>;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const meta = session.metadata ?? {};

  try {
    const {
      petName,
      bornDate,
      diedDate,
      tributeLine,
      templateId,
      originalPhotoUrl,
      croppedPhotoUrl,
    } = meta;

    const tpl = (templateId as TemplateId) ?? "rainbow_bridge";

    // Render the high-resolution memorial (1080x1920 Story format)
    const renderedBuffer = await renderMemorial({
      photoUrl: croppedPhotoUrl,
      name: petName,
      bornDate: bornDate || null,
      diedDate,
      tributeLine: tributeLine || null,
      templateId: tpl,
      watermark: false,
    });
    const renderedKey = `rendered/${session.id}.png`;
    const renderedImageUrl = await uploadToR2(renderedKey, renderedBuffer, "image/png");

    // Render the 1200x630 Open Graph image for social link previews
    const ogBuffer = await renderOgImage({
      photoUrl: croppedPhotoUrl,
      name: petName,
      bornDate: bornDate || null,
      diedDate,
      tributeLine: tributeLine || null,
      templateId: tpl,
    });
    const ogKey = `og/${session.id}.png`;
    const ogImageUrl = await uploadToR2(ogKey, ogBuffer, "image/png");

    const slug = await generateUniqueSlug(petName, bornDate, diedDate);
    const email = session.customer_details?.email ?? "";

    await db.insert(pets).values({
      email,
      stripeSessionId: session.id,
      petName,
      bornDate: bornDate || null,
      diedDate,
      tributeLine: tributeLine || null,
      originalPhotoUrl,
      croppedPhotoUrl,
      renderedImageUrl,
      ogImageUrl,
      templateId: tpl,
      slug,
      paidAt: new Date(),
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

    // Send confirmation email
    if (email) {
      await resend.emails.send({
        from: "rainbow.memorial <hello@rainbow.memorial>",
        to: email,
        subject: `${petName}'s tribute is ready`,
        html: `
          <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #FAF6EF;">
            <p style="font-size: 18px; color: #2A1F18; line-height: 1.65;">
              ${petName}'s tribute is yours.
            </p>
            <p style="color: #7A6A5C; line-height: 1.65;">
              We made something beautiful for them. It's ready whenever you'd like to share it.
            </p>
            <a href="${appUrl}/success?session_id=${session.id}"
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
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
