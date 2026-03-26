import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo href="/" white />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Hochwertige, personalisierte Bewerbungen die wirklich funktionieren. KI-gestützt, für den DACH-Arbeitsmarkt optimiert.
            </p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-slate-500 ml-1.5">4.9/5</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Produkt</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Lebenslauf erstellen</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Anschreiben erstellen</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Interview Coaching</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Preise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Ressourcen</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">So funktioniert&apos;s</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Häufige Fragen</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Beispiele ansehen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Rechtliches</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Widerrufsbelehrung</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Stellio. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4 text-sm">
            <span>Made in Austria</span>
            <span className="text-slate-700">|</span>
            <span>Sichere Zahlung via PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
