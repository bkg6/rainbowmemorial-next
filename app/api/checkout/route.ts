import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      petName,
      bornDate,
      diedDate,
      tributeLine,
      templateId,
      originalPhotoUrl,
      croppedPhotoUrl,
    } = body;

    if (!petName || !diedDate || !originalPhotoUrl || !croppedPhotoUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://rainbow.memorial";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/create?name=${encodeURIComponent(petName)}&died=${diedDate}`,
      metadata: {
        petName,
        bornDate: bornDate ?? "",
        diedDate,
        tributeLine: tributeLine ?? "",
        templateId: templateId ?? "rainbow_bridge",
        originalPhotoUrl,
        croppedPhotoUrl,
      },
      customer_email: undefined,
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
