import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createPayPalOrder } from "@/lib/paypal";
import { PRODUCTS } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert. Bitte melde dich erneut an." }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      console.error("PayPal credentials not configured");
      return NextResponse.json(
        { error: "Zahlungssystem ist aktuell nicht verfügbar. Bitte versuche es später erneut." },
        { status: 503 }
      );
    }

    const { productType } = await req.json();

    const product = PRODUCTS[productType as keyof typeof PRODUCTS];

    if (!product) {
      return NextResponse.json({ error: "Ungültiges Produkt" }, { status: 400 });
    }

    const order = await createPayPalOrder({
      priceInCents: product.price,
      productName: `Stellio – ${product.name}`,
      productType,
      userId,
    });

    return NextResponse.json({ orderID: order.id });
  } catch (error) {
    console.error("PayPal create order error:", error);
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";

    if (message.includes("auth failed")) {
      return NextResponse.json(
        { error: "PayPal-Konfiguration fehlerhaft. Bitte kontaktiere den Support." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "PayPal-Bestellung konnte nicht erstellt werden. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
