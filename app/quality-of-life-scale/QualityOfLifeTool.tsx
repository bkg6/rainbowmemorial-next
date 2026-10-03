"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, FileDown, RotateCcw, Pencil } from "lucide-react";
import {
  DIMENSIONS,
  EMPTY_DRAFT,
  MAX_TOTAL,
  MAX_VALUE,
  MIN_VALUE,
  bandFor,
  colorFor,
  colorForTone,
  isComplete,
  lowAreas,
  totalOf,
  type DimensionKey,
  type Draft,
} from "./types";

type Props = {
  /** One line shown under the heading on the first question. */
  intro?: string;
};

const VALUES = Array.from(
  { length: MAX_VALUE - MIN_VALUE + 1 },
  (_, i) => MIN_VALUE + i
);

const panel: React.CSSProperties = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius)",
};

const primaryBtn: React.CSSProperties = {
  backgroundColor: "var(--color-accent-primary)",
  color: "#fff",
  borderRadius: 999,
  fontWeight: 600,
  fontSize: 15,
  fontFamily: "var(--font-body)",
};

const ghostBtn: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "var(--color-text-primary)",
  border: "1px solid var(--color-border)",
  borderRadius: 999,
  fontWeight: 500,
  fontSize: 15,
  fontFamily: "var(--font-body)",
};

export default function QualityOfLifeTool({ intro }: Props) {
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0); // 0..6 questions, 7 = result
  const [busy, setBusy] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const answered = DIMENSIONS.filter((d) => draft[d.key] !== null).length;
  const onResult = step === DIMENSIONS.length;
  const current = onResult ? null : DIMENSIONS[step];
  const currentValue = current ? draft[current.key] : null;

  const result = useMemo(() => {
    if (!isComplete(draft)) return null;
    const total = totalOf(draft);
    const band = bandFor(total);
    const lows = lowAreas(draft);
    return { total, band, lows, text: band.text(lows) };
  }, [draft]);

  function pick(key: DimensionKey, value: number) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function next() {
    if (step < DIMENSIONS.length) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function startOver() {
    setDraft(EMPTY_DRAFT);
    setStep(0);
    setPdfError(null);
  }

  async function onDownload() {
    if (!isComplete(draft) || !result) return;
    setBusy(true);
    setPdfError(null);
    try {
      const { downloadScoreSheet } = await import("./pdf");
      await downloadScoreSheet(draft, new Date(), {
        bandName: result.band.name,
        reading: result.text,
      });
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
      {/* Progress */}
      <div
        className="flex items-center gap-1.5 mb-6"
        aria-hidden="true"
      >
        {DIMENSIONS.map((d, i) => {
          const v = draft[d.key];
          const isCurrent = i === step;
          return (
            <span
              key={d.key}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 999,
                backgroundColor:
                  v !== null
                    ? colorFor(v)
                    : isCurrent
                      ? "var(--color-text-tertiary)"
                      : "var(--color-border)",
                transition: "background-color 200ms",
              }}
            />
          );
        })}
      </div>

      {!onResult && current && (
        <div>
          <p
            className="mb-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
            }}
          >
            {step + 1} of {DIMENSIONS.length} · {current.label}
          </p>
          <h3
            id="qol-tool-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {current.question}
          </h3>
          {step === 0 && (
            <p
              className="mt-3"
              style={{ color: "var(--color-text-secondary)", fontSize: 15 }}
            >
              {intro ??
                "Seven questions about this past week, not today and not the dog they used to be. Pick a number for each. You'll see the score at the end."}
            </p>
          )}

          <div
            role="radiogroup"
            aria-label={`${current.label}, 1 to 10`}
            className="qol-chips mt-7"
          >
            {VALUES.map((v) => {
              const selected = currentValue === v;
              const color = colorFor(v);
              return (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => pick(current.key, v)}
                  className="qol-chip"
                  style={{
                    minWidth: 0,
                    height: 48,
                    borderRadius: 10,
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    border: `1.5px solid ${selected ? color : "var(--color-border)"}`,
                    backgroundColor: selected ? color : "var(--color-surface)",
                    color: selected ? "#fff" : "var(--color-text-secondary)",
                    boxShadow: selected ? `0 0 0 4px ${color}33` : "none",
                    transition: "all 120ms",
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>
          <div
            className="mt-2 flex justify-between"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--color-text-tertiary)",
            }}
          >
            <span>1 · as bad as it could be</span>
            <span>10 · a normal good week</span>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5"
              style={{ ...ghostBtn, opacity: step === 0 ? 0.4 : 1 }}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={currentValue === null}
              className="inline-flex items-center gap-2 px-5 py-2.5"
              style={{
                ...primaryBtn,
                opacity: currentValue === null ? 0.45 : 1,
                cursor: currentValue === null ? "not-allowed" : "pointer",
              }}
            >
              {step === DIMENSIONS.length - 1 ? "See the week" : "Next"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {onResult && result && (
        <div>
          <p
            className="mb-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
            }}
          >
            This week
          </p>
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3
              id="qol-tool-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: colorForTone(result.band.tone),
              }}
            >
              {result.band.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {result.total}
              <span style={{ color: "var(--color-text-tertiary)", fontWeight: 400 }}>
                {" "}
                / {MAX_TOTAL}
              </span>
            </p>
          </div>

          <p className="mt-5" style={{ fontSize: 18, lineHeight: 1.6 }}>
            {result.text}
          </p>

          <ul className="mt-7 space-y-2.5" aria-label="Score by area">
            {DIMENSIONS.map((d) => {
              const v = draft[d.key] as number;
              return (
                <li key={d.key} className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      width: 104,
                      flexShrink: 0,
                      color: "var(--color-text-secondary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {d.label === "More Good Days Than Bad" ? "Good days" : d.label}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: 1,
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: "var(--color-border)",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        height: "100%",
                        width: `${(v / MAX_VALUE) * 100}%`,
                        backgroundColor: colorFor(v),
                        borderRadius: 999,
                      }}
                    />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontWeight: 600,
                      width: 20,
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      color: colorFor(v),
                    }}
                  >
                    {v}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onDownload}
              disabled={busy}
              className="inline-flex items-center gap-2 px-5 py-2.5"
              style={{ ...primaryBtn, opacity: busy ? 0.7 : 1 }}
            >
              <FileDown size={18} aria-hidden="true" />
              {busy ? "Preparing PDF…" : "Download this week as PDF"}
            </button>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-2 px-4 py-2.5"
              style={ghostBtn}
            >
              <Pencil size={16} aria-hidden="true" />
              Change answers
            </button>
            <button
              type="button"
              onClick={startOver}
              className="inline-flex items-center gap-2 px-4 py-2.5"
              style={ghostBtn}
            >
              <RotateCcw size={16} aria-hidden="true" />
              Start over
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
            The PDF has the seven scores, today&apos;s date, and room for
            notes for the vet. Nothing is saved here. Score again next week;
            the pattern is the part that matters.
          </p>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {onResult && result
          ? `Result: ${result.band.name}, ${result.total} of ${MAX_TOTAL}.`
          : `Question ${step + 1} of ${DIMENSIONS.length}. ${answered} answered.`}
      </p>
    </section>
  );
}
