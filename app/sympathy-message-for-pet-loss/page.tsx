import {
  A,
  ArticleShell,
  H2,
  OG_IMAGE_SITE,
  Section,
  buildMetadata,
  type ArticleSpec,
} from "../_lib/article";

const DATE = "2026-10-03";
const DATE_HUMAN = "October 3, 2026";

const spec: ArticleSpec = {
  path: "/sympathy-message-for-pet-loss",
  title: "Sympathy Messages for Pet Loss — Short, True, With the Name",
  description:
    "Sympathy messages for the loss of a pet, sorted by who you are to the person and how they lost the animal. Short enough to text, true enough to write in a card. By a grief counselor.",
  headline: "Sympathy Messages for Pet Loss",
  datePublished: DATE,
  dateModified: DATE,
  isPartOf: { path: "/pet-sympathy", name: "Pet Sympathy" },
  ogImage: OG_IMAGE_SITE,
  faq: [
    {
      q: "What is a good short sympathy message for the loss of a pet?",
      a: "'I'm so sorry about [Name]. I know how much he meant to you.' Use the name. Two sentences is enough, and often better than a paragraph.",
    },
    {
      q: "Should I text or send a card?",
      a: "Text the same day, so they know you know. Send a card in the week after, because a card gets kept. Then check in a month later, when everyone else has stopped.",
    },
    {
      q: "What should I not say?",
      a: "'It was just a dog.' 'You can get another one.' 'At least he lived a long life.' 'He's in a better place.' 'Everything happens for a reason.' All of them are meant kindly, and all of them close the door.",
    },
    {
      q: "What do I say if they had to put the pet down?",
      a: "Say they did the kind thing. 'You gave her a peaceful end when she needed it. That was love.' They are asking themselves whether it was, and you can answer.",
    },
    {
      q: "What if I never met the pet?",
      a: "That doesn't matter. 'I never met [Name], but I know what she was to you, and I'm sorry' is a complete and honest message.",
    },
  ],
};

type Group = { heading: string; note: string; messages: string[] };

