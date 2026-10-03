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
  path: "/quality-of-life/questionnaire",
  title: "Dog Quality of Life Questionnaire — Fill In Before the Vet",
  description:
    "A dog quality of life questionnaire to fill in at home the night before the vet appointment and bring with you. Seven questions, a dated PDF, and the things to ask once you're there.",
  headline: "Dog Quality of Life Questionnaire",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "Will my vet know what this questionnaire is?",
      a: "Almost certainly. It is the HHHHHMM scale by Dr. Alice Villalobos, which veterinary hospice has used for twenty years. Hand it over and say 'I scored her week on the Villalobos scale' and they will know exactly what they're looking at.",
    },
    {
      q: "Should I fill it in the night before or in the waiting room?",
      a: "The night before, at home, with the dog in front of you. The waiting room is a bad day for most dogs and a worse one for honest answers.",
    },
    {
      q: "What if my answers don't match what the vet sees in the exam?",
      a: "That happens, and it's useful. Dogs rally in the clinic. Your sheet is the week at home; the exam is ten minutes in a strange room. The vet needs both, and the gap between them is often where the real conversation starts.",
    },
    {
      q: "Can I bring more than one week?",
      a: "Please do. Three or four dated sheets are far more useful than one. Score each week on the same day and keep them together.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Dog Quality of Life Questionnaire"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        A dog quality of life questionnaire is a short set of questions,
        answered at home, about how your dog&apos;s week has gone across
        seven areas. Its purpose is the vet appointment: filled in the
        night before and brought along, it turns &quot;she seems off&quot;
        into something a vet can read, compare, and act on.
      </p>

      <H2>Why the night before matters</H2>
      <Section>
        <p>
          Dogs rally at the vet. The one who hasn&apos;t got up on her own
          in three days walks into the exam room with her tail up, and the
          vet sees ten good minutes while you stand there trying to
          explain the other ten thousand. Then the appointment is over and
          you drive home having not said the thing you came to say.
        </p>
        <p>
          The questionnaire fixes that in the plainest way. You answer it
          at home, with her on the rug in front of you, when the week is
          fresh. You put a date on it. And in the room, instead of
          explaining, you hand it over. The questions are{" "}
          <A href="/quality-of-life-scale">
            the seven from the Villalobos scale
          </A>
          , which your vet will recognise, so there is nothing to explain
          about the sheet either.
        </p>
      </Section>

      <QualityOfLifeTool intro="Answer for the week just ended, with your dog in front of you. 1 is the worst it could be; 10 is a normal good week. When you're done, download the PDF, date it, and put it with your keys so it comes to the appointment." />

      <H2>What to ask once you&apos;re there</H2>
      <Section>
        <p>
          The sheet starts the conversation. These finish it. Ask what the
          next month is likely to hold for a dog with her condition. Ask
          what a crisis would look like, so you know the difference
          between a bad night and the emergency vet. Ask whether the pain
          medication is working or only taking the edge off, because
          those are different and a vet can often tell. Ask whether there
          is anything left to try that would give her good days, rather
          than only more days.
        </p>
        <p>
          If you want the honest view, ask what they would do if she were
          theirs. Most vets will tell you, carefully. It is not the same
          as being told what to do.
        </p>
        <p>
          Write the answers on the back of the sheet before you leave the
          car park. You will not remember them by dinner. Nobody does.
        </p>
      </Section>

      <H2>What the seven questions are asking</H2>
      <Section>
        <p>
          Hurt asks whether her pain is controlled and her breathing easy
          at rest, not whether she cries, because dogs mostly don&apos;t.
          Hunger asks whether she eats from the bowl without being coaxed.
          Hydration asks whether she drinks, or is kept hydrated by fluids
          the vet has you giving. Hygiene asks whether she can stay clean,
          which stops being automatic once she can&apos;t get up on her
          own.
        </p>
        <p>
          Happiness asks whether the dog you know still shows up: head
          lifted when you say the name, interest in the door, the window,
          the other animals. Mobility asks whether she can get up and get
          to the bowl and outside, with help if she needs it. The last
          question asks you to count the days of the week and say,
          plainly, whether there were more good ones than bad.
        </p>
        <p>
          Answer each one for the week, not for today, and not for the
          dog she was. The vet needs to see this week.
        </p>
      </Section>

      <H2>If the appointment is a hospice conversation</H2>
      <Section>
        <p>
          Sometimes the vet has already said the word, and the appointment
          you are preparing for is about comfort rather than cure. The
          questionnaire is more useful there, not less. Hospice care is
          about good days, and the sheet is a count of them. Bring the
          last few weeks and ask the vet to show you which areas their
          plan is meant to help, so that next month&apos;s sheet can
          tell you whether it did.
        </p>
      </Section>

      <H2>Keeping the sheets</H2>
      <Section>
        <p>
          One questionnaire is a snapshot. The second one is the start of
          a line. Pick a day of the week, score her on that day, and keep
          the PDFs together in a folder, or print them and keep them in
          the drawer with her paperwork. By the fourth one you will know
          something about the direction of things that no single
          appointment could tell you, and your vet will know it too.
        </p>
        <p>
          For an older dog in a slow decline, where the sheets may go on
          for months, there is a page written for that pace,{" "}
          <A href="/quality-of-life/senior-dog">
            the senior dog version of this scale
          </A>
          , with a note on what tends to change first in old dogs and
          what often turns out to be treatable.
        </p>
      </Section>

      <H2>For the people who come with you</H2>
      <Section>
        <p>
          Sometimes a partner or a grown child comes to the appointment,
          and sometimes they are the one who doesn&apos;t want to hear
          what the sheet says. Fill it in together, if you can, the night
          before. Two people scoring the same week and comparing numbers
          is a quieter conversation than two people arguing about whether
          she is fine.
        </p>
        <p>
          And when the appointment leads where some of them do, the
          friends around you will want to help and won&apos;t know how.
          There is a page on{" "}
          <A href="/pet-sympathy">
            what to say when a friend&apos;s dog has died
          </A>{" "}
          that you can send rather than explain.
        </p>
      </Section>
    </ArticleShell>
  );
}
