import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { capturePayPalOrder } from "@/lib/paypal";
import { prisma } from "@/lib/prisma";
import { getDocumentTypesForProduct } from "@/lib/payments";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const { orderID } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: "Order ID fehlt" }, { status: 400 });
    }

    const captureData = await capturePayPalOrder(orderID);

    if (captureData.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Zahlung nicht abgeschlossen" },
        { status: 400 }
      );
    }

    const purchaseUnit = captureData.purchase_units?.[0];
    const customData = JSON.parse(purchaseUnit?.custom_id || "{}");
    const userId = customData.userId;
    const productType = customData.productType;
    const capture = purchaseUnit?.payments?.captures?.[0];

    if (userId && productType) {
      // Record payment
      await prisma.payment.create({
        data: {
          userId,
          paymentId: orderID,
          paymentProvider: "PAYPAL",
          amount: Math.round(parseFloat(capture?.amount?.value || "0") * 100),
          currency: (capture?.amount?.currency_code || "EUR").toLowerCase(),
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json(
      { error: "PayPal-Zahlung konnte nicht abgeschlossen werden" },
      { status: 500 }
    );
  }
}
