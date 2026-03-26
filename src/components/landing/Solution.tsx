"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Solution() {
  const steps = [
    {
      number: "01",
      title: "Profil & Zielposition eingeben",
      description:
        "Beantworte ein paar einfache Fragen zu deiner Erfahrung und dem Job, den du willst. Dauert unter 5 Minuten – kein kompliziertes Formular.",
      detail: "Name, Erfahrung, Skills, Zielposition",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "KI erstellt deine Unterlagen",
      description:
        "Unsere KI analysiert dein Profil und erstellt maßgeschneiderte Dokumente – individuell formuliert, ATS-optimiert, im deutschen Bewerbungsstandard.",
      detail: "Lebenslauf, Anschreiben oder Interview-Coaching",
      color: "purple",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Herunterladen & bewerben",
      description:
        "Deine fertige Bewerbung als PDF – bereit zum Versenden. Professionell formatiert, überzeugend geschrieben und bereit für deinen Traumjob.",
      detail: "PDF-Download, sofort einsatzbereit",
      color: "green",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; line: string; number: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600", line: "bg-blue-200", number: "text-blue-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", line: "bg-purple-200", number: "text-purple-600" },
    green: { bg: "bg-green-100", text: "text-green-600", line: "bg-green-200", number: "text-green-600" },
  };

  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">So funktioniert&apos;s</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            In 3 Schritten zur <span className="gradient-text">perfekten Bewerbung</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kein komplizierter Prozess. Kein stundenlanges Formatieren.
            Von der Eingabe bis zur fertigen Bewerbung in unter 5 Minuten.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-[16.7%] right-[16.7%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => {
              const colors = colorMap[step.color];
              return (
                <div key={step.number} className="relative text-center group">
                  {/* Step number circle */}
                  <div className="relative z-10 mx-auto mb-6">
                    <div className={`w-20 h-20 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto ${colors.text} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      {step.icon}
                    </div>
                    <div className={`absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center border-2 ${colors.text} text-xs font-bold shadow-sm`} style={{ borderColor: "currentColor" }}>
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4 text-sm">{step.description}</p>
                  <p className={`text-xs font-medium ${colors.text} ${colors.bg} inline-block px-3 py-1 rounded-full`}>
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/auth/signup">
            <Button size="lg" className="px-10">Jetzt Bewerbung erstellen</Button>
          </Link>
          <p className="text-sm text-slate-500 mt-3">Kostenlose Vorschau – Zahlung erst nach Zufriedenheit</p>
        </div>
      </div>
    </section>
  );
}
