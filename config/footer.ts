export type FooterLink = {
  label: string;
  href: string;
  live: boolean;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Rainbow Bridge",
    links: [
      { label: "Rainbow Bridge poem", href: "/rainbow-bridge", live: true },
      { label: "For dogs", href: "/rainbow-bridge/dogs", live: true },
      {
        label: "The short version",
        href: "/rainbow-bridge/short-version",
        live: true,
      },
      {
        label: "Who wrote it",
        href: "/rainbow-bridge/who-wrote-the-rainbow-bridge-poem",
        live: true,
      },
      { label: "For cats", href: "/rainbow-bridge/cats", live: false },
      {
        label: "Crossing the Rainbow Bridge",
        href: "/rainbow-bridge/crossing",
        live: false,
      },
    ],
  },
  {
    heading: "Pet Loss Poems",
    links: [
      { label: "Pet loss poems", href: "/poems-for-pet-loss", live: true },
      {
        label: "For a dog who passed away",
        href: "/poems/dog-passed-away",
        live: true,
      },
      {
        label: "For a cat who passed away",
        href: "/poems/cat-passed-away",
        live: false,
      },
      {
        label: "Loss of a pet poems",
        href: "/poems/loss-of-a-pet",
        live: false,
      },
      {
        label: "Poems for a dog funeral",
        href: "/poems/dog-funeral",
        live: false,
      },
    ],
  },
  {
    heading: "Sympathy & Memorial",
    links: [
      { label: "Pet sympathy", href: "/pet-sympathy", live: true },
      {
        label: "Pet bereavement cards",
        href: "/pet-bereavement-card",
        live: false,
      },
      { label: "Pet grief cards", href: "/pet-grief-cards", live: false },
      {
        label: "Sympathy messages",
        href: "/sympathy-message-for-pet-loss",
        live: false,
      },
      {
        label: "Pet memorial pages",
        href: "/pet-memorial-page",
        live: false,
      },
      // Flip to live: true when /memorials index ships
      { label: "Browse memorials", href: "/memorials", live: false },
    ],
  },
  {
    heading: "Goodbye Decisions",
    links: [
      {
        label: "Quality of Life Scale",
        href: "/quality-of-life-scale",
        live: true,
      },
      // Article spokes flip to live: true as they ship
      {
        label: "Quality of life checklist",
        href: "/quality-of-life/checklist",
        live: false,
      },
      {
        label: "Knowing when to say goodbye",
        href: "/quality-of-life/how-to-know-when-to-put-my-dog-down",
        live: false,
      },
      {
        label: "Saying goodbye to your dog",
        href: "/quality-of-life/saying-goodbye-to-your-dog",
        live: false,
      },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "Association for Pet Loss & Bereavement",
        href: "https://www.aplb.org",
        live: true,
        external: true,
      },
      {
        label: "Lap of Love hospice care",
        href: "https://www.lapoflove.com",
        live: true,
        external: true,
      },
      {
        label: "Loss of a Pet (Wallace Sife)",
        href: "https://www.aplb.org/loss-of-a-pet-book",
        live: true,
        external: true,
      },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About Rainbow Memorial", href: "/about", live: true },
      { label: "Contact", href: "/contact", live: true },
      { label: "Privacy policy", href: "/privacy", live: true },
      { label: "Terms of use", href: "/terms", live: true },
    ],
  },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rainbow Memorial",
  url: "https://rainbow.memorial",
  logo: "https://rainbow.memorial/logo.png",
  description:
    "Permanent online memorial pages for pets, with original pet loss poems and grief resources.",
  sameAs: ["https://www.instagram.com/rainbow.memorial/"],
};
