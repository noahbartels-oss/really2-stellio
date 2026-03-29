"use client";

import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export function Providers({ children }: { children: React.ReactNode }) {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  return (
    <SessionProvider>
      {paypalClientId ? (
        <PayPalScriptProvider
          options={{
            clientId: paypalClientId,
            currency: "EUR",
            intent: "capture",
          }}
          deferLoading={false}
        >
          {children}
        </PayPalScriptProvider>
      ) : (
        children
      )}
    </SessionProvider>
  );
}
