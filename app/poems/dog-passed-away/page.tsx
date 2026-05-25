import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/poems/dog-passed-away";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "Poems for a Dog Who Has Passed Away";
const DESCRIPTION =
  "Poems for a dog who has passed away — for the night of the loss, for an old dog who lived a long life, for a puppy gone too soon, and for the years after.";

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
      "You are not at the door where you used to wait when I came home.",
      "The bed at the foot is empty.",
      "The room knows you are gone.",
      "I am here, in the kitchen, with the shape of where you used to be.",
      "I will not forget the shape.",
    ],
  },
  {
    title: "For when you had to make the choice",
    lines: [
      "You looked at me at the end. You did not know what was coming.",
      "I knew. I held you. I told you the truth, which was that I loved you, and the lie, which was that everything was okay.",
      "I am still telling you that I loved you. I am still here.",
    ],
  },
  {
    title: "For a dog who was old at the end",
    lines: [
      "You were old at the end. Old in your eyes, old in your bones, slow on the stairs you used to take three at a time.",
      "But you were not old to me. You were the puppy I brought home. You were the dog who slept at my feet in every house I have lived in since.",
      "The old body went. The dog you were did not.",
    ],
  },
  {
    title: "For a puppy or young dog who died too soon",
    lines: [
      "You were not here for long. You were the dog you were going to be.",
      "The walks we never took. The years we should have had. I hold those, too, the same way I hold you.",
    ],
  },
  {
    title: "For a dog who has been gone a while",
    lines: [
      "It has been a year, or two, or some other count that doesn't help.",
      "People still ask if I have a dog. I say no, but I don't mean no.",
      "I mean — there was one, once. She was mine. I was hers. I am still hers, even now.",
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
      name: "Can I read these poems at my dog's funeral or memorial service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Print them, hand them out, read them aloud — whatever serves the day. You don't need to credit Rainbow Memorial.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a poem written specifically for putting a dog to sleep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The 'For when you had to make the choice' poem on this page is written for the euthanasia moment. Many people read it the night of, or in the days after, when the guilt of the decision settles in alongside the grief.",
      },
    },
    {
      "@type": "Question",
      name: "My dog hasn't died yet but is very sick. Is there a poem for that?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anticipatory grief — the grief that comes before — is real and underdiscussed. Some of these poems still apply, particularly the one for an old dog.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Rainbow Bridge poem more famous than other dog loss poems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Rainbow Bridge poem, written by Edna Clyne-Rekhy in 1959, has been the standard for over sixty years. Other poems are written to fit alongside it, for specific moments the Rainbow Bridge poem doesn't cover.",
      },
    },
    {
      "@type": "Question",
      name: "Who writes the Rainbow Memorial poems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hannah Wright writes them for Rainbow Memorial. They are original works, not adapted from any other source.",
      },
    },
  ],
};

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

export default function PoemsForDogPassedAwayPage() {
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
          <h1 className="mb-10">Poems for a Dog Who Has Passed Away</h1>

          <div className="space-y-6">
            <p>
              These are original poems for a dog who has died, each
              written for a different moment in the loss — the night they
              died, the morning after, the choice some owners had to
              make, the loss of a dog who lived to be old, and the loss
              of one who didn&apos;t. They are free to read aloud, print,
              or include in a memorial. Read whichever ones meet you
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
          <div className="mt-6 space-y-6">
            <p>
              This poem is for people who had to make the euthanasia
              decision. If that&apos;s you, it was an act of love. The
              vet&apos;s office, the blanket on the floor, the last look
              — those will stay with you, and they will hurt for a while.
              They are also evidence that you were a person who did not
              let your dog suffer. That is not a small thing.
            </p>
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
              This poem is for people who lost a young dog — to illness,
              to an accident, to something nobody saw coming. Outliving a
              dog you barely got to know is its own kind of grief. It is
              real, and it deserves a poem of its own.
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

          <h2 className="mt-14 mb-6">The Rainbow Bridge poem</h2>
          <div className="space-y-6">
            <p>
              If you came here looking for the Rainbow Bridge poem — the
              one about the meadow where dogs wait for their people —{" "}
              <Link
                href="/rainbow-bridge/dogs"
                className={linkClass}
                style={linkStyle}
              >
                that&apos;s on its own page for dogs specifically
              </Link>
              . The tradition began in 1959 with a Scottish teenager
              named Edna Clyne-Rekhy, and it remains the most-read pet
              grief poem in the English-speaking world.
            </p>
          </div>

          <h2 className="mt-14 mb-6">A place for your dog</h2>
          <div className="space-y-6">
            <p>
              You can{" "}
              <Link href="/create" className={linkClass} style={linkStyle}>
                make a page for your dog
              </Link>{" "}
              and put one of these poems on it. A photo, their name, the
              years they were with you, the poem that meets the moment.
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
              Hannah Wright. They are free to print, share, read at a
              service, or include in a memorial. You don&apos;t need to
              credit anyone.
            </p>
            <p>
              If you want more poems for general pet loss, not
              specifically dogs,{" "}
              <Link
                href="/poems-for-pet-loss"
                className={linkClass}
                style={linkStyle}
              >
                the wider collection is here
              </Link>
              . For longer reading on grief after losing a dog, Wallace
              Sife&apos;s <em>Loss of a Pet</em>, published by the{" "}
              <a
                href="https://www.aplb.org"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                Association for Pet Loss and Bereavement
              </a>
              , is the standard reference.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Questions people sometimes ask</h2>
          <div className="space-y-6">
            <p>
              <strong>
                Can I read these at my dog&apos;s funeral or memorial
                service?
              </strong>{" "}
              Yes. Print them, hand them out, read them aloud — whatever
              serves the day. You don&apos;t need to credit Rainbow
              Memorial.
            </p>
            <p>
              <strong>
                Is there a poem written specifically for putting a dog to
                sleep?
              </strong>{" "}
              Yes. The &quot;For when you had to make the choice&quot;
              poem above is written for that moment. Many people read it
              the night of, or in the days after, when the guilt of the
              decision settles in alongside the grief.
            </p>
            <p>
              <strong>
                My dog hasn&apos;t died yet but is very sick. Is there a
                poem for that?
              </strong>{" "}
              Anticipatory grief — the grief that comes before — is real
              and underdiscussed. Some of these poems still apply,
              particularly the one for an old dog.{" "}
              <Link
                href="/poems-for-pet-loss"
                className={linkClass}
                style={linkStyle}
              >
                The wider pet loss poem collection
              </Link>{" "}
              has poems written closer to that moment.
            </p>
            <p>
              <strong>
                Is the Rainbow Bridge poem more famous than these?
              </strong>{" "}
              Yes. The Rainbow Bridge poem, written by Edna Clyne-Rekhy in
              1959, has been the standard for over sixty years. These
              poems are written to fit alongside it, for the specific
              moments the Rainbow Bridge poem doesn&apos;t cover — the
              euthanasia decision, the loss of a young dog, the year
              after the loss.
            </p>
            <p>
              <strong>Who wrote these?</strong> Hannah Wright wrote them
              for Rainbow Memorial. They are original and not adapted
              from any other source.
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
