"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Wie unterscheidet sich Stellio von ChatGPT?",
    answer:
      "ChatGPT ist ein allgemeines KI-Tool – du musst wissen, welche Prompts du eingeben musst, und das Ergebnis ist oft generisch. Stellio ist speziell für den deutschen Bewerbungsmarkt optimiert. Wir kennen die Standards (DIN 5008, ATS-Systeme) und erstellen Dokumente, die sich wie von einem professionellen Bewerbungsberater geschrieben lesen.",
  },
  {
    question: "Ist das ein Abo oder eine einmalige Zahlung?",
    answer:
      "Einmalige Zahlung. Du zahlst einmal und bekommst deine fertigen Unterlagen. Kein Abo, keine versteckten Kosten, keine automatische Verlängerung.",
  },
  {
    question: "Sind die Bewerbungen wirklich personalisiert?",
    answer:
      "Ja! Jedes Dokument wird individuell auf Basis deines Profils, deiner Erfahrung und deiner Zielposition erstellt. Kein Copy-Paste, keine Vorlagen. Jede Bewerbung ist einzigartig.",
  },
  {
    question: "Was bedeutet ATS-optimiert?",
    answer:
      "ATS (Applicant Tracking System) sind Softwaresysteme, die viele Unternehmen nutzen, um Bewerbungen vorzufiltern. Ein nicht-ATS-optimierter Lebenslauf wird oft gar nicht von einem Menschen gelesen. Unsere Formate sind so gestaltet, dass sie diese Filter problemlos passieren.",
  },
  {
    question: "Kann ich die Bewerbung bearbeiten?",
    answer:
      "Natürlich! Du erhältst deine Dokumente als bearbeitbare Dateien. Du kannst alles nach deinen Wünschen anpassen, bevor du es abschickst.",
  },
  {
    question: "Wie funktioniert das Interview Coaching?",
    answer:
      "Unsere KI analysiert dein Profil und die Zielposition und generiert die wahrscheinlichsten Interviewfragen mit perfekten Antwortvorschlägen, STAR-Methode-Beispielen und konkreten Tipps. Es ist wie ein persönlicher Interview-Coach.",
  },
  {
    question: "Für welche Branchen funktioniert Stellio?",
    answer:
      "Stellio funktioniert für alle Branchen. Die KI passt Sprache, Ton und Inhalt an deine spezifische Branche und Position an – ob IT, Marketing, Finanzen, Gesundheitswesen oder Handwerk.",
  },
  {
    question: "Gibt es eine Geld-zurück-Garantie?",
    answer:
      "Ja. Wenn du mit dem Ergebnis nicht zufrieden bist, bekommst du innerhalb von 14 Tagen dein Geld zurück. Ohne Wenn und Aber.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Häufige Fragen
          </h2>
          <p className="text-lg text-slate-600">
            Alles, was du über Stellio wissen musst
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                <svg
                  className={cn(
                    "w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
      </div>
    </section>
  );
}
