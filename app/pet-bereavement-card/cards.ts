export type CardVariant = {
  id: number;
  name: string;
  /** Who it suits, shown on the page. */
  forWhom: string;
  front: string;
  inside: string[];
};

export const CARDS: CardVariant[] = [
  {
    id: 0,
    name: "For the pet who was yours",
    forWhom: "For most losses. A friend, a neighbour, a colleague.",
    front: "For the pet who was yours.",
    inside: [
      "They were not just a pet.",
      "They were the one who waited at the door, who knew your step on the stairs, who was there for all the ordinary days.",
      "I'm sorry they're gone. I'm here for the days after.",
    ],
  },
  {
    id: 1,
    name: "You did the kindest thing",
    forWhom: "When the family had to make the decision.",
    front: "You did the kindest thing.",
    inside: [
      "Choosing the day for them, so they would not have to suffer through it, is the hardest kind of love there is.",
      "You did that.",
      "I'm sorry it had to be you, and I'm glad it was you.",
    ],
  },
  {
    id: 2,
    name: "Thinking of you, and of them",
    forWhom: "Quieter. For cats, for older people, for someone who lives alone.",
    front: "Thinking of you, and of them.",
    inside: [
      "The house is going to be too quiet for a while.",
      "When you want to talk about them, I want to hear it. Say their name as often as you need to.",
      "I'll say it too.",
    ],
  },
];
