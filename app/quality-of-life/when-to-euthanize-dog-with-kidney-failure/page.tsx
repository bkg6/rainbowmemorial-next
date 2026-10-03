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
  path: "/quality-of-life/when-to-euthanize-dog-with-kidney-failure",
  title: "When to Euthanize a Dog With Kidney Failure — A Way to See",
  description:
    "When to euthanize a dog with kidney failure: how families watch the weeks, which of the seven areas kidney disease tends to touch first, and how to bring the pattern to the vet.",
  headline: "When to Euthanize a Dog With Kidney Failure",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "How long can a dog live with kidney failure?",
      a: "That depends on the stage, the cause, and how the dog responds to fluids and diet, and it is a question for your vet, who has the blood values. Some dogs live comfortably for a long time with managed chronic kidney disease. Some decline over weeks. The scale is for seeing which is happening.",
    },
    {
      q: "Which signs matter most with kidney failure?",
      a: "Families most often name appetite and drinking, because the kidneys affect both directly. Nausea that stops a dog eating, and thirst that no amount of water seems to satisfy, are the two that change the week. Mobility and hygiene often follow as the dog weakens.",
    },
    {
      q: "Should I keep giving fluids at home?",
      a: "Ask your vet. Subcutaneous fluids help many dogs feel better for a long time. The question to ask is whether the fluids are still giving her good days or only more days, and your vet can usually tell you honestly.",
    },
    {
      q: "Does this apply to cats with kidney disease?",
      a: "The seven areas apply to cats too, and kidney disease is the most common end-of-life condition in older cats. This page is written for dogs. A cat version is coming.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="When to Euthanize a Dog With Kidney Failure"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        When to euthanize a dog with kidney failure is decided the way it
        is for any slow illness: by the weeks, scored and compared, and
        by a vet who knows the disease. Kidney failure tends to show up
        first in appetite and drinking, which is why those two lines on
        the quality of life scale do most of the talking.
      </p>

      <H2>What kidney failure does to a week</H2>
      <Section>
        <p>
          I won&apos;t explain the disease. Your vet has her blood work
          and will tell you what stage she is at and what that means. What
          I can tell you is what families describe, because it is the same
          few things most of the time.
        </p>
        <p>
          The water bowl is the first thing. She drinks and drinks and it
          doesn&apos;t seem to help, and then she is up in the night to go
          out, and then there are accidents from a dog who never had them.
          Then the food. The kidneys make her feel sick, and a dog who
          feels sick stops eating, and you start the long work of finding
          anything she will take: the chicken, the baby food, the thing
          off your plate. Weight goes. Then the tiredness, the lying in one
          place, the slow getting up.
        </p>
        <p>
          On the{" "}
          <A href="/quality-of-life-scale">
            seven-question scale this site uses
          </A>
          , that shows up as hunger and hydration falling first, then
          hygiene and mobility, with happiness somewhere in the middle. If
          you are scoring weekly you will see the order. If you are not,
          start now, because kidney disease in dogs can run for months or
          turn in a fortnight, and the sheets are how you tell which one
          you are in.
        </p>
      </Section>

      <H2>Fluids, diet, and the question underneath them</H2>
      <Section>
        <p>
          Many families end up giving fluids under the skin at home, and
          changing the diet, and adding whatever the vet prescribes for
          the nausea. These things work, often for a long time. A dog on
          fluids can have a good year. That is not what this page is
          about, and your vet is the one to talk to about any of it.
        </p>
        <p>
          The question underneath the treatment is the one families
          don&apos;t ask until late, and it&apos;s worth asking early.
          Are the fluids still giving her good days, or only more days?
          There is a point in kidney failure where the answer changes, and
          a vet who has seen it many times can usually tell you where you
          are. Scored weeks help them tell you. A dog whose hunger line
          has been at two for three weeks despite the fluids is answering
          the question herself.
        </p>
      </Section>

      <H2>Scoring a kidney dog honestly</H2>
      <Section>
        <p>
          Two of the seven lines need special care with kidney failure.
          Hydration is not whether she is drinking. A kidney dog drinks
          constantly and is still dehydrated, which is why the vet may
          have you giving fluids under the skin. Score hydration on what
          the vet tells you about her, and on whether the fluids are
          keeping her comfortable, not on how often the bowl is empty.
        </p>
        <p>
          Hunger is the other. Nausea is the thing that takes the
          appetite, and nausea has its own look: lip-licking, turning the
          head from food she used to want, drooling, standing over the
          bowl and walking away. Score the week on whether she ate from
          the bowl on her own, and tell the vet about the nausea
          separately, because there are things they can do for it that
          change the week.
        </p>
      </Section>

      <H2>What a crisis looks like</H2>
      <Section>
        <p>
          Some dogs with kidney failure decline gently. Some reach a point,
          often over a day or two, where they stop eating and drinking
          entirely, vomit what they take, and go very quiet. Ask your vet
          now, while it is calm, what that would look like for your dog
          and what you should do if it happens at night. Knowing the
          emergency number and the plan is a kindness to the version of
          you who will need it at two in the morning.
        </p>
        <p>
          If the crisis comes, you are not choosing badly by not having
          chosen earlier. Many families with a kidney dog hoped for the
          gentle version and got the other. The scale will have shown you
          the direction, and the vet will have told you it could turn.
          That is as prepared as it is possible to be.
        </p>
      </Section>

      <H2>Choosing a day</H2>
      <Section>
        <p>
          With a slow kidney decline, there is usually time to choose.
          Families who choose a day while she can still enjoy the chicken
          get a last day with chicken in it. Families who wait for the
          nausea to take the last of her appetite get a last day that is
          mostly relief. Both are allowed. The first is often kinder, and
          the vets who do this work will say so if you ask.
        </p>
        <p>
          The{" "}
          <A href="/quality-of-life/when-to-euthanize-dog-with-cancer">
            page on cancer
          </A>{" "}
          goes through choosing a day in more detail, and most of it holds
          here, because the shape of a slow illness is the shape of a slow
          illness whatever the organ.
        </p>
      </Section>

      <H2>Afterwards</H2>
      <Section>
        <p>
          A kidney dog leaves a lot behind: the fluid bags, the special
          food, the syringes in the drawer. You will find them for weeks.
          Leave them until you are ready, and then give what&apos;s
          unopened to the vet, who will know someone who needs it.
        </p>
        <p>
          There are{" "}
          <A href="/poems/dog-passed-away">
            poems written for the day a dog passes
          </A>
          , including one for the people who had to decide. And if you
          want a place for her name and her photo that isn&apos;t a phone
          or a drawer, you can{" "}
          <A href="/create">make a page for her</A> when you&apos;re
          ready. Not before.
        </p>
      </Section>
    </ArticleShell>
  );
}
