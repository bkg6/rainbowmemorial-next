import PdfButton from "../../_lib/PdfButton";
import { BANDS, DIMENSIONS } from "../../quality-of-life-scale/types";
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
  path: "/quality-of-life/chart",
  title: "Dog Quality of Life Chart — Printable, Four Weeks on One Page",
  description:
    "A dog quality of life chart to print and keep on the fridge: the seven areas vets watch, four weeks of score boxes, and the score ranges. One landscape page, free, no signup.",
  headline: "Dog Quality of Life Chart",
  datePublished: CLUSTER_DATE,
  dateModified: CLUSTER_DATE,
  faq: [
    {
      q: "What's on the chart?",
      a: "The seven areas of the HHHHHMM scale down the left, four weekly columns of score boxes, a total row, and the four score ranges printed underneath so you can read a total without coming back to this page. It prints landscape on letter or A4.",
    },
    {
      q: "How do I score each box?",
      a: "1 to 10 for each area, with 10 being a normal good week. Add the column for the week's total out of 70. The full scale page explains each area; the chart assumes you've read it once.",
    },
    {
      q: "Is a chart better than the online tool?",
      a: "It's the same scale on paper. The chart is better for seeing four weeks at once and for houses where paper gets looked at. The online tool is better for a quick score and a dated PDF. Many families use both.",
    },
    {
      q: "Can I take the chart to the vet?",
      a: "That's what it's for. Four weeks of scores on one page is the most useful thing you can hand a vet at an end-of-life appointment.",
    },
  ],
};

export const metadata = buildMetadata(spec);

