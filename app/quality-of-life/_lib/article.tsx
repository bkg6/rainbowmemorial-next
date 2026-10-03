import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

export const OG_IMAGE = "/og/quality-of-life.jpg";
export const CLUSTER_DATE = "2026-10-03";
export const CLUSTER_DATE_HUMAN = "October 3, 2026";

export type FaqItem = { q: string; a: string };

export type ArticleSpec = {
  path: string;
  title: string;
  description: string;
  headline: string;
  datePublished: string;
  dateModified: string;
  faq: FaqItem[];
};

export function buildMetadata(spec: ArticleSpec): Metadata {
  const url = `${APP_URL}${spec.path}`;
  return {
    title: spec.title,
    description: spec.description,
    alternates: { canonical: spec.path },
    openGraph: {
      title: spec.title,
      description: spec.description,
      url,
      type: "article",
      siteName: "Rainbow Memorial",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: spec.title,
      description: spec.description,
    },
  };
}

export function articleJsonLd(spec: ArticleSpec) {
  const url = `${APP_URL}${spec.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: spec.headline,
    description: spec.description,
    author: { "@type": "Person", name: "Hannah Wright" },
    publisher: {
      "@type": "Organization",
      name: "Rainbow Memorial",
      url: APP_URL,
    },
    datePublished: spec.datePublished,
    dateModified: spec.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "WebPage",
      "@id": `${APP_URL}/quality-of-life-scale`,
      name: "Dog Quality of Life Scale",
    },
  };
}

export function faqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

export function A({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        style={linkStyle}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass} style={linkStyle}>
      {children}
    </Link>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-14 mb-6">{children}</h2>;
}

export function Section({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}

export function Faq({ faq }: { faq: FaqItem[] }) {
  return (
    <>
      <H2>Questions people sometimes ask</H2>
      <Section>
        {faq.map((item) => (
          <p key={item.q}>
            <strong>{item.q}</strong> {item.a}
          </p>
        ))}
      </Section>
    </>
  );
}

export function ArticleShell({
  spec,
  h1,
  children,
  lastUpdatedHuman,
}: {
  spec: ArticleSpec;
  h1: string;
  children: ReactNode;
  lastUpdatedHuman: string;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(spec)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(spec.faq)),
        }}
      />
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: "var(--color-background)",
          color: "var(--color-text-primary)",
        }}
      >
        <article
          className="rb-article mx-auto px-6 py-16 md:py-24"
          style={{ maxWidth: 720 }}
        >
          <h1 className="mb-8">{h1}</h1>
          {children}
          <Faq faq={spec.faq} />
          <hr
            className="my-14"
            style={{ borderColor: "var(--color-border)" }}
          />
          <footer className="space-y-5 italic">
            <p>
              Written by Hannah Wright, on behalf of Rainbow Memorial. Last
              updated {lastUpdatedHuman}.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
