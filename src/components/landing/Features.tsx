export default function Features() {
  const features = [
    {
      title: "KI-gestützte Personalisierung",
      description:
        "Jedes Dokument wird individuell auf dich zugeschnitten – basierend auf deiner Erfahrung, deinen Fähigkeiten und deiner Zielposition.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "ATS-optimierte Formate",
      description:
        "Unsere Lebensläufe sind für Bewerbungssoftware (ATS) optimiert – damit deine Bewerbung nicht im Filter hängenbleibt.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Deutscher Markt-Standard",
      description:
        "DIN 5008 konforme Anschreiben, professionelle Lebensläufe nach deutschem Standard – perfekt für den DACH-Arbeitsmarkt.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
    },
    {
      title: "Interview Coaching",
      description:
        "Realistische Fragen, perfekte Antworten, persönliche Tipps – wie ein Coaching-Gespräch, nur digital.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: "Sofort einsatzbereit",
      description:
        "In wenigen Minuten zu fertigen Bewerbungsunterlagen. Kein kompliziertes Setup, keine Lernkurve.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Maximale Qualität",
      description:
        "Kein generischer Output. Jede Bewerbung liest sich, als wäre sie von einem professionellen Bewerbungsberater geschrieben.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Warum Stellio besser ist
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Nicht noch ein Template-Tool. Nicht ChatGPT mit extra Schritten.
            Stellio ist dein persönlicher Bewerbungsberater.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Stellio vs. Alternativen
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 text-slate-500 font-medium"></th>
                  <th className="py-4 px-4 text-slate-500 font-medium">ChatGPT</th>
                  <th className="py-4 px-4 text-slate-500 font-medium">Vorlagen</th>
                  <th className="py-4 px-4 text-slate-500 font-medium">CV-Builder</th>
                  <th className="py-4 px-4 text-center">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Stellio
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Personalisiert", false, false, false, true],
                  ["ATS-optimiert", false, false, true, true],
                  ["Deutscher Standard", false, true, false, true],
                  ["Interview Coaching", false, false, false, true],
                  ["Sofort einsatzbereit", false, true, true, true],
                  ["Professionelle Qualität", false, false, false, true],
                ].map(([feature, ...values]) => (
                  <tr key={feature as string} className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-700 font-medium">{feature as string}</td>
                    {values.map((v, i) => (
                      <td key={i} className="py-3 px-4 text-center">
                        {v ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <span className="text-slate-300">✗</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
