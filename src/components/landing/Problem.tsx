export default function Problem() {
  const problems = [
    {
      icon: "😤",
      title: "Absage nach Absage",
      description:
        "Du schickst Bewerbungen raus – und hörst nichts. Kein Feedback. Keine Einladung. Nur Stille oder Standard-Absagen.",
    },
    {
      icon: "📝",
      title: "Stunden verschwendet",
      description:
        "Du sitzt stundenlang am Lebenslauf. Googelst Vorlagen. Copy-Paste aus ChatGPT. Am Ende sieht es aus wie bei allen anderen.",
    },
    {
      icon: "😰",
      title: "Unsicher im Interview",
      description:
        "Du bekommst endlich eine Einladung – und weißt nicht, wie du dich am besten präsentierst. Nervosität pur.",
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
              <span className="text-4xl mb-4 block">{problem.icon}</span>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{problem.title}</h3>
              <p className="text-slate-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
