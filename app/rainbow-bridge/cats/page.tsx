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
  path: "/rainbow-bridge/cats",
  title: "Rainbow Bridge Poem for Cats — Written for the Quiet Loss",
  description:
    "The Rainbow Bridge, told for cats. A quieter version of the 1959 tradition for the night a cat dies, with the first night, the days after, and a place for their name.",
  headline: "Rainbow Bridge Poem for Cats",
  datePublished: DATE,
  dateModified: DATE,
  isPartOf: { path: "/rainbow-bridge", name: "The Rainbow Bridge" },
  ogImage: OG_IMAGE_SITE,
  faq: [
    {
      q: "Is the Rainbow Bridge poem for cats too?",
      a: "Yes. It was written about a dog in 1959, but it has been read for cats for as long as it has existed. The version above is told for a cat, because the pictures that help are different: the windowsill, the lap, the chair.",
    },
    {
      q: "Why does losing a cat feel like nobody takes it seriously?",
      a: "Because cat grief is quieter and gets less acknowledged. Nobody saw you walk her every day. The loss is the same size. The people who say less about it are wrong, not you.",
    },
    {
      q: "Can I read this at a burial?",
      a: "Yes. Many people bury a cat in the garden and read it there, or print it and keep it with the collar. There is no wrong way.",
    },
    {
      q: "I had to make the decision. Does the poem still apply?",
      a: "Especially then. The line about no one telling you it is time was written for exactly the person who had to decide.",
    },
    {
      q: "Who wrote the Rainbow Bridge?",
      a: "Edna Clyne-Rekhy, a Scottish teenager, in 1959, after her dog Major died. Her authorship was confirmed in 2023. The version on this page is Rainbow Memorial's retelling for cats, not her text.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Rainbow Bridge Poem for Cats"
      lastUpdatedHuman={DATE_HUMAN}
    >
      <p>
        The Rainbow Bridge poem for cats is the 1959 tradition told for a
        cat rather than a dog: a place where your cat is whole again,
        waiting, until you come. If you are reading this tonight, your cat
        is gone, and you came here for the poem. It is below. You can read
        it as many times as you need.
      </p>

      <div
        className="mt-10 space-y-6"
        style={{ fontFamily: "var(--font-document, var(--font-display))" }}
      >
        <p>There is a house somewhere with a window in the sun, and your cat is in it now.</p>
        <p>
          The pain is gone. The old body works again. If she was thin at the
          end, she is not thin. If she couldn&apos;t jump, she jumps. She
          is warm. She is fed, on time, the right food. There are other
          cats, and she ignores most of them, the way she would.
        </p>
        <p>She sleeps in the sun. She watches the birds. She is not afraid of anything.</p>
        <p>
          But there is one lap she is missing, and one voice, and she knows
          it. Sometimes she sits up, quite still, and looks toward the door
          where the people come in. Then she settles again. Then she looks
          again.
        </p>
        <p>
          One day she looks up and it is you. She knows your step before
          she sees you. She comes, not running, because she never ran for
          anyone, but she comes, and she presses her head into your hand
          the way she did.
        </p>
        <p>
          You will sit down on the floor. She will climb into your lap. She
          will be heavy and warm and herself.
        </p>
        <p>No one will tell you to let go. No one will tell you it is time.</p>
        <p>
          When you both get up, you will go on together, across the bridge,
          and you will not be apart again.
        </p>
      </div>

      <Section>
        <p className="mt-10">
          You can print it. You can read it out loud, to her, tonight, if
          you want to. There is no wrong way to do this.
        </p>
      </Section>

      <H2>The first night</H2>
      <Section>
        <p>
          A cat&apos;s absence is a different shape from a dog&apos;s.
          Nobody saw you walk her every day, so nobody quite knows what
          has gone. You know. The windowsill is empty. The spot on the
          chair is cold. At four in the morning there is no weight on
          your feet and you wake up anyway, because the body learned
          to.
        </p>
        <p>
          Leave the bowl where it is tonight. Leave the bed on the chair.
          Nobody has to decide about any of it yet. If you had to make the
          decision today, you did the thing that love does at the end, and
          it is allowed to feel like the opposite.
        </p>
      </Section>

      <H2>The days after</H2>
      <Section>
        <p>
          People will say less about a cat than they would about a dog,
          and some will say nothing. That is their failing, not a measure
          of her. Say her name at dinner. Tell the story about the time
          she brought the moth in, or sat on the laptop, or chose the one
          guest who hated cats. The name is proof she was here.
        </p>
        <p>
          Marty Tousley, the grief counsellor whose work this site leans
          on, has written about losing her own cat; cat grief is not a
          lesser grief in the literature, only in the small talk. If the
          people around you need help knowing what to say, there is a page
          on{" "}
          <A href="/pet-sympathy">what to say when someone&apos;s pet dies</A>{" "}
          you can send instead of explaining.
        </p>
      </Section>

      <H2>A place for her</H2>
      <Section>
        <p>
          You can{" "}
          <A href="/create">make a page for your cat</A> with the one photo,
          her name, and the years she was with you. It has a permanent
          address. It stays up. People who knew her can be sent the link
          rather than the news. A year from now, on the day, an email
          arrives so you are not the only one who remembers the date.
        </p>
        <p>
          <A href="/create">Make her page →</A>
        </p>
      </Section>

      <H2>About this poem</H2>
      <Section>
        <p>
          The Rainbow Bridge was written in 1959 by Edna Clyne-Rekhy, a
          Scottish teenager, after her Labrador Major died. For most of
          its life it circulated with no name on it, and it was written
          about a dog. The version above is Rainbow Memorial&apos;s own
          telling, for cats, because the pictures that help a cat&apos;s
          person are different from the ones that help a dog&apos;s.
          The{" "}
          <A href="/rainbow-bridge/dogs">version for dogs</A> is on its
          own page, the{" "}
          <A href="/rainbow-bridge">tradition in full</A> is on the main
          page, and the story of{" "}
          <A href="/rainbow-bridge/who-wrote-the-rainbow-bridge-poem">
            who wrote it
          </A>{" "}
          is there too.
        </p>
      </Section>
    </ArticleShell>
  );
}
