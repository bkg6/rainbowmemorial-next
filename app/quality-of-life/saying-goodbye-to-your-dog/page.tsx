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
  path: "/quality-of-life/saying-goodbye-to-your-dog",
  title: "Saying Goodbye to Your Dog — Before, During, and After",
  description:
    "Saying goodbye to your dog, whether it's a week away, tomorrow, or already done. What families do with the last good day, what the day itself is like, and what helps after.",
  headline: "Saying Goodbye to Your Dog",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "Should I be in the room when my dog is put to sleep?",
      a: "If you can, yes. Vets who do this every day say dogs look for their person at the end, and that the ones whose people stay are calmer. If you can't, that is not a failure, and the vet or a tech will stay with them.",
    },
    {
      q: "What should I do on the last day?",
      a: "Whatever your dog loved that they can still do. The usual spot in the sun, the forbidden food, the car window down, the people who mattered to them. Keep it small. The point is that they are with you and comfortable, not that it is a performance.",
    },
    {
      q: "Can I say goodbye at home instead of at the clinic?",
      a: "In most places, yes. In-home euthanasia services like Lap of Love exist for exactly this. Ask your vet whether they offer home visits or can refer you. Many families find the familiar floor easier on the dog and on themselves.",
    },
    {
      q: "What do I do with their things afterward?",
      a: "Nothing, for now. The bowl can stay where it is for as long as you need. Some people wash the bed and keep it, some give the leash to a shelter after a month or a year. There is no schedule for this.",
    },
    {
      q: "How do I tell the kids?",
      a: "Plainly, with the real words. Children do better with 'the vet helped Max die so he wouldn't hurt anymore' than with 'put to sleep,' which can frighten them at bedtime. Let them be part of the goodbye if they want to be.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Saying Goodbye to Your Dog"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        Saying goodbye to your dog happens in three places: the days
        before, when you choose how to spend the time left; the hour
        itself, which is quieter and faster than most people fear; and the
        weeks after, when the house is wrong and you need somewhere to put
        what you feel. This page is for all three.
      </p>

      <H2>If you are a week out</H2>
      <Section>
        <p>
          You may have a date. You may only have a sense that it&apos;s
          close. Either way, the days in between are strange, because
          you&apos;re grieving someone who is asleep on the rug beside you,
          and nobody has a word for that.
        </p>
        <p>
          Some people find the time easier with a way to see it. Scoring
          each day on{" "}
          <A href="/quality-of-life-scale">
            the seven things vets watch at the end
          </A>{" "}
          takes two minutes and tells you whether today was one of the good
          ones. It also tells you, without you having to decide, whether
          the date you have in mind is right or whether it has come
          sooner. If you are still working out whether it&apos;s time at
          all, there is a longer piece on{" "}
          <A href="/quality-of-life/how-to-know-when-to-put-my-dog-down">
            how to know when to put your dog down
          </A>
          , and it does not try to decide for you.
        </p>
        <p>
          Use the week for the dog, not for the goodbye. He doesn&apos;t
          know what&apos;s coming. He knows whether you are with him and
          whether he is comfortable, and those are the two things you can
          still give.
        </p>
      </Section>

      <H2>The last good day</H2>
      <Section>
        <p>
          Families tend to do the same handful of things, and they are
          the right things. The favourite meal, the real one, the roast
          chicken or the cheeseburger the vet said no to for years. The
          spot in the yard where he liked to lie. The car, if he loved the
          car, with the window down and no destination. The people who
          mattered to him, which is sometimes a neighbour or a child and
          not who you&apos;d expect.
        </p>
        <p>
          If she can still walk, a short walk, the old route, at her pace.
          If she can&apos;t, carry her to the place the walk used to go
          and let her lie there with her nose working. Dogs live through
          their noses to the end.
        </p>
        <p>
          Take the photos. You will want them, and you will not want to
          have been the person who thought it was morbid. Take one of your
          hand on his head. That is the one people tell me they look at.
        </p>
        <p>
          Keep it small. The last day doesn&apos;t need to be a production,
          and a dog who is tired will be more tired by a day of visitors.
          An hour of what he loved and the rest of the day quiet, beside
          you, is more than enough.
        </p>
      </Section>

      <H2>The hour itself</H2>
      <Section>
        <p>
          Most people have never watched this happen and are afraid of
          what they&apos;ll see. What they see, nearly always, is a dog
          falling asleep. The vet gives a sedative first, and your dog gets
          heavy and calm and stops noticing the room. Then the second
          injection, and the breathing stops, usually within a minute. The
          vet listens for the heart and tells you. That is the whole of
          it.
        </p>
        <p>
          You can stay. Vets who do this every day will tell you dogs look
          for their person at the end, and that the ones whose person is
          there are calmer. Your hand on him, your voice saying the
          ordinary things you always said, is what he will know. If you
          truly cannot stay, the vet or the tech will stay in your place,
          and that is not a failure.
        </p>
        <p>
          Many vets will come to the house now, and services like Lap of
          Love exist for this alone. The familiar floor, the familiar
          smells, no car ride. Ask. It costs more and for most families it
          is worth it.
        </p>
        <p>
          Afterward the body may move a little, or breathe out, or
          release the bladder. That is the body and not the dog. Vets will
          warn you, and it is still a shock. Take the time you need in the
          room. Nobody is going to hurry you.
        </p>
      </Section>

      <H2>The first night</H2>
      <Section>
        <p>
          The house is wrong. The leash is still on the hook and the bowl
          is still on the floor, and the place at the foot of the bed is
          empty, and you will
          reach for it with your foot in the night without meaning to.
          This is the part nobody prepares you for, because it can&apos;t
          be prepared for.
        </p>
        <p>
          Leave the things where they are. You do not have to decide about
          the bowl tonight. Some people keep it for a week, some for a
          year. The collar goes in a drawer, or stays on the hook, or ends
          up on the nightstand. There is no right place.
        </p>
        <p>
          Say the name out loud. People stop saying it almost at once, as
          if the name is a wound, and the silence makes it worse. Talk
          about him at dinner. Tell the story about the time with the
          turkey. He was here. The name is proof.
        </p>
      </Section>

      <H2>What helps after</H2>
      <Section>
        <p>
          From what people tell me in the months after, a few things
          help. A poem, read once or read every night. Many families read{" "}
          <A href="/rainbow-bridge/dogs">
            the Rainbow Bridge poem written for dogs
          </A>
          , and some find the old sentiment of it exactly right and some
          find it too sweet for where they are. Either is fine.
        </p>
        <p>
          A place for the name and the photo that doesn&apos;t get lost in
          a phone. You can{" "}
          <A href="/create">make a memorial page for your dog</A> here,
          with the one photo, the name, the years, and a few lines if you
          have them. It stays up. People send it to the friends who knew
          him. A year from now, on the day, an email arrives so you
          don&apos;t have to be the only one who remembers the date.
        </p>
        <p>
          And a person who says the name. The friend who asks how you are
          doing without your dog, a month on, when everyone else has moved
          on, is worth more than any card. If you have a friend like that,
          you know. If you are the friend, say the name.
        </p>
        <p>
          <A href="/create">Make their memorial page →</A>
        </p>
      </Section>
    </ArticleShell>
  );
}
