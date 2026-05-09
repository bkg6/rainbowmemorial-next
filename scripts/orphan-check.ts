// Read-only audit of paid pets that never got a rendered memorial image —
// the symptom of the broken-font-fetch bug that was killing every render
// from late April 2026 until 2026-05-09.
//
// Lists every pet row where:
//   - paid_at IS NOT NULL  (customer actually paid)
//   - rendered_image_url IS NULL  (renderer never produced output)
//
// And separately every row where rendered_image_url is set but og_image_url
// is null (partially-rendered).
//
// Run locally with prod DATABASE_URL set in .env.local:
//   node --env-file=.env.local --import tsx scripts/orphan-check.ts
//
// Read-only: no INSERT/UPDATE/DELETE. Safe to run any time.

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Aborting.");
  process.exit(1);
}

interface OrphanRow {
  id: string;
  slug: string;
  email: string | null;
  pet_name: string;
  stripe_session_id: string;
  paid_at: string | null;
  rendered_image_url: string | null;
  og_image_url: string | null;
}

async function main() {
  const sql = neon(url!);

  console.log(`[orphan-check] DB: ${url!.replace(/:[^:@]+@/, ":***@")}`);

  const totalRows = (await sql`SELECT COUNT(*)::int AS c FROM pets`) as Array<{
    c: number;
  }>;
  const paidRows = (await sql`
    SELECT COUNT(*)::int AS c FROM pets WHERE paid_at IS NOT NULL
  `) as Array<{ c: number }>;
  console.log(
    `[orphan-check] total pets=${totalRows[0].c}  paid=${paidRows[0].c}`
  );

  // Full orphans: paid but never rendered.
  const fullOrphans = (await sql`
    SELECT id, slug, email, pet_name, stripe_session_id,
           paid_at, rendered_image_url, og_image_url
    FROM pets
    WHERE paid_at IS NOT NULL
      AND rendered_image_url IS NULL
    ORDER BY paid_at ASC
  `) as OrphanRow[];

  console.log(`\n=== FULL ORPHANS (${fullOrphans.length}) ===`);
  console.log(`Paid customers with no rendered memorial. Need re-render.`);
  if (fullOrphans.length === 0) {
    console.log("  (none)");
  } else {
    for (const r of fullOrphans) {
      console.log(
        `  ${r.paid_at ?? "(no paid_at)"}  ${r.pet_name.padEnd(20)}  slug=${r.slug.padEnd(30)}  email=${r.email || "-"}`
      );
      console.log(
        `    razorpay_order_id=${r.stripe_session_id}  pet_id=${r.id}`
      );
    }
  }

  // Partial: rendered main but missing og.
  const partial = (await sql`
    SELECT id, slug, email, pet_name, stripe_session_id,
           paid_at, rendered_image_url, og_image_url
    FROM pets
    WHERE paid_at IS NOT NULL
      AND rendered_image_url IS NOT NULL
      AND og_image_url IS NULL
    ORDER BY paid_at ASC
  `) as OrphanRow[];

  console.log(`\n=== PARTIAL ORPHANS (${partial.length}) ===`);
  console.log(`Main image rendered, OG image missing.`);
  if (partial.length === 0) {
    console.log("  (none)");
  } else {
    for (const r of partial) {
      console.log(
        `  ${r.paid_at ?? "(no paid_at)"}  ${r.pet_name.padEnd(20)}  slug=${r.slug}`
      );
    }
  }

  // To re-trigger renders for the orphans (after the font fix is deployed):
  //   for slug in <slug1> <slug2> ...; do
  //     curl -X POST https://rainbow.memorial/api/finalize/$slug
  //   done
  // Each call is idempotent and will fill in whichever piece is null.
  if (fullOrphans.length || partial.length) {
    console.log(
      `\n[orphan-check] Once the font-fix deploy is live, re-trigger by hitting`
    );
    console.log(`  POST https://rainbow.memorial/api/finalize/<slug>`);
    console.log(`  for each row above. /api/finalize is idempotent and will`);
    console.log(`  fill in whichever piece (main image, og image, email) is`);
    console.log(`  still missing.`);
  }
}

main().catch((err) => {
  console.error("[orphan-check] failed:", err);
  process.exit(1);
});
