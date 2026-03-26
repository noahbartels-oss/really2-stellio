import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const productType = session.metadata?.productType;

    if (userId && productType) {
      // Record payment
      await prisma.payment.create({
        data: {
          userId,
          stripePaymentId: session.payment_intent as string,
          amount: session.amount_total || 0,
          currency: session.currency || "eur",
          status: "COMPLETED",
          productType: productType as "CV_SINGLE" | "COVER_LETTER_SINGLE" | "INTERVIEW_SINGLE" | "STARTER_BUNDLE" | "PRO_BUNDLE" | "PREMIUM",
        },
      });

      // Unlock relevant documents
      const documentTypes = getDocumentTypesForProduct(productType);

      await prisma.document.updateMany({
        where: {
          userId,
          type: { in: documentTypes },
          isLocked: true,
        },
        data: { isLocked: false },
      });
    }
  }

  return NextResponse.json({ received: true });
}

function getDocumentTypesForProduct(productType: string): ("CV" | "COVER_LETTER" | "INTERVIEW_COACHING")[] {
  switch (productType) {
    case "CV_SINGLE":
      return ["CV"];
    case "COVER_LETTER_SINGLE":
      return ["COVER_LETTER"];
    case "INTERVIEW_SINGLE":
      return ["INTERVIEW_COACHING"];
    case "STARTER_BUNDLE":
      return ["CV", "COVER_LETTER"];
    case "PRO_BUNDLE":
    case "PREMIUM":
      return ["CV", "COVER_LETTER", "INTERVIEW_COACHING"];
    default:
      return [];
  }
}
