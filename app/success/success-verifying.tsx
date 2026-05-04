"use client";

import { useEffect, useState } from "react";

interface Props {
  orderId: string;
  paymentId: string;
  signature: string;
}

const MAX_ATTEMPTS = 3;

/**
 * Verifies the Razorpay payment by POSTing to /api/verify-and-create.
 *
 * Retry rules:
 *   - Bail immediately on `retryable: false` (bad signature, missing metadata,
 *     schema not migrated). Surface support contact with the payment ID.
 *   - On retryable failure (timeout, transient 5xx), retry every 4s up to
 *     MAX_ATTEMPTS total, then surface failure.
 *   - On success, replace URL with /success?slug=<slug>; SuccessPending takes
 *     over.
 */
export function SuccessVerifying({ orderId, paymentId, signature }: Props) {
  const [attempts, setAttempts] = useState(0);
  const [fatalError, setFatalError] = useState<string | null>(null);

  useEffect(() => {
    // Mount-local state — fresh on every mount including React strict-mode
    // double-mount in dev. Refs across mounts would carry "stopped=true"
    // from cleanup into the next mount and silently kill all ticks.
    let stopped = false;
    let interval: ReturnType<typeof setInterval> | null = null;
    let attemptCount = 0;

    const stop = () => {
      stopped = true;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    async function tick() {
      if (stopped) return;
      attemptCount += 1;
      const attemptNum = attemptCount;
      setAttempts(attemptNum);
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
        if (stopped) return;
        const data = (await res.json().catch(() => ({}))) as {
          slug?: string;
          error?: string;
          retryable?: boolean;
        };
        if (data?.slug) {
          stop();
          window.location.replace(`/success?slug=${data.slug}`);
          return;
        }
        if (data?.retryable === false) {
          stop();
          setFatalError(data.error ?? "Verification failed");
          return;
        }
        if (attemptNum >= MAX_ATTEMPTS) {
          stop();
          setFatalError(
            data.error ??
              "We couldn't confirm your payment after several tries."
          );
        }
      } catch (err) {
        if (stopped) return;
        console.warn("verify-and-create attempt failed:", err);
        if (attemptNum >= MAX_ATTEMPTS) {
          stop();
          setFatalError("Network error confirming payment.");
        }
      }
    }

    tick();
    interval = setInterval(tick, 4000);

    return () => {
      stop();
    };
  }, [orderId, paymentId, signature]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="text-center space-y-5 max-w-[460px] px-6">
        {!fatalError && (
          <div className="inline-block w-10 h-10 border-2 border-[--color-border] border-t-[--color-accent-primary] rounded-full animate-spin" />
        )}
        <p
          className="text-[28px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {fatalError
            ? "We couldn't confirm your payment."
            : "Payment received — preparing your memorial."}
        </p>
        {!fatalError && (
          <p className="text-[--color-text-secondary]">
            Hang tight, this takes a few seconds. Don&apos;t close the page.
            {attempts > 1 ? ` (attempt ${attempts}/${MAX_ATTEMPTS})` : ""}
          </p>
        )}
        {fatalError && (
          <div
            className="text-[14px] px-5 py-4 rounded-md text-left"
            style={{
              color: "#5A2A1F",
              backgroundColor: "rgba(201,123,99,0.10)",
              border: "1px solid rgba(201,123,99,0.3)",
            }}
          >
            <p className="mb-2">
              <strong>Your payment is safe.</strong> We hit a problem creating
              your memorial.
            </p>
            <p className="mb-2 text-[13px]">{fatalError}</p>
            <p className="text-[13px]">
              Email{" "}
              <a
                href={`mailto:hello@rainbow.memorial?subject=Payment%20${paymentId}&body=Order%20ID:%20${orderId}%0APayment%20ID:%20${paymentId}`}
                className="underline font-medium"
              >
                hello@rainbow.memorial
              </a>{" "}
              with this payment ID and we&apos;ll fix it by hand within 24h:
            </p>
            <p className="mt-2 font-mono text-[12px] break-all">
              {paymentId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
