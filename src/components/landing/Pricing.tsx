import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "7,99€",
      description: "Professioneller Lebenslauf",
      features: [
        "1x KI-generierter Lebenslauf",
        "ATS-optimiertes Format",
        "Deutscher Standard",
        "PDF-Download",
      ],
      cta: "Jetzt starten",
      highlighted: false,
    },
    {
      name: "Beliebt 🔥",
      price: "17,99€",
      originalPrice: "29,99€",
      description: "Komplettpaket für deinen Job",
      features: [
        "Professioneller Lebenslauf",
        "Individuelles Bewerbungsschreiben",
        "Interview Coaching",
        "ATS-optimiert",
        "PDF-Download",
        "Alle Formate",
      ],
      cta: "Bestes Angebot wählen",
      highlighted: true,
      badge: "BEST SELLER",
    },
    {
      name: "Premium",
      price: "22,99€",
      originalPrice: "39,99€",
      description: "Maximale Qualität & Erfolgschance",
      features: [
        "Alles aus dem Beliebt-Paket",
        "Premium-Qualität",
        "Erweiterte Personalisierung",
        "Mehrere Varianten",
        "Prioritäts-Support",
        "30 Tage Zugang",
      ],
      cta: "Premium wählen",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Deine perfekte Bewerbung
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Einmalige Zahlung. Keine versteckten Kosten. Kein Abo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-white border-2 border-blue-600 shadow-xl shadow-blue-600/10 scale-105"
                  : "bg-white border border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="fire">{plan.badge}</Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  {plan.originalPrice && (
                    <span className="text-slate-400 line-through text-lg mr-2">{plan.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                </div>
                <p className="text-sm text-slate-500">{plan.description}</p>
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
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Individual products */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Einzelprodukte</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Lebenslauf", price: "7,99€" },
              { name: "Bewerbungsschreiben", price: "7,99€" },
              { name: "Interview Coaching", price: "5,99€" },
              { name: "Starter Bundle (CV + Bewerbung)", price: "14,99€" },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-xl px-6 py-4 border border-slate-200 text-sm"
              >
                <span className="text-slate-700 font-medium">{product.name}</span>
                <span className="text-blue-600 font-bold ml-3">{product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
