import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { productType } = await req.json();

    const product = PRODUCTS[productType as keyof typeof PRODUCTS];

    if (!product) {
      return NextResponse.json({ error: "Ungültiges Produkt" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutSession = await createCheckoutSession({
      priceInCents: product.price,
      productName: `Stellio – ${product.name}`,
      productType,
      userId,
      successUrl: `${baseUrl}/dashboard?payment=success`,
      cancelUrl: `${baseUrl}/dashboard?payment=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout fehlgeschlagen" },
      { status: 500 }
    );
  }
}
