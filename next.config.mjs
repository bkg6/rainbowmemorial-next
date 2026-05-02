/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.paws.memorial" },
    ],
  },
  // Suppress the @vercel/og JSX type warning in lib/render.ts
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
