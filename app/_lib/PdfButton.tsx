"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import type { ChecklistItem } from "../quality-of-life-scale/pdf";

type Props =
  | { kind: "chart"; label: string }
  | { kind: "checklist"; label: string; items: ChecklistItem[] }
  | { kind: "card"; label: string; variant: number; ghost?: boolean };

export default function PdfButton(props: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setError(null);
    try {
      const pdf = await import("../quality-of-life-scale/pdf");
      if (props.kind === "chart") await pdf.downloadBlankChart(4);
      else if (props.kind === "checklist") await pdf.downloadChecklist(props.items);
      else {
        const card = await import("../pet-bereavement-card/cardPdf");
        await card.downloadCard(props.variant);
      }
    } catch {
      setError("The PDF didn't generate. You can print this page instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={props.kind === "card" ? "inline-block" : "my-6"}>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2.5"
        style={
          props.kind === "card" && props.ghost
            ? {
                backgroundColor: "transparent",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                fontWeight: 500,
                fontSize: 15,
                opacity: busy ? 0.7 : 1,
              }
            : {
                backgroundColor: "var(--color-accent-primary)",
                color: "#fff",
                borderRadius: "var(--radius)",
                fontWeight: 600,
                fontSize: 15,
                opacity: busy ? 0.7 : 1,
              }
        }
      >
        <FileDown size={18} aria-hidden="true" />
        {busy ? "Preparing PDF…" : props.label}
      </button>
      {error && (
        <p role="alert" className="mt-3" style={{ color: "var(--color-error)", fontSize: 14 }}>
          {error}
        </p>
      )}
    </div>
  );
}
