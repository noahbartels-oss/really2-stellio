"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

export default function Demo() {
  const [activeTab, setActiveTab] = useState<"cv" | "letter" | "interview">("cv");

  const tabs = [
    {
      key: "cv" as const,
      label: "Lebenslauf",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      key: "letter" as const,
      label: "Anschreiben",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      key: "interview" as const,
      label: "Interview",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="demo" className="py-24 px-4 bg-slate-50/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Live-Beispiel</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Das ist Stellio-Qualität
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kein generischer Text. Keine Vorlage. Jede Bewerbung wird individuell auf das Profil und die Zielposition zugeschnitten.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview */}
        <Card className="p-0 max-w-3xl mx-auto overflow-hidden">
          {/* Document type indicator */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-slate-100 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${activeTab === "cv" ? "bg-blue-500" : activeTab === "letter" ? "bg-purple-500" : "bg-green-500"}`} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {activeTab === "cv" ? "Lebenslauf" : activeTab === "letter" ? "Bewerbungsschreiben" : "Interview Coaching"} — Beispiel
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ATS-optimiert
            </div>
          </div>

          <div className="p-8">
            {activeTab === "cv" && (
              <div className="content-locked">
                <div className="space-y-6">
                  <div className="border-b-2 border-blue-600 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900">Sarah Müller</h3>
                    <p className="text-slate-500">Marketing Managerin</p>
                    <p className="text-sm text-slate-400 mt-1">München | sarah.mueller@email.de | +49 170 987 6543</p>
                  </div>
                  <div>
                    <h4 className="text-blue-600 font-semibold border-b border-slate-200 pb-2 mb-3 text-sm uppercase tracking-wider">Berufsprofil</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Erfahrene Marketing Managerin mit 7+ Jahren Expertise in digitalem Marketing, Brand Management
                      und datengetriebener Kampagnenoptimierung. Nachgewiesene Erfolge in der Steigerung der
                      Markenbekanntheit um 150% und der Conversion Rate um 85% durch innovative Multi-Channel-Strategien.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-blue-600 font-semibold border-b border-slate-200 pb-2 mb-3 text-sm uppercase tracking-wider">Berufserfahrung</h4>
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-slate-900">Senior Marketing Manager</h5>
                        <span className="text-xs text-blue-600 font-medium">2020 - Heute</span>
                      </div>
                      <p className="text-blue-600 text-sm">Digital Solutions GmbH, München</p>
                      <ul className="text-sm text-slate-600 mt-2 space-y-1 list-disc list-inside">
                        <li>Leitung eines 8-köpfigen Marketing-Teams mit Budget von 500K</li>
                        <li>Steigerung des organischen Traffics um 200% durch SEO-Strategie</li>
                        <li>Launch von 12 erfolgreichen Produktkampagnen mit durchschnittlich 340% ROI</li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-slate-900">Marketing Manager</h5>
                        <span className="text-xs text-blue-600 font-medium">2017 - 2020</span>
                      </div>
                      <p className="text-blue-600 text-sm">StartUp Hub AG, Berlin</p>
                      <ul className="text-sm text-slate-600 mt-2 space-y-1 list-disc list-inside">
                        <li>Aufbau der Marketing-Abteilung von Grund auf</li>
                        <li>Implementierung eines Marketing-Automation-Systems (HubSpot)</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-blue-600 font-semibold border-b border-slate-200 pb-2 mb-3 text-sm uppercase tracking-wider">Ausbildung</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-slate-900">M.A. Marketing & Kommunikation</h5>
                        <p className="text-blue-600 text-sm">LMU München</p>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">2014 - 2017</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "letter" && (
              <div className="content-locked">
                <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                  <div className="text-right text-slate-500">
                    <p>Sarah Müller</p>
                    <p>Leopoldstraße 42, 80802 München</p>
                    <p className="mt-2">München, den 26. März 2026</p>
                  </div>
                  <div className="mt-6">
                    <p className="font-medium text-slate-900">Digital Solutions GmbH</p>
                    <p>z. Hd. Frau Schmidt</p>
                    <p>Personalabteilung</p>
                  </div>
                  <h4 className="font-semibold text-lg text-slate-900 mt-6 pt-4 border-t border-slate-100">
                    Bewerbung als Head of Marketing
                  </h4>
                  <p>Sehr geehrte Frau Schmidt,</p>
                  <p>
                    als ich Ihre Stellenausschreibung gelesen habe, war mir sofort klar: Diese Position
                    ist der nächste logische Schritt in meiner Karriere. In den letzten sieben Jahren habe
                    ich nicht nur Marketing-Kampagnen geplant – ich habe Teams aufgebaut, Marken transformiert
                    und messbare Geschäftsergebnisse erzielt.
                  </p>
                  <p>
                    Bei der Digital Solutions GmbH leite ich ein 8-köpfiges Team und verantworte ein
                    jährliches Budget von 500.000 Euro. Mein größter Erfolg: die Steigerung des organischen
                    Traffics um 200% innerhalb von 18 Monaten durch eine von mir entwickelte
                    Content-SEO-Strategie.
                  </p>
                  <p>
                    Was mich an Ihrem Unternehmen besonders begeistert, ist Ihr innovativer Ansatz im
                    Bereich der digitalen Transformation. Meine Expertise in datengetriebener
                    Kampagnenoptimierung und Marketing Automation möchte ich einsetzen, um Ihr Team
                    auf das nächste Level zu heben.
                  </p>
                  <p>
                    Ich freue mich auf ein persönliches Gespräch und darauf, Sie von meinem Mehrwert
                    für Ihr Unternehmen zu überzeugen.
                  </p>
                  <p>Mit freundlichen Grüßen</p>
                  <p className="font-medium text-slate-900">Sarah Müller</p>
                </div>
              </div>
            )}

            {activeTab === "interview" && (
              <div className="content-locked">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-3">
                    Interview Coaching — Head of Marketing
                  </h3>
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Frage 1</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      &quot;Erzählen Sie uns von sich.&quot;
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      <strong>Empfohlene Antwort:</strong> &quot;Ich bin Marketing Managerin mit über 7 Jahren
                      Erfahrung im digitalen Marketing. Bei meinem aktuellen Arbeitgeber leite ich ein Team
                      von 8 Mitarbeitern und habe den organischen Traffic um 200% gesteigert. Ich suche nun
                      eine Rolle, in der ich strategisch noch mehr Einfluss nehmen kann.&quot;
                    </p>
                    <div className="bg-white rounded-lg px-3 py-2 border border-blue-100">
                      <p className="text-blue-600 text-xs font-medium">
                        Tipp: Halte deine Antwort unter 2 Minuten. Fokus auf relevante Highlights. Beende mit Bezug zur Stelle.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Frage 2</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      &quot;Was ist Ihre größte Stärke?&quot;
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong>Empfohlene Antwort:</strong> &quot;Meine größte Stärke ist die Kombination aus
                      Kreativität und Datenaffinität. Ich entwickle nicht nur kreative Kampagnen, sondern
                      messe und optimiere sie konsequent. Das hat zu einem durchschnittlichen ROI von 340%
                      bei meinen letzten 12 Kampagnen geführt.&quot;
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">Frage 3</span>
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      &quot;Warum möchten Sie zu uns wechseln?&quot;
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong>Empfohlene Antwort:</strong> &quot;Ihr Unternehmen setzt auf Innovation in der
                      digitalen Transformation – genau das treibt mich an. Ich sehe enormes Potenzial,
                      Ihre Marktposition durch datengetriebenes Marketing weiter auszubauen...&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Unlock overlay */}
          <div className="relative -mt-4 px-8 pb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-slate-900 font-semibold mb-1">Dein eigenes, personalisiertes Ergebnis</p>
              <p className="text-sm text-slate-500 mb-4">
                Erstelle jetzt deine maßgeschneiderte Bewerbung – in unter 5 Minuten.
              </p>
              <a href="/auth/signup">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/25 cursor-pointer hover:shadow-xl hover:shadow-blue-600/30">
                  Jetzt Bewerbung erstellen
                </button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
