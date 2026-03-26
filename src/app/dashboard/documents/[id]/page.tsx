"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
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
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data.document);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePurchase = async (productType: string) => {
    setPurchasing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setPurchasing(false);
    }
  };

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
              Du siehst aktuell nur eine Vorschau. Schalte jetzt das vollständige, hochwertige Dokument frei.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Single product */}
            <div className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-1">Einzelprodukt</h3>
              <p className="text-2xl font-bold text-slate-900 mb-1">
                {PRODUCTS[getRecommendedProduct() as keyof typeof PRODUCTS].displayPrice}
              </p>
              <p className="text-sm text-slate-500 mb-4">Nur dieses Dokument</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handlePurchase(getRecommendedProduct())}
                loading={purchasing}
              >
                Freischalten
              </Button>
            </div>

            {/* Pro Bundle - highlighted */}
            <div className="border-2 border-blue-600 rounded-xl p-5 bg-blue-50/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                BELIEBT
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Pro Bundle</h3>
              <div className="mb-1">
                <span className="text-slate-400 line-through text-sm mr-1">29,99€</span>
                <span className="text-2xl font-bold text-slate-900">17,99€</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">CV + Bewerbung + Interview</p>
              <Button
                className="w-full"
                onClick={() => handlePurchase("PRO_BUNDLE")}
                loading={purchasing}
              >
                Bestes Angebot
              </Button>
            </div>

            {/* Premium */}
            <div className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-1">Premium</h3>
              <div className="mb-1">
                <span className="text-slate-400 line-through text-sm mr-1">39,99€</span>
                <span className="text-2xl font-bold text-slate-900">22,99€</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Maximale Qualität</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handlePurchase("PREMIUM")}
                loading={purchasing}
              >
                Premium wählen
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Einmalige Zahlung · 14 Tage Geld-zurück-Garantie · Sichere Zahlung via Stripe
          </p>
        </Card>
      )}
    </div>
  );
}
