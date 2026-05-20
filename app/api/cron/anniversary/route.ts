import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { eq, and, isNotNull, sql } from "drizzle-orm";
import { renderMemorial } from "@/lib/render";
import { uploadToR2 } from "@/lib/r2";
import { resend } from "@/lib/resend";
import { getNextTemplate } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // Verify this is a legitimate Vercel Cron call
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  const targetDate = oneYearAgo.toISOString().split("T")[0]; // YYYY-MM-DD

  // Find pets with died_date = today - 1 year, unpaid reminder, has paid_at
  const dueList = await db
    .select()
    .from(pets)
    .where(
      and(
        sql`DATE(died_date) = ${targetDate}`,
        eq(pets.reminderSentYear1, false),
        isNotNull(pets.paidAt)
      )
    );

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
  const results = [];

  for (const pet of dueList) {
    try {
      const nextTemplate = getNextTemplate(pet.templateId as TemplateId);

      const buffer = await renderMemorial({
        photoUrl: pet.croppedPhotoUrl,
        name: pet.petName,
        bornDate: pet.bornDate,
        diedDate: pet.diedDate,
        tributeLine: pet.tributeLine,
        templateId: nextTemplate,
        watermark: false,
      });

      const key = `anniversary/${pet.id}-year1.png`;
      const imageUrl = await uploadToR2(key, buffer, "image/png");

      await resend.emails.send({
        from: "Hannah <hannah@rainbow.memorial>",
        to: pet.email,
        subject: `A year with ${pet.petName} in our hearts`,
        html: `
          <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #FAF6EF;">
            <p style="font-size: 22px; font-family: 'Cormorant Garamond', serif; color: #2A1F18; font-weight: 400; line-height: 1.3;">
              ${pet.petName},
            </p>
            <p style="color: #7A6A5C; line-height: 1.7; font-size: 17px;">
              It's been one year since you crossed the rainbow bridge.
            </p>
            <p style="color: #7A6A5C; line-height: 1.7;">
              We made you a new tribute. It's ready whenever you'd like to share it.
            </p>
            <div style="margin: 32px 0; text-align: center;">
              <img src="${imageUrl}" alt="${pet.petName}'s memorial" style="max-width: 100%; border-radius: 8px; box-shadow: 0 12px 40px rgba(80,60,40,0.18);" />
            </div>
            <div style="display: flex; gap: 16px; margin: 24px 0;">
              <a href="${imageUrl}" download
                 style="display: inline-block; background: #C97B63; color: white; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 15px;">
                Download
              </a>
              <a href="${appUrl}/m/${pet.slug}"
                 style="display: inline-block; border: 1.5px solid #C97B63; color: #C97B63; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 15px;">
                View memorial page
              </a>
            </div>
            <p style="color: #A89B8B; font-size: 14px; margin-top: 40px; border-top: 1px solid #EDE3D5; padding-top: 24px;">
              — The rainbow.memorial team
            </p>
          </div>
        `,
      });

      await db
        .update(pets)
        .set({ reminderSentYear1: true })
        .where(eq(pets.id, pet.id));

      results.push({ petId: pet.id, status: "sent" });
    } catch (err) {
      console.error(`Anniversary email failed for pet ${pet.id}:`, err);
      results.push({ petId: pet.id, status: "error", err: String(err) });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}
