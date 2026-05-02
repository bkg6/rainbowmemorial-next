import { NextRequest, NextResponse } from "next/server";
import { renderMemorial } from "@/lib/render";
import type { TemplateId } from "@/lib/templates";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { photoUrl, name, bornDate, diedDate, tributeLine, templateId, watermark } = body;

    if (!photoUrl || !name || !diedDate || !templateId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const buffer = await renderMemorial({
      photoUrl,
      name,
      bornDate: bornDate ?? null,
      diedDate,
      tributeLine: tributeLine ?? null,
      templateId: templateId as TemplateId,
      watermark: watermark ?? false,
    });

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Render error:", err);
    return NextResponse.json({ error: "Render failed" }, { status: 500 });
  }
}
