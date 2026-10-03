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

export type Reading = {
  min: number;
  max: number;
  heading: string;
  text: string;
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

export const READINGS: Reading[] = [
  {
    min: 56,
    max: 70,
    heading: "A good week",
    text: "This is a good week. Your dog is doing well across most of the seven areas. You may want to keep this scored somewhere as a baseline, so you have something to compare against later.",
  },
  {
    min: 42,
    max: 55,
    heading: "A mixed week",
    text: "This is a mixed week. Some areas are strong, others are struggling. Many families find it helpful to score once a week from here, and to bring the scores to a vet visit. Patterns over three or four weeks tell you more than any single week can.",
  },
  {
    min: 28,
    max: 41,
    heading: "A hard week",
    text: "This is a hard week. Several areas are showing real strain. This is the range where families often ask themselves harder questions, and where a conversation with your vet — bringing this scored sheet with you — is worth having soon.",
  },
  {
    min: 0,
    max: 27,
    heading: "A week of struggle",
    text: "This is a week where your dog is struggling in most of the ways this scale measures. There is no right answer here, and no scale can tell you what to do. What this score can tell you is that you're not making this call in a vacuum — the difficulty you're feeling is real, it is measurable, and other families in this position have found relief in bringing this sheet to their vet and asking the questions out loud.",
  },
];

export function totalOf(score: Score): number {
  return DIMENSIONS.reduce((sum, d) => sum + score[d.key], 0);
}

export function readingFor(total: number): Reading {
  return (
    READINGS.find((r) => total >= r.min && total <= r.max) ??
    READINGS[READINGS.length - 1]
  );
}
