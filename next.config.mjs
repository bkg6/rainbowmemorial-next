/** @type {import('next').NextConfig} */

// Pull the R2 hostname out of R2_PUBLIC_URL at build time so next/image
// is allowed to load whatever public bucket the env points at. If the
// env var is missing during a local build, fall back to a permissive
// pattern so the build doesn't crash.
const r2PublicUrl = process.env.R2_PUBLIC_URL;
let r2Hostname = null;
if (r2PublicUrl) {
  try {
    r2Hostname = new URL(r2PublicUrl).hostname;
  } catch {
    r2Hostname = null;
  }
}

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(r2Hostname ? [{ protocol: "https", hostname: r2Hostname }] : []),
      // Permissive fallback so any pub-*.r2.dev bucket also works.
      { protocol: "https", hostname: "*.r2.dev" },
    ],
  },
  // Suppress the @vercel/og JSX type warning in lib/render.ts
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
