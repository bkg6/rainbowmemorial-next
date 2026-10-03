"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import type { ChecklistItem } from "../../quality-of-life-scale/pdf";

type Props =
  | { kind: "chart"; label: string }
  | { kind: "checklist"; label: string; items: ChecklistItem[] };

export default function PdfButton(props: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setError(null);
    try {
      const pdf = await import("../../quality-of-life-scale/pdf");
      if (props.kind === "chart") await pdf.downloadBlankChart(4);
      else await pdf.downloadChecklist(props.items);
    } catch {
      setError("The PDF didn't generate. You can print this page instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="my-6">
      <button
        type="button"
        onClick={onClick}
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
