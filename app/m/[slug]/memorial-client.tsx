"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  dateStr: string;
  tributeLine?: string;
  renderedImageUrl: string;
  slug: string;
  initialCandleCount: number;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

function CandleIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 1 C9 3 7.5 4.5 7.5 6 C7.5 7.7 8.6 9 10 9 C11.4 9 12.5 7.7 12.5 6 C12.5 4.5 11 3 10 1Z" fill="currentColor" opacity="0.9" />
      <rect x="8" y="9" width="4" height="13" rx="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function MemorialPageClient({
  petName,
  dateStr,
  tributeLine,
  renderedImageUrl,
  slug,
  initialCandleCount,
}: Props) {
  const [candleCount, setCandleCount] = useState(initialCandleCount);
  const [lit, setLit] = useState(false);
  const [lighting, setLighting] = useState(false);
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [message, setMessage] = useState("");
  const [memorySubmitted, setMemorySubmitted] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    fetch(`/api/memory/${slug}`)
      .then((r) => r.json())
      .then((data) => setMemories(data.memories ?? []))
      .catch(() => {});
  }, [slug]);

  const handleLightCandle = async () => {
    if (lighting || lit) return;
    setLighting(true);
    try {
      const res = await fetch(`/api/candle/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setCandleCount(data.count ?? candleCount + 1);
      setLit(true);
    } finally {
      setLighting(false);
    }
  };

  const handleMemorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/memory/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorName: visitorName.trim() || null, message }),
    });
    setMemories((prev) => [
      {
        id: Date.now().toString(),
        visitorName: visitorName.trim() || null,
        message,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setMemorySubmitted(true);
    setShowMemoryForm(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      {/* Minimal header */}
      <header className="px-6 py-5">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
          <PawPrint size={18} className="text-[#2A2A2A]" />
          <span className="text-sm font-semibold text-[--color-text-secondary]" style={{ fontFamily: "var(--font-body)" }}>
            paws.memorial
          </span>
        </Link>
      </header>

      <div className="max-w-[600px] mx-auto px-6 pb-24 space-y-12">
        {/* Memorial image */}
        <div className="flex justify-center">
          <div className="w-full max-w-[480px] md:max-w-[560px] rounded-[8px] shadow-memorial overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={renderedImageUrl} alt={`${petName}'s memorial`} className="w-full" />
          </div>
        </div>

        {/* Pet info */}
        <div className="text-center space-y-4 pt-2">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(36px, 8vw, 48px)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            {petName}
          </h1>
          <p style={{ fontSize: "18px", color: "#5A5A5A" }}>{dateStr}</p>
          {tributeLine && (
            <p
              style={{
                fontSize: "18px",
                fontStyle: "italic",
                color: "#888888",
                fontFamily: "var(--font-display)",
                lineHeight: "1.5",
              }}
            >
              &ldquo;{tributeLine}&rdquo;
            </p>
          )}
          <div className="flex justify-center pt-2">
            <svg width="120" height="16" viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8 Q30 2 60 8 Q90 14 110 8" stroke="#EDE3D5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="60" cy="8" r="2.5" fill="#C97B63" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Candle section */}
        <div className="text-center space-y-5">
          <motion.div
            animate={lit ? { scale: [1, 1.05, 1.0] } : {}}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <CandleIcon size={48} className={lit ? "text-[--color-accent-primary]" : "text-[--color-text-tertiary]"} />
          </motion.div>
          <div className="flex items-center justify-center gap-2">
            <CandleIcon size={14} className="text-[--color-accent-primary]" />
            <p className="text-[16px] text-[--color-text-secondary]">
              {candleCount} {candleCount === 1 ? "candle" : "candles"} lit for {petName}
            </p>
          </div>
          {!lit ? (
            <Button
              onClick={handleLightCandle}
              disabled={lighting}
              className="w-full sm:w-auto"
            >
              {lighting ? "Lighting..." : `Light a candle for ${petName}`}
            </Button>
          ) : (
            <p
              className="text-[16px]"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--color-accent-primary)" }}
            >
              Your candle is lit.
            </p>
          )}
          <p className="text-[13px] text-[--color-text-tertiary]">From people who never met them but care.</p>
        </div>

        {/* Leave a memory */}
        <div className="space-y-4">
          {!showMemoryForm && !memorySubmitted && (
            <div className="text-center">
              <button
                onClick={() => setShowMemoryForm(true)}
                className="text-[15px] text-[--color-text-secondary] hover:text-[--color-accent-primary] transition-colors underline underline-offset-2"
              >
                Leave a memory
              </button>
            </div>
          )}
          {showMemoryForm && (
            <form
              onSubmit={handleMemorySubmit}
              className="bg-[--color-surface] rounded-[20px] border border-[--color-border] p-6 space-y-4"
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "20px" }}>
                Leave a memory
              </h3>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full bg-white border-[1.5px] border-[--color-border] rounded-xl px-4 py-3 text-[16px] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:border-[--color-border-focus]"
              />
              <div>
                <textarea
                  placeholder={`A memory of ${petName}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 200))}
                  rows={3}
                  className="w-full bg-white border-[1.5px] border-[--color-border] rounded-xl px-4 py-3 text-[16px] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:border-[--color-border-focus] resize-none"
                />
                <p className="text-xs text-[--color-text-tertiary] mt-1 text-right">{message.length}/200</p>
              </div>
              <Button variant="secondary" type="submit" disabled={!message.trim()}>
                Leave it
              </Button>
            </form>
          )}
          {memorySubmitted && (
            <p
              className="text-center text-[15px]"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--color-accent-secondary)" }}
            >
              Thank you for sharing a memory of {petName}.
            </p>
          )}
        </div>

        {/* Memories list */}
        {memories.length > 0 && (
          <div className="space-y-4">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "22px",
                color: "var(--color-text-primary)",
              }}
            >
              Memories
            </h3>
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {memories.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-xl border border-[--color-border] px-5 py-4 space-y-1"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[14px] font-medium text-[--color-text-primary]">
                      {m.visitorName ?? "Anonymous"}
                    </span>
                    <span className="text-[12px] text-[--color-text-tertiary] shrink-0">
                      {timeAgo(m.createdAt)}
                    </span>
                  </div>
                  <p className="text-[15px] text-[--color-text-secondary] leading-relaxed">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center pt-8 border-t border-[--color-border] space-y-3">
          <p className="text-[15px] italic text-[--color-text-secondary]" style={{ fontFamily: "var(--font-display)" }}>
            In loving memory of {petName}.
          </p>
          <p className="text-[13px] text-[--color-text-tertiary]">
            Created on PawsMemorial — make one for your fur baby
          </p>
          <Link href="/create">
            <button className="text-[13px] text-[--color-accent-primary] hover:text-[--color-accent-primary-hover] transition-colors">
              Make a tribute →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
