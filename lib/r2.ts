import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME ?? "rainbowmemorial";

// Read at call-time, not module-load, so we get a clear runtime error
// (not a silently-broken URL) if the env var is missing in a particular
// runtime. Strip any trailing slash since we re-add one when building
// the public URL.
function publicBaseUrl(): string {
  const raw = process.env.R2_PUBLIC_URL;
  if (!raw) {
    throw new Error(
      "R2_PUBLIC_URL is not set — cannot construct public R2 URL"
    );
  }
  return raw.replace(/\/+$/, "");
}

export function publicR2Url(key: string): string {
  return `${publicBaseUrl()}/${key}`;
}

export async function uploadToR2(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return publicR2Url(key);
}

export async function getFromR2(key: string): Promise<Buffer> {
  const res = await r2.send(
    new GetObjectCommand({ Bucket: BUCKET, Key: key })
  );
  const chunks: Uint8Array[] = [];
  for await (const chunk of res.Body as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
