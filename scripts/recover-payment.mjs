// One-shot Razorpay payment recovery.
//
// Run with:  node --env-file=.env.local scripts/recover-payment.mjs
//
// Requires DATABASE_URL, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, NEXT_PUBLIC_APP_URL
// to point at PRODUCTION. Reads the Razorpay order via API, inserts the pet
// row directly into the DB, then POSTs the finalize endpoint to trigger
// rendering. Safe to re-run — idempotent on stripe_session_id (the column
// stores the Razorpay order id).

import Razorpay from "razorpay";
import { neon } from "@neondatabase/serverless";

const ORDER_ID = "order_SICJWeo7XoBJSU";
const PAYMENT_ID = "pay_SICJvpmVhBOLsy";
const CUSTOMER_EMAIL = "goda.goud@iiml.org";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

const requiredEnv = ["DATABASE_URL", "RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing env vars:", missing.join(", "));
  console.error("Populate .env.local with production values, then run:");
  console.error("  node --env-file=.env.local scripts/recover-payment.mjs");
  process.exit(1);
}

function slugify(name, bornYear, diedYear) {
  const base = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (bornYear && diedYear) return `${base}-${bornYear}-${diedYear}`;
  if (diedYear) return `${base}-${diedYear}`;
  return base;
}

async function callFinalize(slug) {
  console.log(`\n→ Calling ${APP_URL}/api/finalize/${slug} ...`);
  try {
    const res = await fetch(`${APP_URL}/api/finalize/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const text = await res.text();
    console.log(`  status=${res.status} body=${text.slice(0, 600)}`);
  } catch (err) {
    console.error("  finalize call threw:", err);
  }
}

const sql = neon(process.env.DATABASE_URL);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("=== BEFORE ===");
const beforeRows = await sql`
  SELECT id, slug, email, paid_at, rendered_image_url, og_image_url
  FROM pets
  WHERE stripe_session_id = ${ORDER_ID}
`;
console.log(`pets row count for order_id=${ORDER_ID}: ${beforeRows.length}`);
if (beforeRows.length) {
  console.log(JSON.stringify(beforeRows[0], null, 2));
}

console.log("\n=== RAZORPAY ORDER ===");
const order = await razorpay.orders.fetch(ORDER_ID);
console.log(
  `id=${order.id} status=${order.status} amount=${order.amount_paid}/${order.amount} ${order.currency} receipt=${order.receipt}`
);

if (order.status !== "paid") {
  console.error(`\n✗ Aborting — order status is "${order.status}", expected "paid".`);
  console.error("  (Note: Razorpay marks an order 'paid' once a payment under it is captured.)");
  process.exit(1);
}

const notes = order.notes ?? {};
console.log("\norder.notes:");
console.log(JSON.stringify(notes, null, 2));

const requiredNotes = ["petName", "diedDate", "originalPhotoUrl", "croppedPhotoUrl"];
const missingNotes = requiredNotes.filter((k) => !notes[k]);
if (missingNotes.length) {
  console.error(`\n✗ Order is missing required notes: ${missingNotes.join(", ")}`);
  process.exit(1);
}

if (beforeRows.length) {
  console.log("\n→ Pet row already exists; skipping insert.");
  await callFinalize(beforeRows[0].slug);
} else {
  const bornYear = notes.bornDate
    ? String(new Date(notes.bornDate).getFullYear())
    : undefined;
  const diedYear = notes.diedDate
    ? String(new Date(notes.diedDate).getFullYear())
    : undefined;
  const baseSlug = slugify(notes.petName, bornYear, diedYear);
  let slug = baseSlug;
  let suffix = 2;
  while (true) {
    const existing = await sql`SELECT id FROM pets WHERE slug = ${slug} LIMIT 1`;
    if (!existing.length) break;
    slug = `${baseSlug}-${suffix++}`;
  }
  console.log(`\n→ Generated unique slug: ${slug}`);

  await sql`
    INSERT INTO pets (
      email,
      stripe_session_id,
      pet_name,
      born_date,
      died_date,
      tribute_line,
      original_photo_url,
      cropped_photo_url,
      template_id,
      slug,
      paid_at
    ) VALUES (
      ${CUSTOMER_EMAIL},
      ${ORDER_ID},
      ${notes.petName},
      ${notes.bornDate || null},
      ${notes.diedDate},
      ${notes.tributeLine || null},
      ${notes.originalPhotoUrl},
      ${notes.croppedPhotoUrl},
      ${notes.templateId || "rainbow_bridge"},
      ${slug},
      NOW()
    )
  `;
  console.log(`→ Inserted pet row (slug=${slug}, email=${CUSTOMER_EMAIL}).`);
  await callFinalize(slug);
}

console.log("\n=== AFTER ===");
const afterRows = await sql`
  SELECT id, slug, email, paid_at, rendered_image_url, og_image_url
  FROM pets
  WHERE stripe_session_id = ${ORDER_ID}
`;
console.log(JSON.stringify(afterRows[0] ?? null, null, 2));

console.log(
  `\n✓ Done. Customer URL: ${APP_URL}/m/${afterRows[0]?.slug ?? "<unknown>"}`
);
console.log(
  `  Note: order=${ORDER_ID} payment=${PAYMENT_ID} (recorded in pet.stripe_session_id).`
);
