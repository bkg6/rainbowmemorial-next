import type { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Memorial pages and API routes are user-data; let crawlers find
        // /, /create, and /rainbow-bridge but skip the rest.
        disallow: ["/api/", "/success", "/m/"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
