import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { renderMemorial, renderOgImage } from "@/lib/render";
import { uploadToR2 } from "@/lib/r2";
import { resend } from "@/lib/resend";
import { eq } from "drizzle-orm";
import type { TemplateId } from "@/lib/templates";

export const runtime = "nodejs";

export async function POST(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  let renderedImageUrl: string | null = null;
  let ogImageUrl: string | null = null;

  try {
    const found = await db.select().from(pets).where(eq(pets.slug, slug)).limit(1);
    if (!found.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const pet = found[0];

    // Already done — short-circuit
    if (pet.renderedImageUrl && pet.ogImageUrl) {
      return NextResponse.json({
        ready: true,
        renderedImageUrl: pet.renderedImageUrl,
        ogImageUrl: pet.ogImageUrl,
      });
    }

    const templateId = (pet.templateId as TemplateId) ?? "rainbow_bridge";
    let didWork = false;
    renderedImageUrl = pet.renderedImageUrl;
    ogImageUrl = pet.ogImageUrl;

    if (!renderedImageUrl) {
      const buf = await renderMemorial({
        photoUrl: pet.croppedPhotoUrl,
        name: pet.petName,
        bornDate: pet.bornDate,
        diedDate: pet.diedDate,
        tributeLine: pet.tributeLine,
        templateId,
        watermark: false,
      });
      renderedImageUrl = await uploadToR2(
        `rendered/${pet.stripeSessionId}.png`,
        buf,
        "image/png"
      );
      await db
        .update(pets)
        .set({ renderedImageUrl })
        .where(eq(pets.id, pet.id));
      didWork = true;
    }

    if (!ogImageUrl) {
      const buf = await renderOgImage({
        photoUrl: pet.croppedPhotoUrl,
        name: pet.petName,
        bornDate: pet.bornDate,
        diedDate: pet.diedDate,
        tributeLine: pet.tributeLine,
        templateId,
      });
      ogImageUrl = await uploadToR2(
        `og/${pet.stripeSessionId}.png`,
        buf,
        "image/png"
      );
      await db.update(pets).set({ ogImageUrl }).where(eq(pets.id, pet.id));
      didWork = true;
    }

    // Send the confirmation email exactly once: only on the call that
    // transitions the record from incomplete to complete.
    if (didWork && pet.email) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
      try {
        await resend.emails.send({
          from: "rainbow.memorial <hello@rainbow.memorial>",
          to: pet.email,
          subject: `${pet.petName}'s tribute is ready`,
          html: `
            <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #FAF6EF;">
              <p style="font-size: 18px; color: #2A1F18; line-height: 1.65;">
                ${pet.petName}'s tribute is yours.
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
      } catch (e) {
        console.error("Resend send failed:", e);
      }
    }

    return NextResponse.json({
      ready: !!(renderedImageUrl && ogImageUrl),
      renderedImageUrl,
      ogImageUrl,
    });
  } catch (err) {
    console.error("Finalize error for slug", slug, err);
    return NextResponse.json(
      {
        ready: false,
        renderedImageUrl,
        ogImageUrl,
        error: "Finalize failed",
      },
      { status: 500 }
    );
  }
}
