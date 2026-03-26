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
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState("");

  const createOrder = async () => {
    setError("");
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productType }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Bestellung konnte nicht erstellt werden");
      throw new Error(data.error);
    }

    return data.orderID;
  };

  const onApprove = async (data: { orderID: string }) => {
    setError("");
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
  };

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
          onError={() => {
            setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
          }}
        />
      )}
    </div>
  );
}
