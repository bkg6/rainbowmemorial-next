import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { organizationJsonLd } from "@/config/footer";

export const metadata: Metadata = {
  title: "Rainbow Memorial — A Place to Remember the Pet You Lost",
  description:
    "Make a permanent memorial page for the pet you lost. Upload one photo. We'll make a tribute that lives at its own link, yours to keep and share. $24.99 once.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial"
  ),
  openGraph: {
    title: "Rainbow Memorial — A Place to Remember the Pet You Lost",
    description:
      "Make a permanent memorial page for the pet you lost. Upload one photo. We'll make a tribute that lives at its own link, yours to keep and share. $24.99 once.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1768676758480-44e11e5c164a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1200&h=630",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
