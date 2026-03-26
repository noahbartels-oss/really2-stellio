"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Button from "@/components/ui/Button";

const faqs = [
  {
    question: "Wie unterscheidet sich Stellio von ChatGPT?",
    answer:
      "ChatGPT ist ein allgemeines KI-Tool. Du brauchst die richtigen Prompts und das Ergebnis ist oft generisch, nicht ATS-optimiert und entspricht nicht dem deutschen Bewerbungsstandard. Stellio wurde speziell für den DACH-Arbeitsmarkt entwickelt: DIN 5008 Anschreiben, ATS-optimierte Lebensläufe und individuelles Interview-Coaching – alles in einem Klick.",
  },
  {
    question: "Ist das ein Abo oder eine einmalige Zahlung?",
    answer:
      "Einmalige Zahlung. Du zahlst einmal und bekommst deine fertigen Unterlagen. Kein Abo, keine versteckten Kosten, keine automatische Verlängerung. Sicher bezahlen via PayPal.",
  },
  {
    question: "Sind die Bewerbungen wirklich personalisiert?",
    answer:
      "Ja. Jedes Dokument wird individuell auf Basis deines Profils, deiner Erfahrung und deiner Zielposition erstellt. Keine Textbausteine, keine Vorlagen. Jede Bewerbung ist ein Unikat – auf dich und die Stelle zugeschnitten.",
  },
  {
    question: "Was bedeutet ATS-optimiert?",
    answer:
      "ATS (Applicant Tracking System) sind Softwaresysteme, die über 75% der Unternehmen nutzen, um Bewerbungen automatisch vorzufiltern. Ein nicht-optimierter Lebenslauf wird oft gar nicht von einem Menschen gesehen. Stellio formatiert deine Dokumente so, dass sie jeden ATS-Filter bestehen.",
  },
  {
    question: "Wie schnell bekomme ich meine Bewerbung?",
    answer:
      "In unter 5 Minuten. Profil ausfüllen, Zielposition eingeben – fertig. Dein Lebenslauf, Anschreiben oder Interview-Coaching wird sofort generiert und steht als PDF zum Download bereit.",
  },
  {
    question: "Kann ich die erstellten Dokumente bearbeiten?",
    answer:
      "Natürlich. Du erhältst deine Dokumente als bearbeitbare Dateien. Du kannst alles nach deinen Wünschen anpassen, bevor du es abschickst.",
  },
  {
    question: "Für welche Branchen und Positionen funktioniert Stellio?",
    answer:
      "Für alle. Egal ob IT, Marketing, Finanzen, Gesundheitswesen, Handwerk oder Verwaltung – unsere KI passt Sprache, Ton und Inhalt an deine spezifische Branche und Position an. Von Berufseinsteigern bis Führungskräften.",
  },
  {
    question: "Was ist, wenn ich nicht zufrieden bin?",
    answer:
      "Kein Risiko: Du bekommst innerhalb von 14 Tagen dein Geld zurück. Ohne Wenn und Aber. Wir sind überzeugt von der Qualität – und du wirst es auch sein.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Häufige Fragen
          </h2>
          <p className="text-lg text-slate-600">
            Alles, was du über Stellio wissen musst – auf einen Blick.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={cn(
                "border rounded-xl overflow-hidden transition-all duration-200",
                openIndex === index ? "border-blue-200 bg-blue-50/30 shadow-sm" : "border-slate-200 hover:border-slate-300"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <span className={cn(
                  "font-medium pr-4 transition-colors",
                  openIndex === index ? "text-blue-700" : "text-slate-900"
                )}>{faq.question}</span>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  openIndex === index ? "bg-blue-100 text-blue-600 rotate-180" : "bg-slate-100 text-slate-400"
                )}>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-4 text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">Noch Fragen? Wir helfen gerne.</p>
          <Link href="/auth/signup">
            <Button size="lg">Jetzt kostenlos starten</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
