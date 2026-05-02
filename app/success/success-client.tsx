"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Link as LinkIcon, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PawPrint } from "@/components/illustrations/PawPrint";

const CONFETTI = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  delay: i * 0.18,
  size: 8 + Math.random() * 6,
  isPaw: i % 3 === 0,
}));

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {CONFETTI.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -20, x: `${item.x}vw`, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, delay: item.delay, ease: "easeIn" }}
          className="absolute top-0"
          style={{ width: item.size, height: item.size }}
        >
          {item.isPaw ? (
            <PawPrint size={item.size} className="text-[--color-accent-soft]" />
          ) : (
            <div
              className="rounded-full"
              style={{
                width: item.size,
                height: item.size,
                backgroundColor: item.id % 2 === 0 ? "#E8C4B8" : "#9DB89F",
                opacity: 0.7,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

interface Props {
  petName: string;
  bornDate?: string;
  diedDate: string;
  tributeLine?: string;
  renderedImageUrl: string;
  slug: string;
  appUrl: string;
}

export function SuccessClient({
  petName,
  bornDate,
  diedDate,
  tributeLine,
  renderedImageUrl,
  slug,
  appUrl,
}: Props) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"story" | "square">("story");

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3000);
    const saved = localStorage.getItem("selectedFormat");
    if (saved === "square") setFormat("square");
    return () => clearTimeout(t);
  }, []);

  const memorialUrl = `${appUrl}/m/${slug}`;
  const diedYear = new Date(diedDate).getFullYear();
  const bornYear = bornDate ? new Date(bornDate).getFullYear() : null;
  const dateStr = bornYear ? `${bornYear} — ${diedYear}` : diedYear.toString();

  const handleCopy = () => {
    navigator.clipboard.writeText(memorialUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `In memory of ${petName}`, url: memorialUrl }).catch(() => {});
    } else {
      const a = document.createElement("a");
      a.href = renderedImageUrl;
      a.download = `${petName.toLowerCase().replace(/\s+/g, "-")}-memorial.png`;
      a.click();
    }
  };

  const anniversaryDate = new Date(diedDate);
  anniversaryDate.setFullYear(anniversaryDate.getFullYear() + 1);
  const anniversaryFormatted = anniversaryDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>

      {/* Header */}
      <header className="border-b border-[--color-border] px-6 py-4">
        <div className="max-w-[1180px] mx-auto">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
            <PawPrint size={22} className="text-[--color-accent-primary]" />
            <span
              className="font-semibold text-[--color-text-primary]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              paws.memorial
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24 space-y-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, ease: [0.0, 0.0, 0.2, 1.0] }}
          className="text-center space-y-4"
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <path
              d="M36 58 C36 58 10 42 10 24 C10 16 16 10 24 10 C29 10 34 13 36 18 C38 13 43 10 48 10 C56 10 62 16 62 24 C62 42 36 58 36 58Z"
              fill="#E8C4B8"
              opacity="0.5"
              stroke="#E8C4B8"
              strokeWidth="1.5"
            />
            <ellipse cx="36" cy="39" rx="7" ry="6" fill="#2A1F18" opacity="0.25" />
            <circle cx="30" cy="33" r="3" fill="#2A1F18" opacity="0.2" />
            <circle cx="36" cy="31" r="3" fill="#2A1F18" opacity="0.2" />
            <circle cx="42" cy="33" r="3" fill="#2A1F18" opacity="0.2" />
          </svg>
          <h1
            className="text-[36px] md:text-[48px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {petName}&apos;s tribute is yours.
          </h1>
          <p className="text-[18px] text-[--color-text-secondary]">
            Beautifully made. Forever yours.
          </p>
        </motion.div>

        {/* Memorial image + actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.1, ease: [0.0, 0.0, 0.2, 1.0] }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <div
              className={`relative bg-white rounded-lg shadow-memorial overflow-hidden ${format === "story" ? "w-[260px] aspect-[9/16]" : "w-[320px] aspect-square"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={renderedImageUrl}
                alt={`${petName}'s memorial`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={renderedImageUrl} download={`${petName.toLowerCase()}-memorial.png`}>
              <Button className="flex items-center gap-2 justify-center w-full sm:w-auto">
                <Download size={16} />
                Download
              </Button>
            </a>
            <Button
              variant="secondary"
              className="flex items-center gap-2 justify-center"
              onClick={handleShare}
            >
              <Share2 size={16} />
              Share to Instagram Story
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 justify-center"
              onClick={handleCopy}
            >
              <LinkIcon size={16} />
              {copied ? "Copied!" : "Copy link"}
            </Button>
          </div>
        </motion.div>

        {/* Memorial URL */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.2, ease: [0.0, 0.0, 0.2, 1.0] }}
          className="bg-[--color-surface] rounded-[20px] border border-[--color-border] shadow-card p-8 space-y-4"
        >
          <h2
            className="text-[22px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Share this page with everyone who loved them.
          </h2>
          <p className="text-[15px] text-[--color-text-secondary]">
            This page is now live. Family can visit it, light a candle, and leave a memory.
          </p>
          <div className="flex items-center gap-3 bg-[--color-background] rounded-xl border border-[--color-border] px-4 py-3">
            <span className="flex-1 font-mono text-[14px] text-[--color-text-secondary] truncate">
              {memorialUrl.replace("https://", "")}
            </span>
            <button
              onClick={handleCopy}
              className="text-[13px] font-medium text-[--color-accent-primary] hover:text-[--color-accent-primary-hover] transition-colors shrink-0"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </motion.div>

        {/* Anniversary */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
          className="rounded-[20px] p-8 space-y-5"
          style={{ backgroundColor: "var(--color-accent-warmth-light)" }}
        >
          <div className="flex items-start gap-5">
            <svg
              width="48"
              height="56"
              viewBox="0 0 48 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 mt-1"
            >
              <rect
                x="4"
                y="8"
                width="40"
                height="40"
                rx="6"
                stroke="#2A1F18"
                strokeWidth="1.5"
                fill="white"
                opacity="0.7"
              />
              <line x1="4" y1="20" x2="44" y2="20" stroke="#EDE3D5" strokeWidth="1.2" />
              <line
                x1="14"
                y1="4"
                x2="14"
                y2="12"
                stroke="#2A1F18"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
              <line
                x1="34"
                y1="4"
                x2="34"
                y2="12"
                stroke="#2A1F18"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
              <circle cx="24" cy="34" r="8" fill="#FBF2E5" />
              <circle cx="24" cy="34" r="5" fill="#D4A574" opacity="0.3" />
              <path
                d="M24 41 Q22 37 24 33 Q26 37 24 41Z"
                fill="#D4A574"
                opacity="0.7"
              />
            </svg>
            <div className="space-y-2">
              <h3
                className="text-[20px]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                We&apos;ll remember, every year.
              </h3>
              <p className="text-[15px] text-[--color-text-secondary] leading-relaxed">
                On{" "}
                <strong className="text-[--color-text-primary] font-medium">
                  {anniversaryFormatted}
                </strong>
                , we&apos;ll send you a fresh tribute. Already made. Ready to share. You
                don&apos;t have to do anything.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-4 pb-8">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => {
              const subject = encodeURIComponent(`${petName}'s memorial`);
              const body = encodeURIComponent(
                `${petName}'s memorial: ${memorialUrl}\n\n${dateStr}${tributeLine ? `\n\n"${tributeLine}"` : ""}`
              );
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }}
          >
            Email me a copy
          </Button>
        </div>
      </div>
    </div>
  );
}
