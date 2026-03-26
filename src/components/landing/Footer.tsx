import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">Stellio</span>
            </div>
            <p className="text-sm leading-relaxed">
              Hochwertige, personalisierte Bewerbungen die wirklich funktionieren. KI-gestützt, für den deutschen Markt optimiert.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Produkt</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Lebenslauf erstellen</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Bewerbung erstellen</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition-colors">Interview Coaching</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Preise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karriere</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Widerrufsbelehrung</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} Stellio. Alle Rechte vorbehalten.</p>
          <p className="text-sm">Made with 💙 in Deutschland</p>
        </div>
      </div>
    </footer>
  );
}
