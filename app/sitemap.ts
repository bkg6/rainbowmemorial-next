import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${APP_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${APP_URL}/create`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/rainbow-bridge`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/poems-for-pet-loss`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/poems/dog-passed-away`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/pet-sympathy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/rainbow-bridge/who-wrote-the-rainbow-bridge-poem`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/rainbow-bridge/dogs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/rainbow-bridge/short-version`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${APP_URL}/quality-of-life-scale`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/quality-of-life/checklist`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/how-to-know-when-to-put-my-dog-down`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/quiz`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/when-to-euthanize-dog-with-cancer`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/senior-dog`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/chart`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/how-to-know-when-to-euthanize-dog`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/questionnaire`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/saying-goodbye-to-your-dog`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/quality-of-life/when-to-euthanize-dog-with-kidney-failure`,
      lastModified: new Date("2026-10-03"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${APP_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${APP_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${APP_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
