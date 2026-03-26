export default function Problem() {
  const problems = [
    {
      title: "Absage nach Absage",
      description:
        "Du schickst Bewerbungen raus – und hörst nichts. Kein Feedback. Keine Einladung. Nur Stille oder Standard-Absagen.",
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
    },
    {
      title: "Stunden verschwendet",
      description:
        "Du sitzt stundenlang am Lebenslauf. Googelst Vorlagen. Copy-Paste aus ChatGPT. Am Ende sieht es aus wie bei allen anderen.",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Unsicher im Interview",
      description:
        "Du bekommst endlich eine Einladung – und weißt nicht, wie du dich am besten präsentierst. Nervosität pur.",
      icon: (
        <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Kommt dir das bekannt vor?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Die meisten Bewerber scheitern nicht an fehlender Qualifikation – sondern an der Bewerbung selbst.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
            >
              <div className="mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{problem.title}</h3>
              <p className="text-slate-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
