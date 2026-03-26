"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Stellio</span>
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">E-Mail gesendet</h1>
              <p className="text-slate-500 mb-6">
                Falls ein Konto mit dieser E-Mail existiert, haben wir dir einen Link zum Zurücksetzen deines Passworts gesendet.
              </p>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">Zurück zur Anmeldung</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Passwort zurücksetzen</h1>
              <p className="text-slate-500 mb-6 text-center">
                Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  id="email"
                  label="E-Mail"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Link senden
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
                  Zurück zur Anmeldung
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
