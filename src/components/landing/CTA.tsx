import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Bereit für deinen Traumjob?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Erstelle jetzt deine professionelle Bewerbung – und erhöhe deine Chancen auf eine Einladung zum Vorstellungsgespräch.
        </p>
        <Link href="/auth/signup">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl text-lg px-12"
          >
            Jetzt kostenlos starten
          </Button>
        </Link>
        <p className="text-sm text-blue-200 mt-4">
          Kostenlose Vorschau · Keine Kreditkarte · In unter 5 Minuten fertig
        </p>
      </div>
    </section>
  );
}
