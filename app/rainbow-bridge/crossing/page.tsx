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
  path: "/rainbow-bridge/crossing",
  title: "Crossing the Rainbow Bridge — What It Means, How to Say It",
  description:
    "What 'crossing the Rainbow Bridge' means, where the phrase comes from, how to use it when you tell people your pet has died, and when a plainer sentence is kinder.",
  headline: "Crossing the Rainbow Bridge",
  datePublished: DATE,
  dateModified: DATE,
  isPartOf: { path: "/rainbow-bridge", name: "The Rainbow Bridge" },
  ogImage: OG_IMAGE_SITE,
  faq: [
    {
      q: "What does it mean when a pet crosses the Rainbow Bridge?",
      a: "It means the pet has died. The phrase comes from a 1959 prose poem that imagines a meadow where pets wait, healthy again, until their person arrives, and the two cross a bridge together. 'Crossed the Rainbow Bridge' is the gentlest way English has found to say a pet is gone.",
    },
    {
      q: "Who came up with the Rainbow Bridge?",
      a: "Edna Clyne-Rekhy, a Scottish teenager, wrote it in 1959 after her dog Major died. It circulated anonymously for decades. Her authorship was confirmed in 2023.",
    },
    {
      q: "Is it only for dogs?",
      a: "No. It was written about a dog, but it is used for cats, horses, rabbits, birds, any animal someone loved. There is a version on this site written for cats.",
    },
    {
      q: "Is it religious?",
      a: "No. It belongs to no tradition. Religious and non-religious people use it, and nobody has to believe in the meadow for the sentence to do its job.",
    },
    {
      q: "Can I say it about a pet that was euthanized?",
      a: "Yes. 'We helped Max cross the Rainbow Bridge this morning' is one of the most common ways families tell people, and it carries the decision inside it without having to explain.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Crossing the Rainbow Bridge"
      lastUpdatedHuman={DATE_HUMAN}
    >
      <p>
        Crossing the Rainbow Bridge means a pet has died. The phrase comes
        from a short prose poem written in 1959, which imagines a meadow
        where animals wait, whole again, until the person they loved
        arrives, and the two of them cross a bridge together. People use
        it because it says the hardest thing without the hardest word.
      </p>

      <H2>Why people say it</H2>
      <Section>
        <p>
          You have to tell people. The vet&apos;s receptionist, your
          sister, the group chat, the neighbour who always asked after
          him. And the sentence &quot;my dog died this morning&quot; is
          true and almost impossible to type. So people reach for the one
          English has made for this: he crossed the Rainbow Bridge.
        </p>
        <p>
          It works because everyone knows what it means and nobody has to
          say the word. It also carries something the plain sentence
          doesn&apos;t, which is a picture: not a body on a blanket at the
          vet, but a meadow, and a dog running in it. On the first night
          that picture is worth a great deal.
        </p>
      </Section>

      <H2>Where it comes from</H2>
      <Section>
        <p>
          In 1959 a Scottish teenager named Edna Clyne-Rekhy lost her
          Labrador, Major, and wrote a page about where she hoped he had
          gone. She kept it. Decades later copies started circulating
          without her name on them, printed on cards at vet clinics and
          shared on the early internet, and for most of its life the
          Rainbow Bridge poem was &quot;author unknown.&quot; Her
          authorship was traced and confirmed in 2023. The{" "}
          <A href="/rainbow-bridge/who-wrote-the-rainbow-bridge-poem">
            full story of who wrote it
          </A>{" "}
          is on its own page.
        </p>
        <p>
          The bridge itself is older than the poem; rainbows as a crossing
          between worlds appear in Norse myth, the Bifrost, and in other
          traditions. But the pet version, the meadow and the waiting and
          the running, is hers, and it is the one everyone means.
        </p>
      </Section>

      <H2>How to tell people</H2>
      <Section>
        <p>
          There is no wrong way, but a few shapes come up again and again,
          and they help because you don&apos;t have to invent one at the
          worst moment.
        </p>
        <p>
          For the group chat or the post: &quot;Biscuit crossed the
          Rainbow Bridge this morning, at home, with us. Fourteen years.
          He was the best of us.&quot; One line of fact, one line of
          love. Nobody needs the medical details and you don&apos;t have
          to give them.
        </p>
        <p>
          If you made the decision: &quot;We helped Luna cross the Rainbow
          Bridge today. She was tired and we didn&apos;t want her to
          hurt.&quot; The word &quot;helped&quot; says everything the
          word &quot;euthanasia&quot; says, gently, and most people will
          understand it without asking.
        </p>
        <p>
          For a child: use the real word as well. &quot;Max died today.
          Some people say he crossed the Rainbow Bridge, which is a way of
          saying he isn&apos;t in pain anymore and we&apos;ll always
          remember him.&quot; Children do better with &quot;died&quot;
          than with a phrase alone, because a phrase alone can sound like
          he might come back.
        </p>
      </Section>

      <H2>When a plainer sentence is kinder</H2>
      <Section>
        <p>
          Not everyone can hear it. Some people, on the first night, find
          the meadow too sweet and the running dog too far from the body
          they just held, and for them &quot;he died&quot; is the only
          sentence that feels honest. If that is you, say that. The
          Rainbow Bridge is a gift and not a rule, and plenty of people
          who could not stand it in the first week find it is the thing
          they want on the first anniversary.
        </p>
        <p>
          The same goes for what you say to someone else. If you are
          writing to a friend and don&apos;t know how they feel about the
          poem, use the name and the plain word. There is a page on{" "}
          <A href="/pet-sympathy">what to say when someone&apos;s pet dies</A>{" "}
          for the rest.
        </p>
      </Section>

      <H2>Reading it</H2>
      <Section>
        <p>
          If you came here for the poem itself, there is a{" "}
          <A href="/rainbow-bridge/dogs">version written for dogs</A>, a{" "}
          <A href="/rainbow-bridge/cats">version written for cats</A>, and{" "}
          <A href="/rainbow-bridge/short-version">a short version</A> for a
          card or a post. The{" "}
          <A href="/rainbow-bridge">main Rainbow Bridge page</A> has the
          tradition in full.
        </p>
      </Section>

      <H2>A place on this side of the bridge</H2>
      <Section>
        <p>
          The meadow is where you hope they are. A memorial page is where
          you can go. Many families{" "}
          <A href="/create">make a page with the one photo and the name</A>{" "}
          the same week, so there is somewhere to send people instead of
          explaining, and a year from now an email arrives on the day so
          you don&apos;t have to be the only one who remembers it.
        </p>
        <p>
          <A href="/create">Make their page →</A>
        </p>
      </Section>
    </ArticleShell>
  );
}