const GROUPS: Group[] = [
  {
    heading: "The one to send today",
    note: "A text, the day you hear. Short. The name in it.",
    messages: [
      "I'm so sorry about [Name]. I know how much she meant to you.",
      "I just heard about [Name]. I'm so sorry. I'm here whenever you want to talk about him, or not talk.",
      "Thinking of you tonight. [Name] was a good one.",
      "There's nothing I can say that makes this smaller. I'm sorry. I loved [Name] too.",
    ],
  },
  {
    heading: "For a close friend",
    note: "You knew the animal. Say the thing you remember.",
    messages: [
      "I keep thinking about [Name] stealing the toast off my plate that Christmas. I'm so sorry he's gone. He was the best part of coming to your house.",
      "She was yours, completely. Anyone who saw you two together knew it. I'm sorry, and I'm here for the quiet weeks after, not just this one.",
      "I'm sorry. I'm going to miss him too. Can I bring dinner Thursday? You don't have to be good company.",
      "[Name] had the best life a dog could have, and that was because of you. I'm so sorry it's over.",
    ],
  },
  {
    heading: "For a colleague or someone you don't know well",
    note: "Keep it short. Don't perform a grief you didn't feel.",
    messages: [
      "I'm sorry to hear about [Name]. Losing a pet is a real loss, and I hope people around you are treating it like one.",
      "I'm so sorry about your cat. Take whatever time you need this week; the rest of us have it covered.",
      "I never met [Name], but I know what he was to you. I'm sorry.",
    ],
  },
  {
    heading: "When they had to make the decision",
    note: "They are asking themselves if it was right. Answer.",
    messages: [
      "You gave [Name] a peaceful end when she needed one. That was the kindest thing anyone did for her, and it was you.",
      "Choosing the day so he didn't have to suffer through it is the hardest kind of love there is. I'm sorry it had to be you, and I'm glad it was.",
      "I know you're second-guessing the timing. From the outside, you waited exactly as long as love could, and not a day past what [Name] could bear.",
    ],
  },
  {
    heading: "For someone whose cat died",
    note: "Cat grief is quieter and gets less acknowledged. Acknowledge it.",
    messages: [
      "I'm so sorry about [Name]. I know people say less when it's a cat. She was family, and the house will be too quiet for a while.",
      "He chose you, which cats don't do lightly. I'm sorry he's gone.",
      "Thinking of you and of the empty spot on the windowsill. I'm sorry.",
    ],
  },
  {
    heading: "For a child's pet",
    note: "Write to the child, plainly, with the real words.",
    messages: [
      "I'm sorry [Name] died. He was a very good dog, and you were a very good friend to him. It's okay to be sad for as long as you need.",
      "I know [Name] was your best friend. I'm sad too. Would you like to tell me your favourite thing about her sometime?",
    ],
  },
  {
    heading: "For an older person, or someone who lives alone",
    note: "The pet may have been the one they talked to every day.",
    messages: [
      "I'm so sorry about [Name]. I know he was your company every day, and the house won't feel right without him. I'll call Sunday.",
      "She was with you through a lot of years. I'm sorry. Can I come by this week? We don't have to talk about it unless you want to.",
    ],
  },
  {
    heading: "A month later",
    note: "The one almost nobody sends, and the one most remembered.",
    messages: [
      "It's been about a month since [Name]. I've been thinking about you. How are the evenings?",
      "No reason for this message except that I still think about [Name] and I figured you do too, every day.",
      "I know everyone's moved on and you haven't. That's how it should be. I'm still here.",
    ],
  },
  {
    heading: "On the anniversary",
    note: "They will remember the date. Be the other person who does.",
    messages: [
      "A year today since [Name]. I remember. I hope you're being gentle with yourself.",
      "Thinking of [Name] today, and of you. Still the best dog I ever met.",
    ],
  },
];

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Sympathy Messages for Pet Loss"
      lastUpdatedHuman={DATE_HUMAN}
    >
      <p>
        A sympathy message for pet loss does three things: it uses the
        animal&apos;s name, it says one true thing about them, and it says
        you are sorry. The messages below are sorted by who you are to the
        person and how they lost the pet. Each is short enough to text and
        true enough to write in a card.
      </p>

      <H2>Before you pick one</H2>
      <Section>
        <p>
          The person you are writing to is afraid of one thing more than
          the sadness, and it is that the world will treat the loss as
          small. Every message below is built against that. The name is in
          it. The loss is called a loss. Nothing in it suggests they should
          be over it, or that another animal would fix it.
        </p>
        <p>
          Swap [Name] for the animal&apos;s name and change anything that
          isn&apos;t true for you. A borrowed line that is true beats an
          original one that isn&apos;t.
        </p>
      </Section>

      {GROUPS.map((g) => (
        <div key={g.heading}>
          <H2>{g.heading}</H2>
          <Section>
            <p style={{ color: "var(--color-text-secondary)" }}>{g.note}</p>
            <ul className="space-y-4">
              {g.messages.map((m) => (
                <li
                  key={m}
                  className="pl-4"
                  style={{
                    borderLeft: "2px solid var(--color-accent-soft)",
                    fontFamily: "var(--font-document, var(--font-display))",
                  }}
                >
                  {m}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      ))}

      <H2>What not to write</H2>
      <Section>
        <p>
          &quot;It was just a dog.&quot; &quot;You can always get another
          one.&quot; &quot;At least she lived a long life.&quot;
          &quot;He&apos;s in a better place.&quot; &quot;Everything
          happens for a reason.&quot; People who have lost a pet can
          usually tell you, years later, exactly who said each of these to
          them. Every one is meant kindly and every one closes the door.
          If you don&apos;t know what to say, say the name and that you
          are sorry, and stop there.
        </p>
      </Section>

      <H2>Where to put it</H2>
      <Section>
        <p>
          A text the same day, so they know you know. Then a card, because
          cards get kept; there are{" "}
          <A href="/pet-bereavement-card">
            three free printable pet bereavement cards
          </A>{" "}
          on this site with room inside for one of these messages in your
          own hand. If the person might want something to read, the{" "}
          <A href="/poems/dog-passed-away">
            poems written for the day a dog passes
          </A>{" "}
          are free to print and fold inside.
        </p>
        <p>
          And if you want to give something that lasts past the drawer the
          card ends up in, you can{" "}
          <A href="/create">make a memorial page in their pet&apos;s name</A>{" "}
          and send the link. One photo, the name, the years. It stays up,
          and a year from now an email reaches them on the day so they are
          not the only one who remembers it.
        </p>
        <p>
          The rest of what helps, the meal and the month-later check-in
          and the things to leave unsaid, is on the main page about{" "}
          <A href="/pet-sympathy">pet sympathy</A>.
        </p>
      </Section>
    </ArticleShell>
  );
}
