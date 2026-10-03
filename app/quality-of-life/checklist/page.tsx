import PdfButton from "../_lib/PdfButton";
import {
  A,
  ArticleShell,
  CLUSTER_DATE,
  CLUSTER_DATE_HUMAN,
  H2,
  Section,
  buildMetadata,
  type ArticleSpec,
} from "../_lib/article";
import { CHECKLIST } from "./items";

const spec: ArticleSpec = {
  path: "/quality-of-life/checklist",
  title: "Dog Quality of Life Checklist — Printable, Seven Areas",
  description:
    "A dog quality of life checklist you can print and fill in once a week. Seven areas, plain questions, space for what you noticed. Written by a grief counselor, not a listicle.",
  headline: "Dog Quality of Life Checklist",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "How many unchecked boxes mean it's time?",
      a: "There is no number. The checklist is for seeing a pattern across weeks, not for scoring a verdict. If you want a total you can compare week to week, the scored version of the scale gives you one out of 70.",
    },
    {
      q: "What's the difference between this and the quality of life scale?",
      a: "The scale scores each of the seven areas from 1 to 10 and gives a total. The checklist is yes-or-no, with room to write what you saw. Some people prefer the boxes because a number feels like too much certainty. They measure the same seven things.",
    },
    {
      q: "Should I fill it in every day?",
      a: "Weekly is enough for a slow decline. During a hard stretch some families do it daily so a bad night doesn't colour the whole week. Date each sheet and keep them together.",
    },
    {
      q: "Can I use this for a cat?",
      a: "The seven areas come from a scale written for both dogs and cats, so yes, with the wording adjusted. A cat version of this checklist is coming.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Dog Quality of Life Checklist"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        A dog quality of life checklist is a short list of yes-or-no
        questions across the seven areas vets watch at the end of a
        dog&apos;s life: hurt, hunger, hydration, hygiene, happiness,
        mobility, and whether the good days still outnumber the bad. You
        fill it in weekly, date it, and keep the sheets so the weeks can be
        compared.
      </p>

      <H2>Why a checklist and not a feeling</H2>
      <Section>
        <p>
          When a dog is declining slowly, your sense of how she&apos;s
          doing gets worn smooth. You adjust to the limp, then to the
          slower stairs, then to carrying her up them, and each change is
          small enough that it never feels like the one that matters.
          Then someone who hasn&apos;t seen her in two months comes over,
          and their face tells you what you couldn&apos;t.
        </p>
        <p>
          A checklist is that visitor&apos;s face, on paper, every week.
          It asks the same plain questions each time, so the answer
          can&apos;t drift with your mood. If you would rather have a
          number than boxes,{" "}
          <A href="/quality-of-life-scale">
            the scored version of this same list
          </A>{" "}
          gives you a total out of 70 and a sheet to download. Both come
          from the same source, which is covered further down.
        </p>
      </Section>

      <H2>The checklist</H2>
      <Section>
        <p>
          Tick what was true this week. Leave what wasn&apos;t. Under each
          area, write one line about what you actually saw, because in a
          month that line will tell you more than the ticks.
        </p>
      </Section>
      <div
        className="my-8 p-5 md:p-8"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
        }}
      >
        <p
          className="mb-6"
          style={{ color: "var(--color-text-secondary)", fontSize: 15 }}
        >
          Week of ____________________
        </p>
        <div className="space-y-7">
          {CHECKLIST.map((item) => (
            <div key={item.label}>
              <h3 className="mb-2" style={{ fontSize: 18 }}>
                {item.label}
              </h3>
              <ul className="space-y-2">
                {item.checks.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-block shrink-0"
                      style={{
                        width: 14,
                        height: 14,
                        border: "1.5px solid var(--color-text-primary)",
                        borderRadius: 3,
                      }}
                    />
                    <span style={{ fontSize: 16 }}>{c}</span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-3"
                style={{
                  color: "var(--color-text-tertiary)",
                  fontSize: 14,
                  borderBottom: "1px solid var(--color-border)",
                  paddingBottom: 6,
                }}
              >
                Noticed this week:
              </p>
            </div>
          ))}
        </div>
        <PdfButton
          kind="checklist"
          items={CHECKLIST}
          label="Download the printable checklist"
        />
        <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
          One page, letter size, no signup. Print a few and keep them on the
          fridge.
        </p>
      </div>

      <H2>Filling it in honestly</H2>
      <Section>
        <p>
          The boxes are easy to tick and hard to tick truthfully, and the
          mistakes families make are the same ones every time. Under
          Hurt, people tick &quot;breathing is easy&quot; because he
          isn&apos;t gasping, when the honest test is whether you can hear
          him from the next room while he&apos;s lying still. Under
          Hunger, people tick &quot;ate on his own&quot; when what
          happened was chicken from a palm. That is a kindness, and it is
          also not the bowl.
        </p>
        <p>
          Under Happiness, the temptation is to tick for the one good
          afternoon. Ask instead whether the dog you know showed up on
          most days this week. Under Mobility, a dog who can stand with a
          hand under his belly and wants to is doing better than a dog
          who stands on his own and doesn&apos;t want to go anywhere, and
          the boxes are written to catch that.
        </p>
        <p>
          The last section is the hardest to be honest about and the one
          vets ask about first. A good morning followed by a bad night is
          a bad day. Count the whole day. If you find yourself arguing
          with the box, write down what happened instead and let the
          sheet hold the argument for you.
        </p>
      </Section>

      <H2>How to read it after a few weeks</H2>
      <Section>
        <p>
          One sheet tells you about one week, and one week can be
          misleading either way. Three sheets start to show a direction.
          Lay them side by side and look at which boxes stopped being
          ticked and when. A dog who lost the hunger boxes in week one and
          the mobility boxes in week three is telling you something that
          no single week could.
        </p>
        <p>
          Pay particular attention to the last section. The good-days
          question is the one hospice vets ask first, and it is the one
          families answer least honestly, because a good afternoon can
          feel like a good day. Count the whole day. Count the night.
        </p>
        <p>
          Bring the sheets to the vet. A vet who sees four dated sheets
          can tell you what the pattern means for this dog&apos;s
          condition in a way they can&apos;t from memory, and it moves the
          conversation from &quot;how is she doing?&quot; to &quot;here is
          what the next month probably looks like.&quot; If the vet visit
          is the main reason you&apos;re filling this in, there is a
          version written for exactly that,{" "}
          <A href="/quality-of-life/questionnaire">
            a questionnaire to fill in the night before the appointment
          </A>
          .
        </p>
      </Section>

      <H2>Where these seven areas come from</H2>
      <Section>
        <p>
          The seven areas are Dr. Alice Villalobos&apos;s HHHHHMM scale,
          which she developed for her hospice program, Pawspice, and
          published in 2007 in <em>Canine and Feline Geriatric Oncology</em>
          . Vets around the world use it. Her version scores each area out
          of ten. This checklist keeps her areas and replaces the numbers
          with plain yes-or-no questions, for people who find a score too
          clinical for what they&apos;re doing at the kitchen table.
        </p>
      </Section>

      <H2>If the checklist is already in the past tense</H2>
      <Section>
        <p>
          Some people find this page after, looking back through the
          weeks to check they read them right. If that&apos;s you, you
          did. The fact that you were keeping a list at all says you were
          paying attention. There are{" "}
          <A href="/poems-for-pet-loss">
            poems families sometimes read at the end
          </A>
          , and one of them is for the people who had to decide.
        </p>
      </Section>
    </ArticleShell>
  );
}
