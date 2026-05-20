import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { uploadToR2 } from "@/lib/r2";
import { cropFromBox, resizeAndOptimize } from "@/lib/imageProcess";

export const runtime = "nodejs";

type CropBox = { x: number; y: number; width: number; height: number };

function parseCropBox(raw: unknown): CropBox | null {
  if (typeof raw !== "string") return null;
  try {
    const parsed = JSON.parse(raw);
    const { x, y, width, height } = parsed ?? {};
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof width !== "number" ||
      typeof height !== "number" ||
      width <= 0 ||
      height <= 0
    ) {
      return null;
    }
    return { x, y, width, height };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const cropBox = parseCropBox(formData.get("cropBox"));

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!cropBox) {
      return NextResponse.json(
        { error: "Missing or invalid cropBox" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Razorpay order doesn't exist yet at upload time, so namespace with a UUID.
    const id = randomUUID();

    const cropped = await cropFromBox(inputBuffer, cropBox);
    const optimized = await resizeAndOptimize(cropped, {
      width: 1080,
      height: 1080,
      format: "jpeg",
    });

    const key = `uploads/${id}/photo.jpg`;
    const publicUrl = await uploadToR2(key, optimized, "image/jpeg");

    // originalUrl is kept as an alias of publicUrl so the downstream
    // checkout/verify-and-create path (which still treats originalPhotoUrl
    // as a notNull column) continues to work. The customer now controls
    // the crop manually, so there's no separate "original" worth keeping.
    return NextResponse.json({
      publicUrl,
      originalUrl: publicUrl,
      croppedUrl: publicUrl,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
