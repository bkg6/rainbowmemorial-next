import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/terms";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "Terms of Use — Rainbow Memorial";
const DESCRIPTION =
  "The terms under which Rainbow Memorial provides memorial pages and the content on this site.";

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

export default function TermsPage() {
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
        <h1 className="mb-10">Terms of Use</h1>

        <div className="space-y-6">
          <p>
            These are the terms you agree to by using Rainbow Memorial.
            They are in plain language. A formal version will follow;
            the substance below is what we operate under.
          </p>
        </div>

        <h2 className="mt-14 mb-6">Memorial pages</h2>
        <div className="space-y-6">
          <p>
            A memorial page is a one-time purchase. We commit to keeping
            your page online at its permanent URL for as long as Rainbow
            Memorial operates. If we ever need to shut the service down,
            we will give at least 90 days&apos; notice by email and
            provide an export of your page so you can save it.
          </p>
          <p>
            The content you upload — the photo, the name, the text —
            remains yours. By uploading it, you grant Rainbow Memorial
            the right to display it on the public URL you create. We do
            not use your content for any other purpose.
          </p>
        </div>

        <h2 className="mt-14 mb-6">Content we won&apos;t host</h2>
        <div className="space-y-6">
          <p>
            We reserve the right to remove memorial pages that contain
            content unrelated to memorializing a pet, that is illegal,
            that infringes copyright, or that is intended to harass.
            Removals in those cases will be communicated by email and
            refunded.
          </p>
        </div>

        <h2 className="mt-14 mb-6">Refunds</h2>
        <div className="space-y-6">
          <p>
            If you change your mind within 14 days of creating a
            memorial page, email{" "}
            <a
              href="mailto:hello@rainbow.memorial"
              className={linkClass}
              style={linkStyle}
            >
              hello@rainbow.memorial
            </a>{" "}
            and we&apos;ll refund the full purchase price and remove
            the page.
          </p>
        </div>

        <h2 className="mt-14 mb-6">The site itself</h2>
        <div className="space-y-6">
          <p>
            The poems, guides, and other writing on this site are
            written by Hannah Wright on behalf of Rainbow Memorial. They
            are free to read, print, share, and use at funerals or in
            cards. You do not need to credit us.
          </p>
          <p>
            The service is provided as-is. We don&apos;t guarantee
            uninterrupted availability, but we work hard to keep
            memorial pages online.
          </p>
        </div>

        <hr
          className="my-14"
          style={{ borderColor: "var(--color-border)" }}
        />

        <footer className="space-y-5 italic">
          <p>
            Questions about these terms:{" "}
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
