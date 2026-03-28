"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="success" className="mb-6 animate-fade-in">
            Bereits 1.000+ Bewerbungen erstellt
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Schluss mit Absagen.
            <br />
            <span className="gradient-text">Hol dir Einladungen zum Gespräch.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            Stellio erstellt <strong className="text-slate-800">Bewerbungen, die Recruiter überzeugen</strong> – individueller Lebenslauf,
            maßgeschneidertes Anschreiben und persönliches Interview-Coaching. In unter 5 Minuten.
          </p>
          <p className="text-base text-slate-500 max-w-xl mx-auto mb-10">
            Kein generischer KI-Text. Kein Prompt-Wissen nötig. Optimiert für ATS-Systeme und den DACH-Arbeitsmarkt.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/auth/signup">
              <Button size="lg" className="pulse-cta text-lg px-10 py-5">
                Jetzt Bewerbung erstellen
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" size="lg" className="py-5">
                Beispiel ansehen
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 mb-14">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Kostenlose Vorschau
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Keine Kreditkarte nötig
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Sofort einsatzbereit
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              In 5 Minuten fertig
            </span>
          </div>
        </div>

        {/* Hero Preview Mock */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-60" />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-lg px-4 py-1 text-xs text-slate-400 border border-slate-100 w-64 text-center">
                  stellio.at/dashboard
                </div>
              </div>
            </div>

            {/* Preview content - two columns */}
            <div className="grid md:grid-cols-2 gap-0 divide-x divide-slate-100">
              {/* CV Preview */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Lebenslauf</span>
                </div>
                <div className="space-y-4">
                  <div className="border-b-2 border-blue-600 pb-3">
                    <h4 className="text-lg font-bold text-slate-900">Maximilian Weber</h4>
                    <p className="text-sm text-slate-500">Senior Software Engineer</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Berufsprofil</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Full-Stack-Entwickler mit 6+ Jahren Erfahrung in React, Node.js und Cloud-Architekturen.
                      Leitung eines 5-köpfigen Dev-Teams. Reduktion der Deployment-Zeit um 70%.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Erfahrung</h5>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-slate-800">Senior Developer - TechCorp GmbH</p>
                        <p className="text-xs text-blue-500">2021 - Heute</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-800">Frontend Developer - StartUp AG</p>
                        <p className="text-xs text-blue-500">2018 - 2021</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 opacity-40">
                    <div className="h-2 bg-slate-100 rounded w-full mb-2" />
                    <div className="h-2 bg-slate-100 rounded w-3/4" />
                  </div>
                </div>
              </div>

              {/* Cover Letter Preview */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Anschreiben</span>
                </div>
                <div className="space-y-3">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Wien, den 26. März 2026</p>
                  </div>
                  <h5 className="text-sm font-semibold text-slate-900">
                    Bewerbung als Senior Software Engineer
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sehr geehrte Frau Müller,
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    als ich Ihre Ausschreibung gelesen habe, wusste ich sofort: Diese Position vereint genau das,
                    was mich antreibt – technische Exzellenz mit echtem Business Impact. In den letzten
                    sechs Jahren habe ich nicht nur Code geschrieben, sondern Teams aufgebaut und Produkte
                    skaliert, die heute von über 200.000 Nutzern verwendet werden.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bei der TechCorp GmbH leite ich ein 5-köpfiges Entwicklungsteam und habe eine
                    Microservice-Architektur implementiert, die...
                  </p>
                  <div className="pt-2 opacity-40">
                    <div className="h-2 bg-slate-100 rounded w-full mb-2" />
                    <div className="h-2 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-slate-100 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ATS-optimiert
                </span>
                <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  DIN 5008 konform
                </span>
              </div>
              <span className="text-xs text-slate-400">Generiert in 45 Sekunden</span>
            </div>
          </div>
        </div>

        {/* Social proof bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["M", "S", "A", "L", "T"].map((letter, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  style={{
                    background: [
                      "linear-gradient(135deg, #3b82f6, #6366f1)",
                      "linear-gradient(135deg, #8b5cf6, #a855f7)",
                      "linear-gradient(135deg, #6366f1, #3b82f6)",
                      "linear-gradient(135deg, #a855f7, #8b5cf6)",
                      "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    ][i],
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-slate-500">4.9/5 von 500+ Nutzern</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-slate-200" />

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              14 Tage Geld-zurück
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Sichere Zahlung
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
