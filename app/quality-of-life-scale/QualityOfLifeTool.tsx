"use client";

import { useMemo, useState } from "react";
import { FileDown, RotateCcw } from "lucide-react";
import {
  DEFAULT_SCORE,
  DIMENSIONS,
  MAX_TOTAL,
  readingFor,
  totalOf,
  type DimensionKey,
  type Score,
} from "./types";

type Props = {
  /** Shown above the sliders. Defaults to a neutral instruction line. */
  intro?: string;
};

const panel: React.CSSProperties = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius)",
};

export default function QualityOfLifeTool({ intro }: Props) {
  const [score, setScore] = useState<Score>(DEFAULT_SCORE);
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const total = useMemo(() => totalOf(score), [score]);
  const reading = useMemo(() => readingFor(total), [total]);

  function set(key: DimensionKey, value: number) {
    setTouched(true);
    setScore((s) => ({ ...s, [key]: value }));
  }

  function reset() {
    setScore(DEFAULT_SCORE);
    setTouched(false);
  }

  async function onDownload() {
    setBusy(true);
    setPdfError(null);
    try {
      const { downloadScoreSheet } = await import("./pdf");
      await downloadScoreSheet(score, new Date());
    } catch {
      setPdfError(
        "The PDF didn't generate. You can print this page instead, or try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      aria-labelledby="qol-tool-heading"
      className="qol-tool my-10 p-5 md:p-8"
      style={panel}
    >
      <h2 id="qol-tool-heading" className="mb-2" style={{ fontSize: 24 }}>
        Score this week
      </h2>
      <p
        className="mb-8"
        style={{ color: "var(--color-text-secondary)", fontSize: 15 }}
      >
        {intro ??
          "Move each slider to where this week has been. 0 is the worst it could be, 10 is a normal good week. The total updates as you go."}
      </p>

      <ol className="space-y-7">
        {DIMENSIONS.map((d, i) => {
          const id = `qol-${d.key}`;
          const value = score[d.key];
          return (
            <li key={d.key}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={id} className="block">
                  <span
                    className="mr-2"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: 13,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 17 }}>
                    {d.label}
                  </span>
                </label>
                <output
                  htmlFor={id}
                  aria-live="polite"
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 600,
                    fontSize: 17,
                    minWidth: 48,
                    textAlign: "right",
                  }}
                >
                  {value}
                  <span
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    / 10
                  </span>
                </output>
              </div>
              <p
                className="mt-1 mb-3"
                style={{ color: "var(--color-text-secondary)", fontSize: 15 }}
              >
                {d.question}
              </p>
              <input
                id={id}
                type="range"
                min={0}
                max={10}
                step={1}
                value={value}
                onChange={(e) => set(d.key, Number(e.target.value))}
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={value}
                aria-label={`${d.label}, ${value} out of 10`}
                className="qol-range"
                style={{
                  background: `linear-gradient(to right, var(--color-accent-primary) 0%, var(--color-accent-primary) ${value * 10}%, var(--color-border) ${value * 10}%, var(--color-border) 100%)`,
                  borderRadius: 999,
                  height: 6,
                  marginTop: 11,
                  marginBottom: 11,
                }}
              />
            </li>
          );
        })}
      </ol>

      <div
        className="mt-10 pt-6"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <p
          aria-live="polite"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 30,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Score: {touched ? total : "—"} / {MAX_TOTAL}
        </p>
        {touched ? (
          <>
            <p
              className="mt-1"
              style={{ color: "var(--color-text-secondary)", fontSize: 15 }}
            >
              {reading.heading}
            </p>
            <p className="mt-4" style={{ fontSize: 17, lineHeight: 1.65 }}>
              {reading.text}
            </p>
          </>
        ) : (
          <p
            className="mt-1"
            style={{ color: "var(--color-text-secondary)", fontSize: 15 }}
          >
            Move the sliders to score the week. Every one starts in the
            middle, so the total means nothing until you&apos;ve set them.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onDownload}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2.5"
          style={{
            backgroundColor: "var(--color-accent-primary)",
            color: "#fff",
            borderRadius: "var(--radius)",
            fontWeight: 600,
            fontSize: 15,
            opacity: busy ? 0.7 : 1,
          }}
        >
          <FileDown size={18} aria-hidden="true" />
          {busy ? "Preparing PDF…" : "Download as PDF"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2.5"
          style={{
            backgroundColor: "transparent",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          <RotateCcw size={18} aria-hidden="true" />
          Reset
        </button>
      </div>
      {pdfError && (
        <p
          role="alert"
          className="mt-3"
          style={{ color: "var(--color-error)", fontSize: 14 }}
        >
          {pdfError}
        </p>
      )}
      <p
        className="mt-6"
        style={{ color: "var(--color-text-secondary)", fontSize: 14 }}
      >
        The PDF has a space at the bottom for notes for the vet. Score again
        next week, and the week after. Three or four sheets side by side show
        what one sheet can&apos;t.
      </p>
    </section>
  );
}
