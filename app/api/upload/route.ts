import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { uploadToR2 } from "@/lib/r2";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type || "image/jpeg";

    // Upload original to R2
    const originalKey = `originals/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, "_")}`;
    const originalUrl = await uploadToR2(originalKey, buffer, mimeType);

    // Upload to Cloudinary for face detection
    const cloudinaryResult = await new Promise<{
      secure_url: string;
      faces?: number[][];
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            detection: "adv_face",
            faces: true,
            folder: "rainbowmemorial",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result as { secure_url: string; faces?: number[][]; public_id: string });
          }
        )
        .end(buffer);
    });

    // Generate face-cropped URL using Cloudinary transformations
    let croppedUrl = cloudinaryResult.secure_url;
    const hasFaces =
      cloudinaryResult.faces && cloudinaryResult.faces.length > 0;

    if (hasFaces) {
      croppedUrl = cloudinary.url(cloudinaryResult.public_id, {
        transformation: [
          {
            width: 800,
            height: 800,
            gravity: "face",
            crop: "thumb",
            zoom: "0.8",
          },
          { radius: "max" },
          { fetch_format: "png", quality: "auto" },
        ],
      });
    } else {
      croppedUrl = cloudinary.url(cloudinaryResult.public_id, {
        transformation: [
          { width: 800, height: 800, crop: "fill", gravity: "center" },
          { radius: "max" },
          { fetch_format: "png", quality: "auto" },
        ],
      });
    }

    // Store the cropped version in R2
    const croppedRes = await fetch(croppedUrl);
    const croppedBuffer = Buffer.from(await croppedRes.arrayBuffer());
    const croppedKey = `cropped/${Date.now()}-cropped.png`;
    const croppedR2Url = await uploadToR2(croppedKey, croppedBuffer, "image/png");

    return NextResponse.json({
      originalUrl,
      croppedUrl: croppedR2Url,
      hasFace: hasFaces,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
