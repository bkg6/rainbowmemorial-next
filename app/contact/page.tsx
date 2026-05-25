import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/contact";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "Contact Rainbow Memorial";
const DESCRIPTION =
  "Contact Rainbow Memorial for questions, corrections, content requests, or support with a memorial page.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: "Rainbow Memorial",
  },
};

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

export default function ContactPage() {
  return (
    <main
      className="min-h-screen w-full"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-display)",
      }}
    >
      <article
        className="mx-auto px-6 py-16 md:py-24"
        style={{ maxWidth: 680 }}
      >
        <h1 className="mb-10">Contact</h1>

        <div className="space-y-6">
          <p>
            For anything — questions, corrections, requests for new
            content, or support with a memorial page you&apos;ve made —
            email{" "}
            <a
              href="mailto:hello@rainbow.memorial"
              className={linkClass}
              style={linkStyle}
            >
              hello@rainbow.memorial
            </a>
            . We read every message. Replies usually come within a day or
            two.
          </p>
        </div>

        <hr
          className="my-14"
          style={{ borderColor: "var(--color-border)" }}
        />

        <footer className="space-y-5 italic">
          <p>Written by Hannah Wright, on behalf of Rainbow Memorial.</p>
        </footer>
      </article>
    </main>
  );
}
