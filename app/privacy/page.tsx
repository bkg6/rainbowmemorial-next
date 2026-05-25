import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/privacy";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "Privacy Policy — Rainbow Memorial";
const DESCRIPTION =
  "How Rainbow Memorial handles the photos, names, and emails associated with the memorial pages our visitors create.";

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

export default function PrivacyPage() {
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
        <h1 className="mb-10">Privacy Policy</h1>

        <div className="space-y-6">
          <p>
            This is a plain-language summary of what Rainbow Memorial
            stores and why. A full legal version will follow.
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Last updated: May 26, 2026
          </p>
        </div>

        <h2 className="mt-14 mb-6">What we store</h2>
        <div className="space-y-6">
          <p>
            <strong>The photo and text you upload.</strong> When you
            create a memorial page, the photo and the text you write are
            stored on Cloudflare R2 and in our database so the page can
            be displayed at its permanent URL. The page is public by
            default at that URL.
          </p>
          <p>
            <strong>Your email address.</strong> We store the email you
            give us at checkout so we can send you the link to your
            memorial page and a single anniversary reminder a year later.
            We do not sell, share, or send marketing email to that
            address.
          </p>
          <p>
            <strong>Payment information.</strong> Payments are processed
            by Stripe. We never see or store your card details. We
            receive only a Stripe customer reference and the fact that a
            payment succeeded.
          </p>
        </div>

        <h2 className="mt-14 mb-6">What we don&apos;t do</h2>
        <div className="space-y-6">
          <p>
            We don&apos;t run third-party advertising trackers. We
            don&apos;t sell data. We don&apos;t use the photos or text
            you upload to train AI models.
          </p>
        </div>

        <h2 className="mt-14 mb-6">Deletion</h2>
        <div className="space-y-6">
          <p>
            If you want a memorial page removed or your email purged,
            email{" "}
            <a
              href="mailto:hello@rainbow.memorial"
              className={linkClass}
              style={linkStyle}
            >
              hello@rainbow.memorial
            </a>{" "}
            and we&apos;ll handle it within a few days. There is no
            charge for deletion.
          </p>
        </div>

        <hr
          className="my-14"
          style={{ borderColor: "var(--color-border)" }}
        />

        <footer className="space-y-5 italic">
          <p>
            Questions about this policy:{" "}
            <a
              href="mailto:hello@rainbow.memorial"
              className={linkClass}
              style={linkStyle}
            >
              hello@rainbow.memorial
            </a>
            .
          </p>
        </footer>
      </article>
    </main>
  );
}
