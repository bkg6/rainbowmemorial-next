import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "paws.memorial — A tribute for your fur baby",
  description:
    "A dignified memorial post in 90 seconds. Upload your pet's photo, get a beautiful tribute ready to share on Instagram. $24.99 once. No subscription.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://paws.memorial"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
