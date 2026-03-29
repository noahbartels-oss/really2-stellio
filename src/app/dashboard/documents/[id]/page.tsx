"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PayPalCheckout from "@/components/PayPalCheckout";
import { PRODUCTS } from "@/lib/utils";

interface DocumentData {
  id: string;
  type: string;
  title: string;
  content: string;
  isLocked: boolean;
  createdAt: string;
}

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data.document);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!document) {
    return (
      <Card className="p-12 text-center">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Dokument nicht gefunden</h2>
        <p className="text-slate-500 mb-6">Dieses Dokument existiert nicht oder wurde gelöscht.</p>
        <Button onClick={() => router.push("/dashboard/documents")}>Zu meinen Dokumenten</Button>
      </Card>
    );
  }

  const getRecommendedProduct = () => {
    switch (document.type) {
      case "CV": return "CV_SINGLE";
      case "COVER_LETTER": return "COVER_LETTER_SINGLE";
      case "INTERVIEW_COACHING": return "INTERVIEW_SINGLE";
      default: return "PRO_BUNDLE";
    }
  };

  const handlePaymentSuccess = () => {
    router.push(`/dashboard/documents/${id}?unlocked=true`);
    router.refresh();
    window.location.reload();
  };

  const productOptions = [
    {
      key: getRecommendedProduct(),
      label: "Einzelprodukt",
      price: PRODUCTS[getRecommendedProduct() as keyof typeof PRODUCTS].displayPrice,
      originalPrice: PRODUCTS[getRecommendedProduct() as keyof typeof PRODUCTS].originalPrice,
      subtitle: "Nur dieses Dokument",
      highlighted: false,
    },
    {
      key: "PRO_BUNDLE",
      label: "Pro Bundle",
      price: PRODUCTS.PRO_BUNDLE.displayPrice,
      originalPrice: PRODUCTS.PRO_BUNDLE.originalPrice,
      subtitle: "CV + Bewerbung + Interview",
      highlighted: true,
      badge: "BELIEBT",
    },
    {
      key: "PREMIUM",
      label: "Premium",
      price: PRODUCTS.PREMIUM.displayPrice,
      originalPrice: PRODUCTS.PREMIUM.originalPrice,
      subtitle: "Maximale Qualität",
      highlighted: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.push("/dashboard/documents")}
            className="text-sm text-slate-500 hover:text-slate-700 mb-2 flex items-center gap-1 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{document.title}</h1>
          <p className="text-sm text-slate-500 mt-1">
            Erstellt am {new Date(document.createdAt).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {!document.isLocked && (
          <Button variant="outline" onClick={() => window.print()}>
            PDF speichern
          </Button>
        )}
      </div>

      {/* Success state */}
      {!document.isLocked && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Dein Dokument ist fertig! Du kannst es jetzt herunterladen oder ausdrucken.
        </div>
      )}

      {/* Document content */}
      <Card className="p-8 mb-8">
        <div
          className={document.isLocked ? "content-locked" : ""}
          dangerouslySetInnerHTML={{ __html: document.content }}
        />
      </Card>

      {/* Paywall */}
      {document.isLocked && (
        <Card className="p-8 border-2 border-blue-600 shadow-xl shadow-blue-600/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Vollständiges Dokument freischalten
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
              Du siehst aktuell nur eine Vorschau. Wähle ein Paket und bezahle sicher mit PayPal.
            </p>
          </div>

          {/* Product selection */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {productOptions.map((product) => (
              <button
                key={product.key}
                onClick={() => setSelectedProduct(product.key)}
                className={`relative rounded-xl p-5 text-left transition-all cursor-pointer ${
                  selectedProduct === product.key
                    ? "border-2 border-blue-600 bg-blue-50/50 shadow-md"
                    : product.highlighted
                    ? "border-2 border-blue-600 bg-blue-50/30"
                    : "border border-slate-200 hover:border-slate-300"
                }`}
              >
                {product.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
                <h3 className="font-semibold text-slate-900 mb-1">{product.label}</h3>
                <div className="mb-1">
                  {product.originalPrice && (
                    <span className="text-slate-400 line-through text-sm mr-1">{product.originalPrice}</span>
                  )}
                  <span className="text-2xl font-bold text-slate-900">{product.price}</span>
                </div>
                <p className="text-sm text-slate-500">{product.subtitle}</p>

                {/* Selection indicator */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedProduct === product.key
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300"
                }`}>
                  {selectedProduct === product.key && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* PayPal button */}
          {selectedProduct ? (
            <div className="max-w-sm mx-auto">
              <PayPalCheckout
                key={selectedProduct}
                productType={selectedProduct}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-500 text-sm">
                Wähle ein Paket aus, um mit PayPal zu bezahlen
              </p>
            </div>
          )}

          <p className="text-center text-xs text-slate-400 mt-4">
            Einmalige Zahlung · Sichere Zahlung via PayPal
          </p>
        </Card>
      )}
    </div>
  );
}
