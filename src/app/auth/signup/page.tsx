"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/Logo";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registrierung fehlgeschlagen");
        setLoading(false);
        return;
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Registrierung erfolgreich, aber Login fehlgeschlagen. Bitte melde dich an.");
        setLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-3xl font-bold mb-4">
            In 5 Minuten zur perfekten Bewerbung.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Registriere dich kostenlos und erstelle sofort deine erste professionelle Bewerbung mit KI.
          </p>
          <div className="space-y-4">
            {[
              "Kostenlose Vorschau sofort verfügbar",
              "Keine Kreditkarte erforderlich",
              "In unter 5 Minuten fertig",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-blue-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">Konto erstellen</h1>
          <p className="text-slate-500 mb-8">Starte kostenlos – keine Kreditkarte nötig.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              label="Name"
              type="text"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              id="email"
              label="E-Mail"
              type="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              label="Passwort"
              type="password"
              placeholder="Mindestens 8 Zeichen"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Kostenlos registrieren
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Mit der Registrierung akzeptierst du unsere{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">AGB</a> und{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">Datenschutzerklärung</a>.
          </p>

          <p className="mt-4 text-center text-sm text-slate-500">
            Bereits ein Konto?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Anmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
