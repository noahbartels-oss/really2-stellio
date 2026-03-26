"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

function GenerateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "cv";

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    experience: "",
    skills: "",
    education: "",
    targetJob: "",
    languages: "",
  });

  const typeLabels: Record<string, string> = {
    cv: "Lebenslauf",
    "cover-letter": "Bewerbungsschreiben",
    interview: "Interview Coaching",
  };

  const steps = ["Persönliches", "Erfahrung", "Zielposition", "Generierung"];

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setCurrentStep(3);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...formData }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generierung fehlgeschlagen");
        setCurrentStep(2);
        setLoading(false);
        return;
      }

      router.push(`/dashboard/documents/${data.document.id}`);
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
      setCurrentStep(2);
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName && formData.jobTitle;
      case 1:
        return formData.experience && formData.skills;
      case 2:
        return formData.targetJob;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {typeLabels[type]} erstellen
        </h1>
        <p className="text-slate-600">
          Fülle die Informationen aus – unsere KI erstellt dein Dokument in Sekunden.
        </p>
      </div>

      <ProgressBar steps={steps} currentStep={currentStep} className="mb-8" />

      <Card className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Step 0: Personal info */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">Persönliche Informationen</h2>
            <Input
              id="fullName"
              label="Vollständiger Name"
              placeholder="Max Mustermann"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              required
            />
            <Input
              id="jobTitle"
              label="Aktuelle Position / Berufsbezeichnung"
              placeholder="z.B. Software Engineer, Marketing Manager"
              value={formData.jobTitle}
              onChange={(e) => updateField("jobTitle", e.target.value)}
              required
            />
            <Input
              id="education"
              label="Ausbildung / Studium"
              placeholder="z.B. B.Sc. Informatik, TU Berlin"
              value={formData.education}
              onChange={(e) => updateField("education", e.target.value)}
            />
            <Input
              id="languages"
              label="Sprachen"
              placeholder="z.B. Deutsch (Muttersprache), Englisch (Verhandlungssicher)"
              value={formData.languages}
              onChange={(e) => updateField("languages", e.target.value)}
            />
          </div>
        )}

        {/* Step 1: Experience */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">Berufserfahrung & Fähigkeiten</h2>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-slate-700 mb-1.5">
                Berufserfahrung
              </label>
              <textarea
                id="experience"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px] resize-y"
                placeholder="Beschreibe deine bisherige Berufserfahrung, wichtige Projekte und Erfolge..."
                value={formData.experience}
                onChange={(e) => updateField("experience", e.target.value)}
              />
              <p className="mt-1 text-xs text-slate-400">
                Je detaillierter, desto besser das Ergebnis
              </p>
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-slate-700 mb-1.5">
                Fähigkeiten & Kenntnisse
              </label>
              <textarea
                id="skills"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y"
                placeholder="z.B. React, TypeScript, Projektmanagement, Teamführung, Datenanalyse..."
                value={formData.skills}
                onChange={(e) => updateField("skills", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 2: Target */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">Zielposition</h2>
            <Input
              id="targetJob"
              label="Auf welche Position bewirbst du dich?"
              placeholder="z.B. Senior Software Engineer bei Firma XY"
              value={formData.targetJob}
              onChange={(e) => updateField("targetJob", e.target.value)}
              required
            />
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                <strong>Tipp:</strong> Je spezifischer du die Zielposition beschreibst, desto besser kann unsere KI
                deine Bewerbung darauf zuschneiden. Nenne am besten den genauen Jobtitel und optional das Unternehmen.
              </p>
            </div>

            {/* Summary */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Zusammenfassung</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Position:</strong> {formData.jobTitle}</p>
                <p><strong>Ziel:</strong> {formData.targetJob}</p>
                <p><strong>Dokument:</strong> {typeLabels[type]}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Generating */}
        {currentStep === 3 && (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Dein {typeLabels[type]} wird erstellt...
            </h2>
            <p className="text-slate-500">
              Unsere KI analysiert dein Profil und erstellt ein personalisiertes Dokument. Das dauert nur wenige Sekunden.
            </p>
          </div>
        )}

        {/* Navigation */}
        {currentStep < 3 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : router.push("/dashboard")}
            >
              {currentStep === 0 ? "Abbrechen" : "Zurück"}
            </Button>

            {currentStep < 2 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={!canProceed()}>
                Weiter
              </Button>
            ) : (
              <Button onClick={handleGenerate} disabled={!canProceed()} loading={loading}>
                {typeLabels[type]} generieren
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    }>
      <GenerateContent />
    </Suspense>
  );
}
