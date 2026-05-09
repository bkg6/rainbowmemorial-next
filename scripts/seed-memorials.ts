// Seeds the six V1-close composite memorials into the production database.
//
// Idempotent: safe to re-run any time. Uses ON CONFLICT (slug) DO NOTHING for
// pets and a (pet_slug, body) lookup for memories so duplicates don't appear
// after multiple runs.
//
// Usage (run locally with prod DATABASE_URL set):
//   node --env-file=.env.local --import tsx scripts/seed-memorials.ts
// Or:
//   DATABASE_URL='postgresql://...' npx tsx scripts/seed-memorials.ts
//
// Pre-reqs:
//   - Migrations applied (memories table exists, pets has is_sample column).
//     Either deploy first (Netlify build runs db:migrate on production) or
//     run `npm run db:migrate` locally with the same DATABASE_URL.
//   - Sample memorial PNGs at public/samples/memorial-<name>.png are deployed
//     so rendered_image_url resolves at /samples/memorial-<name>.png.

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Aborting.");
  process.exit(1);
}
const sql = neon(url);

interface SeedPet {
  slug: string;
  petName: string;
  species: string;
  templateId: string;
  bornDate: string; // YYYY-MM-DD (use day=01 for month-only)
  diedDate: string;
  bornDateText: string | null;
  diedDateText: string | null;
  tributeLine: string;
  candleCount: number;
  // Reference path served from /public/samples/.
  imagePath: string;
  memories: Array<{ author: string; body: string }>;
}

const SEED: SeedPet[] = [
  {
    slug: "charlie-2009-2024",
    petName: "Charlie",
    species: "Labrador Retriever",
    templateId: "rainbow_bridge",
    bornDate: "2009-04-12",
    diedDate: "2024-10-18",
    bornDateText: null,
    diedDateText: null,
    tributeLine:
      "He was the quietest dog we ever had. He didn't ask for much. Fifteen years of being exactly where we needed him.",
    candleCount: 27,
    imagePath: "/samples/memorial-charlie.png",
    memories: [
      {
        author: "Sarah",
        body:
          "Charlie was the dog who taught me what loyalty actually meant. He waited by the front window every day at 5pm because that's when my dad came home. Fifteen years he did that.",
      },
      {
        author: "Mike",
        body:
          "Used to walk Charlie and your dad together every morning. Both of them moved a little slower at the end, but they always made it to the end of the street. I'll miss seeing them go.",
      },
      {
        author: "Aunt Pat",
        body:
          "He greeted everyone like they belonged. I'll miss him at Thanksgiving. Already do.",
      },
      {
        author: "Tom",
        body:
          "He was my first dog memory. I was four when you got him. He's still the standard I measure other dogs by.",
      },
    ],
  },
  {
    slug: "mochi-2018-2025",
    petName: "Mochi",
    species: "Cat",
    templateId: "anniversary",
    bornDate: "2018-03-01",
    diedDate: "2025-02-01",
    bornDateText: "March 2018",
    diedDateText: "February 2025",
    tributeLine:
      "Seven years of demanding the warm spot on the bed at exactly 9pm. Seven years of watching me work from the corner of the desk. The desk feels too big now.",
    candleCount: 19,
    imagePath: "/samples/memorial-mochi.png",
    memories: [
      {
        author: "Jen",
        body:
          "Mochi was the cat who decided I was acceptable on the third visit. After that I was family. She came to greet me at the door every time.",
      },
      {
        author: "David",
        body:
          "Remember when she stole an entire piece of salmon off the counter at Mom's birthday? She was so proud. Tiny criminal. Best cat.",
      },
      {
        author: "Liz",
        body:
          "She had the loudest purr of any cat I've ever met. I could hear it from across the room. My condolences — she was a real one.",
      },
    ],
  },
  {
    slug: "otis-2019-2024",
    petName: "Otis",
    species: "French Bulldog",
    templateId: "rainbow_bridge",
    bornDate: "2019-06-08",
    diedDate: "2024-08-22",
    bornDateText: null,
    diedDateText: null,
    tributeLine:
      "Five years was not enough. He was the loudest snorer in the house and the gentlest soul we had. We weren't ready.",
    candleCount: 34,
    imagePath: "/samples/memorial-otis.png",
    memories: [
      {
        author: "Megan",
        body:
          "Otis was the reason I started visiting more. He'd run to the door like I was the most important person in the world every single time. I've never felt more loved by anything.",
      },
      {
        author: "Chris",
        body: "I'm still in shock. He was so young. So sorry, friend. Sending love.",
      },
      {
        author: "Ashley",
        body:
          "Otis was one of my favorites at the clinic. Always such a sweet boy even when he wasn't feeling great. So sorry for your loss.",
      },
      {
        author: "Daniela",
        body:
          "Frenchies aren't supposed to leave so soon. This isn't fair. Thinking of you all.",
      },
    ],
  },
  {
    slug: "hazel-2010-2024",
    petName: "Hazel",
    species: "Golden Retriever",
    templateId: "birthday_heaven",
    bornDate: "2010-05-15",
    diedDate: "2024-11-07",
    bornDateText: null,
    diedDateText: null,
    tributeLine:
      "Fourteen years. The cancer came in August and we had until November. She made every one of those last days feel like a gift. She was the best dog there ever was.",
    candleCount: 31,
    imagePath: "/samples/memorial-hazel.png",
    memories: [
      {
        author: "Rebecca",
        body:
          "Hazel met me at the door of every rough day for 14 years. I never told her how much she helped. I think she knew.",
      },
      {
        author: "James",
        body:
          "Hazel was the unofficial mayor of the cul-de-sac. Knew every kid by name (or we said she did, which felt the same). She'll be missed by everyone here.",
      },
      {
        author: "Sarah",
        body:
          "I cried reading this. She was such a sweet girl. Sending you so much love during this hard time.",
      },
      {
        author: "Mom",
        body:
          "She was the granddog I never thought I'd love this much. Heartbroken with you both.",
      },
      {
        author: "Kelly",
        body: "Goldens really are a different breed. Hazel especially. So sorry for your loss.",
      },
    ],
  },
  {
    slug: "bodhi-2017-2025",
    petName: "Bodhi",
    species: "Rescue Dog",
    templateId: "memory",
    bornDate: "2017-07-01",
    diedDate: "2025-01-01",
    bornDateText: "2017",
    diedDateText: "January 2025",
    tributeLine:
      "We adopted him at two from the shelter. The vet said heart murmur, two or three good years. We got six. Six years of the best dog who ever lived.",
    candleCount: 22,
    imagePath: "/samples/memorial-bodhi.png",
    memories: [
      {
        author: "Kayla",
        body:
          "Bodhi was the smartest dog I've ever met. The way he understood you when you were having a hard day — that wasn't normal dog stuff. That was something else. So heartbroken for you.",
      },
      {
        author: "Marco",
        body:
          "All those weekends Bodhi came hiking with us. He'd find the spot in the shade before we even thought to stop. He knew. So sorry, brother.",
      },
      {
        author: "Theresa",
        body:
          "Rescue dogs hit different. They know they were chosen. Bodhi knew how loved he was every single day.",
      },
      {
        author: "Sam",
        body:
          "Six years was a gift the shelter said wouldn't happen. You gave him the best life. Sending love.",
      },
    ],
  },
  {
    slug: "pepper-2008-2024",
    petName: "Pepper",
    species: "Cat",
    templateId: "classic",
    bornDate: "2008-09-01",
    diedDate: "2024-12-01",
    bornDateText: "September 2008",
    diedDateText: "December 2024",
    tributeLine:
      "Sixteen years. She was here before the kids and outlasted three apartments. Last week she took her last walk to the food bowl, looked at me, and went to her spot under the desk. She knew.",
    candleCount: 25,
    imagePath: "/samples/memorial-pepper.png",
    memories: [
      {
        author: "Diane",
        body:
          "Pepper picked you. Don't forget that. From the moment you walked into the shelter she only wanted to come home with you. Sixteen years of choosing you every day.",
      },
      {
        author: "Brad",
        body:
          "She was a good cat. Quiet, particular, dignified. The world has fewer of those now.",
      },
      {
        author: "Ariana",
        body: "Sweet sixteen. What a long beautiful run. So sorry, friend.",
      },
      {
        author: "Eli",
        body:
          "I always loved how she'd sit in the kitchen window when we visited. Always watching. So sorry for your loss.",
      },
      {
        author: "Jamie",
        body: "Cats grieve us back, you know. She's missing you wherever she is. Hugs.",
      },
    ],
  },
];

