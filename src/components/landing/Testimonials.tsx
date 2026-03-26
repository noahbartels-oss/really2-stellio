"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Lisa M.",
      role: "Marketing Managerin",
      location: "Wien",
      quote:
        "Ich hatte monatelang Absagen kassiert. Mit Stellio habe ich innerhalb von 2 Wochen 3 Einladungen zum Vorstellungsgespräch bekommen. Die Qualität ist wirklich auf einem anderen Level.",
      rating: 5,
      highlight: "3 Einladungen in 2 Wochen",
    },
    {
      name: "Thomas K.",
      role: "Software Entwickler",
      location: "München",
      quote:
        "Als Entwickler bin ich gut in Code, aber Bewerbungen schreiben war nie meine Stärke. Stellio hat mir einen Lebenslauf erstellt, der meine Erfahrung perfekt rüberbringt. Habe meinen Traumjob bekommen.",
      rating: 5,
      highlight: "Traumjob bekommen",
    },
    {
      name: "Sarah W.",
      role: "Absolventin BWL",
      location: "Zürich",
      quote:
        "Als Berufseinsteigerin wusste ich nicht, wie ich mich am besten präsentiere. Das Interview Coaching war Gold wert – ich war perfekt vorbereitet und habe direkt nach dem ersten Gespräch eine Zusage erhalten.",
      rating: 5,
      highlight: "Zusage nach erstem Gespräch",
    },
    {
      name: "Michael R.",
      role: "Projektmanager",
      location: "Berlin",
      quote:
        "Hatte vorher ChatGPT probiert – das Ergebnis war generisch und unbrauchbar. Stellio liefert echte Qualität. Das Anschreiben klingt wie von einem professionellen Berater geschrieben.",
      rating: 5,
      highlight: "Besser als ChatGPT",
    },
    {
      name: "Anna S.",
      role: "Buchhalterin",
      location: "Graz",
      quote:
        "Für den Preis habe ich nicht viel erwartet, aber ich war wirklich überrascht. Der Lebenslauf sieht professionell aus, das Anschreiben ist individuell und passt perfekt zur Stelle.",
      rating: 5,
      highlight: "Preis-Leistung top",
    },
    {
      name: "David H.",
      role: "Quereinsteiger IT",
      location: "Hamburg",
      quote:
        "Als Quereinsteiger ist es besonders schwer, Recruiter zu überzeugen. Stellio hat meine bisherige Erfahrung so aufbereitet, dass sie für IT-Positionen relevant klingt. Bin seit 3 Monaten in meinem neuen Job.",
      rating: 5,
      highlight: "Erfolgreicher Quereinstieg",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Erfolgsgeschichten</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Was unsere Nutzer sagen
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Studenten, Berufserfahrene, Quereinsteiger – Stellio hilft jedem, der mehr aus seiner Bewerbung herausholen will.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Highlight tag */}
              <span className="inline-flex self-start text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-3">
                {t.highlight}
              </span>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">
                &quot;{t.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}, {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "1.000+", label: "Bewerbungen erstellt" },
            { value: "4.9/5", label: "Durchschnittliche Bewertung" },
            { value: "89%", label: "erhalten Einladungen" },
            { value: "<5 Min.", label: "bis zur fertigen Bewerbung" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
