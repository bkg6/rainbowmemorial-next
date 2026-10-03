import { CARDS } from "./cards";

const INK = { r: 0.165, g: 0.122, b: 0.094 };
const MUTED = { r: 0.478, g: 0.416, b: 0.361 };
const ACCENT = { r: 0.788, g: 0.482, b: 0.388 };

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
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Half-fold card on US Letter, landscape. Page 1 is the outside (back left,
 * front right). Page 2 is the inside (blank left for writing, printed
 * message right). Print double-sided, flip on the long edge, fold down the
 * middle.
 */
export async function downloadCard(variant: number) {
  const card = CARDS[variant] ?? CARDS[0];
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  doc.setTitle(`Pet bereavement card — ${card.name}`);
  doc.setAuthor("Rainbow Memorial");
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const ink = rgb(INK.r, INK.g, INK.b);
  const muted = rgb(MUTED.r, MUTED.g, MUTED.b);
  const accent = rgb(ACCENT.r, ACCENT.g, ACCENT.b);

  const W = 792;
  const H = 612;
  const half = W / 2;
  const pad = 54;
  const panelW = half - pad * 2;

  // Page 1: outside
  const p1 = doc.addPage([W, H]);
  // front (right half): centred line, small rule above
  const frontSize = 22;
  const frontLines = wrap(card.front, panelW, frontSize, (t, s) =>
    serif.widthOfTextAtSize(t, s)
  );
  let fy = H / 2 + (frontLines.length * frontSize) / 2;
  p1.drawLine({
    start: { x: half + half / 2 - 18, y: fy + 26 },
    end: { x: half + half / 2 + 18, y: fy + 26 },
    thickness: 1,
    color: accent,
  });
  for (const line of frontLines) {
    const w = serif.widthOfTextAtSize(line, frontSize);
    p1.drawText(line, {
      x: half + (half - w) / 2,
      y: fy - frontSize,
      size: frontSize,
      font: serif,
      color: ink,
    });
    fy -= frontSize * 1.35;
  }
  // back (left half): tiny footer
  const foot = "rainbow.memorial — a place to remember";
  const fw = serifItalic.widthOfTextAtSize(foot, 8.5);
  p1.drawText(foot, {
    x: (half - fw) / 2,
    y: 40,
    size: 8.5,
    font: serifItalic,
    color: muted,
  });

  // Page 2: inside
  const p2 = doc.addPage([W, H]);
  const size = 13;
  const lineH = size * 1.5;
  const paraGap = lineH * 0.8;
  const paras = card.inside.map((p) =>
    wrap(p, panelW, size, (t, s) => serif.widthOfTextAtSize(t, s))
  );
  const totalLines = paras.reduce((n, p) => n + p.length, 0);
  const blockH = totalLines * lineH + (paras.length - 1) * paraGap;
  let y = H / 2 + blockH / 2 + 40;
  for (const para of paras) {
    for (const line of para) {
      p2.drawText(line, {
        x: half + pad,
        y,
        size,
        font: serif,
        color: ink,
      });
      y -= lineH;
    }
    y -= paraGap;
  }
  // a short rule, then space to sign
  p2.drawLine({
    start: { x: half + pad, y: y - 6 },
    end: { x: half + pad + 36, y: y - 6 },
    thickness: 1,
    color: accent,
  });
  p2.drawText("Print double-sided, flip on the long edge, fold down the middle.", {
    x: pad,
    y: 40,
    size: 7.5,
    font: sans,
    color: muted,
  });

  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pet-bereavement-card-${variant + 1}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
