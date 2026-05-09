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

// Source photos reused from the homepage gallery's vetted Unsplash IDs
// (Buddy/Whiskers/Duke/Simba/Shadow/Daisy). One per V1 seed pet.
// Each renders to a different memorial because name + tribute + template differ.
const SAMPLES: Sample[] = [
  {
    out: "memorial-charlie.png",
    photoUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Charlie",
    bornDate: "2009-04-12",
    diedDate: "2024-10-18",
    tributeLine: "Fifteen years of being exactly where we needed him.",
    templateId: "rainbow_bridge",
  },
  {
    out: "memorial-mochi.png",
    photoUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Mochi",
    bornDate: "2018-03-01",
    diedDate: "2025-02-01",
    tributeLine: "Seven years of demanding the warm spot at exactly 9pm.",
    templateId: "anniversary",
  },
  {
    out: "memorial-otis.png",
    photoUrl:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Otis",
    bornDate: "2019-06-08",
    diedDate: "2024-08-22",
    tributeLine: "Five years was not enough.",
    templateId: "rainbow_bridge",
  },
  {
    // Re-uses the Lab/Golden photo (1552053831) — same input as Charlie. Memorial
    // is still visually distinct because the template, dates, and tribute differ.
    // The other "Golden Retriever-ish" homepage photo (1494256997) turned out to
    // be a Scottish Fold cat — would mismatch the species line.
    out: "memorial-hazel.png",
    photoUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Hazel",
    bornDate: "2010-05-15",
    diedDate: "2024-11-07",
    tributeLine: "The best dog there ever was.",
    templateId: "birthday_heaven",
  },
  {
    out: "memorial-bodhi.png",
    photoUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Bodhi",
    bornDate: "2017-07-01",
    diedDate: "2025-01-01",
    tributeLine: "Six years of the best dog who ever lived.",
    templateId: "memory",
  },
  {
    // Re-uses the tabby photo (1574158622) — same input as Mochi. The "Shadow"
    // homepage photo (1601758228) we'd otherwise pick has a Chewy.com bag in
    // frame — brand intrusion makes it inappropriate for a memorial.
    out: "memorial-pepper.png",
    photoUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    name: "Pepper",
    bornDate: "2008-09-01",
    diedDate: "2024-12-01",
    tributeLine: "Sixteen years of choosing us every day.",
    templateId: "classic",
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
