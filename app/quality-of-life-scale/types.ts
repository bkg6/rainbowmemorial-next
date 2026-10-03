export type DimensionKey =
  | "hurt"
  | "hunger"
  | "hydration"
  | "hygiene"
  | "happiness"
  | "mobility"
  | "moreGoodDays";

export type Dimension = {
  key: DimensionKey;
  label: string;
  question: string;
};

export type Score = Record<DimensionKey, number>;
/** Partial score while the user is still answering. */
export type Draft = Record<DimensionKey, number | null>;

export const MIN_VALUE = 1;
export const MAX_VALUE = 10;

export type Tone = "good" | "watch" | "hard";

export type Band = {
  min: number;
  max: number;
  /** Short, exact name shown as the result headline. */
  name: string;
  tone: Tone;
  /** Contextual reading. `lows` are the names of the lowest-scored areas (score 5 or under), up to three. */
  text: (lows: string[]) => string;
};

export const DIMENSIONS: Dimension[] = [
  {
    key: "hurt",
    label: "Hurt",
    question:
      "How well can your dog breathe, and is their pain controlled with the medications they're on?",
  },
  {
    key: "hunger",
    label: "Hunger",
    question: "Is your dog eating enough on their own?",
  },
  {
    key: "hydration",
    label: "Hydration",
    question: "Is your dog drinking, or receiving fluids?",
  },
  {
    key: "hygiene",
    label: "Hygiene",
    question: "Can they stay clean, or is soiling a daily struggle?",
  },
  {
    key: "happiness",
    label: "Happiness",
    question:
      "Do they still respond to the people and things they used to love?",
  },
  {
    key: "mobility",
    label: "Mobility",
    question: "Can they get up and move on their own, even with help?",
  },
  {
    key: "moreGoodDays",
    label: "More Good Days Than Bad",
    question:
      "In the last week, have there been more good days than bad ones?",
  },
];

export const EMPTY_DRAFT: Draft = {
  hurt: null,
  hunger: null,
  hydration: null,
  hygiene: null,
  happiness: null,
  mobility: null,
  moreGoodDays: null,
};

/** Only for the PDF smoke test and previews. */
export const DEFAULT_SCORE: Score = {
  hurt: 5,
  hunger: 5,
  hydration: 5,
  hygiene: 5,
  happiness: 5,
  mobility: 5,
  moreGoodDays: 5,
};

export const MAX_TOTAL = DIMENSIONS.length * 10;

function joinLows(lows: string[]): string {
  if (lows.length === 0) return "";
  if (lows.length === 1) return lows[0];
  if (lows.length === 2) return `${lows[0]} and ${lows[1]}`;
  return `${lows[0]}, ${lows[1]} and ${lows[2]}`;
}

export const BANDS: Band[] = [
  {
    min: 61,
    max: 70,
    name: "A good week",
    tone: "good",
    text: (lows) =>
      lows.length === 0
        ? "Your dog is doing well in every area this scale measures. Keep this sheet. Score again next Sunday, and the one after. If the number holds, it holds, and you can stop bracing for a while."
        : `Your dog is doing well almost everywhere. ${joinLows(lows)} dipped, and that is worth a glance, not a worry. Keep this sheet as the baseline and score again next week. If the number holds, you can stop bracing for a while.`,
  },
  {
    min: 50,
    max: 60,
    name: "Mostly well",
    tone: "good",
    text: (lows) =>
      lows.length === 0
        ? "Most of the week was fine, and nothing is badly wrong. A few areas are a little lower than they could be. Score once a week from here so you can see whether this is a blip or the start of something, and mention it at the next routine vet visit."
        : `Most of the week was fine. ${joinLows(lows)} came in lowest, and that is worth watching, not fearing. Score once a week from here. If the same area is still down in three weeks, bring the sheets to your vet and ask about it.`,
  },
  {
    min: 38,
    max: 49,
    name: "A mixed week",
    tone: "watch",
    text: (lows) =>
      `Some areas are holding and some are not${lows.length ? `, mostly ${joinLows(lows)}` : ""}. This is not the week to decide anything. It is the week to start keeping sheets. Three or four side by side will tell you what this one can't. If the line keeps sliding, take them to your vet.`,
  },
  {
    min: 25,
    max: 37,
    name: "A hard week",
    tone: "hard",
    text: (lows) =>
      `${lows.length ? `${joinLows(lows)} ${lows.length === 1 ? "is" : "are"} under real strain. ` : "Several areas are under real strain. "}You are not imagining it, and you did not cause it. This is the range where families book the vet conversation, not for a verdict, but with this sheet in hand so it starts from what you have both seen. Book it this week.`,
  },
  {
    min: 7,
    max: 24,
    name: "A week of struggle",
    tone: "hard",
    text: () =>
      "Most of what this scale measures is hard for your dog right now. No score makes the decision, and no one here will make it for you. What this one says is that what you are feeling is real and it is measurable. Take this sheet to your vet soon and ask the questions out loud. You do not have to carry this one alone.",
  },
];

/**
 * Names of the areas that pulled the score down, lowest first, up to three.
 * Areas at 5 or under always count; if none are that low, the lowest areas
 * under 8 are named instead so the reading can still point somewhere.
 */
export function lowAreas(score: Score): string[] {
  const ranked = DIMENSIONS.map((d) => ({ label: d.label, v: score[d.key] })).sort(
    (a, b) => a.v - b.v
  );
  const low = ranked.filter((x) => x.v <= 5).slice(0, 3);
  if (low.length > 0) return low.map((x) => x.label);
  return ranked.filter((x) => x.v < 8).slice(0, 2).map((x) => x.label);
}

export function bandFor(total: number): Band {
  return BANDS.find((b) => total >= b.min && total <= b.max) ?? BANDS[BANDS.length - 1];
}

/** Colour for a 1–10 value. Red low, amber middle, green high. Site palette. */
export function colorFor(value: number): string {
  if (value <= 3) return "#C8786E";
  if (value <= 6) return "#D4A574";
  return "#7FA183";
}

export function colorForTone(tone: Tone): string {
  if (tone === "good") return "#7FA183";
  if (tone === "watch") return "#D4A574";
  return "#C8786E";
}

export function totalOf(score: Score): number {
  return DIMENSIONS.reduce((sum, d) => sum + score[d.key], 0);
}

export function isComplete(draft: Draft): draft is Score {
  return DIMENSIONS.every((d) => draft[d.key] !== null);
}
