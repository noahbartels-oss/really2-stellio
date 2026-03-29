"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PayPalCheckoutProps {
  productType: string;
  onSuccess?: () => void;
}

export default function PayPalCheckout({ productType, onSuccess }: PayPalCheckoutProps) {
  const router = useRouter();
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  const [error, setError] = useState("");

  const createOrder = async () => {
    setError("");
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.error || "Bestellung konnte nicht erstellt werden";
        setError(msg);
        throw new Error(msg);
      }

      return data.orderID;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Verbindungsfehler. Bitte prüfe deine Internetverbindung.";
      if (!error) setError(msg);
      throw err;
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    setError("");
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Zahlung konnte nicht abgeschlossen werden");
        return;
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard?payment=success");
        router.refresh();
      }
    } catch {
      setError("Verbindungsfehler beim Abschließen der Zahlung. Bitte versuche es erneut.");
    }
  };

  if (isRejected) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm text-center">
        <p className="font-medium mb-1">PayPal konnte nicht geladen werden</p>
        <p className="text-xs text-amber-600">
          Bitte deaktiviere deinen Ad-Blocker oder versuche es in einem anderen Browser.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {isPending ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 45,
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={() => {
            setError("Zahlung wurde abgebrochen. Du kannst es jederzeit erneut versuchen.");
          }}
          onError={(err) => {
            console.error("PayPal Button Error:", err);
            setError(
              "PayPal-Zahlung fehlgeschlagen. Bitte deaktiviere deinen Ad-Blocker oder versuche es erneut."
            );
          }}
        />
      )}
    </div>
  );
}
