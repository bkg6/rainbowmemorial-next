import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SuccessClient } from "./success-client";

interface Props {
  searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = searchParams;
  if (!session_id) redirect("/");

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    redirect("/");
  }

  if (session.payment_status !== "paid") {
    redirect("/create");
  }

  const petRecord = await db
    .select()
    .from(pets)
    .where(eq(pets.stripeSessionId, session_id))
    .limit(1);

  // Webhook may not have fired yet — show pending state
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
            Your tribute is being prepared.
          </p>
          <p className="text-[--color-text-secondary]">
            This takes about 30 seconds. Refresh this page in a moment.
          </p>
        </div>
      </div>
    );
  }

  const pet = petRecord[0];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://paws.memorial";

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
