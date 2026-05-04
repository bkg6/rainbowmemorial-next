// Apply pending Drizzle migrations to whatever DATABASE_URL is currently set.
//
// Run locally:    node --env-file=.env.local --import tsx scripts/migrate.ts
// Or via npm:     npm run db:migrate    (uses tsx + dotenv via -r dotenv/config or env-file)
// On Netlify:     wired into the build command in netlify.toml for prod context only.
//
// This script is idempotent: drizzle's __drizzle_migrations bookkeeping table
// records what's been applied, and only new migrations run on subsequent calls.

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }

  const startedAt = Date.now();
  console.log(
    `[migrate] Starting against ${url.replace(/:[^:@]+@/, ":***@")} ...`
  );

  const sql = neon(url);
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./db/migrations" });

  console.log(`[migrate] Done in ${Date.now() - startedAt}ms`);
}

main().catch((err) => {
  console.error("[migrate] Failed:", err);
  process.exit(1);
});
