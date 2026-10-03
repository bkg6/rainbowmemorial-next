import type { Metadata } from "next";
import Link from "next/link";
import QualityOfLifeTool from "./QualityOfLifeTool";
import { READINGS } from "./types";
import {
  DESCRIPTION,
  FAQ,
  PAGE_PATH,
  PAGE_URL,
  TITLE,
  articleJsonLd,
  faqJsonLd,
  softwareJsonLd,
} from "./schema";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    siteName: "Rainbow Memorial",
    images: [{ url: "/og/quality-of-life.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

const DIMENSION_NOTES: Array<{ label: string; text: string }> = [
  {
    label: "Hurt",
    text: "Pain is the first thing the scale asks about, and the hardest to see. Dogs hide it. Look at the breathing when they're resting, whether they flinch when you touch the usual places, whether the medication the vet gave is still doing its job by evening.",
  },
  {
    label: "Hunger",
    text: "Eating on their own, from the bowl, without being coaxed. Hand-feeding counts as a lower score, not a zero. A dog who eats only chicken from your palm is telling you something about the week.",
  },
  {
    label: "Hydration",
    text: "Drinking from the bowl, or getting fluids under the skin from the vet or from you at home. If they're being given fluids and staying hydrated, score that honestly. If they're refusing water and not getting fluids, that's low.",
  },
  {
    label: "Hygiene",
    text: "Whether they can stay clean. When a dog can't get up, they lie in what they've done, and that is its own kind of suffering. If you're washing them every day and they still have sores, that is what a low score here looks like.",
  },
  {
    label: "Happiness",
    text: "Do they lift their head when you come in. Do they still want the toy, the window, the other dog. Is there still a tail. This one is about whether the dog you know is still in there, on most days.",
  },
  {
    label: "Mobility",
    text: "Getting up, walking to the bowl, going outside. A dog who needs a sling or a harness to stand can still have a middling score here if they want to move and can, with help. A dog who no longer tries is lower.",
  },
  {
    label: "More Good Days Than Bad",
    text: "The last question is the plainest one. Over the past seven days, were there more good days than bad? When the bad days start outnumbering the good, that ratio is the thing vets ask about first.",
  },
];

export default function QualityOfLifeScalePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text-primary)",
        }}
      >
        <article
          className="rb-article mx-auto px-6 py-16 md:py-24"
          style={{ maxWidth: 720 }}
        >
          <h1 className="mb-8">Dog Quality of Life Scale</h1>

          <p>
            The dog quality of life scale is a seven-part assessment that
            scores your dog&apos;s current life across Hurt, Hunger,
            Hydration, Hygiene, Happiness, Mobility, and More Good Days Than
            Bad. It was created by veterinarian Dr. Alice Villalobos in 2004.
            Below, you can score your dog&apos;s week and see what the total
            means.
          </p>

          <QualityOfLifeTool />

          <h2 className="mt-14 mb-6">What the totals have meant for other families</h2>
          <div className="space-y-6">
            {READINGS.map((r) => (
              <p key={r.min}>
                <strong style={{ fontVariantNumeric: "tabular-nums" }}>
                  {r.min}–{r.max}, {r.heading.toLowerCase()}.
                </strong>{" "}
                {r.text}
              </p>
            ))}
            <p>
              Those four bands are ours. Dr. Villalobos&apos;s original scale
              draws a single line at 35, above which hospice care is still
              giving the dog an acceptable life. Neither her line nor our
              bands is a verdict.
            </p>
          </div>

          <h2 className="mt-14 mb-6">When to use this scale</h2>
          <div className="space-y-6">
            <p>
              Most families come to a scale like this after something has
              shifted. Often it&apos;s a diagnosis, or a vet visit where
              the word hospice came up for the first time. Sometimes
              it&apos;s smaller than that, a morning where the dog
              didn&apos;t get up for breakfast and you stood in the kitchen
              and noticed you weren&apos;t surprised.
            </p>
            <p>
              The scale earns its keep in the slow declines, where every day
              looks like the last one and you can&apos;t tell anymore
              whether this week is worse than last month. It also helps in
              the weeks after a diagnosis, when the treatment is working or
              isn&apos;t and you need some way of saying which. And a lot of
              people fill it in the night before a vet appointment, so they
              can walk in with something more than &quot;she seems
              off.&quot;
            </p>
            <p>
              You don&apos;t need to be in crisis to use it. Some people
              score an old dog once a month, for years, just to have a
              record. The scale works best when there are several of them
              to lay side by side.
            </p>
          </div>

          <h2 className="mt-14 mb-6">What the seven dimensions mean</h2>
          <div className="space-y-8">
            {DIMENSION_NOTES.map((d) => (
              <div key={d.label}>
                <h3 className="mb-2" style={{ fontSize: 19 }}>
                  {d.label}
                </h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 mb-6">A word from the counselor&apos;s chair</h2>
          <div className="space-y-6">
            <p>
              The score is not a permission slip, and it is not a verdict. I
              have sat with people who scored a 24 and chose to wait, and
              people who scored a 50 and knew. The number doesn&apos;t make
              the decision. It gives you a way to see the week clearly when
              every day has started to feel the same, and it gives you
              something to put on the table at the vet&apos;s office so the
              conversation starts from what you&apos;ve both seen rather
              than from what you&apos;re afraid of. Families who use this
              tend to score once a week and bring the sheets in. The vet is
              the medical partner. This is the seeing tool.
            </p>
            <p>
              If you&apos;re already after the loss,{" "}
              <Link href="/create" className={linkClass} style={linkStyle}>
                a permanent memorial page
              </Link>{" "}
              is where many families put their dog&apos;s name and photo.
              And for families further along in the loss,{" "}
              <Link
                href="/rainbow-bridge"
                className={linkClass}
                style={linkStyle}
              >
                the Rainbow Bridge tradition may help
              </Link>
              .
            </p>
          </div>

          <h2 className="mt-14 mb-6">
            About Dr. Alice Villalobos and the HHHHHMM scale
          </h2>
          <div className="space-y-6">
            <p>
              Dr. Alice Villalobos is a veterinary oncologist and the founder
              of{" "}
              <a
                href="https://pawspice.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                style={linkStyle}
              >
                Pawspice
              </a>
              , a program for hospice care in animals. She published the
              HHHHHMM scale in her 2007 book <em>Canine and Feline Geriatric
              Oncology</em> (Wiley-Blackwell), after years of using it with
              families in her own practice. The letters stand for the seven
              dimensions above, and the original version asks owners to
              score each from 0 to 10, with a total above 35 suggesting
              that quality of life is acceptable enough to continue hospice
              care.
            </p>
            <p>
              Veterinary hospice programs around the world have used her
              scale since. The interactive version on this page is Rainbow
              Memorial&apos;s, built to make her framework usable at a
              kitchen table rather than only in a clinic. The dimensions and
              their meaning are hers. The questions, the readings, and the
              printable sheet are ours, and nothing here replaces what your
              own vet will tell you when they examine your dog.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Questions people sometimes ask</h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <p key={item.q}>
                <strong>{item.q}</strong> {item.a}
              </p>
            ))}
          </div>

          <h2 className="mt-14 mb-6">If the loss has already come</h2>
          <div className="space-y-6">
            <p>
              Some people find this page the week after, not the week
              before, looking for proof that they read the signs right.
              If that&apos;s you, there are{" "}
              <Link
                href="/poems/dog-passed-away"
                className={linkClass}
                style={linkStyle}
              >
                poems written for the day a dog passes
              </Link>
              , including one for the people who had to make the choice.
              And if you&apos;re the friend or the sister rather than the
              owner, there&apos;s a page on{" "}
              <Link
                href="/pet-sympathy"
                className={linkClass}
                style={linkStyle}
              >
                how friends and family can help
              </Link>
              .
            </p>
          </div>

          <h2 className="mt-14 mb-6">More in this series</h2>
          <div className="space-y-6">
            <p>
              The scale is the centre of a set of pages written for the
              goodbye decision, each for a different moment in it. For a
              printable version with yes-or-no boxes, there is the{" "}
              <Link href="/quality-of-life/checklist" className={linkClass} style={linkStyle}>
                quality of life checklist
              </Link>
              , and for four weeks on one landscape page, the{" "}
              <Link href="/quality-of-life/chart" className={linkClass} style={linkStyle}>
                printable chart
              </Link>
              . If you want the questions first and the reading after, the{" "}
              <Link href="/quality-of-life/quiz" className={linkClass} style={linkStyle}>
                five-minute quiz
              </Link>{" "}
              is the same tool with less around it, and the{" "}
              <Link href="/quality-of-life/questionnaire" className={linkClass} style={linkStyle}>
                questionnaire
              </Link>{" "}
              is written for the night before a vet appointment.
            </p>
            <p>
              For the decision itself, there are two pieces that do not try
              to decide for you:{" "}
              <Link href="/quality-of-life/how-to-know-when-to-put-my-dog-down" className={linkClass} style={linkStyle}>
                how to know when to put your dog down
              </Link>{" "}
              and, with more of the clinical detail,{" "}
              <Link href="/quality-of-life/how-to-know-when-to-euthanize-dog" className={linkClass} style={linkStyle}>
                how to know when to euthanize a dog
              </Link>
              . There are pages for{" "}
              <Link href="/quality-of-life/senior-dog" className={linkClass} style={linkStyle}>
                an old dog in a slow decline
              </Link>
              , for{" "}
              <Link href="/quality-of-life/when-to-euthanize-dog-with-cancer" className={linkClass} style={linkStyle}>
                a dog with cancer
              </Link>
              , and for{" "}
              <Link href="/quality-of-life/when-to-euthanize-dog-with-kidney-failure" className={linkClass} style={linkStyle}>
                a dog with kidney failure
              </Link>
              . And when the decision is made, there is a page on{" "}
              <Link href="/quality-of-life/saying-goodbye-to-your-dog" className={linkClass} style={linkStyle}>
                saying goodbye to your dog
              </Link>
              , for the day before, the day of, and the days after.
            </p>
          </div>

          <hr
            className="my-14"
            style={{ borderColor: "var(--color-border)" }}
          />

          <footer className="space-y-5 italic">
            <p>
              Written by Hannah Wright, on behalf of Rainbow Memorial. Last
              updated October 3, 2026.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
