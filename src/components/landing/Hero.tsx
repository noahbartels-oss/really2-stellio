"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <Badge variant="fire" className="mb-6">
          Über 2.000 erfolgreiche Bewerbungen erstellt
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Schluss mit Absagen.
          <br />
          <span className="gradient-text">Starte mit Bewerbungen, die wirken.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stellio erstellt mit KI hochwertige, personalisierte Lebensläufe, Bewerbungsschreiben
          und bereitet dich auf dein Interview vor.{" "}
          <strong className="text-slate-900">Keine Vorlagen. Keine generischen Texte.</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/auth/signup">
            <Button size="lg" className="pulse-cta text-lg px-10">
              Kostenlos starten
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="outline" size="lg">
              Demo ansehen
            </Button>
          </a>
        </div>

        <p className="text-sm text-slate-500">
          Keine Kreditkarte erforderlich · Vorschau sofort verfügbar
        </p>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-8 text-slate-400">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-slate-500">4.9/5 von 500+ Nutzern</p>
          </div>
        </div>
      </div>
    </section>
  );
}
