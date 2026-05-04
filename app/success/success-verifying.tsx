"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  orderId: string;
  paymentId: string;
  signature: string;
}

/**
 * Calls /api/verify-and-create with the Razorpay payment triple. Retries on
 * timeout/5xx (e.g., Netlify lambda 10s kill, Neon cold start) — every 4s
 * indefinitely. Bails only on signature mismatch / 400 (unrecoverable).
 *
 * On success, navigates to /success?slug=<slug> (clean URL, no payment IDs
 * in browser history) — the slug branch then takes over with SuccessPending.
 */
export function SuccessVerifying({ orderId, paymentId, signature }: Props) {
  const [attempts, setAttempts] = useState(0);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function tick() {
      setAttempts((n) => n + 1);
      try {
        const res = await fetch("/api/verify-and-create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderId,
            payment_id: paymentId,
            signature,
          }),
        });
        if (cancelled) return;
        const data = await res.json().catch(() => ({}));
        if (data?.slug) {
          // Found or just created — clean URL, drop the payment params.
          window.location.replace(`/success?slug=${data.slug}`);
          return;
        }
        // 400 = unrecoverable (bad signature, missing metadata). Stop retrying.
        if (res.status === 400) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setFatalError(data?.error ?? "Verification failed");
        }
        // Other failures (500/timeout/network) — keep retrying via interval.
      } catch (err) {
        if (cancelled) return;
        // Network errors / timeouts — interval will retry.
        console.warn("verify-and-create attempt failed:", err);
      }
    }

    tick();
    intervalRef.current = setInterval(tick, 4000);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [orderId, paymentId, signature]);

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
          Payment received — preparing your memorial.
        </p>
        <p className="text-[--color-text-secondary]">
          Hang tight, this takes a few seconds. Don&apos;t close the page.
          {attempts > 1 ? ` (attempt ${attempts})` : ""}
        </p>
        {fatalError && (
          <div
            className="text-[13px] px-4 py-3 rounded-md"
            style={{
              color: "#7A2A1F",
              backgroundColor: "rgba(201,123,99,0.12)",
              border: "1px solid rgba(201,123,99,0.3)",
            }}
          >
            <p className="font-medium mb-1">{fatalError}</p>
            <p>
              Your payment is safe. Email{" "}
              <a
                href={`mailto:hello@rainbow.memorial?subject=Payment%20${paymentId}&body=Order%20${orderId}%0APayment%20${paymentId}`}
                className="underline"
              >
                hello@rainbow.memorial
              </a>{" "}
              with payment ID <code>{paymentId}</code> and we&apos;ll fix this
              by hand.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
