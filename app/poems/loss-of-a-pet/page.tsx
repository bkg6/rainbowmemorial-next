import {
  A,
  ArticleShell,
  H2,
  OG_IMAGE_SITE,
  Section,
  buildMetadata,
  type ArticleSpec,
} from "../../_lib/article";

const DATE = "2026-10-03";
const DATE_HUMAN = "October 3, 2026";

const spec: ArticleSpec = {
  path: "/poems/loss-of-a-pet",
  title: "Loss of a Pet Poems — Original, for Any Animal, Free to Read",
  description:
    "Original poems for the loss of a pet, written for any animal: the first night, the empty bowl, the one for a child to read, the one for the burial, and the one for a year on.",
  headline: "Loss of a Pet Poems",
  datePublished: DATE,
  dateModified: DATE,
  isPartOf: { path: "/poems-for-pet-loss", name: "Pet Loss Poems" },
  ogImage: OG_IMAGE_SITE,
  faq: [
    {
      q: "Are these poems for dogs, cats, or any pet?",
      a: "Any pet. They are written without naming a species, so they read true for a cat, a rabbit, a horse, a bird, or a dog. There are separate pages for dogs and for the Rainbow Bridge if you want something more specific.",
    },
    {
      q: "Can I read one at a burial or a small service?",
      a: "Yes. The fourth poem was written for that. Print it, read it in the garden, hand it to whoever is there. No credit needed.",
    },
    {
      q: "Is there one short enough for a card or a post?",
      a: "The first and the last are both under sixty words. Either fits inside a card or under a photo.",
    },
    {
      q: "Who wrote these?",
      a: "Hannah Wright, for Rainbow Memorial. They are original and not adapted from other poems. You can print or share them freely.",
    },
  ],
};

const POEMS: Array<{ title: string; note: string; lines: string[] }> = [
  {
    title: "The first night",
    note: "Short. For tonight, or for the card.",
    lines: [
      "The house has a shape where you used to be.",
      "I walk around it. I will walk around it for a while.",
      "You were small, and you are everywhere.",
    ],
  },
  {
    title: "The bowl",
    note: "For the morning after, when the ordinary things are the hardest.",
    lines: [
      "I filled the bowl this morning. My hands did it before I could stop them.",
      "I stood there with the bag in one hand and the day in the other, and I understood that nobody was coming.",
      "I left it. I don't know for how long. Nobody is going to tell me how long.",
      "You were fed every morning of your life. That was the one promise I could keep, and I kept it.",
    ],
  },
  {
    title: "For a child to read",
    note: "Plain words. Children do better with the real ones.",
    lines: [
      "You died, and I am sad.",
      "You were my friend. You were soft. You knew my name.",
      "I am going to keep your picture. I am going to say your name.",
      "You were a good one. I was lucky it was you.",
    ],
  },
  {
    title: "At the burial",
    note: "For the garden, the ashes, the small service.",
    lines: [
      "We are putting you here, in the ground you knew, under the tree you sat beneath in summer.",
      "You were ours. You were never ours. You were your own, and you chose to stay.",
      "We are not leaving you here. We are leaving a place we can come to.",
      "Go on, then. We'll be along.",
    ],
  },
  {
    title: "A year on",
    note: "For the anniversary. Short, for under a photo.",
    lines: [
      "A year. The house has learned your absence and I have not.",
      "People stopped asking in the spring.",
      "I still say your name to the empty room, and the room still knows it.",
    ],
  },
];

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell spec={spec} h1="Loss of a Pet Poems" lastUpdatedHuman={DATE_HUMAN}>
      <p>
        These are original poems for the loss of a pet, written without
        naming a species, so they read true whether you lost a cat, a dog,
        a rabbit, a bird or a horse. There is one for the first night, one
        for the bowl the next morning, one plain enough for a child, one
        for the burial, and one for a year on. They are free to print,
        read aloud, or put inside a card.
      </p>

      {POEMS.map((p) => (
        <div key={p.title}>
          <H2>{p.title}</H2>
          <p className="mb-5" style={{ color: "var(--color-text-secondary)" }}>
            {p.note}
          </p>
          <div
            className="space-y-5"
            style={{ fontFamily: "var(--font-document, var(--font-display))" }}
          >
            {p.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      ))}

      <H2>Which one to use</H2>
      <Section>
        <p>
          The first and the last are short enough for a card or for the
          caption under a photo. The bowl poem is for you, in the kitchen,
          on the second morning; most people don&apos;t read it to anyone.
          The child&apos;s poem can be read by a child or to one, and it
          uses the word died on purpose, because children do better with
          the real word than with a phrase that sounds like the animal
          might come back. The burial poem is for a small service, in the
          garden or at the crematorium, read by whoever can get through
          it.
        </p>
        <p>
          If you lost a dog specifically, there are{" "}
          <A href="/poems/dog-passed-away">
            poems written for a dog who has passed away
          </A>
          , including one for the people who had to make the decision.
          And the oldest comfort of all, the{" "}
          <A href="/rainbow-bridge">Rainbow Bridge</A>, has its own pages
          here, told for dogs and told for cats.
        </p>
      </Section>

      <H2>A place for the name</H2>
      <Section>
        <p>
          Many families{" "}
          <A href="/create">make a page for their pet</A> and put one of
          these poems on it, beneath the photo and the name and the years.
          The page has a permanent address and stays up. A year from now,
          on the day, an email arrives so you don&apos;t have to be the
          only one who remembers the date.
        </p>
        <p>
          <A href="/create">Make their page →</A>
        </p>
      </Section>

      <H2>About these poems</H2>
      <Section>
        <p>
          Hannah Wright wrote them for Rainbow Memorial. They are original
          and not adapted from anything else, and you can print, share, or
          read them at a service without credit. The wider collection is
          on the{" "}
          <A href="/poems-for-pet-loss">pet loss poems</A> page, and for
          longer reading on the grief itself, Wallace Sife&apos;s{" "}
          <em>The Loss of a Pet</em>, through the{" "}
          <A href="https://www.aplb.org" external>
            Association for Pet Loss and Bereavement
          </A>
          , is the book counsellors hand people.
        </p>
      </Section>
    </ArticleShell>
  );
}
