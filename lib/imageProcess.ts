import sharp from "sharp";

export async function resizeAndOptimize(
  inputBuffer: Buffer,
  options: { width: number; height: number; format?: "jpeg" | "png" | "webp" }
): Promise<Buffer> {
  const { width, height, format = "jpeg" } = options;
  return sharp(inputBuffer)
    .resize(width, height, { fit: "cover", position: "center" })
    .toFormat(format, { quality: 90 })
    .toBuffer();
}

export async function cropFromBox(
  inputBuffer: Buffer,
  box: { x: number; y: number; width: number; height: number }
): Promise<Buffer> {
  return sharp(inputBuffer)
    .extract({
      left: Math.round(box.x),
      top: Math.round(box.y),
      width: Math.round(box.width),
      height: Math.round(box.height),
    })
    .toBuffer();
}
