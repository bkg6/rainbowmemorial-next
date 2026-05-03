"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PawPrint } from "@/components/illustrations/PawPrint";
import { TEMPLATES as TEMPLATE_CONFIG } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number | string;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  prefill?: { email?: string; name?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
};

const TEMPLATE_OPTIONS: { id: TemplateId; label: string; image: string }[] = [
  { id: "classic", label: "Classic", image: "/templates/classic.png" },
  { id: "rainbow_bridge", label: "Rainbow Bridge", image: "/templates/rainbow_bridge.png" },
  { id: "anniversary", label: "Anniversary", image: "/templates/anniversary.png" },
  { id: "birthday_heaven", label: "Birthday in Heaven", image: "/templates/birthday_heaven.png" },
  { id: "memory", label: "In Memory", image: "/templates/memory.png" },
];

interface FormState {
  petName: string;
  bornDate: string;
  diedDate: string;
  tributeLine: string;
}

/** Borderless inline field — label + underlined input on cream. */
function MinimalField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  rightAdornment,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  rightAdornment?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-[10px] tracking-[0.08em] uppercase text-[--color-text-tertiary] mb-1 font-medium">
        {label}
      </label>
      <div className="flex items-end gap-2">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="flex-1 min-w-0 bg-transparent border-0 border-b border-[--color-border] px-0 py-1.5 text-[15px] text-[--color-text-primary] placeholder:text-[--color-text-tertiary] focus:outline-none focus:border-[--color-accent-primary] transition-colors duration-[200ms]"
        />
        {rightAdornment}
      </div>
    </div>
  );
}

/**
 * Preview canvas — template PNG as background with photo + text composited via CSS.
 * Position percentages are derived from the renderer's zone coordinates on a 1080x1920 canvas.
 * Photo center y=750 (39%), name y=1050 (55%), dates y=1130 (59%), tribute y=1200 (62.5%).
 */
function PreviewCanvas({
  templateId,
  format,
  photoSrc,
  petName,
  bornYear,
  diedYear,
  tributeLine,
}: {
  templateId: TemplateId;
  format: "story" | "square";
  photoSrc: string;
  petName: string;
  bornYear: string;
  diedYear: string;
  tributeLine: string;
}) {
  const tpl = TEMPLATE_CONFIG[templateId];
  const datesText =
    bornYear && diedYear
      ? `${bornYear} — ${diedYear}`
      : diedYear
      ? diedYear
      : "____ — ____";

  // Derive Story coordinates directly from the template config (1080x1920 canvas).
  // For Square format we shift everything up ~10% since the canvas crops shorter.
  const W = tpl.canvasWidth;
  const H = tpl.canvasHeight;
  const photoCenterY = tpl.photoZone.y + tpl.photoZone.height / 2;
  const photoSizeRatio = tpl.photoZone.width / W;
  const photoTopRatio = tpl.photoZone.y / H;
  const nameTopRatio = tpl.nameZone.y / H;
  const datesTopRatio = tpl.datesZone.y / H;
  const tributeTopRatio = tpl.tributeZone.y / H;

  // Square format: shrink everything proportionally and shift up so the
  // memorial centers properly in a 1:1 frame.
  const squareScale = format === "square" ? 0.78 : 1;
  const squareShift = format === "square" ? -0.06 : 0;

  const photoTopPct = `${(photoTopRatio + squareShift) * 100}%`;
  const photoSizePct = `${photoSizeRatio * 100}%`;
  const nameTopPct = `${(nameTopRatio * squareScale + squareShift) * 100}%`;
  const datesTopPct = `${(datesTopRatio * squareScale + squareShift) * 100}%`;
  const tributeTopPct = `${(tributeTopRatio * squareScale + squareShift) * 100}%`;
  // Suppress unused warnings — photoCenterY is computed for clarity but unused
  void photoCenterY;

  return (
    <div
      className="relative w-full h-full"
      style={{
        backgroundImage: `url('/templates/${templateId}.png')`,
        backgroundSize: "cover",
        backgroundPosition: format === "square" ? "center 30%" : "center",
      }}
    >
      {/* Photo */}
      <div
        className="absolute"
        style={{
          top: photoTopPct,
          left: "50%",
          transform: "translateX(-50%)",
          width: photoSizePct,
          aspectRatio: "1",
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} alt={petName || "Pet"} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name */}
      <div
        className="absolute w-full text-center px-6"
        style={{
          top: nameTopPct,
          left: 0,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px, 5vw, 38px)",
          fontWeight: 400,
          color: tpl.nameZone.color,
          lineHeight: 1.1,
        }}
      >
        {petName || "Their Name"}
      </div>

      {/* Dates */}
      <div
        className="absolute w-full text-center"
        style={{
          top: datesTopPct,
          left: 0,
          fontSize: "clamp(13px, 2.5vw, 18px)",
          color: tpl.datesZone.color,
          letterSpacing: "0.02em",
        }}
      >
        {datesText}
      </div>

      {/* Tribute */}
      {tributeLine && (
        <div
          className="absolute w-full text-center px-8"
          style={{
            top: tributeTopPct,
            left: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(12px, 2.2vw, 17px)",
            color: tpl.tributeZone.color,
            lineHeight: 1.4,
          }}
        >
          &ldquo;{tributeLine}&rdquo;
        </div>
      )}
    </div>
  );
}

