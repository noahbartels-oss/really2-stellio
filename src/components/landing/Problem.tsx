"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Problem() {
  const problems = [
    {
      stat: "77%",
      statLabel: "aller Bewerbungen",
      title: "werden sofort aussortiert",
      description:
        "Nicht wegen fehlender Qualifikation – sondern weil der Lebenslauf nicht ATS-optimiert ist oder das Anschreiben generisch klingt. Recruiter brauchen 6 Sekunden für ihre Entscheidung.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      color: "red",
    },
    {
      stat: "4+ Std.",
      statLabel: "pro Bewerbung",
      title: "für mittelmäßige Ergebnisse",
      description:
        "Google-Vorlagen, ChatGPT-Prompts, stundenlange Formatierung – und am Ende klingt es wie jede andere Bewerbung. Deine Zeit ist zu wertvoll dafür.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "amber",
    },
    {
      stat: "3 von 4",
      statLabel: "Bewerbern",
      title: "fühlen sich unsicher im Interview",
      description:
        "Du bekommst endlich eine Einladung – aber ohne Vorbereitung auf die richtigen Fragen verschenkst du deine Chance. 80% der Absagen fallen im Interview.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "slate",
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; stat: string; border: string }> = {
    red: { bg: "bg-red-50", text: "text-red-500", stat: "text-red-600", border: "border-red-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-500", stat: "text-amber-600", border: "border-amber-100" },
    slate: { bg: "bg-slate-50", text: "text-slate-400", stat: "text-slate-600", border: "border-slate-200" },
  };

  return (
    <section className="py-24 px-4 bg-slate-50/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-3">Das Problem</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Warum gute Kandidaten keine Einladungen bekommen
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Es liegt nicht an deiner Erfahrung. Es liegt an deiner Bewerbung.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem) => {
            const colors = colorMap[problem.color];
            return (
              <div
                key={problem.title}
                className={`bg-white rounded-2xl p-8 border ${colors.border} hover:shadow-lg transition-all duration-300 group`}
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-5 ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                  {problem.icon}
                </div>
                <div className="mb-4">
                  <span className={`text-3xl font-bold ${colors.stat}`}>{problem.stat}</span>
                  <span className="text-sm text-slate-500 ml-2">{problem.statLabel}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{problem.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{problem.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-6 text-lg">
            Es gibt einen besseren Weg. Einen, der in <strong className="text-slate-900">5 Minuten</strong> funktioniert.
          </p>
          <Link href="/auth/signup">
            <Button size="lg">Jetzt bessere Bewerbung erstellen</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