async function main() {
  console.log(
    `[seed] DB: ${url!.replace(/:[^:@]+@/, ":***@")}`
  );
  console.log(`[seed] ${SEED.length} pets to seed`);

  // Use the photo path itself as both original and cropped — these are
  // composite seeds, not real customer uploads. The /m/[slug] page uses
  // rendered_image_url; the original/cropped fields are required-not-null
  // in the schema so we just point them at the same sample asset.
  let petsInserted = 0;
  let petsSkipped = 0;
  for (const p of SEED) {
    const result = (await sql`
      INSERT INTO pets (
        email,
        stripe_session_id,
        pet_name,
        species,
        born_date,
        born_date_text,
        died_date,
        died_date_text,
        tribute_line,
        original_photo_url,
        cropped_photo_url,
        rendered_image_url,
        og_image_url,
        template_id,
        slug,
        candle_count,
        is_sample,
        paid_at
      ) VALUES (
        '',
        ${"seed-" + p.slug},
        ${p.petName},
        ${p.species},
        ${p.bornDate},
        ${p.bornDateText},
        ${p.diedDate},
        ${p.diedDateText},
        ${p.tributeLine},
        ${p.imagePath},
        ${p.imagePath},
        ${p.imagePath},
        ${p.imagePath},
        ${p.templateId},
        ${p.slug},
        ${p.candleCount},
        true,
        NOW()
      )
      ON CONFLICT (slug) DO NOTHING
      RETURNING id
    `) as Array<{ id: string }>;
    if (result.length) {
      petsInserted++;
      console.log(`  [pets] inserted ${p.slug}`);
    } else {
      petsSkipped++;
      console.log(`  [pets] ${p.slug} already exists, skipped`);
    }
  }
  console.log(`[seed] pets: ${petsInserted} inserted, ${petsSkipped} skipped`);

  // Memories: idempotent on (pet_slug, body). If a row with the same body
  // already exists for this slug, skip. The (slug, body) pair is unique
  // enough across the seed corpus that this won't false-match.
  let memoriesInserted = 0;
  let memoriesSkipped = 0;
  for (const p of SEED) {
    for (const m of p.memories) {
      const existing = (await sql`
        SELECT id FROM memories
        WHERE pet_slug = ${p.slug} AND body = ${m.body}
        LIMIT 1
      `) as Array<{ id: string }>;
      if (existing.length) {
        memoriesSkipped++;
        continue;
      }
      await sql`
        INSERT INTO memories (pet_slug, author_name, body)
        VALUES (${p.slug}, ${m.author}, ${m.body})
      `;
      memoriesInserted++;
    }
  }
  console.log(
    `[seed] memories: ${memoriesInserted} inserted, ${memoriesSkipped} skipped`
  );

  console.log("[seed] done.");
}

main().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
