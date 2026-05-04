"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  slug: string;
  petName: string;
}

export function SuccessPending({ slug, petName }: Props) {
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      try {
        const res = await fetch(`/api/finalize/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (cancelled) return;
        const data = await res.json().catch(() => ({}));
        if (data.ready) {
          window.location.reload();
          return;
        }
        if (data.error) {
          setErrorMsg(data.error);
        }
        setAttempts((n) => n + 1);
      } catch (e) {
        if (cancelled) return;
        console.error("finalize attempt failed:", e);
        setAttempts((n) => n + 1);
      }
    }

    // Trigger immediately, then poll every 4s.
    tick();
    intervalRef.current = setInterval(tick, 4000);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slug]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="text-center space-y-5 max-w-[440px] px-6">
        <div className="inline-block w-10 h-10 border-2 border-[--color-border] border-t-[--color-accent-primary] rounded-full animate-spin" />
        <p
          className="text-[28px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {petName}&apos;s tribute is being prepared.
        </p>
        <p className="text-[--color-text-secondary]">
          This usually takes 15&ndash;30 seconds. We&apos;ll show it as soon as it&apos;s ready
          {attempts > 0 ? ` (attempt ${attempts + 1})` : ""}.
        </p>
        {errorMsg && (
          <p className="text-[13px] text-[--color-text-secondary]">
            Still working on it — if this page hasn&apos;t loaded after a minute,
            email us at hello@rainbow.memorial with your payment confirmation.
          </p>
        )}
      </div>
    </div>
  );
}
