import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm text-blue-100 border border-white/10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Jetzt 50% Launch-Rabatt sichern
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Schick keine durchschnittliche
          <br />
          Bewerbung mehr ab.
        </h2>
        <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
          Du weißt, dass du mehr kannst. Jetzt muss es auch deine Bewerbung zeigen.
        </p>
        <Link href="/auth/signup">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl shadow-blue-900/30 text-lg px-12 py-5 hover:shadow-2xl transition-all duration-300"
          >
            Jetzt Bewerbung erstellen
          </Button>
        </Link>
        <div className="flex items-center justify-center gap-6 text-sm text-blue-200 mt-6">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Kostenlose Vorschau
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Kein Abo
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Sichere Zahlung
          </span>
        </div>
      </div>
    </section>
  );
}
