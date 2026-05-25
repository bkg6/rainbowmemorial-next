import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/about";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "About Rainbow Memorial";
const DESCRIPTION =
  "Rainbow Memorial makes permanent memorial pages for the pets we have lost. The poems and guides on this site are written by Hannah Wright.";

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

export default function AboutPage() {
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
        <h1 className="mb-10">About Rainbow Memorial</h1>

        <div className="space-y-6">
          <p>
            Rainbow Memorial is a small project for making permanent
            memorial pages for the pets we have lost. We&apos;re not a
            marketplace and we&apos;re not a chain. We make a page for
            your pet that lives at its own permanent address and stays
            up, with a photo, their name, the years they were with you,
            and anything else you want to write. Once a year, on the day
            you lost them, an email arrives so you don&apos;t have to
            remember the date alone.
          </p>
          <p>
            The poems and guides on this site are written by Hannah
            Wright. She writes for people who have just lost a pet, in
            the hours and days when long reading is hard. Everything she
            writes is free to read, print, and share.
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
