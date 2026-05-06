import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/rainbow-bridge/short-version";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE =
  "A Short Version of the Rainbow Bridge Poem — For Cards, Posts, and Quiet Moments";
const DESCRIPTION =
  "A four-line version of the Rainbow Bridge that fits on a sympathy card or a social post. Plus when to use the short version, and when the longer one helps more.";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  author: { "@type": "Person", name: "Hannah Wright" },
  publisher: {
    "@type": "Organization",
    name: "Rainbow Memorial",
    url: APP_URL,
  },
  datePublished: "2026-05-06",
  dateModified: "2026-05-06",
  description: DESCRIPTION,
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
};

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

export default function ShortVersionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          className="rb-article mx-auto px-6 py-16 md:py-24"
          style={{ maxWidth: 680 }}
        >
          <h1 className="mb-10">The Short Rainbow Bridge</h1>

          <div className="space-y-6">
            <p>
              Sometimes the full poem is too much. Either too long for
              the card you&apos;re writing, or too much for the moment
              you&apos;re in. A few lines is enough.
            </p>
            <p>
              This page has a short version, and a note on when to use
              it.
            </p>
          </div>

          <h2 className="mt-14 mb-6">The short version</h2>
          <div className="space-y-6">
            <p>
              We won&apos;t try to &ldquo;shorten&rdquo; Edna
              Clyne-Rekhy&apos;s actual poem — that&apos;s not ours to
              edit. What we can offer is a few lines that capture the
              same feeling, written in plain language, that fits on a
              sympathy card or a social media post.
            </p>
            <p>
              You can use these lines as they are, or as a starting
              point.
            </p>
            <blockquote
              className="my-2 pl-6 italic"
              style={{
                borderLeft: "2px solid var(--color-border)",
              }}
            >
              <p>
                Just on the near side of heaven, there&apos;s a meadow.
              </p>
              <p>Our pets are there. They are well again. They are warm.</p>
              <p>
                They are waiting, and one day, we will see them again.
              </p>
              <p>Until then, the love does not stop.</p>
            </blockquote>
            <p>That&apos;s it. Four lines. About 30 words.</p>
          </div>

          <h2 className="mt-14 mb-6">When to use the short version</h2>
          <div className="space-y-6">
            <p>
              The short version is useful in three situations:
            </p>
            <p>
              <strong>
                On a sympathy card to someone whose pet just died.
              </strong>{" "}
              Hand-written, under their pet&apos;s name. Don&apos;t add
              anything else. The lines are doing the work.
            </p>
            <p>
              <strong>
                On a social media caption when you post about your pet.
              </strong>{" "}
              Pet&apos;s name, dates, a photo, and these four lines.
              Anything more turns it into a eulogy when most readers just
              want to know what happened and feel quiet for a minute.
            </p>
            <p>
              <strong>On a small physical printed memorial.</strong> A
              framed photo, a card next to a candle, an engraving on a
              small stone. Anywhere the space is limited and the words
              need to do their job in one breath.
            </p>
          </div>

          <h2 className="mt-14 mb-6">When the longer version helps more</h2>
          <div className="space-y-6">
            <p>The full poem is better when:</p>
            <p>
              You are writing for yourself, not someone else. The longer
              version gives you somewhere to sit with the grief.
            </p>
            <p>
              You are reading it aloud at a small family farewell. The
              four-line version moves too quickly for a moment that needs
              to take its time.
            </p>
            <p>
              The reader is in deep grief and the short version feels
              like it skims past their pain. Some people need the full
              meadow. Some people need just the doorway.
            </p>
            <p>
              The{" "}
              <Link href="/rainbow-bridge" className={linkClass} style={linkStyle}>
                full Rainbow Bridge page
              </Link>{" "}
              has the longer version in our paraphrase, plus the story of
              who wrote it.
            </p>
          </div>

          <h2 className="mt-14 mb-6">If you&apos;d like a card with these lines</h2>
          <div className="space-y-6">
            <p>
              You can use these four lines anywhere. We don&apos;t claim
              them as our own — they&apos;re a paraphrase of what Edna
              Clyne-Rekhy wrote in 1959.
            </p>
            <p>
              If you&apos;d like a{" "}
              <Link href="/create" className={linkClass} style={linkStyle}>
                simple memorial card with your pet&apos;s photo, name,
                and these lines
              </Link>
              , you can make one in about a minute. Free, no pressure.
            </p>
            <p>
              If you&apos;d like to send a sympathy card to someone whose
              pet just died, with these lines printed on it — that page
              is coming soon. For now, you can write the four lines by
              hand on any card. Hand-written is better anyway.
            </p>
          </div>

          <hr
            className="my-14"
            style={{ borderColor: "var(--color-border)" }}
          />

          <footer className="space-y-5 italic">
            <p>
              Written by Hannah Wright, on behalf of Rainbow Memorial.
              The four-line paraphrase above is our own composition,
              written to capture the spirit of Edna Clyne-Rekhy&apos;s
              1959 original without altering her actual text. The full
              poem belongs to Edna.
            </p>
            <p>
              If anything on this page reads off, please email
              hello@rainbow.memorial.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
