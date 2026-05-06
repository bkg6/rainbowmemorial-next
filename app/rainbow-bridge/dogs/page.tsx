import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/rainbow-bridge/dogs";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE =
  "The Rainbow Bridge for Dogs — A Page for Anyone Whose Dog Just Died";
const DESCRIPTION =
  "The Rainbow Bridge poem, the Edna Clyne-Rekhy story, and what helps tonight when your dog has just died. Written for someone reading this in the middle of the night.";

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

export default function RainbowBridgeDogsPage() {
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
          <h1 className="mb-10">The Rainbow Bridge, for Dogs</h1>

          <div className="space-y-6">
            <p>
              If you found this page tonight because your dog just died,
              I&apos;m sorry. I&apos;ll keep this short. The poem is
              below. So is what helps, when nothing helps.
            </p>
            <p>You don&apos;t have to read all of it.</p>
          </div>

          <h2 className="mt-14 mb-6">
            What the Rainbow Bridge says about dogs
          </h2>
          <div className="space-y-6">
            <p>
              The Rainbow Bridge is a small piece of writing — about 200
              words — written in 1959 by a 19-year-old Scottish girl
              named Edna Clyne-Rekhy, the day after her Labrador Major
              died in her arms. We won&apos;t reproduce her full text
              here. It is hers, and the{" "}
              <a
                href="https://www.nationalgeographic.com/animals/article/rainbow-bridge-poem-pet-death-mourning-origin-revealed"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                most accurate published version is through National
                Geographic
              </a>
              . What she wrote, in our own words, is this:
            </p>
            <p>
              There is a meadow, just on the near side of heaven. The
              dogs we have lost go there when they die. The old ones run
              again. The hurt ones are made whole. They eat, they play,
              they are warm. They are content, except for one thing: each
              of them misses someone they had to leave behind.
            </p>
            <p>
              One day in that meadow, a dog stops mid-stride and looks
              up. Their eyes are bright. Their ears are forward. Then
              they run — full, glad, headlong — toward someone they
              recognize. The person they were waiting for has finally
              come. The dog leaps into their arms. They cling to each
              other. There is no need for words. They cross the bridge
              together.
            </p>
            <p>That is what Edna wrote.</p>
            <p>
              She wrote it for Major. It happens to fit every dog that
              has ever been loved.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Why dogs especially</h2>
          <div className="space-y-6">
            <p>Dogs do something to us that most other animals don&apos;t.</p>
            <p>
              It is not just that they are loyal — most pets, in their
              way, are loyal. It is that a dog is <em>with you</em>. A
              dog watches what you&apos;re doing and orients toward it. A
              dog notices when your day was bad. A dog knows the sound of
              your car at the bottom of the street. A dog leans against
              your leg without being asked.
            </p>
            <p>
              When that animal dies, the absence is everywhere. Not just
              in the corner where the bed was. In the doorway, where they
              used to be standing every time you came home. In the
              kitchen, where they used to follow you for breakfast
              scraps. In the stairwell, in the hallway, on the couch. The
              whole shape of the day was built around them, and now the
              shape is wrong.
            </p>
            <p>
              That is what makes losing a dog so specifically hard. The
              grief is not located in one place. It is distributed across
              every room, every routine, every hour you used to share.
            </p>
            <p>
              This is why people often feel more wrecked over a dog than
              they were prepared for.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            Things people often feel after a dog dies, that they&apos;re
            afraid to say
          </h2>
          <div className="space-y-6">
            <p>
              You may feel more shattered than you were when a relative
              died. This is not a moral failing. Your dog was woven into
              every hour of your day. The bond was different. Not less.
              Different.
            </p>
            <p>
              You may feel relief along with the sadness, especially
              after a long illness. Relief that they are not suffering.
              Relief that the daily work of caring for a dying dog is
              done. The relief is not betrayal. It is love finishing its
              job.
            </p>
            <p>
              You may feel furious. At the vet. At yourself. At God. At
              the disease. At no one in particular. You may replay the
              last week in your head, looking for what you missed. This
              is what minds do when something this big happens. It will
              quiet down. Slowly.
            </p>
            <p>
              You may feel guilty about the moments you snapped at them.
              The walks you cut short. The times you were tired. None of
              those moments mattered to your dog. They never thought
              about them again. They forgave you in the same breath.
            </p>
            <p>
              You may feel like you can&apos;t tell anyone how bad this
              is, because they won&apos;t get it. Some of them
              won&apos;t. That doesn&apos;t mean you&apos;re wrong. The
              grief counselor Marty Tousley calls this{" "}
              <em>disenfranchised grief</em> — grief that the surrounding
              world doesn&apos;t fully recognize. It is becoming less so,
              slowly. But on a Tuesday afternoon at work, surrounded by
              people who didn&apos;t know your dog, it can still feel
              very lonely.
            </p>
            <p>
              None of what you are feeling is too much. None of it is too
              little.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            What might help, if you want to share the poem
          </h2>
          <div className="space-y-6">
            <p>Many people share the Rainbow Bridge poem in three ways:</p>
            <p>
              <strong>
                On the day they post about their dog on social media.
              </strong>{" "}
              Usually with one photo. Often the caption is just the
              dog&apos;s name and dates, plus a few lines from the poem.
              You don&apos;t have to write more than that. Less is often
              better.
            </p>
            <p>
              <strong>At a small farewell, at home.</strong> Some
              families read the poem out loud the evening their dog died,
              sitting in the room where the dog used to sleep. A candle,
              a photo, the poem, then quiet. Children often handle this
              better than adults do.
            </p>
            <p>
              <strong>
                In a sympathy card to someone whose dog died.
              </strong>{" "}
              A few lines, hand-written. Don&apos;t try to explain or fix
              anything. The poem is doing the work.
            </p>
            <p>
              If you&apos;d like a{" "}
              <Link
                href="/rainbow-bridge/short-version"
                className={linkClass}
                style={linkStyle}
              >
                shorter version of the poem that fits on a card
              </Link>
              , we have one.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            What might help tonight, if you don&apos;t want to do anything
          </h2>
          <div className="space-y-6">
            <p>
              You don&apos;t have to do anything tonight. That is the
              most honest sentence on this page.
            </p>
            <p>
              If you want to do something small, here are a few things
              people have found useful:
            </p>
            <p>
              <strong>Light a candle.</strong> Just so the room has a
              small warm point in it. Sit with it for a few minutes.
            </p>
            <p>
              <strong>Look at one photo.</strong> One. Not the whole
              camera roll. Let yourself cry if you want to. Don&apos;t,
              if you don&apos;t.
            </p>
            <p>
              <strong>Write down one specific thing about them.</strong>{" "}
              The way they tilted their head when you said <em>walk</em>.
              The exact sound they made when they stretched. The spot on
              the couch they always claimed. One concrete thing. Not a
              eulogy. One sentence.
            </p>
            <p>
              <strong>Make a small image.</strong> This is what we made.
              If you&apos;d like, you can take one photo of your dog and
              turn it into a simple memorial image — to keep, to share,
              or to print. It takes about a minute. There is no pressure.
            </p>
            <p>
              <Link href="/create" className={linkClass} style={linkStyle}>
                Make a memorial for your dog →
              </Link>
            </p>
            <p>
              You don&apos;t need a memorial for your love to count. You
              don&apos;t need anything for your love to count.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Where to go from here</h2>
          <div className="space-y-6">
            <p>
              If you&apos;d like the{" "}
              <Link
                href="/rainbow-bridge/who-wrote-the-rainbow-bridge-poem"
                className={linkClass}
                style={linkStyle}
              >
                longer story of how the Rainbow Bridge poem was written
              </Link>
              , we have a fuller page on Edna and Major.
            </p>
            <p>
              If you want a{" "}
              <Link
                href="/rainbow-bridge/short-version"
                className={linkClass}
                style={linkStyle}
              >
                shorter version of the poem that fits on a card
              </Link>
              , it&apos;s here.
            </p>
            <p>
              For the{" "}
              <Link
                href="/rainbow-bridge"
                className={linkClass}
                style={linkStyle}
              >
                main Rainbow Bridge page
              </Link>
              , with the full poem context and what helps tonight,
              it&apos;s here.
            </p>
          </div>

          <hr
            className="my-14"
            style={{ borderColor: "var(--color-border)" }}
          />

          <footer className="space-y-5 italic">
            <p>
              Written by Hannah Wright, on behalf of Rainbow Memorial.
              The voice on this page draws from the work of Marty
              Tousley, Wallace Sife, and the team at Lap of Love. Edna
              Clyne-Rekhy&apos;s story follows the reporting of Paul
              Koudounaris and National Geographic (2023).
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
