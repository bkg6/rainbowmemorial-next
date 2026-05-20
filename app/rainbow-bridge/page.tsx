import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/rainbow-bridge";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE =
  "The Rainbow Bridge — The Poem, Edna's Story, and What to Do Tonight";
const DESCRIPTION =
  "The full story of the Rainbow Bridge poem — written by Edna Clyne-Rekhy in 1959, after her dog Major died in her arms. And what helps tonight, when yours has.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "The Rainbow Bridge",
    description:
      "The poem, Edna Clyne-Rekhy's story, and what helps tonight.",
    url: PAGE_URL,
    type: "article",
    siteName: "Rainbow Memorial",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rainbow Bridge",
    description:
      "The poem, Edna Clyne-Rekhy's story, and what helps tonight.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  author: {
    "@type": "Person",
    name: "Hannah Wright",
  },
  publisher: {
    "@type": "Organization",
    name: "Rainbow Memorial",
    url: APP_URL,
  },
  datePublished: "2026-05-05",
  dateModified: "2026-05-05",
  description:
    "The full story of the Rainbow Bridge poem — written by Edna Clyne-Rekhy in 1959, after her dog Major died in her arms.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
};

export default function RainbowBridgePage() {
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
          <h1 className="mb-10">The Rainbow Bridge</h1>

          <div className="space-y-6">
            <p>
              If you found this page tonight because your dog or cat just
              died, I&apos;m sorry. You don&apos;t have to do anything yet.
              The poem you&apos;re looking for is below. So is the story of
              the young woman who wrote it for her own dog, in 1959, the
              day after he died in her arms. And below that, a few small
              things that might help, when nothing seems to.
            </p>
            <p>
              You don&apos;t have to read all of it. You don&apos;t have to
              read any of it. It&apos;s all here.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            What the Rainbow Bridge is
          </h2>
          <div className="space-y-6">
            <p>
              There is a small piece of writing — most people call it a
              poem, though Edna, who wrote it, didn&apos;t really intend
              it as one — that has reached more grieving pet owners than
              any other piece of writing in the world.
            </p>
            <p>
              It describes a meadow, just on the near side of heaven. The
              pets we have loved go there when they die. They are restored
              to health. The old ones run again. The hurt ones are made
              whole. They wait in the meadow, content, except for one
              small ache: each of them misses the person they had to leave
              behind. And then one day, that person finally arrives. The
              pet looks up. There is no question of recognition. They are
              reunited, and together they cross the bridge into whatever
              is beyond.
            </p>
            <p>That is the picture the writing leaves behind.</p>
            <p>
              It belongs to no religion in particular. It does not require
              you to believe anything. It is simply a way of saying that
              the love did not end, and that they are not nowhere.
            </p>
            <p>
              For some readers, that is enough. For others, it is too
              much, or not enough. Both are fine. Grief is allowed to
              refuse comfort that doesn&apos;t fit. Grief is also allowed
              to take comfort wherever it can find it.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            Who actually wrote it
          </h2>
          <div className="space-y-6">
            <p>
              For most of the poem&apos;s life, no one knew who had
              written it. Veterinary hospitals printed it on cards.
              Hospices read it at services. Dear Abby published it in
              1994 in a syndicated column read by 100 million people.
              Every copy said <em>Author Unknown</em>.
            </p>
            <p>
              It turned out the author was a 19-year-old Scottish girl,
              writing the day after her first dog died.
            </p>
            <p>
              Her name was Edna Clyne. Today she is Edna Clyne-Rekhy. In
              1959 she was living in Inverness, Scotland, with her family
              and her Labrador, Major. He was the first dog that had been
              hers alone. She used to talk to him for hours, she has
              said, and felt he understood every word.
            </p>
            <p>He died in her arms.</p>
            <p>
              The next morning, her mother — watching her daughter break
              apart — told her to try writing it down. Edna found a
              notebook nearby and ripped out a page. She didn&apos;t
              realize it was her sister&apos;s notebook, and that her
              sister had already written on the other side. She erased
              what she could of her sister&apos;s words. Then she filled
              the rest with her own, until the page was full. She
              remembers it feeling as if Major himself were guiding her
              hand.
            </p>
            <p>
              When she was done, she turned the page over and wrote two
              words at the top: <em>Rainbow Bridge</em>.
            </p>
            <p>
              She showed it to her mother, who cried. She showed it to a
              few friends, who asked for copies. She typed out a handful
              of duplicates by hand. She didn&apos;t put her name on any
              of them — it was, she said, something private between her
              and Major. She didn&apos;t think anyone outside her circle
              of friends would care.
            </p>
            <p>
              Over the next 35 years, those typed copies traveled. Friend
              to friend. Vet to grieving owner. Hospice to hospice.
              Edna&apos;s name fell off somewhere along the way. By the
              time Dear Abby printed it in 1994, no one knew where the
              words had come from. The poem had become a kind of folk
              song — owned by everyone, attributed to no one.
            </p>
            <p>
              Edna had no idea any of this was happening. She had married
              Jack Rekhy, lived for years in India where Jack worked as a
              physician, then in Spain, where they ran an olive farm and
              she rescued an injured dog she named Zanussi, after the
              washing machine he was hiding inside. They came back to
              Scotland. Jack developed Alzheimer&apos;s. He died.
            </p>
            <p>
              Then in January 2023, an art historian named Paul
              Koudounaris, who had spent decades trying to find the
              author, finally tracked her down. He called her. He asked
              her if she was the one who had written the Rainbow Bridge.
            </p>
            <p>She said: &ldquo;How on Earth did you find me?&rdquo;</p>
            <p>
              She had no idea, until that phone call, that her words had
              been read by millions of people in their worst hours. She
              is, today, in her eighties, living quietly in Inverness,
              still writing, still surrounded by dogs.
            </p>
            <p>
              She gave the world a small piece of language that has
              helped more people than she will ever know. She did it the
              day after she lost her first dog. She did it because her
              mother told her to try.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            The poem itself
          </h2>
          <div className="space-y-6">
            <p>
              We won&apos;t reproduce the poem in full here. Edna is its
              rightful author and the question of how it should be shared
              belongs to her and her family, not to us. The fullest
              authoritative source is the National Geographic article that
              broke the story in February 2023, and Paul Koudounaris&apos;s
              longer essay through The Order of the Good Death.
            </p>
            <p>
              What we can tell you, in our own words, is what the poem
              says:
            </p>
            <p>
              There is a place. The pets we have lost are there. They are
              well again. They run, eat, are warm, are content. They are
              not gone. They are simply waiting. They miss us the same
              way we miss them. And one day — not today, not tomorrow,
              but eventually, in whatever form <em>eventually</em> takes —
              we will see them again. They will look up. They will know
              us instantly. We will not need to explain anything. And we
              will go on together.
            </p>
            <p>
              About 200 words in the original. Two sides of a sheet of
              notebook paper. A 19-year-old girl writing the day after
              her dog died.
            </p>
            <p>
              That is part of why it has worked, for 65 years now, on so
              many people: it doesn&apos;t try.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            When the poem doesn&apos;t help
          </h2>
          <div className="space-y-6">
            <p>Sometimes it doesn&apos;t.</p>
            <p>
              Sometimes you read it and the meadow feels too clean for
              the kind of mess you&apos;re in. Sometimes the idea of a
              reunion feels like a lie someone is trying to sell you.
              Sometimes you don&apos;t believe in any of it, and the poem
              feels like cold comfort wrapped in soft language.
            </p>
            <p>That is allowed. That is normal.</p>
            <p>
              A grief counselor named Marty Tousley, who has been writing
              about pet loss for 40 years, makes the point that no
              comfort is universal. What helps one person feels false to
              another. The reader gets to decide. If the Rainbow Bridge
              poem doesn&apos;t fit you, set it down. Plenty of people
              who loved their pets just as much as anyone else have never
              found it useful, and they grieve, and they heal, in their
              own way.
            </p>
            <p>
              You are also allowed to find it helpful one day and not
              helpful the next. Grief moves. The thing that comforted you
              on day three may feel like noise on day twelve. Then it
              might come back to you on day forty.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            What people often feel, that they&apos;re afraid to say
          </h2>
          <div className="space-y-6">
            <p>
              After a pet dies, many people carry a quiet shame about
              what they&apos;re feeling. Not just the grief — the{" "}
              <em>texture</em> of it. The specifics that don&apos;t seem
              to belong in a normal grief.
            </p>
            <p>
              Some of these are common. None of them are wrong:
            </p>
            <p>
              You may feel more wrecked than you did when a relative
              died. This is not a moral failing. Your pet was woven into
              every hour of your day. The bond was different — not less,
              just different.
            </p>
            <p>
              You may feel relief along with the sadness, especially
              after a long illness. Relief that they are not suffering.
              Relief that the daily work of caring for a dying animal is
              over. The relief is not betrayal. It is love finishing its
              job.
            </p>
            <p>
              You may feel furious at the vet, or at yourself, or at God,
              or at no one in particular. You may replay the last week
              looking for what you missed. This is what minds do when
              something this big happens. It will quiet down. Slowly.
            </p>
            <p>
              You may feel jealous of strangers walking healthy dogs in
              the park. This is not crazy. It is the most ordinary human
              reaction to loss.
            </p>
            <p>
              You may feel like you can&apos;t tell anyone how bad this
              is, because they won&apos;t get it. Some of them
              won&apos;t. The phrase Marty Tousley uses for this is{" "}
              <em>disenfranchised grief</em> — grief that the surrounding
              world doesn&apos;t quite recognize as legitimate. Pet grief
              has been disenfranchised for a long time. It is becoming
              less so, slowly. But on a Tuesday afternoon at work,
              surrounded by people who didn&apos;t know your dog, it can
              still feel very lonely.
            </p>
            <p>
              None of what you are feeling is too much. None of it is too
              little. None of it means there was something wrong with how
              much you loved them.
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            What might help tonight
          </h2>
          <div className="space-y-6">
            <p>
              You don&apos;t have to do anything tonight. That is the
              most honest sentence on this page.
            </p>
            <p>
              If you want to do something, here are a few small things
              people have found useful:
            </p>
            <p>
              <strong>Light a candle.</strong> Not for any religious
              reason. Just so the house has a small warm point in it. Sit
              with it for a few minutes.
            </p>
            <p>
              <strong>Look at one photo.</strong> Just one. Not the whole
              camera roll. One. Let yourself cry if you want to.
              Don&apos;t, if you don&apos;t.
            </p>
            <p>
              <strong>Write down one specific thing.</strong> The way
              they tilted their head when you used a particular word. The
              spot they always claimed on the couch. One concrete thing.
              Not a eulogy. One sentence.
            </p>
            <p>
              <strong>Make a small image.</strong> This is what we made.
              If you&apos;d like, you can use a free tool we built to
              take one photo of your pet and turn it into a simple
              memorial image you can keep, share, or print. It takes
              about a minute. There is no pressure to use it. It is one
              option among many.
            </p>
            <p>
              <Link
                href="/create"
                className="underline underline-offset-4 hover:no-underline"
                style={{ color: "var(--color-accent-primary)" }}
              >
                Make a memorial for your pet →
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
              If you&apos;d like{" "}
              <Link
                href="/rainbow-bridge/who-wrote-the-rainbow-bridge-poem"
                className="underline underline-offset-4 hover:no-underline"
                style={{ color: "var(--color-accent-primary)" }}
              >
                the longer story of how the Rainbow Bridge poem was
                written
              </Link>
              , we have a fuller page on Edna and Major with the details
              Paul Koudounaris uncovered in 2023.
            </p>
            <p>
              If your dog has just died,{" "}
              <Link
                href="/rainbow-bridge/dogs"
                className="underline underline-offset-4 hover:no-underline"
                style={{ color: "var(--color-accent-primary)" }}
              >
                the dog-specific version of the poem and how to share it
                is here
              </Link>
              .
            </p>
            <p>
              If you want{" "}
              <Link
                href="/rainbow-bridge/short-version"
                className="underline underline-offset-4 hover:no-underline"
                style={{ color: "var(--color-accent-primary)" }}
              >
                a shorter version that fits on a card
              </Link>
              , it&apos;s here.
            </p>
            <p>
              We&apos;re slowly building more pages — for cats, for the
              wider collection of pet loss poems, and for sympathy cards.
              They&apos;ll go up over the coming weeks. If you&apos;d
              like to be told when they&apos;re ready, email
              hannah@rainbow.memorial and just say &ldquo;tell me
              when.&rdquo;
            </p>
          </div>

          <hr
            className="my-14"
            style={{ borderColor: "var(--color-border)" }}
          />

          <footer className="space-y-5 italic">
            <p>
              Written by Hannah Wright, on behalf of Rainbow Memorial.
              We&apos;re not licensed grief counselors. We built this
              site after our own losses and after finding most existing
              pet-grief resources cold or commercial. The voice on this
              page draws from the work of Marty Tousley (
              <a
                href="https://www.griefhealingblog.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:no-underline"
                style={{ color: "var(--color-accent-primary)" }}
              >
                Grief Healing
              </a>
              ), Wallace Sife (Association for Pet Loss and Bereavement),
              and the team at Lap of Love — practitioners we recommend.
            </p>
            <p>
              Edna Clyne-Rekhy&apos;s story follows the reporting of art
              historian Paul Koudounaris (2023), Natasha Daly&apos;s
              article in National Geographic (February 2023), and the
              longer essay published by The Order of the Good Death.
            </p>
            <p>
              If you find anything on this page inaccurate, or that
              doesn&apos;t sit right, please email hannah@rainbow.memorial.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
