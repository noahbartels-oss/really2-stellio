"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import SearchSelect from "@/components/ui/SearchSelect";
import {
  BERUFE,
  BRANCHEN,
  AUSBILDUNGEN,
  SPRACHEN,
  LAENDER,
  BUNDESLAENDER_AT,
  BUNDESLAENDER_DE,
  KANTONE_CH,
} from "@/lib/form-options";

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
    branche: "",
    experience: "",
    skills: "",
    education: "",
    targetJob: "",
    languages: "",
    land: "",
    region: "",
  });

  // Selected languages as array for multi-select
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const typeLabels: Record<string, string> = {
    cv: "Lebenslauf",
    "cover-letter": "Bewerbungsschreiben",
    interview: "Interview Coaching",
  };

  const steps = ["Persönliches", "Erfahrung", "Zielposition", "Generierung"];

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addLanguage = (lang: string) => {
    if (lang && !selectedLanguages.includes(lang)) {
      const updated = [...selectedLanguages, lang];
      setSelectedLanguages(updated);
      setFormData((prev) => ({ ...prev, languages: updated.join(", ") }));
    }
  };

  const removeLanguage = (lang: string) => {
    const updated = selectedLanguages.filter((l) => l !== lang);
    setSelectedLanguages(updated);
    setFormData((prev) => ({ ...prev, languages: updated.join(", ") }));
  };

  // Get region options based on selected country
  const getRegionOptions = () => {
    switch (formData.land) {
      case "Österreich":
        return BUNDESLAENDER_AT;
      case "Deutschland":
        return BUNDESLAENDER_DE;
      case "Schweiz":
        return KANTONE_CH;
      default:
        return [...BUNDESLAENDER_AT, ...BUNDESLAENDER_DE, ...KANTONE_CH];
    }
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
            <SearchSelect
              id="jobTitle"
              label="Aktuelle Position / Berufsbezeichnung"
              placeholder="Suche: z.B. Software Engineer, Verkäufer/in..."
              options={BERUFE}
              value={formData.jobTitle}
              onChange={(v) => updateField("jobTitle", v)}
              required
              allowCustom
            />
            <SearchSelect
              id="branche"
              label="Branche"
              placeholder="Suche: z.B. IT, Marketing, Gesundheitswesen..."
              options={BRANCHEN}
              value={formData.branche}
              onChange={(v) => updateField("branche", v)}
              allowCustom
            />
            <SearchSelect
              id="education"
              label="Höchster Bildungsabschluss"
              placeholder="Suche: z.B. Bachelor, Lehre, Matura..."
              options={AUSBILDUNGEN}
              value={formData.education}
              onChange={(v) => updateField("education", v)}
              allowCustom
            />

            {/* Languages multi-select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Sprachen
              </label>
              {selectedLanguages.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeLanguage(lang)}
                        className="text-blue-400 hover:text-blue-700 transition-colors cursor-pointer ml-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <SearchSelect
                id="languages"
                placeholder="Sprache hinzufügen: z.B. Deutsch, Englisch..."
                options={SPRACHEN.filter((s) => !selectedLanguages.includes(s))}
                value=""
                onChange={(v) => addLanguage(v)}
                allowCustom
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SearchSelect
                id="land"
                label="Land"
                placeholder="Land wählen"
                options={LAENDER}
                value={formData.land}
                onChange={(v) => {
                  updateField("land", v);
                  updateField("region", "");
                }}
                allowCustom={false}
              />
              <SearchSelect
                id="region"
                label="Region / Bundesland"
                placeholder="Region wählen"
                options={getRegionOptions()}
                value={formData.region}
                onChange={(v) => updateField("region", v)}
                allowCustom
              />
            </div>
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
            <SearchSelect
              id="targetJob"
              label="Auf welche Position bewirbst du dich?"
              placeholder="Suche: z.B. Marketing Manager, Software Engineer..."
              options={BERUFE}
              value={formData.targetJob}
              onChange={(v) => updateField("targetJob", v)}
              required
              allowCustom
            />
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                <strong>Tipp:</strong> Je spezifischer du die Zielposition beschreibst, desto besser kann unsere KI
                deine Bewerbung darauf zuschneiden. Du kannst auch den genauen Jobtitel und das Unternehmen angeben.
              </p>
            </div>

            {/* Summary */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Zusammenfassung</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Position:</strong> {formData.jobTitle}</p>
                {formData.branche && <p><strong>Branche:</strong> {formData.branche}</p>}
                {formData.education && <p><strong>Ausbildung:</strong> {formData.education}</p>}
                {formData.land && <p><strong>Standort:</strong> {formData.region ? `${formData.region}, ` : ""}{formData.land}</p>}
                {formData.languages && <p><strong>Sprachen:</strong> {formData.languages}</p>}
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
