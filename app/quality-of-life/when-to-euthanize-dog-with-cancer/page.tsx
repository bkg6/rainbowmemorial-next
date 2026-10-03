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
  path: "/quality-of-life/when-to-euthanize-dog-with-cancer",
  title: "When to Euthanize a Dog With Cancer — A Way to Think",
  description:
    "When to euthanize a dog with cancer is not a date the diagnosis gives you. A grief counselor on watching the weeks, scoring them, and asking the oncologist the questions that help.",
  headline: "When to Euthanize a Dog With Cancer",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "Does a cancer diagnosis mean it's time?",
      a: "No. Many dogs live well for months after a diagnosis, some for years, depending on the kind of cancer and the treatment chosen. The diagnosis tells you to start paying attention. It doesn't set a date.",
    },
    {
      q: "Should I stop treatment before deciding?",
      a: "That is a question for your vet or oncologist, not for a website. What you can ask them is whether the treatment is still giving your dog good days, or only more days. The answer to that is usually clearer than people expect.",
    },
    {
      q: "What signs matter most with cancer?",
      a: "It depends on where the cancer is, and your vet will tell you what to watch for your dog. Across most cancers, the ones families notice are appetite falling away, breathing getting harder, pain that the medication stops covering, and the dog withdrawing from the household.",
    },
    {
      q: "Is it wrong to decide while my dog still has good days?",
      a: "Many families choose a day while there are still good ones left, so the last day can be one of them. Others wait until the good days are gone. Neither is wrong. Vets will tell you the first group tends to carry less regret.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="When to Euthanize a Dog With Cancer"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        When to euthanize a dog with cancer is decided by the dog&apos;s
        weeks, not by the diagnosis. Cancer is one of the most common
        reasons families end up asking this question, and the way through
        it is the same as for any slow illness: watch seven things, score
        them, and bring the pattern to the vet who knows the disease.
      </p>

      <H2>The diagnosis is not the decision</H2>
      <Section>
        <p>
          The word lands hard. Most people remember exactly where they
          were standing when the vet said it. And in the days after, the
          question of when gets tangled up with the shock of what, so that
          every yawn and every skipped meal feels like the beginning of
          the end.
        </p>
        <p>
          It usually isn&apos;t. Depending on what kind of cancer it is
          and what you and your vet choose to do about it, there may be
          months of ordinary days ahead, with walks and dinners and the
          same spot on the couch. The diagnosis changes what you are
          watching for. It does not, by itself, tell you the day.
        </p>
        <p>
          What tells you the day, in the end, is the weeks. Families who
          come through this with the least regret tend to have started
          scoring early, while the dog was still well, so that when the
          decline came they could see it against something.{" "}
          <A href="/quality-of-life-scale">
            The seven-question scale on this site
          </A>{" "}
          is built for that, and it takes a few minutes once a week.
        </p>
      </Section>

      <H2>What the weeks look like with cancer</H2>
      <Section>
        <p>
          I am not going to tell you about the cancer. Your vet or your
          oncologist knows what this kind does and where it goes, and they
          will tell you what to watch for in your dog. What I can tell you
          is what families say the weeks felt like, because it is the same
          pattern most of the time, whatever the diagnosis.
        </p>
        <p>
          Appetite goes first, often. Not all at once, but the dog who
          cleaned the bowl starts leaving half of it, and then needs the
          chicken on top, and then needs it from your hand. Weight follows.
          Then one of two things, depending on where the cancer is: the
          breathing changes, or the pain does. Breathing you can hear from
          across the room. Pain you see in how he lies, how long it takes
          him to get up, whether the medication still lasts until the next
          dose.
        </p>
        <p>
          And somewhere in there, the dog starts going somewhere you
          can&apos;t follow. He lies in the other room instead of with
          you. He doesn&apos;t lift his head when you say his name the
          first time. That is the happiness line on the scale, and it is
          the one families find hardest to score honestly, because
          scoring it low feels like giving up on him.
        </p>
        <p>
          Scoring it low isn&apos;t giving up on him. It&apos;s seeing him
          clearly, which is the only thing the scale asks of you.
        </p>
      </Section>

      <H2>The question to ask the oncologist</H2>
      <Section>
        <p>
          Families go into the oncology appointment wanting to know how
          long. That&apos;s a fair question and vets will give you a
          range, but the range is never as useful as it sounds, because
          dogs don&apos;t read the chart.
        </p>
        <p>
          The more useful question is whether the treatment is still buying
          good days or only more days. A vet can answer that. If the
          chemotherapy is giving him three good weeks and one rough one,
          that is a trade many families make gladly. If it is giving him
          four rough weeks, that is a different conversation, and a good
          vet will have it with you plainly.
        </p>
        <p>
          Ask, too, what a crisis would look like for this cancer. Some
          cancers end quietly, over weeks. Some can turn in a night, and
          you want to know in advance what you would do at two in the
          morning, and which emergency number to call, so the night itself
          is not also a decision.
        </p>
      </Section>

      <H2>If you are treating, and if you are not</H2>
      <Section>
        <p>
          Some families treat, some don&apos;t, and the scale serves both.
          If you are in treatment, score the treatment weeks separately in
          your head from the rest, because a rough week after a session
          is not the same as a rough week for no reason, and your vet
          will want to know which was which. If you have chosen comfort
          care instead, the scale is the whole plan: it is how you and the
          vet know whether comfort is still being achieved.
        </p>
      </Section>

      <H2>Choosing a day while there are still good ones</H2>
      <Section>
        <p>
          With a slow cancer, families often have a choice that other
          illnesses don&apos;t give them: to pick a day before the last
          good day is gone. It feels wrong to many people. How can it be
          time if he still wagged this morning?
        </p>
        <p>
          The vets who do this work will tell you, if you ask, that the
          families who choose a day with some good left in it are the
          ones who get to make the last day a good one, with the roast
          chicken and the spot in the sun. The families who
          wait for the good days to run out get a last day that is mostly
          relief, and relief is a thinner thing to carry afterwards.
        </p>
        <p>
          Neither is wrong, and I say that to people in both groups, and I
          mean it. But if you are asking whether it is allowed to decide
          while he can still enjoy the chicken, it is. It is often the
          kindest version.
        </p>
      </Section>

      <H2>When you have decided</H2>
      <Section>
        <p>
          The page on{" "}
          <A href="/quality-of-life/how-to-know-when-to-euthanize-dog">
            how to know when to euthanize a dog
          </A>{" "}
          covers what the appointment itself is like, if you have never
          been through one and want to know before you walk in. Many
          families with a cancer diagnosis arrange for the vet to come to
          the house, since there is usually time to plan it.
        </p>
        <p>
          Afterward, there are{" "}
          <A href="/poems/dog-passed-away">
            poems written for the day a dog passes
          </A>
          , and one of them is for the people who had to make the choice.
          Some families also make a page with his photo and his name and
          the years, so there is a place for him that isn&apos;t a phone
          or a drawer. If that helps,{" "}
          <A href="/create">you can make one here</A> whenever you are
          ready, and not before.
        </p>
      </Section>
    </ArticleShell>
  );
}
