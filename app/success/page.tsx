import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { pets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SuccessClient } from "./success-client";

interface Props {
  searchParams: { slug?: string };
}

export default async function SuccessPage({ searchParams }: Props) {
  const { slug } = searchParams;
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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

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
