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
} from "../../_lib/article";

const spec: ArticleSpec = {
  path: "/quality-of-life/senior-dog",
  title: "Senior Dog Quality of Life Scale — Score the Slow Years",
  description:
    "A senior dog quality of life scale and calculator for the slow decline, when 'she's just getting old' stops being enough. Score weekly, download the PDF, bring it to the vet.",
  headline: "Senior Dog Quality of Life Scale",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "Is there a different scale for senior dogs?",
      a: "The seven areas are the same for any dog at the end of life. What changes with an old dog is the pace. The decline is slow enough that a weekly score matters more, because the weeks blur together.",
    },
    {
      q: "Can I download a senior dog quality of life scale PDF?",
      a: "Yes. Score the week in the tool above and the download button gives you a one-page sheet with the seven scores, the total, the date, and room for notes to bring to the vet.",
    },
    {
      q: "My old dog sleeps all day. Is that a bad score?",
      a: "Old dogs sleep more, and that alone isn't a sign. What the scale asks is whether, when she's awake, she is still eating, still getting up, still glad to see you. Sleeping twenty hours and wagging for the other four is a different week from sleeping twenty hours and not lifting her head.",
    },
    {
      q: "How do I tell old age from something treatable?",
      a: "You can't, from the sofa. That is the vet's job, and it is worth a visit. A lot of what families call 'just old' turns out to be arthritis pain or a thyroid or something else a vet can ease, which changes the score and sometimes the whole picture.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Senior Dog Quality of Life Scale"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        A senior dog quality of life scale scores an old dog&apos;s week
        across seven areas, so that a slow decline becomes something you
        can see instead of something you keep adjusting to. The scale is
        the same one vets use at the end of life. With an older dog, the
        difference is that you score it for months, not weeks.
      </p>

      <H2>&quot;She&apos;s just getting old&quot;</H2>
      <Section>
        <p>
          That is the sentence. You say it the first time she takes the
          stairs one at a time, and again when the walk gets shorter and
          she sleeps through the doorbell. Each time it&apos;s true. And each time it moves the line a little,
          so that by the time you&apos;d have been alarmed a year ago, you
          aren&apos;t, because you got here one small step at a time.
        </p>
        <p>
          This is anticipatory grief, and it has a shape. You start
          mourning her while she is lying at your feet, and you feel
          guilty for it, and the guilt makes you say &quot;she&apos;s
          fine&quot; louder. None of that is wrong. It is what loving an
          old dog is like. It just makes you a poor judge of her week.
        </p>
        <p>
          Numbers don&apos;t adjust. That&apos;s the whole use of them
          here. A week scored at 61 in March and a week scored at 44 in
          August is a line you did not draw with your mood, and it is
          what the{" "}
          <A href="/quality-of-life-scale">full scale page</A> was built
          for. The tool below is the same one. Score this week, download
          the sheet, and put it somewhere you&apos;ll find it next month.
        </p>
      </Section>

      <QualityOfLifeTool intro="For an old dog, score the week, not the day, and be plain about it. 10 is the dog she was at eight years old. 1 is as bad as it could be. The number is for you and your vet, nobody else." />

      <H2>What changes when the decline is slow</H2>
      <Section>
        <p>
          With a sudden illness, a family might score three or four weeks
          and see the answer. With an old dog, you might score forty. Most
          of them will look the same, and that sameness is the point. A
          long flat line of 58s tells you she is old and she is fine. When
          the line starts to bend, you&apos;ll see it bend, and you will
          see it a month before you would have felt it.
        </p>
        <p>
          A few things to watch in the old ones in particular. Mobility
          usually goes first, and a dog who can&apos;t get up on her own
          soon has a hygiene problem too, and the two together are what
          most families name as the week things changed. Appetite tends to
          hold longer in old dogs than in sick ones, which is why
          &quot;but she&apos;s still eating&quot; is such a common and
          such a poor reason to wait.
        </p>
        <p>
          And a lot of what gets called old age in a twelve-year-old is
          arthritis, and arthritis is pain, and pain can be treated. Before
          you decide anything from the score, let the vet look at her. A
          course of the right medication has turned a 40 back into a 55
          for more old dogs than you&apos;d think.
        </p>
      </Section>

      <H2>Small things that move the score</H2>
      <Section>
        <p>
          With an old dog, some of the lines on the scale can be lifted,
          and it is worth knowing which ones before the number tells you
          to despair. Rugs on hard floors, so she can get purchase to
          stand. A ramp to the car, or no more car. A raised bowl if her
          neck hurts to reach down. The bed moved to the ground floor so
          the stairs stop being a daily question. None of these is
          medical, and together they can turn a mobility score of three
          into a six for a year.
        </p>
        <p>
          The one that moves the most is pain control, and that one is the
          vet&apos;s. If her Hurt score is low and she hasn&apos;t been
          examined for it recently, go. An old dog on the right
          medication often comes back to the window and the door, and
          the Happiness line follows the Hurt line up.
        </p>
      </Section>

      <H2>Bringing it to the vet</H2>
      <Section>
        <p>
          Senior dog owners go to the vet more than most, and the
          appointment is often short and the dog is often having an
          unusually good day in the exam room, as dogs do. The sheet
          changes that. Hand over four dated scores and the conversation
          starts where it should, with the months, not with the ten
          minutes on the table.
        </p>
        <p>
          If the fridge is where things get remembered in your house,
          there is{" "}
          <A href="/quality-of-life/chart">
            a printable one-page chart
          </A>{" "}
          with the seven areas and space for four weeks of scores, made
          for exactly that spot.
        </p>
      </Section>

      <H2>The horizon</H2>
      <Section>
        <p>
          The hard part of an old dog is that you know how it ends, and
          you have known for years, and knowing doesn&apos;t help. What
          helps, in my experience of sitting with people after, is having
          been present for the slow years instead of bracing through them.
          The scores are one way to be present. So is the walk, at her
          pace, to the end of the street and back.
        </p>
        <p>
          When the day does come, the people around you will want to help
          and won&apos;t know how, and there is a page you can send them
          on{" "}
          <A href="/pet-sympathy">
            what to say when someone&apos;s dog has died
          </A>
          . And if you want a place for her photo and her fourteen years
          that isn&apos;t a phone, you can{" "}
          <A href="/create">make a page for her</A> when you are ready.
          There is no hurry on that. There is no hurry on any of it, which
          is the one gift the slow years give.
        </p>
      </Section>
    </ArticleShell>
  );
}
