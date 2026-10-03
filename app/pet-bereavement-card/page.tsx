import PdfButton from "../_lib/PdfButton";
import {
  A,
  ArticleShell,
  H2,
  OG_IMAGE_SITE,
  Section,
  buildMetadata,
  type ArticleSpec,
} from "../_lib/article";
import { CARDS } from "./cards";

const DATE = "2026-10-03";
const DATE_HUMAN = "October 3, 2026";

const spec: ArticleSpec = {
  path: "/pet-bereavement-card",
  title: "Pet Bereavement Card — Free Printable, and What to Write",
  description:
    "Three free printable pet bereavement cards, written by a grief counselor, and a plain guide to what to write inside one. No signup. Print at home, fold, sign.",
  headline: "Pet Bereavement Card",
  datePublished: DATE,
  dateModified: DATE,
  isPartOf: { path: "/pet-sympathy", name: "Pet Sympathy" },
  ogImage: OG_IMAGE_SITE,
  faq: [
    {
      q: "What do you write in a pet bereavement card?",
      a: "The pet's name, one true sentence about them, and that you are sorry. 'I'm so sorry Biscuit is gone. I'll never forget him stealing the sandwich off the counter.' That is a whole card. Avoid 'he's in a better place' and 'at least he lived a long life.'",
    },
    {
      q: "Is it strange to send a card when someone's pet dies?",
      a: "No. It is one of the kindest things you can do, and most people who have lost a pet remember exactly who sent a card and who said nothing. A card says the loss was real.",
    },
    {
      q: "Can a vet practice use these cards?",
      a: "Yes. Print as many as you need. Many practices send a card after a euthanasia appointment; the second card here was written for that.",
    },
    {
      q: "How soon should I send it?",
      a: "Within the week. And if you missed the week, send it anyway. A card that arrives a month later, when everyone else has gone quiet, often means more than the ones that came in the first few days.",
    },
    {
      q: "Do I need to pay or sign up to download?",
      a: "No. Click the button, the PDF downloads, print it double-sided and fold it. There is no account and no email asked for.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell spec={spec} h1="Pet Bereavement Card" lastUpdatedHuman={DATE_HUMAN}>
      <p>
        A pet bereavement card is a sympathy card written for the death of
        an animal rather than a person. The ones below are free to print at
        home, fold in half, and sign. Each has a line on the front and a
        short printed message inside, with the left side left blank for
        what you want to say in your own hand.
      </p>

      <H2>Three cards, free to print</H2>
      <Section>
        <p>
          Each card is one sheet of letter paper, printed on both sides and
          folded down the middle. The inside message is short on purpose.
          The card is a frame; your handwriting is the card.
        </p>
      </Section>
      <div className="my-8 space-y-5">
        {CARDS.map((c) => (
          <div
            key={c.id}
            className="p-5 md:p-7"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--color-text-tertiary)",
              }}
            >
              Card {c.id + 1} · {c.forWhom}
            </p>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                lineHeight: 1.2,
              }}
            >
              {c.front}
            </p>
            <div
              className="mt-4 space-y-2"
              style={{
                borderLeft: "2px solid var(--color-accent-soft)",
                paddingLeft: 14,
              }}
            >
              {c.inside.map((line) => (
                <p key={line} style={{ fontSize: 16 }}>
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-5">
              <PdfButton kind="card" variant={c.id} label="Download this card (PDF)" />
            </div>
          </div>
        ))}
      </div>

      <H2>What to write inside</H2>
      <Section>
        <p>
          The pet&apos;s name, first. Most sympathy cards never use it, and
          the name is the thing the person is afraid everyone will stop
          saying. Then one true sentence about the animal, something you
          actually remember: the way he leaned on your leg, the sound she
          made at the window, the time he ate the birthday cake. Then that
          you are sorry. That is the whole card, and it is better than a
          page.
        </p>
        <p>
          If you need more than that, there is a longer page of{" "}
          <A href="/sympathy-message-for-pet-loss">
            sympathy messages for pet loss
          </A>
          , sorted by who you are to the person and how they lost the
          animal. Copy one, or use it to find your own words.
        </p>
        <p>
          Leave out &quot;he&apos;s in a better place,&quot; &quot;at
          least she lived a long life,&quot; and anything about getting
          another one. They are meant kindly and they land as dismissal.
          If the family had to make the decision, say they did the kind
          thing. They are asking themselves whether they did, and your
          card can answer.
        </p>
      </Section>

      <H2>If you are a vet practice</H2>
      <Section>
        <p>
          A card from the practice after a euthanasia appointment is one of
          the things families mention most, years later. Print the second
          card above in bulk. Have the vet who was in the room sign it, and
          add one line about the animal by name. It takes a minute and it
          is remembered for a decade.
        </p>
      </Section>

      <H2>A card that stays up</H2>
      <Section>
        <p>
          Paper cards get kept in a drawer. Some people also want to give
          something the family can open on their phone a year from now.
          You can{" "}
          <A href="/create">make a memorial page for someone else&apos;s pet</A>{" "}
          with one photo, the name, and the years, and send them the link
          inside the card. It has a permanent address. On the anniversary,
          an email arrives for them so they are not the only one who
          remembers the date.
        </p>
        <p>
          <A href="/create">Make a page in their pet&apos;s name →</A>
        </p>
      </Section>

      <H2>More for the days after</H2>
      <Section>
        <p>
          If the person you are writing to might want something to read,
          there are{" "}
          <A href="/poems-for-pet-loss">original poems for pet loss</A> on
          this site, free to print and tuck inside the card. And the wider
          page on{" "}
          <A href="/pet-sympathy">
            what to say, send and do when a pet dies
          </A>{" "}
          covers the meal, the text, the check-in a month later, which is
          the one most people forget.
        </p>
      </Section>
    </ArticleShell>
  );
}
