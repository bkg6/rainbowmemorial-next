import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public health endpoint. Reports DB reachability, table presence, and which
// env vars are set (booleans only — never the values). Hit this after every
// deploy: if db.reachable is false or tables is missing pets/candles, the
// deploy is broken and you should not send traffic.
export async function GET() {
  const startedAt = Date.now();

  const env = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    RAZORPAY_KEY_ID: !!process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: !!process.env.RAZORPAY_KEY_SECRET,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    R2_ACCOUNT_ID: !!process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: !!process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: !!process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: !!process.env.R2_BUCKET_NAME,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    CRON_SECRET: !!process.env.CRON_SECRET,
    NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
  };

  const commit =
    process.env.COMMIT_REF ??
    process.env.NETLIFY_COMMIT_REF ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    "unknown";

  // DB reachability + table list. Caller wants this even if envs look fine —
  // wrong DATABASE_URL or missing migrations both surface here.
  let dbReachable = false;
  let dbError: string | null = null;
  let tables: string[] = [];

  if (env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL!);
      const rows = (await sql`
        SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename
      `) as Array<{ tablename: string }>;
      tables = rows.map((r) => r.tablename);
      dbReachable = true;
    } catch (err) {
      dbError = err instanceof Error ? err.message : String(err);
    }
  } else {
    dbError = "DATABASE_URL not set";
  }

  const expectedTables = ["pets", "candles"];
  const missingTables = expectedTables.filter((t) => !tables.includes(t));
  const ok = dbReachable && missingTables.length === 0;

  return NextResponse.json(
    {
      ok,
      ms: Date.now() - startedAt,
      db: {
        reachable: dbReachable,
        error: dbError,
        tables,
        missing: missingTables,
      },
      env,
      commit,
      timestamp: new Date().toISOString(),
    },
    { status: ok ? 200 : 503 }
  );
}
