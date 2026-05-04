import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { razorpay } from "@/lib/razorpay";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { slugify } from "@/lib/templates";
import { eq } from "drizzle-orm";
import type { TemplateId } from "@/lib/templates";

export const runtime = "nodejs";

// Postgres "undefined_table" — schema not migrated. Not a transient failure;
// retrying won't help. Frontend should surface support contact instead.
const PG_UNDEFINED_TABLE = "42P01";

function isTransientDbError(err: unknown): boolean {
  if (!err || typeof err !== "object") return true;
  const cause = (err as { cause?: { code?: string } }).cause;
  const code =
    (err as { code?: string }).code ?? (cause && cause.code) ?? undefined;
  if (!code) return true; // unknown — give it a retry
  // Hard schema/auth errors — never retryable
  const NON_RETRYABLE = new Set([
    PG_UNDEFINED_TABLE, // 42P01 relation does not exist
    "42703", // undefined_column
    "42501", // insufficient_privilege
    "28P01", // invalid_password
    "3D000", // invalid_catalog_name
  ]);
  return !NON_RETRYABLE.has(code);
}

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
  let step: string = "parse";
  try {
    step = "parse";
    const { order_id, payment_id, signature } = await req.json();

    if (!order_id || !payment_id || !signature) {
      return NextResponse.json(
        { error: "Missing payment fields", retryable: false, step },
        { status: 400 }
      );
    }

    step = "verify_signature";
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid signature", retryable: false, step },
        { status: 400 }
      );
    }

    step = "idempotency_select";
    const existing = await db
      .select({ slug: pets.slug })
      .from(pets)
      .where(eq(pets.stripeSessionId, order_id))
      .limit(1);
    if (existing.length) {
      return NextResponse.json({ slug: existing[0].slug, status: "exists" });
    }

    step = "fetch_order";
    const order = await razorpay.orders.fetch(order_id);
    const notes = (order.notes ?? {}) as Record<string, string>;

    const petName = notes.petName;
    const bornDate = notes.bornDate || null;
    const diedDate = notes.diedDate;
    const tributeLine = notes.tributeLine || null;
    const templateId = (notes.templateId as TemplateId) ?? "rainbow_bridge";
    const originalPhotoUrl = notes.originalPhotoUrl;
    const croppedPhotoUrl = notes.croppedPhotoUrl;

    if (!petName || !diedDate || !croppedPhotoUrl || !originalPhotoUrl) {
      return NextResponse.json(
        { error: "Order missing metadata", retryable: false, step },
        { status: 400 }
      );
    }

    step = "generate_slug";
    const slug = await generateUniqueSlug(petName, bornDate, diedDate);

    step = "insert";
    await db.insert(pets).values({
      email: "",
      stripeSessionId: order_id,
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

    return NextResponse.json({ slug, status: "created" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const code =
      (err as { code?: string; cause?: { code?: string } }).code ??
      (err as { cause?: { code?: string } }).cause?.code;
    const retryable = isTransientDbError(err);
    console.error(
      `verify-and-create error at step=${step} code=${code} retryable=${retryable}:`,
      err
    );
    return NextResponse.json(
      {
        error: message,
        code,
        retryable,
        step,
      },
      { status: 500 }
    );
  }
}
