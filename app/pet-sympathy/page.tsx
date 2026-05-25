import type { Metadata } from "next";
import Link from "next/link";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";
const PAGE_PATH = "/pet-sympathy";
const PAGE_URL = `${APP_URL}${PAGE_PATH}`;

const TITLE = "Pet Sympathy — What to Say, Send, and Do When a Pet Dies";
const DESCRIPTION =
  "Pet sympathy guide for people who lost a pet and for friends who want to support them. What to say, what to send, and how to make a lasting memorial.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    siteName: "Rainbow Memorial",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  author: { "@type": "Person", name: "Hannah Wright" },
  publisher: {
    "@type": "Organization",
    name: "Rainbow Memorial",
    url: APP_URL,
  },
  datePublished: "2026-05-26",
  dateModified: "2026-05-26",
  description: DESCRIPTION,
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What do you say to someone whose pet just died?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Say the pet's name. 'I'm so sorry [Name] is gone' is enough. Avoid 'it's just a pet' or 'you can get another one.' The pet was real and so is the loss.",
      },
    },
    {
      "@type": "Question",
      name: "Is it appropriate to send flowers for pet loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Flowers, cards, a meal dropped off, or a small donation to a rescue in the pet's name are all appropriate. There is no rule against acknowledging a pet's death the same way you would acknowledge a person's.",
      },
    },
    {
      "@type": "Question",
      name: "How long should I wait before checking in on someone who lost a pet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Don't wait. A short text the same day, a card within the week, and another check-in a month later all matter. The lonely part of pet grief is often the second and third month, when other people have moved on.",
      },
    },
    {
      "@type": "Question",
      name: "Can I make a memorial page for someone else's pet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can create the page and send the link to the family. They can edit the photo, name, and text if they want, or leave it as you made it.",
      },
    },
    {
      "@type": "Question",
      name: "What if I didn't know the pet well?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's still appropriate to acknowledge the loss. A short message from someone who barely knew the pet often lands harder than a long message from someone trying to perform grief they didn't feel.",
      },
    },
  ],
};

const linkClass = "underline underline-offset-4 hover:no-underline";
const linkStyle = { color: "var(--color-accent-primary)" };

