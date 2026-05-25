"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download } from "lucide-react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PawPrint } from "@/components/illustrations/PawPrint";
import { TEMPLATES as TEMPLATE_CONFIG } from "@/lib/templates";
import type { TemplateId } from "@/lib/templates";

type PixelBox = { x: number; y: number; width: number; height: number };

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

  const isClassic = templateId === "classic";

  return (
    <div
      className="relative w-full h-full"
      style={{
        backgroundImage: isClassic
          ? "radial-gradient(ellipse at center, #FBF6EC 0%, #F4ECDC 100%)"
          : `url('/templates/${templateId}.png')`,
        backgroundColor: isClassic ? "#FAF3E5" : undefined,
        backgroundSize: "cover",
        backgroundPosition: format === "square" ? "center 30%" : "center",
      }}
    >
      {isClassic && (
        <>
          {/* Outer border — inset 3.7% (40 of 1080) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "2.08%",
              left: "3.7%",
              right: "3.7%",
              bottom: "2.08%",
              border: "1px solid #D4C9BD",
            }}
          />
          {/* Inner border — inset 4.5% (49 of 1080) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "2.55%",
              left: "4.54%",
              right: "4.54%",
              bottom: "2.55%",
              border: "1px solid #D4C9BD",
            }}
          />
          {/* Paper-tone overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%), radial-gradient(ellipse at 70% 80%, rgba(180,160,130,0.08) 0%, rgba(180,160,130,0) 55%)",
            }}
          />
          {/* Paw watermark — top center, 5.5% wide of canvas, 8% opacity */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "4.7%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "5.55%",
              opacity: 0.08,
              color: "#C97B63",
            }}
          >
            <svg width="100%" viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="30" cy="40" rx="14" ry="11" />
              <ellipse cx="14" cy="24" rx="6" ry="8" />
              <ellipse cx="46" cy="24" rx="6" ry="8" />
              <ellipse cx="22" cy="11" rx="5" ry="7" />
              <ellipse cx="38" cy="11" rx="5" ry="7" />
            </svg>
          </div>
          {/* Ornamental line — between photo and name (y=1030 of 1920 = 53.6%) */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "53.6%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "18.5%",
            }}
          >
            <svg width="100%" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="5" r="2" fill="#D4C9BD" />
              <line x1="18" y1="5" x2="92" y2="5" stroke="#D4C9BD" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="100" cy="5" r="2.5" fill="#D4C9BD" />
              <line x1="108" y1="5" x2="182" y2="5" stroke="#D4C9BD" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="194" cy="5" r="2" fill="#D4C9BD" />
            </svg>
          </div>
        </>
      )}

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

  // Crop modal state — shown after the user picks a file, dismissed
  // once they confirm or cancel. The pending File is kept in memory so
  // we can POST it (alongside the box) to /api/upload on confirm.
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingFileSrc, setPendingFileSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelBox | null>(null);

  const [renderSrc, setRenderSrc] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
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

  // Pre-warm the Neon DB on mount. Neon's free tier auto-suspends compute
  // after ~5 min idle; cold wake is 5-10s. Firing this when the user lands
  // on /create means the DB is reliably warm by the time they finish the
  // form and pay, keeping verify-and-create comfortably under 10s.
  useEffect(() => {
    fetch("/api/warmup").catch(() => {});
  }, []);

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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset the input so picking the same file twice still fires onChange.
    e.target.value = "";
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
    // Stage the file for the crop modal — actual upload waits for confirm.
    const localSrc = URL.createObjectURL(file);
    setPendingFile(file);
    setPendingFileSrc(localSrc);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const cancelCrop = useCallback(() => {
    if (pendingFileSrc) URL.revokeObjectURL(pendingFileSrc);
    setPendingFile(null);
    setPendingFileSrc(null);
    setCroppedAreaPixels(null);
  }, [pendingFileSrc]);

  const handleCropConfirm = async () => {
    if (!pendingFile || !croppedAreaPixels) return;
    setUploading(true);
    setUploadError(null);

    try {
      const fd = new FormData();
      fd.append("file", pendingFile);
      fd.append("cropBox", JSON.stringify(croppedAreaPixels));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const publicUrl: string | undefined =
        data.publicUrl ?? data.croppedUrl ?? data.originalUrl;
      if (!publicUrl) throw new Error("Upload response missing publicUrl");

      setOriginalPhotoUrl(data.originalUrl ?? publicUrl);
      setCroppedPhotoUrl(publicUrl);
      setPreviewPhotoSrc(publicUrl);

      if (pendingFileSrc) URL.revokeObjectURL(pendingFileSrc);
      setPendingFile(null);
      setPendingFileSrc(null);
    } catch (err) {
      console.error("Crop upload failed:", err);
      setUploadError("We couldn't upload that photo. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCheckout = async () => {
    if (!originalPhotoUrl || !croppedPhotoUrl || !form.petName || !form.diedDate) return;
    setSubmitting(true);
    setCheckoutError(null);
    try {
      await loadRazorpay();
      if (!window.Razorpay) {
        setCheckoutError("Couldn't load the payment SDK. Check your connection and try again.");
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
        console.error("Checkout response missing order:", data);
        setCheckoutError("Couldn't start checkout. Please try again.");
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
        handler: (response) => {
          // Save the payment IDs to localStorage as a recovery breadcrumb,
          // then redirect IMMEDIATELY. All server-side verify+insert work
          // happens on the success page, where retries are free.
          try {
            localStorage.setItem(
              "lastPayment",
              JSON.stringify({
                ...response,
                at: new Date().toISOString(),
              })
            );
          } catch {}
          const params = new URLSearchParams({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          window.location.href = `/success?${params.toString()}`;
        },
      });
      rzp.open();
    } catch (err) {
      console.error("Checkout setup failed:", err);
      setCheckoutError("Couldn't start checkout. Please try again.");
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

      {/* Crop modal — shown between file pick and upload. */}
      {pendingFileSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-2xl w-full max-w-[520px] p-5 shadow-xl">
            <h3
              className="mb-3 text-[18px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Crop their photo
            </h3>
            <div className="relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
              <Cropper
                image={pendingFileSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, areaPixels) =>
                  setCroppedAreaPixels(areaPixels as PixelBox)
                }
              />
            </div>
            <div className="mt-4">
              <label className="text-[10px] tracking-[0.08em] uppercase text-[--color-text-tertiary] font-medium block mb-1">
                Zoom
              </label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
                aria-label="Zoom"
              />
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={cancelCrop}
                disabled={uploading}
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropConfirm}
                disabled={uploading || !croppedAreaPixels}
                type="button"
              >
                {uploading ? "Uploading…" : "Use this crop"}
              </Button>
            </div>
            {uploadError && (
              <p className="mt-3 text-[12px] text-[--color-text-secondary]">
                {uploadError}
              </p>
            )}
          </div>
        </div>
      )}

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
                      label="When they found you"
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
                      label="One line that was them (optional)"
                      placeholder="Something only you would have said about them"
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
          /* ──────── STATE 2 — Mobile-first vertical stack, desktop 2-col ──────── */
          (() => {
            const headingNode = (
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
            );

            const photoThumbNode = (
              <>
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
              </>
            );

            const nameFieldNode = (
              <MinimalField
                label="Their name"
                value={form.petName}
                placeholder="Their name"
                onChange={(v) => setForm((f) => ({ ...f, petName: v }))}
              />
            );

            const datesFieldsNode = (
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
            );

            const tributeFieldNode = (
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
            );

            const templatePickerNode = (
              <div className="pt-2">
                <label className="text-[10px] tracking-[0.08em] uppercase text-[--color-text-tertiary] mb-2 font-medium block">
                  Template
                </label>
                <div className="flex gap-2 overflow-x-auto -mx-1 px-1 lg:overflow-visible lg:mx-0 lg:px-0">
                  {TEMPLATE_OPTIONS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      type="button"
                      className={`shrink-0 w-[60px] lg:w-auto lg:flex-1 group flex flex-col items-center gap-1.5 transition-transform duration-[200ms] ${
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
            );

            const formatToggleNode = (
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
            );

            const ctasNode = (
              <div className="mt-auto pt-4 space-y-2.5">
                <Button
                  className="w-full min-h-[48px]"
                  onClick={handleCheckout}
                  disabled={!canCheckout || submitting}
                >
                  {submitting ? "Opening checkout..." : "Get full memorial — $24.99"}
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
                {checkoutError ? (
                  <p
                    className="text-[12px] text-center px-2 py-2 rounded-md"
                    style={{
                      color: "#7A2A1F",
                      backgroundColor: "rgba(201,123,99,0.12)",
                      border: "1px solid rgba(201,123,99,0.3)",
                    }}
                  >
                    {checkoutError}
                  </p>
                ) : (
                  <p className="text-[11px] text-center" style={{ color: "#888888" }}>
                    {!canCheckout
                      ? "Add a name and goodbye date to continue"
                      : "Free preview is watermarked. Full memorial is yours forever."}
                  </p>
                )}
              </div>
            );

            const previewInner = renderSrc ? (
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
            );

            const previewMotionProps = {
              initial: { opacity: 0 },
              animate: {
                opacity: rendering || uploading ? 0.6 : 1,
                scale: rendering || uploading ? [1, 1.005, 1] : 1,
              },
              transition: {
                opacity: { duration: 0.4 },
                scale:
                  rendering || uploading
                    ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const }
                    : { duration: 0 },
              },
            };

            return (
              <motion.div
                key="state-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1.0] }}
                className="flex-1 max-w-[1400px] w-full mx-auto px-4 lg:px-6 py-4 lg:py-5 lg:overflow-hidden"
              >
                {/* MOBILE — vertical stack, preview-first */}
                <div className="flex flex-col gap-5 lg:hidden">
                  {headingNode}
                  <motion.div
                    key={`preview-mobile-${selectedFormat}`}
                    {...previewMotionProps}
                    className={`overflow-hidden rounded-[8px] mx-auto w-full ${
                      selectedFormat === "story"
                        ? "max-w-[420px] aspect-[9/16]"
                        : "max-w-[460px] aspect-square"
                    }`}
                  >
                    {previewInner}
                  </motion.div>
                  {templatePickerNode}
                  {formatToggleNode}
                  {photoThumbNode}
                  {nameFieldNode}
                  {datesFieldsNode}
                  {tributeFieldNode}
                  {ctasNode}
                </div>

                {/* DESKTOP — 2-col, original layout */}
                <div className="hidden lg:grid lg:grid-cols-[minmax(320px,1fr)_2fr] lg:gap-8 lg:h-full">
                  <div className="flex flex-col gap-3 overflow-y-auto pr-2">
                    {headingNode}
                    {photoThumbNode}
                    {nameFieldNode}
                    {datesFieldsNode}
                    {tributeFieldNode}
                    {templatePickerNode}
                    {formatToggleNode}
                    {ctasNode}
                  </div>
                  <div className="flex items-center justify-center h-full p-2">
                    <motion.div
                      key={`preview-desktop-${selectedFormat}`}
                      {...previewMotionProps}
                      className={`overflow-hidden rounded-[8px] ${
                        selectedFormat === "story"
                          ? "h-full max-h-[min(90vh,1100px)] aspect-[9/16]"
                          : "h-full max-h-[min(90vh,800px)] aspect-square"
                      }`}
                      style={{ maxWidth: "100%" }}
                    >
                      {previewInner}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}
