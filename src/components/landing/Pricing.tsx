"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Pricing() {
  const plans = [
    {
      name: "Lebenslauf",
      price: "6,79",
      description: "ATS-optimierter Lebenslauf",
      features: [
        "Professioneller Lebenslauf",
        "ATS-optimiertes Format",
        "Deutscher Standard",
        "PDF-Download",
        "14 Tage Geld-zurück",
      ],
      cta: "Lebenslauf erstellen",
      highlighted: false,
    },
    {
      name: "Komplettpaket",
      price: "14,99",
      originalPrice: "22,77",
      savings: "Über 7 Euro sparen",
      description: "CV + Anschreiben + Interview Coaching",
      features: [
        "Professioneller Lebenslauf",
        "Individuelles Anschreiben",
        "Interview Coaching",
        "ATS-optimiert",
        "PDF-Download",
        "14 Tage Geld-zurück",
      ],
      cta: "Komplettpaket wählen",
      highlighted: true,
      badge: "BELIEBTESTE WAHL",
    },
    {
      name: "Anschreiben",
      price: "7,99",
      description: "Perfektes Bewerbungsschreiben",
      features: [
        "Individuelles Anschreiben",
        "DIN 5008 konform",
        "Auf Stelle zugeschnitten",
        "PDF-Download",
        "14 Tage Geld-zurück",
      ],
      cta: "Anschreiben erstellen",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 bg-slate-50/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Preise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Investiere in deine Karriere
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Einmalige Zahlung. Kein Abo. Kein Kleingedrucktes.
            <br />
            <strong className="text-slate-800">Günstiger als eine Tasse Kaffee pro Bewerbung.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-white border-2 border-blue-600 shadow-xl shadow-blue-600/10 md:scale-105 md:-my-4"
                  : "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="shadow-sm">{plan.badge}</Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
                <div className="mb-2">
                  {plan.originalPrice && (
                    <span className="text-slate-400 line-through text-lg mr-2">{plan.originalPrice}€</span>
                  )}
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-lg text-slate-500">€</span>
                </div>
                {plan.savings && (
                  <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    {plan.savings}
                  </span>
                )}
                <p className="text-xs text-slate-400 mt-2">einmalige Zahlung</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/auth/signup" className="block">
                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  className={`w-full ${plan.highlighted ? "shadow-lg shadow-blue-600/25" : ""}`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Sichere Zahlung via PayPal
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
            14 Tage Geld-zurück-Garantie
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            SSL-verschlüsselt
          </span>
        </div>
      </div>
    </section>
  );
}
