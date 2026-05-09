// Render the four sample memorials directly via lib/render's renderMemorial()
// without going through the /api/render HTTP endpoint. Output goes to
// public/samples/.
//
// Run with:  npm run samples:render    (runs through tsx)
// Requires:  the local dev server running at localhost:3000, because
//            renderMemorial() fetches the template background image via
//            NEXT_PUBLIC_APP_URL — we point that at localhost so the script
//            doesn't depend on production being healthy.

import { writeFile, access, mkdir } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { renderMemorial } from "../lib/render";
import type { TemplateId } from "../lib/templates";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLES_DIR = path.join(__dirname, "..", "public", "samples");
const force = process.argv.includes("--force");

// Point the renderer at the local dev server so the template background
// fetch works without needing production to be up.
process.env.NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL_OVERRIDE ?? "http://localhost:3000";

interface Sample {
  out: string;
  photoUrl: string;
  name: string;
  bornDate: string;
  diedDate: string;
  tributeLine: string;
  templateId: TemplateId;
}

const SAMPLES: Sample[] = [
  {
    out: "memorial-buddy.png",
    photoUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Buddy",
    bornDate: "2009-03-14",
    diedDate: "2024-11-22",
    tributeLine: "He was the best dog there ever was.",
    templateId: "rainbow_bridge",
  },
  {
    out: "memorial-daisy-card.png",
    photoUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Daisy",
    bornDate: "2014-01-01",
    diedDate: "2025-01-01",
    tributeLine: "Until then, the love does not stop.",
    templateId: "classic",
  },
  {
    out: "memorial-tribute-buddy.png",
    photoUrl:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Buddy",
    bornDate: "2009-04-02",
    diedDate: "2024-11-22",
    tributeLine: "He was the best dog there ever was.",
    templateId: "rainbow_bridge",
  },
  {
    out: "memorial-tribute-luna.png",
    photoUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Luna",
    bornDate: "2018-06-01",
    diedDate: "2025-04-01",
    tributeLine: "Sixteen years of warm spots and silent company.",
    templateId: "anniversary",
  },
];

async function exists(p: string) {
  try {
    await access(p, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(SAMPLES_DIR, { recursive: true });
  console.log(`[samples] output → ${SAMPLES_DIR}`);
  for (const s of SAMPLES) {
    const target = path.join(SAMPLES_DIR, s.out);
    if (!force && (await exists(target))) {
      console.log(`  ✓ ${s.out} already exists, skipping`);
      continue;
    }
    console.log(`  → ${s.out} (${s.name}, ${s.templateId})`);
    const startedAt = Date.now();
    const buf = await renderMemorial({
      photoUrl: s.photoUrl,
      name: s.name,
      bornDate: s.bornDate,
      diedDate: s.diedDate,
      tributeLine: s.tributeLine,
      templateId: s.templateId,
      watermark: false,
    });
    await writeFile(target, buf);
    console.log(
      `    saved ${(buf.length / 1024).toFixed(0)} KB in ${Date.now() - startedAt}ms`
    );
  }
  console.log("[samples] done.");
}

main().catch((err) => {
  console.error("[samples] failed:", err);
  process.exit(1);
});
