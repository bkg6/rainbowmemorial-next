import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SuccessClient } from "./success-client";
import { SuccessPending } from "./success-pending";
import { SuccessVerifying } from "./success-verifying";

interface Props {
  searchParams: {
    slug?: string;
    order_id?: string;
    payment_id?: string;
    signature?: string;
  };
}

export default async function SuccessPage({ searchParams }: Props) {
  const { slug, order_id, payment_id, signature } = searchParams;

  // Post-payment landing — Razorpay redirected here directly. Verify, insert,
  // then bounce to /success?slug=... Retries handled client-side.
  if (order_id && payment_id && signature) {
    return (
      <SuccessVerifying
        orderId={order_id}
        paymentId={payment_id}
        signature={signature}
      />
    );
  }

  if (!slug) redirect("/");

  const petRecord = await db
    .select()
    .from(pets)
    .where(eq(pets.slug, slug))
    .limit(1);

  if (!petRecord.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center space-y-4 max-w-[400px] px-6">
          <p
            className="text-[28px]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            We couldn&apos;t find that tribute.
          </p>
          <p className="text-[--color-text-secondary]">
            If you just paid, try refreshing in a moment.
          </p>
        </div>
      </div>
    );
  }

  const pet = petRecord[0];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

  if (!pet.renderedImageUrl) {
    return <SuccessPending slug={slug} petName={pet.petName} />;
  }

  return (
    <SuccessClient
      petName={pet.petName}
      bornDate={pet.bornDate ?? undefined}
      diedDate={pet.diedDate}
      tributeLine={pet.tributeLine ?? undefined}
      renderedImageUrl={pet.renderedImageUrl ?? ""}
      slug={pet.slug}
      appUrl={appUrl}
    />
  );
}
