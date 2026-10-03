import {
  DIMENSIONS,
  READINGS,
  MAX_TOTAL,
  readingFor,
  totalOf,
  type Score,
} from "./types";

const INK = { r: 0.165, g: 0.122, b: 0.094 }; // #2A1F18
const MUTED = { r: 0.478, g: 0.416, b: 0.361 }; // #7A6A5C
const RULE = { r: 0.93, g: 0.89, b: 0.835 }; // #EDE3D5
const FOOTER_LINE = "Scored at rainbow.memorial — a place to remember.";

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function wrap(
  text: string,
  maxWidth: number,
  size: number,
  widthOf: (t: string, s: number) => number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (widthOf(next, size) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function download(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * One-page portrait score sheet: seven scored dimensions, total, date,
 * and a blank area for notes for the vet. No CTA.
 */
export async function downloadScoreSheet(score: Score, date = new Date()) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  doc.setTitle("Dog Quality of Life Scale — score sheet");
  doc.setAuthor("Rainbow Memorial");
  const page = doc.addPage([612, 792]); // US Letter
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const ink = rgb(INK.r, INK.g, INK.b);
  const muted = rgb(MUTED.r, MUTED.g, MUTED.b);
  const rule = rgb(RULE.r, RULE.g, RULE.b);
  const margin = 56;
  const width = 612 - margin * 2;
  let y = 792 - margin;

  page.drawText("Dog Quality of Life Scale", {
    x: margin,
    y,
    size: 24,
    font: serif,
    color: ink,
  });
  y -= 20;
  page.drawText(`Scored on ${formatDate(date)}`, {
    x: margin,
    y,
    size: 11,
    font: sans,
    color: muted,
  });
  y -= 14;
  page.drawText(
    "Each area is scored 0 to 10. Higher is better. Built on the HHHHHMM scale by Dr. Alice Villalobos.",
    { x: margin, y, size: 9.5, font: sans, color: muted }
  );
  y -= 26;

  const widthOfSans = (t: string, s: number) => sans.widthOfTextAtSize(t, s);
  for (const d of DIMENSIONS) {
    page.drawLine({
      start: { x: margin, y: y + 8 },
      end: { x: margin + width, y: y + 8 },
      thickness: 0.6,
      color: rule,
    });
    y -= 10;
    page.drawText(d.label, {
      x: margin,
      y,
      size: 12,
      font: sansBold,
      color: ink,
    });
    const scoreText = `${score[d.key]} / 10`;
    page.drawText(scoreText, {
      x: margin + width - sansBold.widthOfTextAtSize(scoreText, 12),
      y,
      size: 12,
      font: sansBold,
      color: ink,
    });
    y -= 14;
    for (const line of wrap(d.question, width - 60, 9.5, widthOfSans)) {
      page.drawText(line, { x: margin, y, size: 9.5, font: sans, color: muted });
      y -= 12;
    }
    y -= 8;
  }

  page.drawLine({
    start: { x: margin, y: y + 8 },
    end: { x: margin + width, y: y + 8 },
    thickness: 1,
    color: ink,
  });
  y -= 14;
  const total = totalOf(score);
  const totalText = `Total: ${total} / ${MAX_TOTAL}`;
  page.drawText(totalText, {
    x: margin,
    y,
    size: 15,
    font: serif,
    color: ink,
  });
  y -= 16;
  const reading = readingFor(total);
  page.drawText(reading.heading, {
    x: margin,
    y,
    size: 10.5,
    font: serifItalic,
    color: muted,
  });
  y -= 24;

  page.drawText("Notes for the vet", {
    x: margin,
    y,
    size: 12,
    font: sansBold,
    color: ink,
  });
  y -= 18;
  const lineGap = 22;
  while (y > margin + 40) {
    page.drawLine({
      start: { x: margin, y },
      end: { x: margin + width, y },
      thickness: 0.5,
      color: rule,
    });
    y -= lineGap;
  }

  page.drawText(FOOTER_LINE, {
    x: margin,
    y: margin - 10,
    size: 9,
    font: serifItalic,
    color: muted,
  });

  const bytes = await doc.save();
  const stamp = date.toISOString().slice(0, 10);
  download(bytes, `dog-quality-of-life-score-${stamp}.pdf`);
}

/**
 * Landscape one-page chart: the seven dimensions with blank score boxes,
 * plus the four score ranges printed. Meant for the fridge or the vet visit.
 */
export async function downloadBlankChart(weeks = 4) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  doc.setTitle("Dog Quality of Life Chart");
  doc.setAuthor("Rainbow Memorial");
  const page = doc.addPage([792, 612]); // Letter landscape
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(INK.r, INK.g, INK.b);
  const muted = rgb(MUTED.r, MUTED.g, MUTED.b);
  const rule = rgb(RULE.r, RULE.g, RULE.b);

  const margin = 48;
  const width = 792 - margin * 2;
  let y = 612 - margin;

  page.drawText("Dog Quality of Life Chart", {
    x: margin,
    y,
    size: 22,
    font: serif,
    color: ink,
  });
  y -= 16;
  page.drawText(
    "Score each area 0 to 10 once a week. Higher is better. Add the column for the week's total out of 70.",
    { x: margin, y, size: 9.5, font: sans, color: muted }
  );
  y -= 28;

  const labelCol = 250;
  const colW = (width - labelCol) / weeks;
  const rowH = 34;

  // Header row
  page.drawText("Week of", {
    x: margin + labelCol + 6,
    y: y + 4,
    size: 8.5,
    font: sans,
    color: muted,
  });
  for (let i = 0; i < weeks; i++) {
    const x = margin + labelCol + i * colW;
    page.drawLine({
      start: { x: x + 44, y: y + 2 },
      end: { x: x + colW - 8, y: y + 2 },
      thickness: 0.5,
      color: rule,
    });
  }
  y -= 14;

  const rows = [
    ...DIMENSIONS.map((d) => ({ label: d.label, sub: d.question, bold: false })),
    { label: "Total / 70", sub: "", bold: true },
  ];
  const widthOfSans = (t: string, s: number) => sans.widthOfTextAtSize(t, s);

  for (const row of rows) {
    page.drawLine({
      start: { x: margin, y },
      end: { x: margin + width, y },
      thickness: row.bold ? 1 : 0.6,
      color: row.bold ? ink : rule,
    });
    const textY = y - 14;
    page.drawText(row.label, {
      x: margin,
      y: textY,
      size: 11,
      font: sansBold,
      color: ink,
    });
    if (row.sub) {
      const lines = wrap(row.sub, labelCol - 12, 7.5, widthOfSans).slice(0, 2);
      let sy = textY - 10;
      for (const line of lines) {
        page.drawText(line, { x: margin, y: sy, size: 7.5, font: sans, color: muted });
        sy -= 9;
      }
    }
    for (let i = 0; i < weeks; i++) {
      const x = margin + labelCol + i * colW;
      page.drawRectangle({
        x: x + 6,
        y: y - rowH + 6,
        width: colW - 14,
        height: rowH - 12,
        borderColor: rule,
        borderWidth: 0.6,
      });
    }
    y -= rowH;
  }
  page.drawLine({
    start: { x: margin, y },
    end: { x: margin + width, y },
    thickness: 1,
    color: ink,
  });
  y -= 22;

  page.drawText("What the totals have meant for other families", {
    x: margin,
    y,
    size: 11,
    font: sansBold,
    color: ink,
  });
  y -= 15;
  for (const r of READINGS) {
    const range = `${r.min}–${r.max}`;
    page.drawText(range, {
      x: margin,
      y,
      size: 9.5,
      font: sansBold,
      color: ink,
    });
    page.drawText(r.heading, {
      x: margin + 44,
      y,
      size: 9.5,
      font: sans,
      color: ink,
    });
    y -= 12;
  }
  y -= 4;
  page.drawText(
    "No total is a verdict. Patterns over three or four weeks tell you more than any single week. Bring the sheet to your vet.",
    { x: margin, y, size: 8.5, font: serifItalic, color: muted }
  );

  page.drawText(FOOTER_LINE, {
    x: margin,
    y: margin - 14,
    size: 9,
    font: serifItalic,
    color: muted,
  });
  page.drawText("Built on the HHHHHMM scale by Dr. Alice Villalobos (Pawspice).", {
    x: margin + width - sans.widthOfTextAtSize("Built on the HHHHHMM scale by Dr. Alice Villalobos (Pawspice).", 8),
    y: margin - 14,
    size: 8,
    font: sans,
    color: muted,
  });

  const bytes = await doc.save();
  download(bytes, "dog-quality-of-life-chart.pdf");
}
