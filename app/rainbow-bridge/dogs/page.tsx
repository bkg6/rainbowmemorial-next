import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/rainbow-bridge/dogs";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "Rainbow Bridge Poem for Dogs";
const DESCRIPTION =
  "The Rainbow Bridge poem for the dog you just lost, and what to do in the first night and the days after.";

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
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the Rainbow Bridge religious?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Edna Clyne-Rekhy wrote it as a personal vision, not a religious text. Religious and non-religious dog owners both find comfort in it. It belongs to no tradition in particular.",
      },
    },
    {
      "@type": "Question",
      name: "Can I read the Rainbow Bridge poem at a funeral or burial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many families do, often in the backyard with the people who knew the dog. There is no requirement to read it any particular way.",
      },
    },
    {
      "@type": "Question",
      name: "Will the grief of losing a dog stop hurting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not soon. The shape of it changes with time. The dog you lost was real, and what you're feeling is the size of that. Don't measure your grief against anyone else's calendar.",
      },
    },
  ],
};

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

export default function RainbowBridgeDogsPage() {
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
          <h1 className="mb-10">Rainbow Bridge Poem for Dogs</h1>

          <div className="space-y-6">
            <p>
              If you&apos;re reading this tonight, your dog is gone. You came
              here for the poem.
            </p>
          </div>

          <div
            className="mt-10 space-y-6"
            style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
          >
            <p>
              There&apos;s a meadow somewhere your dog is in now.
            </p>
            <p>
              Their pain is gone. Their old body works again. If they
              couldn&apos;t see at the end, they can see now. If they
              couldn&apos;t walk, they&apos;re running. They are warm, they
              are fed, they are surrounded by other dogs who once loved
              someone too.
            </p>
            <p>They play all day. They eat well. They rest in the shade.</p>
            <p>
              But there&apos;s one thing they&apos;re still missing. They
              miss you.
            </p>
            <p>
              Sometimes they look up across the meadow, at the place where
              the people come from. They watch. They wait. They go back to
              playing. They watch again.
            </p>
            <p>
              One day they look up and see you. They know it&apos;s you from
              across the field. They run, and they don&apos;t stop running.
            </p>
            <p>
              When they reach you, you&apos;ll be on the ground holding
              them. Their face against your face. Their old body strong
              again, the way you remember it best.
            </p>
            <p>
              No one will tell you to let go. No one will tell you it&apos;s
              time.
            </p>
            <p>
              When you both stand up, you&apos;ll walk together over the
              bridge. You won&apos;t be apart again.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <p>
              You can read it again. You can print it. You can read it out
              loud to your dog tonight if you want to. There is no wrong way
              to do this.
            </p>
          </div>

          <h2 className="mt-14 mb-6">The first night</h2>
          <div className="space-y-6">
            <p>
              The first night is the hardest. The water bowl is in the wrong
              place. The bed still has the shape of them in it. The bedroom
              door is wider than it should be.
            </p>
            <p>
              Tonight, you don&apos;t have to do anything. The bed can stay
              where it is. The water bowl doesn&apos;t have to be poured
              out. The collar can stay on the bedside table. The leash by
              the door doesn&apos;t have to come down. None of these things
              need to be moved tonight or anytime soon.
            </p>
            <p>
              If looking at their things hurts and you want them put away,
              that&apos;s also okay. There is no correct order here.
              Whichever version of you wakes up tomorrow morning will know
              what to do next.
            </p>
          </div>

          <h2 className="mt-14 mb-6">The days that come after</h2>
          <div className="space-y-6">
            <p>
              You&apos;ll reach for them before you remember. You&apos;ll
              stand in the kitchen at the time you used to feed them, and
              your hand will move toward the cupboard without your
              permission. This will happen for weeks, less often as months
              pass, and it won&apos;t fully stop in the first year.
            </p>
            <p>
              If you have other pets in the house, they&apos;re searching
              too. Watch for them at the door, in the spot your dog used to
              sleep, or near the food bowl. They knew your dog. They are
              looking for them.
            </p>
            <p>
              There is no schedule for any of this. Some mornings will be
              harder than others, and some will surprise you with how much
              it still hurts months in. That doesn&apos;t mean you&apos;re
              doing it wrong. It means you loved them.
            </p>
          </div>

          <h2 className="mt-14 mb-6">A place for them</h2>
          <div className="space-y-6">
            <p>
              You can{" "}
              <Link href="/create" className={linkClass} style={linkStyle}>
                make a page for your dog
              </Link>
              . A photo of them, their name, the years they were with you,
              and anything else you want to write. The page has a permanent
              address. It stays up. Anyone who knew them can visit — family,
              the kids, the neighbor who used to feed them when you
              traveled.
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

          <h2 className="mt-14 mb-6">About this poem</h2>
          <div className="space-y-6">
            <p>
              The Rainbow Bridge has been part of pet grief tradition for
              over sixty years. The original was written in 1959 by a
              Scottish teenager, Edna Clyne-Rekhy, after her own dog Major
              died. The version above is ours.{" "}
              <Link
                href="/rainbow-bridge/who-wrote-the-rainbow-bridge-poem"
                className={linkClass}
                style={linkStyle}
              >
                Edna&apos;s full story is here
              </Link>
              , and you can read more on{" "}
              <Link
                href="/rainbow-bridge"
                className={linkClass}
                style={linkStyle}
              >
                how the Rainbow Bridge entered pet grief
              </Link>
              .
            </p>
          </div>

          <h2 className="mt-14 mb-6">Questions people sometimes ask</h2>
          <div className="space-y-6">
            <p>
              <strong>Is the Rainbow Bridge religious?</strong> No. Edna
              wrote it as a personal vision, not a religious text. Religious
              and non-religious dog owners both find comfort in it. It
              belongs to no tradition in particular.
            </p>
            <p>
              <strong>Can I read it at a funeral or burial?</strong> Yes.
              Many families do, often in the backyard with the people who
              knew the dog. There is no requirement to read it any
              particular way.
            </p>
            <p>
              <strong>Will this stop hurting?</strong> Not soon. The shape
              of it will change with time. But the dog you lost was real,
              and what you&apos;re feeling is the size of that. Don&apos;t
              measure your grief against anyone else&apos;s calendar.
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
