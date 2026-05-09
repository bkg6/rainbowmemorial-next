"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint } from "@/components/illustrations/PawPrint";
import { Button } from "@/components/ui/button";

interface Memory {
  id: string;
  visitorName: string | null;
  message: string | null;
  createdAt: string;
}

interface Props {
  petName: string;
  species?: string;
  bornFormatted: string | null;
  diedFormatted: string;
  dateRange: string;
  tributeLine?: string;
  renderedImageUrl: string;
  slug: string;
  initialCandleCount: number;
  isSample: boolean;
  memorialUrl: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

function CandleIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 1 C9 3 7.5 4.5 7.5 6 C7.5 7.7 8.6 9 10 9 C11.4 9 12.5 7.7 12.5 6 C12.5 4.5 11 3 10 1Z"
        fill="currentColor"
        opacity="0.9"
      />
      <rect x="8" y="9" width="4" height="13" rx="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function ShareIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zm12 7a3 3 0 100-6 3 3 0 000 6zm-9.7-7.5l7.4 4.3M16.7 5.2l-7.4 4.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MemorialPageClient({
  petName,
  species,
  bornFormatted,
  diedFormatted,
  dateRange,
  tributeLine,
  renderedImageUrl,
  slug,
  initialCandleCount,
  isSample,
  memorialUrl,
}: Props) {
  const [tab, setTab] = useState<"memorial" | "guestbook">("memorial");
  const [candleCount, setCandleCount] = useState(initialCandleCount);
  const [pulseCandle, setPulseCandle] = useState(false);
  const [lighting, setLighting] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [visitorName, setVisitorName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Mark seed/composite pages on the body so any future logic can
  // differentiate without re-querying the DB. Real customer pages leave
  // this attribute unset.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isSample) {
      document.body.setAttribute("data-sample", "true");
      return () => {
        document.body.removeAttribute("data-sample");
      };
    }
  }, [isSample]);

  useEffect(() => {
    fetch(`/api/memory/${slug}`)
      .then((r) => r.json())
      .then((data) => setMemories(data.memories ?? []))
      .catch(() => {});
  }, [slug]);

  const handleLightCandle = async () => {
    if (lighting) return;
    setLighting(true);
    try {
      const res = await fetch(`/api/candle/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (res.status === 429) {
        // Rate limited — silent fail per spec, don't punish the user.
        return;
      }
      const data = await res.json().catch(() => ({}));
      setCandleCount(data.count ?? candleCount + 1);
      setPulseCandle(true);
      setTimeout(() => setPulseCandle(false), 600);
    } catch {
      // network errors also silent
    } finally {
      setLighting(false);
    }
  };

  const canSubmitMemory = visitorName.trim().length > 0 && message.trim().length > 0;

  const handleSubmitMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitMemory || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`/api/memory/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName: visitorName.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMemories((prev) => [
        {
          id: `local-${Date.now()}`,
          visitorName: visitorName.trim(),
          message: message.trim(),
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setVisitorName("");
      setMessage("");
    } catch {
      setSubmitError("Couldn't post that just now. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${petName}'s memorial — Rainbow Memorial`,
      text: tributeLine ?? `In loving memory of ${petName}`,
      url: memorialUrl,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or unsupported — silently no-op.
      }
      return;
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(memorialUrl);
        setShareToast("Link copied");
        setTimeout(() => setShareToast(null), 2000);
        return;
      } catch {
        // fall through
      }
    }
    setShareToast("Couldn't copy. Try the URL bar.");
    setTimeout(() => setShareToast(null), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-background)" }}>
      {/* Header */}
      <header className="px-6 py-5 border-b border-[--color-border]">
        <div className="max-w-[1080px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <PawPrint size={20} className="text-[#2A2A2A]" />
            <span
              className="text-[15px] font-semibold text-[--color-text-primary]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              rainbow.memorial
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="px-6 pt-10 pb-8 md:pt-16 md:pb-12">
          <div className="max-w-[680px] mx-auto relative">
            {/* Share button — desktop top-right, mobile centered below dates */}
            <div className="hidden md:block absolute top-0 right-0">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[--color-border] bg-white hover:bg-[--color-background-alt] transition-colors text-[13px] text-[--color-text-secondary]"
                aria-label="Share this memorial"
              >
                <ShareIcon size={14} />
                <span>Share</span>
              </button>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-[480px] rounded-[10px] shadow-memorial overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={renderedImageUrl}
                  alt={`Memorial for ${petName}`}
                  className="w-full block"
                />
              </div>
            </div>

            <div className="text-center mt-8 space-y-3">
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 8vw, 48px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "var(--color-text-primary)",
                }}
              >
                {petName}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  color: "var(--color-text-secondary)",
                }}
              >
                {dateRange}
              </p>
              {/* Mobile share button */}
              <div className="md:hidden flex justify-center pt-1">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[--color-border] bg-white hover:bg-[--color-background-alt] transition-colors text-[13px] text-[--color-text-secondary]"
                  aria-label="Share this memorial"
                >
                  <ShareIcon size={14} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {shareToast && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[--color-text-primary] text-white text-[13px] px-4 py-2 rounded-full shadow-lg">
                {shareToast}
              </div>
            )}
          </div>
        </section>

        {/* TAB NAV */}
        <nav className="border-b border-[--color-border]">
          <div className="max-w-[680px] mx-auto px-6 flex gap-8" role="tablist">
            {(["memorial", "guestbook"] as const).map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t)}
                  className="relative py-4 text-[14px] tracking-wide transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    color: active ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                  }}
                >
                  {t === "memorial" ? "Memorial" : "Guestbook"}
                  {active && (
                    <span
                      className="absolute left-0 right-0 -bottom-px h-[2px]"
                      style={{ backgroundColor: "var(--color-accent-primary)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          {tab === "memorial" ? (
            <motion.section
              key="memorial-tab"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-10 md:py-14"
            >
              <div className="max-w-[600px] mx-auto space-y-10">
                {/* Born | Died facts row */}
                {(bornFormatted || diedFormatted) && (
                  <div className="flex items-start justify-center gap-12">
                    {bornFormatted && (
                      <div className="text-center">
                        <p
                          className="text-[10px] tracking-[0.12em] uppercase mb-2"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "var(--color-text-tertiary)",
                          }}
                        >
                          Born
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "18px",
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {bornFormatted}
                        </p>
                      </div>
                    )}
                    {diedFormatted && (
                      <div className="text-center">
                        <p
                          className="text-[10px] tracking-[0.12em] uppercase mb-2"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "var(--color-text-tertiary)",
                          }}
                        >
                          Died
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "18px",
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {diedFormatted}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {species && (
                  <p
                    className="text-center"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "var(--color-text-tertiary)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {species}
                  </p>
                )}

                {tributeLine && (
                  <p
                    className="text-center max-w-[600px] mx-auto px-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "clamp(18px, 4vw, 22px)",
                      lineHeight: 1.55,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    &ldquo;{tributeLine}&rdquo;
                  </p>
                )}
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="guestbook-tab"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-10 md:py-14"
            >
              <div className="max-w-[600px] mx-auto space-y-8">
                {/* Candle counter */}
                <motion.div
                  className="flex items-center justify-center gap-2"
                  animate={pulseCandle ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <CandleIcon size={16} className="text-[--color-accent-primary]" />
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17px",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {candleCount} {candleCount === 1 ? "candle" : "candles"} lit
                  </p>
                </motion.div>

                {/* Compose box */}
                <form
                  onSubmit={handleSubmitMemory}
                  className="bg-white rounded-2xl border border-[--color-border] p-5 md:p-6 space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value.slice(0, 50))}
                    maxLength={50}
                    className="w-full bg-[--color-background] border border-[--color-border] rounded-xl px-4 py-3 text-[15px] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:border-[--color-border-focus]"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  <div>
                    <textarea
                      placeholder={`Share a memory of ${petName}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, 200))}
                      rows={4}
                      maxLength={200}
                      className="w-full bg-[--color-background] border border-[--color-border] rounded-xl px-4 py-3 text-[15px] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:border-[--color-border-focus] resize-none"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    <p
                      className="text-[11px] text-right mt-1"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {message.length}/200
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleLightCandle}
                      disabled={lighting}
                      className="flex items-center gap-2 justify-center"
                    >
                      <CandleIcon size={14} />
                      {lighting ? "Lighting..." : "Light a candle"}
                    </Button>
                    <Button
                      type="submit"
                      disabled={!canSubmitMemory || submitting}
                      className="flex-1"
                    >
                      {submitting ? "Posting..." : "Submit memory"}
                    </Button>
                  </div>
                  {submitError && (
                    <p className="text-[12px]" style={{ color: "var(--color-error)" }}>
                      {submitError}
                    </p>
                  )}
                </form>

                {/* Memory list */}
                {memories.length > 0 && (
                  <div className="space-y-3 pt-4">
                    {memories.map((m) => (
                      <div
                        key={m.id}
                        className="bg-white rounded-xl border border-[--color-border] px-5 py-4"
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-1">
                          <span
                            className="text-[10px] tracking-[0.12em] uppercase"
                            style={{
                              fontFamily: "var(--font-body)",
                              color: "var(--color-text-tertiary)",
                            }}
                          >
                            {m.visitorName ?? "Anonymous"}
                          </span>
                          <span
                            className="text-[11px] shrink-0"
                            style={{
                              fontFamily: "var(--font-body)",
                              color: "var(--color-text-tertiary)",
                            }}
                          >
                            {timeAgo(m.createdAt)}
                          </span>
                        </div>
                        <p
                          className="text-[15px] leading-relaxed"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-text-primary)",
                          }}
                        >
                          {m.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {memories.length === 0 && (
                  <p
                    className="text-center text-[14px] pt-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    No memories yet. Yours could be the first.
                  </p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* BOTTOM CTA */}
        <section
          className="px-6 py-14 md:py-20 mt-6"
          style={{ backgroundColor: "var(--color-background-alt)" }}
        >
          <div className="max-w-[560px] mx-auto text-center space-y-5">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(24px, 5vw, 30px)",
                letterSpacing: "-0.01em",
                color: "var(--color-text-primary)",
              }}
            >
              Lost your own pet?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "17px",
                lineHeight: 1.6,
                color: "var(--color-text-secondary)",
              }}
            >
              You can make a memorial like this in about a minute. There&apos;s
              no pressure.
            </p>
            <div className="pt-2 flex flex-col items-center gap-2">
              <Link href="/create">
                <Button className="min-h-[48px] px-7">
                  Make one for your pet →
                </Button>
              </Link>
              <p
                className="text-[12px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                Free to start. $24.99 to share.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[--color-border]">
        <div className="max-w-[680px] mx-auto text-center space-y-2">
          <p
            className="text-[12px]"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              color: "var(--color-text-tertiary)",
            }}
          >
            Created via rainbow.memorial
          </p>
          <p
            className="text-[11px]"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-tertiary)",
            }}
          >
            <Link href="/" className="hover:text-[--color-text-secondary] transition-colors">
              Home
            </Link>
            <span className="mx-2">·</span>
            <Link href="/create" className="hover:text-[--color-text-secondary] transition-colors">
              Make one
            </Link>
            <span className="mx-2">·</span>
            <Link href="/rainbow-bridge" className="hover:text-[--color-text-secondary] transition-colors">
              About the Rainbow Bridge
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
