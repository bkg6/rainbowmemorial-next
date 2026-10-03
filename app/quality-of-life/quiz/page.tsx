import QualityOfLifeTool from "../../quality-of-life-scale/QualityOfLifeTool";
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

const spec: ArticleSpec = {
  path: "/quality-of-life/quiz",
  title: "Dog Quality of Life Quiz — Five Minutes to See the Week",
  description:
    "A dog quality of life quiz you can take in five minutes. Seven questions, a score out of 70, and a plain reading of what it has meant for other families. Free, no signup, nothing to enter.",
  headline: "Dog Quality of Life Quiz",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "Is this quiz the same as the quality of life test vets use?",
      a: "It uses the same seven areas as the HHHHHMM scale vets and hospice programs use, scored the same way. The wording of the questions is ours, written for a kitchen table rather than an exam room.",
    },
    {
      q: "Does the quiz tell me whether to put my dog down?",
      a: "No, and nothing on this site will. The quiz tells you what kind of week your dog had and what that range has meant for other families. The decision belongs to you and your vet.",
    },
    {
      q: "Do I need to make an account or enter an email?",
      a: "No. Nothing you score here is saved anywhere. If you want to keep it, download the PDF.",
    },
    {
      q: "Can I retake it?",
      a: "Yes, as often as you like. Once a week is what most families settle on. Taking it on a bad night and again on a good morning will give you two honest answers, and both count.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Dog Quality of Life Quiz"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        A dog quality of life quiz is a short set of questions, usually
        seven, that asks how your dog&apos;s week has gone across pain,
        appetite, drinking, cleanliness, mood, movement, and the balance
        of good days to bad. You answer each on a scale, add them up, and
        read what the total has meant for other families. It takes about
        five minutes.
      </p>

      <H2>Before you start</H2>
      <Section>
        <p>
          This is the same seven-question tool as{" "}
          <A href="/quality-of-life-scale">the full scale page</A>, where
          each area is explained in more detail and the history of the
          scale is laid out. It&apos;s here on its own because some people
          don&apos;t want the reading first. They want the questions,
          quickly, and the context after.
        </p>
        <p>
          Answer for the week, not for today. If today was a bad day and
          the rest of the week wasn&apos;t, score the week. If you
          can&apos;t remember the week clearly, that is useful to know too,
          and it&apos;s the reason people start keeping the sheets.
        </p>
      </Section>

      <QualityOfLifeTool intro="Seven questions. Slide each one to where this week has honestly been, from 0 (as bad as it could be) to 10 (a normal good week). Your score updates as you go, and nothing is saved unless you download it." />

      <H2>How to answer each one honestly</H2>
      <Section>
        <p>
          The first question is about pain, and dogs are bad witnesses to
          their own pain. Score it on the breathing when he&apos;s lying
          still, on how long it takes him to get up, and on whether the
          medication the vet gave is still working by the time the next
          dose is due. A dog who pants on the cool floor at night is not
          a seven.
        </p>
        <p>
          Hunger is whether he eats from the bowl without you. Chicken
          from your hand is a four or a five, not a nine, however much of
          it he takes. Hydration is drinking on his own, or being kept
          hydrated with fluids if the vet has you doing that; score what
          is true, not what you wish.
        </p>
        <p>
          Hygiene is the one people skip past. If he can get up and away
          from where he&apos;s been, it&apos;s fine. If you are washing
          him every morning and there are sores starting, it isn&apos;t,
          and he knows it isn&apos;t, because he was house-trained for
          twelve years.
        </p>
        <p>
          Happiness is whether the dog you know is still in there. Head
          up when you come home, interest in the window or the toy or the
          other dog. Mobility is getting up and getting to the bowl and
          the door, with help if he needs it; a dog who wants to move and
          can with a hand under his belly is a five, a dog who no longer
          tries is lower.
        </p>
        <p>
          The last question is the plainest and the one families answer
          least honestly. Count the days of the week. Not the good hours.
          The days. Were there more good ones than bad?
        </p>
      </Section>

      <H2>What the number does and doesn&apos;t mean</H2>
      <Section>
        <p>
          The total is out of 70. Above about 55 is a good week by this
          measure. The forties are mixed. Below the high twenties, most of
          the seven areas are struggling at once. Those four ranges are
          ours. Dr. Villalobos&apos;s original version draws one line, at
          35, as the point above which hospice care is still giving the
          dog an acceptable life.
        </p>
        <p>
          What the number can&apos;t do is tell you what to do. A score is
          a photograph of one week. Four photographs in a row are a story,
          and the story is what you bring to the vet. If you would rather
          tick boxes than move sliders, there is{" "}
          <A href="/quality-of-life/checklist">
            a printable checklist version
          </A>{" "}
          of the same seven areas.
        </p>
      </Section>

      <H2>If the score was low</H2>
      <Section>
        <p>
          Sit with it for a minute. A low score on a quiz you took at
          midnight is not a decision, and it isn&apos;t a failure. It is
          information you now have that you didn&apos;t have ten minutes
          ago. The next thing to do is not to decide anything. It is to
          call the vet tomorrow and say you scored the week and would like
          to talk about what it means for your dog, with the sheet in
          your hand.
        </p>
        <p>
          Some of the people who take this quiz are not before the loss
          but after it, scoring the last weeks from memory to check they
          read them right. If that&apos;s you, I&apos;m sorry. The{" "}
          <A href="/rainbow-bridge">Rainbow Bridge tradition</A> has held a
          lot of people in that exact place since 1959, and it may hold you
          too.
        </p>
      </Section>
    </ArticleShell>
  );
}
