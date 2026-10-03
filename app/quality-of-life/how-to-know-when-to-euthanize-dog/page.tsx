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
  path: "/quality-of-life/how-to-know-when-to-euthanize-dog",
  title: "How to Know When to Euthanize a Dog — Signs, Scale, Vet",
  description:
    "How to know when to euthanize a dog: the signs vets watch, a seven-area scale to score the weeks, what the appointment involves, and the questions to ask. Written by a grief counselor.",
  headline: "How to Know When to Euthanize a Dog",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "What signs do vets watch for before euthanizing a dog?",
      a: "Vets watch seven things: uncontrolled pain or laboured breathing, not eating, not drinking, not being able to stay clean, withdrawing from the household, not being able to get up, and more bad days than good. No one sign decides it. Several at once, over weeks, is what families and vets act on.",
    },
    {
      q: "What happens during euthanasia?",
      a: "A sedative first, so your dog relaxes and stops noticing the room. Then a second injection, usually into a vein in the leg, and the heart stops within a minute or so. The vet confirms it. You can stay the whole time, and most vets encourage it.",
    },
    {
      q: "Does the dog feel anything?",
      a: "Vets describe it as falling asleep. The sedative does its work first. The body may move or breathe out afterwards, which is a reflex and not the dog, and the vet will tell you to expect it.",
    },
    {
      q: "Can it be done at home?",
      a: "In most areas, yes. Many practices do home visits and there are services that do only this. Ask your vet. It costs more, and for many families the familiar floor is worth it.",
    },
    {
      q: "How much does it cost?",
      a: "It varies a great deal by region and whether it's at home or in the clinic, and whether cremation is included. Ask your vet for the figure plainly. They're used to the question.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="How to Know When to Euthanize a Dog"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        Knowing when to euthanize a dog comes from three things read
        together: the signs vets watch for, a week-by-week score of how
        those signs are changing, and your vet&apos;s examination. No
        single sign decides it. The pattern across several weeks, brought
        to the vet, is what most families and most vets act on.
      </p>

      <H2>The signs vets watch</H2>
      <Section>
        <p>
          Veterinary hospice uses a seven-part list, and it has held up
          for twenty years because it covers the things that actually
          change at the end. It asks whether the pain is still controlled
          and the breathing easy, whether he eats and drinks on his own,
          whether he can stay clean, whether he still responds to the
          people and things he loved, whether he can get up, and, across
          the whole week, whether the good days still outnumber the bad.
        </p>
        <p>
          Each of those is scored from zero to ten on the{" "}
          <A href="/quality-of-life-scale">
            dog quality of life scale
          </A>
          , which you can fill in on this site in a few minutes. The
          total matters less than the direction. One low week is a bad
          week. Three falling weeks in a row is a decline, and a decline
          is what the vet needs to see.
        </p>
        <p>
          What families report most often in the last weeks, whatever the
          illness, is some version of this: he stopped eating on his own,
          then he stopped getting up on his own, then he stopped coming to
          find them. If two of those have happened, the question you are
          asking is the right one to be asking.
        </p>
      </Section>

      <H2>What euthanasia involves</H2>
      <Section>
        <p>
          Most people searching this have never been through it and want
          to know what the room will be like before they are in it. That
          is sensible, and your vet will walk you through it in more
          detail than I will here, but the shape of it is this.
        </p>
        <p>
          The vet gives a sedative first, by injection. Over a few minutes
          your dog gets heavy and calm and stops noticing where he is.
          Then a second injection, usually into a vein in the front leg,
          sometimes through a small catheter placed earlier. The heart
          stops within a minute or so. The vet listens, and tells you.
          There is no struggle and no sign of pain, and most vets will say
          it is the most peaceful death they see.
        </p>
        <p>
          Afterwards the body may breathe out, or twitch, or release the
          bladder. The vet will warn you. It is the body and not the dog,
          and it is still a shock. You can stay in the room as long as you
          need. You can hold him the whole time. Nearly every vet will
          tell you that dogs look for their person at the end and are
          calmer when the person is there.
        </p>
        <p>
          Many practices will come to the house, and there are services
          that do only this. Ask. The questions about what happens to his
          body afterwards, cremation and ashes and the rest, the vet will
          raise with you before the day, so that you are not deciding it
          in the room.
        </p>
      </Section>

      <H2>What the vet knows that you don&apos;t</H2>
      <Section>
        <p>
          You know this dog. The vet knows this illness. Go in with the
          scored weeks and ask what the next month probably holds, what
          would count as a crisis for this condition, and whether anything
          left to try would give him good days rather than just more of
          them. Ask whether the pain is being controlled or only masked.
          Those are answerable questions, and a good vet will answer them
          plainly.
        </p>
        <p>
          If you want their honest view, ask what they would do if he were
          theirs. Most will tell you, gently. That is not the same as being
          told what to do, and it isn&apos;t a vet making the decision for
          you. It&apos;s one more honest voice in a room that usually has
          too few.
        </p>
      </Section>

      <H2>What to do the week before</H2>
      <Section>
        <p>
          If there is time, use it for him and not for the arrangements.
          The vet will handle the arrangements. Feed him the thing he was
          never allowed. Sit in the yard. Take the photo of your hand on
          his head, because that is the one people tell me they keep
          looking at. Keep the day quiet; a tired dog is made more tired
          by a parade of visitors.
        </p>
      </Section>

      <H2>Too early, too late</H2>
      <Section>
        <p>
          The fear of going too early is loud. The regret of going too
          late is quiet and much more common. In the years I have sat
          with people after, almost nobody has said they wished they had
          waited longer. A great many have said they wish they had been
          braver a week sooner.
        </p>
        <p>
          If you are reading this with a dog who still has good days,
          that is not a reason to wait for them to run out. Many families
          choose a day while there is still something good left in it, so
          the last day can be one of the good ones.
        </p>
      </Section>

      <H2>If you&apos;re still deciding</H2>
      <Section>
        <p>
          There is a longer piece on this site, written with less of the
          clinical detail and more of the sitting-with, on{" "}
          <A href="/quality-of-life/how-to-know-when-to-put-my-dog-down">
            how to know when to put your dog down
          </A>
          . It doesn&apos;t try to decide for you either. Read whichever
          one meets you where you are.
        </p>
        <p>
          And when it is done, there are{" "}
          <A href="/poems/dog-passed-away">
            poems written for the day a dog passes
          </A>
          , one of them for exactly the people who had to make this
          choice. Some families also want a place for his name and photo
          that isn&apos;t a phone. If that is you, later,{" "}
          <A href="/create">a memorial page is here</A>.
        </p>
      </Section>
    </ArticleShell>
  );
}