export default function PetSympathyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
          <h1 className="mb-10">Pet Sympathy</h1>

          <div className="space-y-6">
            <p>
              Pet sympathy is the support you offer to someone whose pet
              has died, or that you yourself need after losing a pet. The
              death of a pet is treated by many as a smaller loss than it
              is. For the person who lost them, it is not small. This page
              is for both situations — for the person grieving, and for
              the person trying to help.
            </p>
          </div>

          <h2 className="mt-14 mb-6">If your pet died</h2>
          <div className="space-y-6">
            <p>
              We&apos;re sorry. The pain you&apos;re feeling is real. The
              dog or cat or rabbit or horse who is gone was real, and what
              they meant to you was real. You don&apos;t have to do
              anything tonight except be in a room with the people who
              love you, or by yourself if that is what you need.
            </p>
            <p>
              If you want a place where their photo and name will live
              permanently, you can{" "}
              <Link href="/create" className={linkClass} style={linkStyle}>
                make a memorial page for your pet
              </Link>
              . It has a permanent address, it stays up, and a year from
              now on the day you lost them, an email will arrive so you
              don&apos;t have to remember the date alone.
            </p>
            <p>
              For poems written for this moment,{" "}
              <Link
                href="/rainbow-bridge"
                className={linkClass}
                style={linkStyle}
              >
                the Rainbow Bridge tradition
              </Link>{" "}
              or{" "}
              <Link
                href="/poems-for-pet-loss"
                className={linkClass}
                style={linkStyle}
              >
                other pet loss poems
              </Link>{" "}
              may meet you.
            </p>
          </div>

          <h2 className="mt-14 mb-6">If someone you love lost their pet</h2>
          <div className="space-y-6">
            <p>
              This is the part most of us were not taught. We learn what
              to do when a person&apos;s grandmother dies. We do not learn
              what to do when their dog of fourteen years dies. The
              instinct to say &quot;it&apos;s just a pet&quot; is wrong,
              and most people who have lost a pet remember exactly who
              said that to them.
            </p>
            <p>
              The short answer is the same kind of acknowledgement that
              matters for any death matters here. The smallest thing you
              do — a text the same day, a card later in the week, a meal
              dropped at the door, a memorial page — counts.
            </p>
            <p>A few specific things that help:</p>
            {/* TODO: wrap "Pet bereavement cards" in a link to /pet-bereavement-card when shipped */}
            <p>
              <strong>A card.</strong> A handwritten card matters more
              than a long text message. Pet bereavement cards specifically
              tend to read warmer than general sympathy cards because they
              were designed for this loss. A simple card with the
              pet&apos;s name written inside is enough.
            </p>
            {/* TODO: wrap "sympathy messages for pet loss" in a link to /sympathy-message-for-pet-loss when shipped */}
            <p>
              <strong>A short message.</strong> Long messages can be hard
              to read in grief. Two sentences with the pet&apos;s name in
              them are better than a paragraph. Examples and templates are
              at sympathy messages for pet loss.
            </p>
            <p>
              <strong>A memorial page in their pet&apos;s name.</strong>{" "}
              If you knew the pet, you can{" "}
              <Link href="/create" className={linkClass} style={linkStyle}>
                create a memorial page
              </Link>{" "}
              for them as a gift. The page has a permanent address that
              the family can keep. Many people are deeply moved by this
              because it&apos;s an act of acknowledgement, not just a card
              that gets recycled.
            </p>
            <p>
              <strong>A donation in the pet&apos;s name.</strong> A small
              donation to a local rescue or to the vet practice that cared
              for them, made in the pet&apos;s name, is a meaningful
              thing. Many vet practices have memorial funds for exactly
              this.
            </p>
          </div>

          <h2 className="mt-14 mb-6">What not to say</h2>
          <div className="space-y-6">
            <p>
              Avoid &quot;it&apos;s just a dog,&quot; &quot;you can get
              another one,&quot; &quot;at least they lived a long
              life,&quot; and &quot;you&apos;ll feel better soon.&quot;
              These read as dismissal even when meant kindly. The pet was
              real, the loss is real, and the timeline is the bereaved
              person&apos;s, not yours.
            </p>
            <p>
              If you don&apos;t know what to say, &quot;I&apos;m sorry
              [pet&apos;s name] is gone&quot; is enough. Use the
              pet&apos;s name. Saying the name is one of the kindest
              things you can do.
            </p>
          </div>

          <h2 className="mt-14 mb-6">Questions people sometimes ask</h2>
          <div className="space-y-6">
            <p>
              <strong>
                What do you say to someone whose dog or cat just died?
              </strong>{" "}
              Say the pet&apos;s name. &quot;I&apos;m so sorry [Name] is
              gone&quot; is enough. Avoid &quot;it&apos;s just a
              pet&quot; or &quot;you can get another one.&quot; The pet
              was real and so is the loss.
            </p>
            <p>
              <strong>
                Is it appropriate to send flowers for pet loss?
              </strong>{" "}
              Yes. Flowers, cards, a meal dropped off, or a small donation
              to a rescue in the pet&apos;s name are all appropriate.
              There is no rule against acknowledging a pet&apos;s death
              the same way you would acknowledge a person&apos;s.
            </p>
            <p>
              <strong>
                How long should I wait before checking in on someone who
                lost a pet?
              </strong>{" "}
              Don&apos;t wait. A short text the same day, a card within
              the week, and another check-in a month later all matter. The
              lonely part of pet grief is often the second and third
              month, when other people have moved on.
            </p>
            <p>
              <strong>
                Can I make a memorial page for someone else&apos;s pet?
              </strong>{" "}
              Yes. You can create the page and send the link to the
              family. They can edit the photo, name, and text if they
              want, or leave it as you made it.
            </p>
            <p>
              <strong>What if I didn&apos;t know the pet well?</strong>{" "}
              It&apos;s still appropriate to acknowledge the loss.
              &quot;I know how much [Name] meant to you. I&apos;m
              sorry.&quot; A short message from someone who barely knew
              the pet often lands harder than a long message from someone
              who is trying to perform grief they didn&apos;t feel.
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
    </>
  );
}
