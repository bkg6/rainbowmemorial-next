import type { ChecklistItem } from "../../quality-of-life-scale/pdf";

export const CHECKLIST: ChecklistItem[] = [
  {
    label: "Hurt",
    checks: [
      "Breathing is easy at rest, no panting while lying still",
      "Pain medication is still working by the time the next dose is due",
      "Lies down and gets up without a flinch, whimper, or long pause",
    ],
  },
  {
    label: "Hunger",
    checks: [
      "Ate from the bowl on their own, most meals this week",
      "Didn't need hand-feeding or a changed diet to get food in",
      "Weight is holding, as far as you can tell by hand",
    ],
  },
  {
    label: "Hydration",
    checks: [
      "Drinking from the bowl on their own",
      "If on fluids, the vet says they're keeping up",
      "Gums are moist, skin on the scruff springs back when lifted",
    ],
  },
  {
    label: "Hygiene",
    checks: [
      "Can get up and away from where they've soiled",
      "No sores, matting, or urine scald on the belly or legs",
      "You're not bathing them every day just to keep them clean",
    ],
  },
  {
    label: "Happiness",
    checks: [
      "Lifts their head or tail when you come in",
      "Still interested in the toy, the window, the other animals, the people",
      "Wants to be near you rather than hiding or lying apart",
    ],
  },
  {
    label: "Mobility",
    checks: [
      "Gets up on their own, or with a hand under the belly",
      "Walks to the bowl and the door without falling",
      "Still wants to go outside when the door opens",
    ],
  },
  {
    label: "More good days than bad",
    checks: [
      "Counting this week, the good days outnumbered the bad ones",
      "There was at least one day you'd call a normal day",
      "No night this week where you considered calling the emergency vet",
    ],
  },
];
