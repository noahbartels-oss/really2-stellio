import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Solution() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Deine Bewerbung. <span className="gradient-text">Auf einem neuen Level.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stellio analysiert dein Profil und erstellt Bewerbungsunterlagen, die sich von der Masse abheben –
            individuell, professionell und überzeugend.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Profil eingeben</h3>
            <p className="text-slate-600">
              Fülle dein Profil aus – Erfahrung, Fähigkeiten, Zielposition. In unter 5 Minuten.
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">2. KI generiert</h3>
            <p className="text-slate-600">
              Unsere KI erstellt maßgeschneiderte Unterlagen – kein Copy-Paste, sondern echte Qualität.
            </p>
          </div>

          <div className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Bewerben & überzeugen</h3>
            <p className="text-slate-600">
              Lade deine fertigen Unterlagen herunter und starte durch – mit mehr Selbstvertrauen.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/auth/signup">
            <Button size="lg">Jetzt kostenlos ausprobieren</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
