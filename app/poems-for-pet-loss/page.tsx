import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/poems-for-pet-loss";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "Pet Loss Poems — For the Night, the Days After, and Beyond";
const DESCRIPTION =
  "Pet loss poems for the night your pet dies, the days that follow, and the years after. Original short poems by Rainbow Memorial, free to read, print, and share.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    siteName: "Rainbow Memorial",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const POEMS: Array<{ title: string; lines: string[] }> = [
  {
    title: "For the night they died",
    lines: [
      "The bowl is in the wrong place. The bed still has the shape of them in it. The door is wider than it should be.",
      "You don't have to do anything tonight. You don't have to put anything away. Sit, if sitting is what you can do. Cry, when crying comes.",
    ],
  },
  {
    title: "For when their things are still here",
    lines: [
      "The leash is by the door, in the place where you would look for it. In the place where you would wait, if you were here to wait.",
      "The bed is still on the floor. It still smells like you.",
      "There is a place in my hand where your head used to rest. I have not put that away either.",
    ],
  },
  {
    title: "For an old pet who lived a long life",
    lines: [
      "You were old at the end. Old in your eyes, old in your bones, slow on the stairs you used to take three at a time.",
      "But you were not old to me. You were the one I brought home. You were the one who slept at my feet in every house I have lived in since.",
      "The old body went. The one you were did not.",
    ],
  },
  {
    title: "For when you had to make the choice",
    lines: [
      "You looked at me at the end. You did not know what was coming.",
      "I knew. I held you. I told you the truth, which was that I loved you, and the lie, which was that everything was okay.",
      "I am still telling you that I loved you.",
    ],
    // followed by a note in the page; not part of the poem text
  },
  {
    title: "For a pet who didn't get to grow old",
    lines: [
      "You were not here for long. You were the one you were going to be.",
      "The walks we never took. The years we should have had. I hold those, too, the same way I hold you.",
    ],
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  author: { "@type": "Person", name: "Hannah Wright" },
  publisher: {
    "@type": "Organization",
    name: "Rainbow Memorial",
    url: APP_URL,
  },
  datePublished: "2026-05-26",
  dateModified: "2026-05-26",
  description: DESCRIPTION,
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  hasPart: POEMS.map((p) => ({
    "@type": "CreativeWork",
    name: p.title,
    author: { "@type": "Person", name: "Hannah Wright" },
    publisher: {
      "@type": "Organization",
      name: "Rainbow Memorial",
      url: APP_URL,
    },
    inLanguage: "en",
    isFamilyFriendly: true,
    text: p.lines.join("\n\n"),
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I use these poems at a funeral or memorial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. They are free to use — printed, read aloud, included in a program, shared online. You don't need permission.",
      },
    },
    {
      "@type": "Question",
      name: "Are these pet loss poems religious?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. They are written for anyone, regardless of faith. Religious and non-religious readers both find them useful.",
      },
    },
    {
      "@type": "Question",
      name: "Why are pet loss poems usually short?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grief makes long reading hard. Short poems can be read in the time it takes to make tea, before you fall asleep, or in the parking lot of the vet on the way home. They are sized for the day you're having.",
      },
    },
    {
      "@type": "Question",
      name: "Who writes the Rainbow Memorial poems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hannah Wright writes them for Rainbow Memorial. They are original works, not adapted from other sources.",
      },
    },
  ],
};

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

