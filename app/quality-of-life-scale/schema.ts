const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

export const PAGE_PATH = "/quality-of-life-scale";
export const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

export const TITLE = "Dog Quality of Life Scale — A Way to See the Week Clearly";
export const DESCRIPTION =
  "A quality of life scale for dogs, built on Dr. Alice Villalobos's HHHHHMM framework. Score your dog's week across seven dimensions. Free, no signup.";

export const DATE_PUBLISHED = "2026-10-03";
export const DATE_MODIFIED = "2026-10-03";

const AUTHOR = { "@type": "Person", name: "Hannah Wright" };
const PUBLISHER = {
  "@type": "Organization",
  name: "Rainbow Memorial",
  url: APP_URL,
};

export type FaqItem = { q: string; a: string };

export const FAQ: FaqItem[] = [
  {
    q: "What score means it's time to say goodbye?",
    a: "There is no such score. The scale is a framework for seeing the week; the decision is yours, made in partnership with your vet.",
  },
  {
    q: "How often should I score my dog?",
    a: "Weekly is common. Some families score daily during a hard week and weekly otherwise. Whatever helps you see the pattern.",
  },
  {
    q: "Is this scale for cats too?",
    a: "The HHHHHMM framework was designed for dogs and cats. This page is written for dogs; a cat version is coming.",
  },
  {
    q: "Can I bring this to my vet?",
    a: "Yes. That is what many families do. Download the PDF and hand it to your vet at the appointment.",
  },
  {
    q: "Why does this exist?",
    a: "Because seeing a week in numbers is different from remembering it in feelings. When every day feels the same, the scale gives you something to point at.",
  },
];

export const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Dog Quality of Life Scale",
  description: DESCRIPTION,
  author: AUTHOR,
  publisher: PUBLISHER,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  about: {
    "@type": "Thing",
    name: "HHHHHMM Quality of Life Scale",
    description:
      "A seven-dimension quality of life assessment for dogs and cats created by veterinarian Dr. Alice Villalobos.",
  },
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dog Quality of Life Scale",
  url: PAGE_URL,
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "An interactive version of the HHHHHMM quality of life scale. Score seven dimensions of a dog's week, see the total, and download a printable sheet to bring to the vet.",
  author: AUTHOR,
  publisher: PUBLISHER,
};

export function faqForSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