export default function CreatorPage() {
  const [form, setForm] = useState<FormState>({
    petName: "",
    bornDate: "",
    diedDate: "",
    tributeLine: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("classic");
  const [selectedFormat, setSelectedFormat] = useState<"story" | "square">("story");

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(null);
  const [croppedPhotoUrl, setCroppedPhotoUrl] = useState<string | null>(null);
  const [previewPhotoSrc, setPreviewPhotoSrc] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(true);

  const [renderSrc, setRenderSrc] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [downloadingPreview, setDownloadingPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazily load Razorpay checkout SDK and resolve when ready
  const loadRazorpay = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") return reject(new Error("no window"));
      if (window.Razorpay) return resolve();
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existing) {
        if (window.Razorpay) return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("razorpay load failed")));
        return;
      }
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("razorpay load failed"));
      document.body.appendChild(s);
    });
  }, []);

  // Pre-warm the SDK on mount; not required for correctness, just avoids the click delay
  useEffect(() => {
    loadRazorpay().catch(() => {});
  }, [loadRazorpay]);

  // TEMP: visual verification helper — open /create?demo=template_id to render State 2 with a sample
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    if (demo) {
      const sample = `/templates/${demo}.png`;
      setPreviewPhotoSrc(sample);
      setOriginalPhotoUrl(sample);
      setCroppedPhotoUrl(sample);
      setForm({
        petName: "Buddy",
        bornDate: "2010-06-12",
        diedDate: "2024-09-30",
        tributeLine: "The best friend I ever had",
      });
      if (["classic", "rainbow_bridge", "anniversary", "birthday_heaven", "memory"].includes(demo)) {
        setSelectedTemplate(demo as TemplateId);
      }
    }
  }, []);

  const photoUploaded = !!previewPhotoSrc;

  const formatYear = (d: string) => (d ? new Date(d).getFullYear().toString() : "");

  const triggerRender = useCallback(
    (
      photoUrl: string,
      name: string,
      bornDate: string,
      diedDate: string,
      tributeLine: string,
      templateId: TemplateId
    ) => {
      if (!photoUrl || !name || !diedDate) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        setRendering(true);
        try {
          const res = await fetch("/api/render", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              photoUrl,
              name,
              bornDate: bornDate || null,
              diedDate,
              tributeLine: tributeLine || null,
              templateId,
              watermark: true,
            }),
          });
          if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setRenderSrc((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return url;
            });
          }
        } finally {
          setRendering(false);
        }
      }, 400);
    },
    []
  );

  useEffect(() => {
    if (croppedPhotoUrl) {
      triggerRender(
        croppedPhotoUrl,
        form.petName,
        form.bornDate,
        form.diedDate,
        form.tributeLine,
        selectedTemplate
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    croppedPhotoUrl,
    form.petName,
    form.bornDate,
    form.diedDate,
    form.tributeLine,
    selectedTemplate,
  ]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("That photo is over 10MB. Try a smaller one.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadError("That doesn't look like an image. Try a JPG or PNG.");
      return;
    }

    setUploadError(null);
    const localSrc = URL.createObjectURL(file);
    setPreviewPhotoSrc(localSrc);
    setOriginalPhotoUrl(localSrc);
    setCroppedPhotoUrl(localSrc);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const original = data.originalUrl ?? localSrc;
      const cropped = data.croppedUrl ?? data.originalUrl ?? localSrc;
      setOriginalPhotoUrl(original);
      setCroppedPhotoUrl(cropped);
      setPreviewPhotoSrc(cropped);
      setFaceDetected(!!data.croppedUrl && data.croppedUrl !== data.originalUrl);
    } catch {
      setFaceDetected(false);
    } finally {
      setUploading(false);
    }
  };

  const handleCheckout = async () => {
    if (!originalPhotoUrl || !croppedPhotoUrl || !form.petName || !form.diedDate) return;
    setSubmitting(true);
    try {
      await loadRazorpay();
      if (!window.Razorpay) {
        setSubmitting(false);
        return;
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petName: form.petName,
          bornDate: form.bornDate || null,
          diedDate: form.diedDate,
          tributeLine: form.tributeLine || null,
          templateId: selectedTemplate,
          originalPhotoUrl,
          croppedPhotoUrl,
        }),
      });
      const data = await res.json();
      if (!data.orderId || !data.keyId) {
        setSubmitting(false);
        return;
      }

      localStorage.setItem("selectedFormat", selectedFormat);

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Rainbow Memorial",
        description: `Memorial tribute for ${form.petName}`,
        prefill: { name: form.petName },
        theme: { color: "#C97B63" },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/webhook/razorpay", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.slug) {
              window.location.href = `/success?slug=${verifyData.slug}`;
            } else {
              setSubmitting(false);
            }
          } catch {
            setSubmitting(false);
          }
        },
      });
      rzp.open();
    } catch {
      setSubmitting(false);
    }
  };

  const handleDownloadPreview = () => {
    if (!renderSrc) return;
    setDownloadingPreview(true);
    const a = document.createElement("a");
    a.href = renderSrc;
    a.download = `${(form.petName || "memorial").toLowerCase().replace(/\s+/g, "-")}-preview.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloadingPreview(false), 800);
  };

  const canCheckout = !!(originalPhotoUrl && form.petName && form.diedDate);

  return (
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <header className="border-b border-[--color-border] px-6 py-3 shrink-0">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <PawPrint size={22} className="text-[#2A2A2A]" />
            <span
              className="font-semibold text-[--color-text-primary]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              rainbow.memorial
            </span>
          </Link>
          <div className="text-sm text-[--color-text-secondary]">Step 1 of 2</div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-2">
          <div className="h-[3px] rounded-full bg-[--color-border] overflow-hidden">
            <div
              className="h-full bg-[--color-accent-primary] rounded-full transition-all duration-500"
              style={{ width: photoUploaded ? "85%" : "50%" }}
            />
          </div>
        </div>
      </header>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
        aria-label="Upload pet photo"
      />

      <AnimatePresence mode="wait" initial={false}>
        {!photoUploaded ? (
          /* ──────── STATE 1 — Upload-first two-column ──────── */
          <motion.div
            key="state-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 max-w-[1300px] w-full mx-auto px-6 py-12 overflow-y-auto"
          >
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
              <div className="space-y-7">
                <h2
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "32px" }}
                >
                  Tell us about them
                </h2>

                <div className="space-y-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-[200px] md:h-[240px] max-h-[280px] border-2 border-dashed border-[--color-border] rounded-2xl bg-[rgba(212,165,116,0.04)] hover:bg-[rgba(212,165,116,0.08)] transition-all flex flex-col items-center justify-center gap-4 cursor-pointer"
                    type="button"
                  >
                    <PawPrint size={32} className="text-[--color-accent-warmth]" />
                    <div className="text-center">
                      <p className="text-[17px] font-medium mb-1">
                        Share your favorite photo of them
                      </p>
                      <p className="text-sm text-[--color-text-secondary]">
                        We&apos;ll handle the rest
                      </p>
                    </div>
                    <Upload size={20} className="text-[--color-text-tertiary]" />
                  </button>
                  {uploadError && (
                    <p className="text-[13px] text-[--color-text-secondary] px-2">
                      {uploadError}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Input
                    label="Their name"
                    placeholder="Their name"
                    value={form.petName}
                    onChange={(e) => setForm((f) => ({ ...f, petName: e.target.value }))}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="When they came into your life"
                      type="date"
                      value={form.bornDate}
                      onChange={(e) => setForm((f) => ({ ...f, bornDate: e.target.value }))}
                    />
                    <Input
                      label="When you said goodbye"
                      type="date"
                      value={form.diedDate}
                      onChange={(e) => setForm((f) => ({ ...f, diedDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Input
                      label="One thing you'd want everyone to know about them (optional)"
                      placeholder="Something you'd want everyone to know about them"
                      value={form.tributeLine}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, tributeLine: e.target.value.slice(0, 60) }))
                      }
                      maxLength={60}
                    />
                    <p className="text-xs text-[--color-text-tertiary] mt-1 text-right">
                      {form.tributeLine.length}/60
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:sticky lg:top-8 lg:self-start">
                <div className="aspect-[9/16] max-w-[320px] mx-auto bg-white rounded-2xl shadow-memorial overflow-hidden flex flex-col items-center justify-center p-8 text-center space-y-4 border border-[--color-border]">
                  <PawPrint size={48} className="text-[--color-border]" />
                  <p className="text-[15px] text-[--color-text-tertiary] max-w-[200px]">
                    Upload a photo to see their tribute appear
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ──────── STATE 2 — Control panel left, large preview right ──────── */
          <motion.div
            key="state-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1.0] }}
            className="flex-1 max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-4 lg:py-5 lg:overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,1fr)_2fr] gap-6 lg:gap-8 lg:h-full">
              {/* LEFT — Control panel */}
              <div className="order-2 lg:order-1 flex flex-col gap-4 lg:gap-3 lg:overflow-y-auto lg:pr-2">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "22px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Tell us about them
                </h2>

                {/* Photo thumb + Change */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 group w-fit"
                  type="button"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[--color-border] group-hover:border-[--color-accent-primary] transition-colors duration-[200ms]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewPhotoSrc!}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] text-[--color-text-secondary] group-hover:text-[--color-accent-primary] transition-colors underline underline-offset-2">
                    Change photo
                  </span>
                </button>

                {!faceDetected && (
                  <p className="text-[12px] text-[--color-text-secondary] -mt-2">
                    We&apos;ll use the full photo.
                  </p>
                )}

                <MinimalField
                  label="Their name"
                  value={form.petName}
                  placeholder="Their name"
                  onChange={(v) => setForm((f) => ({ ...f, petName: v }))}
                />

                <div className="grid grid-cols-2 gap-3">
                  <MinimalField
                    label="Born"
                    type="date"
                    value={form.bornDate}
                    onChange={(v) => setForm((f) => ({ ...f, bornDate: v }))}
                  />
                  <MinimalField
                    label="Goodbye"
                    type="date"
                    value={form.diedDate}
                    onChange={(v) => setForm((f) => ({ ...f, diedDate: v }))}
                  />
                </div>

                <MinimalField
                  label="Tribute"
                  value={form.tributeLine}
                  placeholder="Optional"
                  maxLength={60}
                  onChange={(v) => setForm((f) => ({ ...f, tributeLine: v.slice(0, 60) }))}
                  rightAdornment={
                    <span className="text-[10px] text-[--color-text-tertiary] shrink-0 pb-1.5">
                      {form.tributeLine.length}/60
                    </span>
                  }
                />

                {/* Template picker */}
                <div className="pt-2">
                  <label className="text-[10px] tracking-[0.08em] uppercase text-[--color-text-tertiary] mb-2 font-medium block">
                    Template
                  </label>
                  <div className="flex gap-2">
                    {TEMPLATE_OPTIONS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        type="button"
                        className={`flex-1 group flex flex-col items-center gap-1.5 transition-transform duration-[200ms] ${
                          selectedTemplate === t.id ? "scale-[1.04]" : "opacity-75 hover:opacity-100"
                        }`}
                        title={t.label}
                        aria-label={t.label}
                      >
                        <div
                          className={`w-full aspect-[9/16] rounded-[6px] overflow-hidden ${
                            selectedTemplate === t.id
                              ? "ring-2 ring-[--color-accent-primary] ring-offset-2 ring-offset-[--color-background]"
                              : "ring-1 ring-[--color-border]"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t.image} alt={t.label} className="w-full h-full object-cover" />
                        </div>
                        <span
                          className={`text-[10px] leading-tight text-center ${
                            selectedTemplate === t.id
                              ? "text-[--color-text-primary] font-medium"
                              : "text-[--color-text-tertiary]"
                          }`}
                        >
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format toggle */}
                <div className="pt-2">
                  <label className="text-[10px] tracking-[0.08em] uppercase text-[--color-text-tertiary] mb-2 font-medium block">
                    Format
                  </label>
                  <div className="flex gap-1 bg-[--color-background-alt] p-1 rounded-full border border-[--color-border] w-fit">
                    {(["story", "square"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors duration-[200ms] ${
                          selectedFormat === fmt
                            ? "bg-[--color-accent-primary] text-white"
                            : "bg-transparent text-[--color-text-secondary] hover:text-[--color-text-primary]"
                        }`}
                        type="button"
                      >
                        {fmt === "story" ? "Story" : "Square"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTAs at bottom */}
                <div className="mt-auto pt-4 space-y-2.5">
                  <Button
                    className="w-full min-h-[48px]"
                    onClick={handleCheckout}
                    disabled={!canCheckout || submitting}
                  >
                    {submitting ? "Redirecting..." : "Get full memorial — $24.99"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleDownloadPreview}
                    disabled={!renderSrc || downloadingPreview}
                    className="w-full min-h-[44px] flex items-center gap-2 justify-center text-[14px]"
                  >
                    <Download size={14} />
                    {downloadingPreview ? "Downloading..." : "Download free preview"}
                  </Button>
                  <p className="text-[11px] text-center" style={{ color: "#888888" }}>
                    {!canCheckout
                      ? "Add a name and goodbye date to continue"
                      : "Free preview is watermarked. Full memorial is yours forever."}
                  </p>
                </div>
              </div>

              {/* RIGHT — Preview only, large */}
              <div className="order-1 lg:order-2 flex items-center justify-center lg:h-full p-2">
                <motion.div
                  key={`preview-${selectedFormat}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: rendering || uploading ? 0.6 : 1,
                    scale: rendering || uploading ? [1, 1.005, 1] : 1,
                  }}
                  transition={{
                    opacity: { duration: 0.4 },
                    scale:
                      rendering || uploading
                        ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0 },
                  }}
                  className={`overflow-hidden rounded-[8px] ${
                    selectedFormat === "story"
                      ? "h-full max-h-[min(90vh,1100px)] aspect-[9/16]"
                      : "h-full max-h-[min(90vh,800px)] aspect-square"
                  }`}
                  style={{ maxWidth: "100%" }}
                >
                  {renderSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={renderSrc}
                      alt="Memorial preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PreviewCanvas
                      templateId={selectedTemplate}
                      format={selectedFormat}
                      photoSrc={previewPhotoSrc!}
                      petName={form.petName}
                      bornYear={formatYear(form.bornDate)}
                      diedYear={formatYear(form.diedDate)}
                      tributeLine={form.tributeLine}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