export default function PoemsForPetLossPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-display)",
        }}
      >
        <article
          className="mx-auto px-6 py-16 md:py-24"
          style={{ maxWidth: 680 }}
        >
          <h1 className="mb-10">Pet Loss Poems</h1>

          <div className="space-y-6">
            <p>
              Pet loss poems are short pieces of writing meant to be read in
              the hours and days after a pet dies, often at a backyard
              burial, a memorial gathering, or in private. The collection
              below is Rainbow Memorial&apos;s own. Each poem is meant for a
              different moment in the loss. Read whichever ones meet you
              where you are.
            </p>
          </div>

          <h2 className="mt-14 mb-6">{POEMS[0].title}</h2>
          <div
            className="space-y-6"
            style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
          >
            {POEMS[0].lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <h2 className="mt-14 mb-6">{POEMS[1].title}</h2>
          <div
            className="space-y-6"
            style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
          >
            {POEMS[1].lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <h2 className="mt-14 mb-6">{POEMS[2].title}</h2>
          <div
            className="space-y-6"
            style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
          >
            {POEMS[2].lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <h2 className="mt-14 mb-6">{POEMS[3].title}</h2>
          <div
            className="space-y-6"
            style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
          >
            {POEMS[3].lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="mt-6 space-y-6">
            <p>
              This poem is for people who had to make the euthanasia
              decision. If that&apos;s you, it was an act of love. You
              don&apos;t owe an explanation to anyone, including yourself.
            </p>
          </div>

          <h2 className="mt-14 mb-6">{POEMS[4].title}</h2>
          <div
            className="space-y-6"
            style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
          >
            {POEMS[4].lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <h2 className="mt-14 mb-6">When you want a longer poem</h2>
          <div className="space-y-6">
            <p>
              If you came looking for the Rainbow Bridge poem — the one
              about the meadow where pets wait for their people — that has
              been a part of pet grief since 1959.{" "}
              <Link
                href="/rainbow-bridge"
                className={linkClass}
                style={linkStyle}
              >
                Read the Rainbow Bridge tradition here
              </Link>
              , or{" "}
              <Link
                href="/rainbow-bridge/dogs"
                className={linkClass}
                style={linkStyle}
              >
                the version for dogs specifically
              </Link>
              .
            </p>
            <p>
              If your pet was a dog and you&apos;d like more poems written
              specifically for a dog&apos;s passing,{" "}
              <Link
                href="/poems/dog-passed-away"
                className={linkClass}
                style={linkStyle}
              >
                there&apos;s a longer collection here
              </Link>
              .
            </p>
          </div>

          <h2 className="mt-14 mb-6">A place for them</h2>
          <div className="space-y-6">
            <p>
              You can{" "}
              <Link href="/create" className={linkClass} style={linkStyle}>
                make a page for your pet
              </Link>{" "}
              and put any of these poems on it. A photo, their name, the
              years they were with you, and the poem that meets the moment.
              The page has a permanent address. It stays up.
            </p>
            <p>
              A year from now, on the day you lost them, an email will
              arrive so you don&apos;t have to remember the date alone.
            </p>
            <p>
              <Link href="/create" className={linkClass} style={linkStyle}>
                Create their memorial page →
              </Link>
            </p>
          </div>

          <h2 className="mt-14 mb-6">About these poems</h2>
          <div className="space-y-6">
            <p>
              The poems above are Rainbow Memorial&apos;s own, written by
              Hannah Wright. They are free for you to print, share, read at
              a service, or include in a memorial. You don&apos;t need to
              credit anyone. They were written for you.
            </p>
            <p>
              For longer reading on pet grief, Wallace Sife&apos;s{" "}
              <em>Loss of a Pet</em>, published by the{" "}
              <a
                href="https://www.aplb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                Association for Pet Loss and Bereavement
              </a>
              , is the standard reference and has been since the 1990s.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Questions people sometimes ask</h2>
          <div className="space-y-6">
            <p>
              <strong>
                Can I use these poems at a funeral or memorial?
              </strong>{" "}
              Yes. They are free to use — printed, read aloud, included in a
              program, shared online. You don&apos;t need permission.
            </p>
            <p>
              <strong>Are these poems religious?</strong> No. They are
              written for anyone, regardless of faith. Religious and
              non-religious readers both find them useful.
            </p>
            <p>
              <strong>Why are these poems short?</strong> Grief makes long
              reading hard. Short poems can be read in the time it takes to
              make tea, or before you fall asleep, or in the parking lot of
              the vet on the way home. They are sized for the day
              you&apos;re having.
            </p>
            <p>
              <strong>Who wrote these?</strong> Hannah Wright wrote them for
              Rainbow Memorial. They are original and not adapted from any
              other source.
            </p>
            <p>
              <strong>
                Can I write my own poem and put it on a memorial page?
              </strong>{" "}
              Yes. The memorial page lets you write whatever you want
              alongside your pet&apos;s photo and name. Many people write
              their own and include one of these too.
            </p>
          </div>

          <hr
            className="my-14"
            style={{ borderColor: "var(--color-border)" }}
          />

          <footer className="space-y-5 italic">
            <p>Written by Hannah Wright, on behalf of Rainbow Memorial.</p>
          </footer>
        </article>
      </main>
    </>
  );
}
