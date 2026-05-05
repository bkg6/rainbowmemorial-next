/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.rainbow.memorial" },
    ],
  },
  // Suppress the @vercel/og JSX type warning in lib/render.ts
  typescript: {
    ignoreBuildErrors: false,
  },
  // Temporary 307 redirects for the Pillar 1 spoke pages that haven't been
  // built yet. The hub page at /rainbow-bridge links to all of these. Until
  // each spoke is written, send the user to /create rather than 404. Replace
  // these with real pages over the coming weeks; remove the redirect when the
  // page exists. permanent: false is required — these become real URLs later.
  async redirects() {
    return [
      {
        source: "/rainbow-bridge/who-wrote-the-rainbow-bridge-poem",
        destination: "/create",
        permanent: false,
      },
      {
        source: "/rainbow-bridge/dogs",
        destination: "/create",
        permanent: false,
      },
      {
        source: "/rainbow-bridge/cats",
        destination: "/create",
        permanent: false,
      },
      {
        source: "/rainbow-bridge/short-version",
        destination: "/create",
        permanent: false,
      },
      {
        source: "/poems-for-pet-loss",
        destination: "/create",
        permanent: false,
      },
      {
        source: "/pet-bereavement-card",
        destination: "/create",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
