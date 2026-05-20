import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/rainbow-bridge/who-wrote-the-rainbow-bridge-poem";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE =
  "Who Wrote the Rainbow Bridge Poem? The Story of Edna Clyne-Rekhy";
const DESCRIPTION =
  "The Rainbow Bridge poem was written in 1959 by a 19-year-old Scottish girl named Edna Clyne-Rekhy, the day after her Labrador Major died. Here is her story.";

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

export default function WhoWroteRainbowBridgePage() {
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
          <h1 className="mb-10">Who Wrote the Rainbow Bridge Poem?</h1>

          <div className="space-y-6">
            <p>
              For 64 years, no one knew. The veterinary hospitals printed
              it on cards. The hospices read it at services. Dear Abby
              published it to 100 million readers in 1994. Every copy
              said <em>Author Unknown</em>.
            </p>
            <p>
              It turned out the author was a 19-year-old Scottish girl,
              writing the day after her first dog died.
            </p>
            <p>
              Her name is Edna Clyne-Rekhy. She is in her eighties now,
              living in Inverness, Scotland. She had no idea, until 2023,
              that her words had reached millions of grieving pet owners.
              This is her story.
            </p>
          </div>

          <h2 className="mt-14 mb-6">1959, Inverness</h2>
          <div className="space-y-6">
            <p>
              Edna Clyne was 19 years old. She lived with her family near
              Inverness, in the Scottish Highlands. She had a Labrador
              named Major.
            </p>
            <p>
              He was the first dog that had been hers alone. Not a family
              dog. Hers.
            </p>
            <p>
              She used to talk to him for hours, she has said. She felt
              he understood every word. Her mother used to ask how Edna
              had trained him to be so gentle and obedient. Edna laughed.
              She had never trained him at all. It was natural between
              them.
            </p>
            <p>He died in her arms.</p>
            <p>
              The next morning, she was, in her own words, &ldquo;just
              crying and crying.&rdquo; Her mother asked her what was
              wrong.
            </p>
            <p>
              &ldquo;It&apos;s Major,&rdquo; Edna said. &ldquo;I
              can&apos;t put away this soreness.&rdquo;
            </p>
            <p>
              Her mother told her: maybe write down how you&apos;re
              feeling.
            </p>
          </div>

          <h2 className="mt-14 mb-6">The page she stole from her sister</h2>
          <div className="space-y-6">
            <p>
              Edna sat in the family lounge. She found a notebook nearby.
              She didn&apos;t realize it was her sister&apos;s notebook,
              and that her sister had already written on the other side
              of the page. She erased what she could of her sister&apos;s
              words.
            </p>
            <p>Then she filled the page with her own.</p>
            <p>
              The first line came to her without thinking:{" "}
              <em>
                Just this side of heaven is a place called Rainbow Bridge.
              </em>
            </p>
            <p>
              She remembers it feeling as if Major himself were guiding
              her hand. She didn&apos;t know it was a poem. She thought
              she was just talking to him. She filled the front of the
              page, then the back. About 200 words. Two sides of a sheet
              of notebook paper.
            </p>
            <p>
              When she was done, she turned the page over and wrote two
              words at the top: <em>Rainbow Bridge</em>.
            </p>
            <p>That was the only title.</p>
          </div>

          <h2 className="mt-14 mb-6">What she did with it</h2>
          <div className="space-y-6">
            <p>
              She showed it to her mother, who cried. She showed it to a
              few friends, who asked for copies. She typed out a handful
              of duplicates by hand.
            </p>
            <p>She did not put her name on any of them.</p>
            <p>
              It was, she said, something private between her and Major.
              She did not think anyone outside her circle of friends
              would ever read it.
            </p>
            <p>Then she put the original away.</p>
          </div>

          <h2 className="mt-14 mb-6">How it traveled, without her</h2>
          <div className="space-y-6">
            <p>
              Over the next 35 years, those typed copies passed friend to
              friend. Then friend to vet. Then vet to grieving owner.
              Then hospice to hospice. Names fell off as the page was
              photocopied and re-photocopied.
            </p>
            <p>
              By the time it reached Dear Abby in February 1994, no one
              knew who had written it.
            </p>
            <p>
              A reader in Grand Rapids, Michigan had been given a copy by
              their local humane society. They sent it to the syndicated
              advice columnist Abigail Van Buren, with a note: &ldquo;If
              you print this, you had better warn your readers to get out
              their hankies.&rdquo; Dear Abby did print it. She admitted
              to crying herself. She also asked her 100 million readers
              if anyone could verify who the author was.
            </p>
            <p>
              No one came forward. After that, the Rainbow Bridge seemed
              to be everywhere — pet cemeteries, sympathy cards, online
              forums, condolence letters.
            </p>
            <p>Edna had no idea any of this was happening.</p>
            <p>
              She had married Jack Rekhy. They had moved to India, where
              Jack worked as a physician — they lived in Agra, fifteen
              minutes from the Taj Mahal, and Edna rescued street dogs.
              Then they moved to Spain and ran an olive farm. Edna kept
              rescuing dogs there, including a young Andalusian Podenco
              she found hiding inside a washing machine, badly injured,
              having been beaten by another farmer. She named him
              Zanussi, after the brand of the washing machine.
            </p>
            <p>
              Then Jack developed Alzheimer&apos;s. They came back to
              Scotland. He died.
            </p>
          </div>

          <h2 className="mt-14 mb-6">The phone call, January 2023</h2>
          <div className="space-y-6">
            <p>
              An art historian in Tucson, Arizona, named Paul Koudounaris,
              had spent more than a decade trying to find the author of
              the Rainbow Bridge.
            </p>
            <p>
              He had been writing a book about pet cemeteries. He kept
              running into the poem. It bothered him that a piece of
              writing of such &ldquo;monumental importance to the world
              of animal mourning&rdquo; was uncredited.
            </p>
            <p>
              Starting in 1995, he found 15 separate copyright claims
              filed under the title <em>Rainbow Bridge</em> with the
              United States Copyright Office. He compiled a list of about
              25 names. He looked into each one and crossed them off.
            </p>
            <p>
              Eventually, only one name was left. He had found it through
              a stray third-hand reference in an online chat group —
              someone had mentioned an Edna &ldquo;Clyde&rdquo; from
              Scotland who supposedly wrote the poem. The name was
              slightly wrong, but a Google search led him to Edna
              Clyne-Rekhy. She had written a book about her late husband
              and their dog. She was the only woman on his list and the
              only non-American.
            </p>
            <p>
              He called her in January 2023 and asked: did you write the
              Rainbow Bridge?
            </p>
            <p>
              She said: &ldquo;How on Earth did you find me?&rdquo;
            </p>
            <p>
              She had no idea, until that phone call, that her words had
              been read by millions of people in their worst hours. She
              had thought it was something private between her and Major.
            </p>
            <p>
              Koudounaris later said that when she showed him the original
              handwritten draft — the one with her sister&apos;s writing
              erased on the back — he knew immediately it was real. He
              could not fully explain the power of those sheets.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Where she is now</h2>
          <div className="space-y-6">
            <p>
              Edna is in her eighties. She still lives in Inverness. She
              still writes. She is still surrounded by dogs.
            </p>
            <p>
              When the journalist who interviewed her for Slate magazine
              in late 2023 asked about Major, sixty-four years after he
              died, Edna cried.
            </p>
            <p>She told the journalist she still talks to Major sometimes.</p>
            <p>
              In an interview with National Geographic, when asked what
              she would say to the millions of people her words have
              reached, she said: &ldquo;I really can&apos;t believe it.
              I&apos;m just this widow who enjoys writing and friends
              coming over and teaching people to recycle. I never thought
              for a minute that this would happen.&rdquo;
            </p>
            <p>
              She has asked, gently, that people who feel moved by her
              writing consider donating to Alzheimer&apos;s research, in
              memory of Jack.
            </p>
          </div>

          <h2 className="mt-14 mb-6">What this story tells us</h2>
          <div className="space-y-6">
            <p>
              Edna did not write the Rainbow Bridge to comfort the world.
              She wrote it because her mother told her to try. She did it
              the day after she lost her first dog.
            </p>
            <p>
              She did not put her name on it because she did not think it
              was important. She thought it was something private.
            </p>
            <p>
              Sixty-four years later, that small private act has reached
              more grieving pet owners than any other piece of writing in
              the English language.
            </p>
            <p>
              There is something honest in that. The thing that helped
              the most people was made by someone who was not trying to
              help anyone — only herself, on the worst day of her young
              life. The fact that it traveled at all is because friends,
              and vets, and one Michigan reader, kept passing it on.
            </p>
            <p>
              If your dog or cat has just died, and you are reading this
              in the middle of the night, you are part of that line.
              Sixty-four years of grieving people, passing one girl&apos;s
              notebook page from hand to hand, because it helped.
            </p>
            <p>
              It might help you, too. It might not. Both are fine.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Where to find more</h2>
          <div className="space-y-6">
            <p>
              If you want to read the original poem in Edna&apos;s own
              words, the most accurate published version is in{" "}
              <a
                href="https://www.orderofthegooddeath.com/article/the-rainbow-bridge-the-true-story-behind-historys-most-influential-piece-of-animal-mourning-literature/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                Paul Koudounaris&apos;s essay through The Order of the
                Good Death
              </a>
              , or{" "}
              <a
                href="https://www.nationalgeographic.com/animals/article/rainbow-bridge-poem-pet-death-mourning-origin-revealed"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                Natasha Daly&apos;s reporting in National Geographic
              </a>{" "}
              from February 2023. Both are worth your time.
            </p>
            <p>
              For the broader context of what the Rainbow Bridge has
              meant to grieving pet owners over six decades, our{" "}
              <Link href="/rainbow-bridge" className={linkClass} style={linkStyle}>
                main page on the Rainbow Bridge
              </Link>{" "}
              walks through the poem itself and what to do tonight, when
              yours has just died.
            </p>
            <p>
              If you want to do something to honor Edna&apos;s wish: the{" "}
              <a
                href="https://alzfdn.org"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                Alzheimer&apos;s Foundation of America
              </a>{" "}
              accepts donations in memory of Jack Rekhy.
            </p>
          </div>

          <hr
            className="my-14"
            style={{ borderColor: "var(--color-border)" }}
          />

          <footer className="space-y-5 italic">
            <p>
              Written by Hannah Wright, on behalf of Rainbow Memorial.
              Edna Clyne-Rekhy&apos;s story follows the reporting of art
              historian Paul Koudounaris (2023), Natasha Daly&apos;s
              article in National Geographic (February 2023), and Henry
              Grabar&apos;s profile in Slate (December 2023). The voice
              on this page is calibrated to the work of Marty Tousley,
              whose{" "}
              <a
                href="https://www.griefhealingblog.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                Grief Healing
              </a>{" "}
              blog has supported grieving pet owners since 1996.
            </p>
            <p>
              If you find anything on this page inaccurate, please email
              hannah@rainbow.memorial.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
