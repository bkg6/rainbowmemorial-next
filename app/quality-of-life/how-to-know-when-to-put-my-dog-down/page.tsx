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
  path: "/quality-of-life/how-to-know-when-to-put-my-dog-down",
  title: "How to Know When to Put My Dog Down — A Way to Think",
  description:
    "How to know when to put my dog down: there is no formula, but there is a way to think it through. A grief counselor on the signs, the scale, and the vet conversation.",
  headline: "How to Know When to Put My Dog Down",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "Is there a checklist that tells me when it's time?",
      a: "No checklist decides it. What a scored list does is show you a pattern over several weeks, which is harder to argue with than one bad night. The decision stays yours, made with your vet.",
    },
    {
      q: "What if my dog still eats and wags their tail?",
      a: "Appetite and a tail are two of the seven things worth watching, not the whole picture. Dogs in real pain often still eat. Look at breathing, mobility, whether they can stay clean, and whether the good days still outnumber the bad.",
    },
    {
      q: "How do I know I'm not doing it too early?",
      a: "Ask your vet what the next month likely holds, and what they would watch for. Most families who worry about too early have already seen enough. Most who regret the timing say they waited too long, not that they went too soon.",
    },
    {
      q: "Will my vet tell me what to do?",
      a: "A good vet will tell you what they see in the exam, what the disease usually does next, and what a good day and a bad day look like for this dog. Many will tell you what they would do for their own dog, if you ask. The choice is still yours.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="How to Know When to Put My Dog Down"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        Knowing when to put your dog down comes down to one question, asked
        honestly over several weeks: are the bad days now outnumbering the
        good? No single sign decides it. A quality of life score, your own
        notes, and your vet&apos;s examination together give you a way to
        see the answer forming before you have to say it out loud.
      </p>

      <H2>You are not looking for permission</H2>
      <Section>
        <p>
          If you typed this question into a search bar at two in the morning,
          you already know more than you think. People don&apos;t search for
          how to know when to put a dog down while the dog is fine. They
          search because something has changed and they are trying to find
          out whether the thing they&apos;re feeling is allowed.
        </p>
        <p>
          I can&apos;t give you permission. Nobody can, and anyone who
          says a number or a symptom settles it is making the decision
          smaller than it is. What I can do is sit with you in this room
          for a while, because I have been in it, and tell you how other
          people found their way through.
        </p>
        <p>
          The first thing most of them did was stop trying to decide and
          start trying to see. That sounds like a small shift, and it
          isn&apos;t. When you&apos;re deciding, every bad hour is an
          argument and every good hour is a reprieve, and you end up
          exhausted and no closer. When you&apos;re seeing, you&apos;re
          just writing down what happened today. Many families use{" "}
          <A href="/quality-of-life-scale">a seven-question scale</A> for
          that, once a week, so the weeks can be laid side by side.
        </p>
      </Section>

      <H2>What the bad days look like</H2>
      <Section>
        <p>
          A bad day isn&apos;t dramatic. That&apos;s what makes it hard to
          count. It&apos;s the dog who stays on the bed when you come home
          instead of meeting you at the door. The breakfast that gets
          sniffed and left. The breathing you can hear from the next room
          when she&apos;s lying still. The walk that stops at the end of
          the driveway because her back legs won&apos;t do the rest.
        </p>
        <p>
          Pain in dogs rarely looks like crying. It looks like panting at
          rest, or standing with the head low, or a dog who used to lie on
          his side now only lying on his chest. It looks like being
          irritable with the other dog, or flinching when you reach for the
          collar. If the medication the vet gave him is wearing off before
          the next dose, that is a bad day, even if he ate.
        </p>
        <p>
          Then there is the one nobody wants to write down. A dog who can
          no longer get up to go outside lies in what she&apos;s done, and
          a dog who was house-trained her whole life knows it. Hygiene is
          on the scale for a reason. When you are washing her every morning
          and she is still getting sores, that is not a neutral day.
        </p>
        <p>
          A good day is the dog you know, showing up. The head lifting when
          you say the name. The toy carried to the door. An appetite without
          coaxing. You will know a good day when it comes, and you&apos;ll
          want it to count for more than it does. Write it down anyway, at
          the same weight as the bad ones.
        </p>
      </Section>

      <H2>Why a week matters more than a moment</H2>
      <Section>
        <p>
          On any single day you can talk yourself into either answer. A
          week is harder to argue with. Three or four weeks, scored and
          kept, are almost impossible to argue with, which is exactly why
          people avoid keeping them.
        </p>
        <p>
          The scale asks about hurt, hunger, hydration, hygiene, happiness,
          mobility, and whether there were more good days than bad. Seven
          numbers, one to ten. Nothing clever. The point of it is not the
          total. The point is that on the fourth week you have four sheets
          on the kitchen table, and the line they draw is one you
          didn&apos;t draw yourself.
        </p>
        <p>
          Some families see the line and feel relief, because the thing
          they&apos;d been afraid of was true and now they could stop being
          afraid of it and start being kind. Others see a flat line and
          realise they have more time than they feared. Both are worth
          knowing.
        </p>
      </Section>

      <H2>What the vet can tell you that you can&apos;t</H2>
      <Section>
        <p>
          You know the dog. The vet knows the disease. You need both in the
          room, and the mistake families make most often is going in to
          ask &quot;is it time?&quot; and coming out with an answer to a
          different question.
        </p>
        <p>
          Ask instead what the next month is likely to hold. Ask what the
          vet would be watching for, and what a crisis would look like for
          this particular dog with this particular condition, so you know
          the difference between a bad night and an emergency. Ask whether
          there is anything left to try that would give good days rather
          than just more days. If you have scored sheets, put them on the
          table. Vets take a four-week pattern seriously in a way they
          can&apos;t take &quot;she seems off.&quot;
        </p>
        <p>
          And if you want to, ask what they would do if it were their dog.
          Most will tell you, gently. It is not the same as being told what
          to do. It is one more honest voice in a decision that has too
          few of them.
        </p>
      </Section>

      <H2>Too early, too late</H2>
      <Section>
        <p>
          Everyone is afraid of the same two things, and they pull in
          opposite directions. Too early means you took days from him he
          could have had. Too late means you kept him for you, past the
          point where he had anything left but the pain.
        </p>
        <p>
          In the years I have sat with people after, I have heard the second
          regret far more than the first. Almost nobody says &quot;I wish
          I&apos;d waited another week.&quot; A great many say &quot;I
          should have done it sooner, I just couldn&apos;t.&quot; I say
          that not to push you, but because the fear of too early is loud
          and the fear of too late is quiet, and you deserve to hear them
          at equal volume.
        </p>
        <p>
          There is an old line vets use: better a week too early than a day
          too late. It&apos;s blunt. It is also, in my experience, what
          most people wish they had believed.
        </p>
      </Section>

      <H2>What comes after the deciding</H2>
      <Section>
        <p>
          When the decision is made, the question changes to how. There are
          things people do with the last good day, and there is a way of
          thinking about{" "}
          <A href="/quality-of-life/saying-goodbye-to-your-dog">
            saying goodbye to your dog
          </A>{" "}
          that serves whether you are a week out or a day. You don&apos;t
          need to read it tonight.
        </p>
        <p>
          You will also, sooner than you expect, need something to say to
          the people around you, and they will need something to say to
          you. Most of them will get it wrong, kindly. There is a page for{" "}
          <A href="/pet-sympathy">when family and friends ask what to say</A>
          , and you can send it to them rather than explaining.
        </p>
        <p>
          For now, you don&apos;t have to decide anything. Score the week.
          Call the vet and ask the questions above. Then do it again next
          week, and let the sheets tell you what you already suspect, in
          their own time.
        </p>
      </Section>
    </ArticleShell>
  );
}
