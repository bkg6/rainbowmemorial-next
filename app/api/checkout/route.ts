import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export const runtime = "nodejs";

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

    const currency = process.env.RAZORPAY_CURRENCY ?? "USD";
    const amount = Number(process.env.RAZORPAY_AMOUNT ?? "2499");

    const safePetName = String(petName).slice(0, 20).replace(/[^a-zA-Z0-9]/g, "");
    const receipt = `pet_${safePetName}_${Date.now()}`.slice(0, 40);

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes: {
        petName,
        bornDate: bornDate ?? "",
        diedDate,
        tributeLine: tributeLine ?? "",
        templateId: templateId ?? "rainbow_bridge",
        originalPhotoUrl,
        croppedPhotoUrl,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