export default function Page() {
  return (
    <ArticleShell
      spec={spec}
      h1="Dog Quality of Life Chart"
      lastUpdatedHuman={CLUSTER_DATE_HUMAN}
    >
      <p>
        A dog quality of life chart lays out the seven areas of the
        HHHHHMM scale as a grid, with a column for each week, so that a
        month of scores can be seen on one page. This one is a free,
        printable, landscape sheet with four weeks of boxes and the score
        ranges printed at the bottom.
      </p>

      <H2>The chart</H2>
      <Section>
        <p>
          The grid below is the one on the PDF. Print it, put it on the
          fridge, and score one column a week. If you want the online
          version, with sliders and a reading of each week&apos;s total,
          that is{" "}
          <A href="/quality-of-life-scale">
            the interactive scale on its own page
          </A>
          .
        </p>
      </Section>
      <div
        className="my-8 overflow-x-auto p-4 md:p-6"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
        }}
      >
        <table
          className="w-full"
          style={{ borderCollapse: "collapse", fontSize: 15, minWidth: 520 }}
        >
          <thead>
            <tr>
              <th
                scope="col"
                className="text-left py-2 pr-3"
                style={{ fontWeight: 600 }}
              >
                Area (1–10)
              </th>
              {[1, 2, 3, 4].map((w) => (
                <th
                  key={w}
                  scope="col"
                  className="py-2 px-2 text-center"
                  style={{ fontWeight: 500, color: "var(--color-text-secondary)" }}
                >
                  Week {w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIMENSIONS.map((d) => (
              <tr key={d.key} style={{ borderTop: "1px solid var(--color-border)" }}>
                <th scope="row" className="text-left py-3 pr-3" style={{ fontWeight: 500 }}>
                  {d.label}
                </th>
                {[1, 2, 3, 4].map((w) => (
                  <td key={w} className="py-3 px-2">
                    <div
                      aria-hidden="true"
                      style={{
                        height: 28,
                        border: "1px solid var(--color-border)",
                        borderRadius: 4,
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ borderTop: "2px solid var(--color-text-primary)" }}>
              <th scope="row" className="text-left py-3 pr-3" style={{ fontWeight: 600 }}>
                Total / 70
              </th>
              {[1, 2, 3, 4].map((w) => (
                <td key={w} className="py-3 px-2">
                  <div
                    aria-hidden="true"
                    style={{
                      height: 28,
                      border: "1px solid var(--color-text-primary)",
                      borderRadius: 4,
                    }}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="mt-6 space-y-1" style={{ fontSize: 15 }}>
          {BANDS.map((r) => (
            <p key={r.min}>
              <strong style={{ fontVariantNumeric: "tabular-nums" }}>
                {r.min}–{r.max}
              </strong>{" "}
              <span style={{ color: "var(--color-text-secondary)" }}>
                {r.name}
              </span>
            </p>
          ))}
        </div>
        <PdfButton kind="chart" label="Download the chart (PDF, landscape)" />
      </div>

      <H2>How to use it</H2>
      <Section>
        <p>
          Pick a day of the week and keep it. Sunday evening is common.
          Score each of the seven areas from one to ten for the week
          that just ended, not for the day you&apos;re sitting in, and
          write the total at the bottom. Then leave it alone until next
          Sunday.
        </p>
        <p>
          After four weeks you will have a line, left to right, and the
          line is the thing. A row of 60s is an old dog doing fine. A 58,
          a 55, a 47, a 39 is a dog whose weeks are getting harder in a
          way you might not have felt from inside them. Either way you
          will know something on the fourth Sunday that you could only
          have guessed on the first.
        </p>
        <p>
          The score ranges printed under the chart are the same ones the
          online tool uses. They describe what those totals have meant
          for other families. They are not a verdict and the chart does
          not make the decision. The vet does that with you, and the chart
          is what you bring.
        </p>
      </Section>

      <H2>Reading the line</H2>
      <Section>
        <p>
          The totals are what most people look at, and the direction of
          the totals is what the vet looks at. But the rows tell you
          something the totals hide, which is what is failing first. A
          chart where Hunger drops from 8 to 3 while everything else holds
          is a dog who has stopped eating, and that is a different
          conversation from a chart where every row has slid two points,
          which is a dog who is fading evenly.
        </p>
        <p>
          Mobility and Hygiene tend to fall together, because a dog who
          can&apos;t get up can&apos;t get away from where she&apos;s
          been. Hurt and Happiness tend to fall together too, because a
          dog in pain withdraws. When you see pairs moving, say so to the
          vet. They will know what it means for her condition.
        </p>
        <p>
          A single column is one week and can be misleading either way.
          A dog can have a terrible week and recover. Two columns begin
          to say something. By the fourth, if the line is going down, you
          will not need anyone to tell you, and the chart will have done
          what it is for, which is to let you see it before you have to
          feel it all at once.
        </p>
      </Section>

      <H2>What each row is asking</H2>
      <Section>
        <p>
          Hurt asks whether the breathing is easy and whether the pain
          medication is still working by evening. Hunger asks whether she
          eats from the bowl on her own. Hydration, whether she drinks or
          is getting fluids. Hygiene, whether she can stay clean, which
          becomes a daily question once she can&apos;t get up. Happiness,
          whether the dog you know still shows up when you say her name.
          Mobility, whether she can get up and move, with help if needed.
          The last row is the plainest, and the one vets ask about first:
          over the whole week, were there more good days than bad?
        </p>
        <p>
          If you want these in checkbox form instead of scores,{" "}
          <A href="/quality-of-life/checklist">
            the printable checklist
          </A>{" "}
          covers the same seven areas with yes-or-no questions and a line
          for what you noticed.
        </p>
      </Section>

      <H2>If you&apos;re filling it in from memory</H2>
      <Section>
        <p>
          Some people print this after, and fill in the last weeks from
          memory, to see on paper that they read the decline right. If
          that is what you are doing, the chart will likely show you what
          you already know, which is that you were watching closely and
          you did not wait too long. For the part of this that paper
          can&apos;t hold, there is{" "}
          <A href="/rainbow-bridge/dogs">
            the Rainbow Bridge poem, written for dogs
          </A>
          , which has done that work for families since 1959.
        </p>
      </Section>
    </ArticleShell>
  );
}
