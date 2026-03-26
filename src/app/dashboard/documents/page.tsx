"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Document {
  id: string;
  type: string;
  title: string;
  isLocked: boolean;
  createdAt: string;
}

export default function DocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const typeLabel = (type: string) => {
    switch (type) {
      case "CV": return "Lebenslauf";
      case "COVER_LETTER": return "Bewerbungsschreiben";
      case "INTERVIEW_COACHING": return "Interview Coaching";
      default: return type;
    }
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "CV": return "📄";
      case "COVER_LETTER": return "✉️";
      case "INTERVIEW_COACHING": return "🎤";
      default: return "📄";
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case "CV": return "bg-blue-100 text-blue-600";
      case "COVER_LETTER": return "bg-purple-100 text-purple-600";
      case "INTERVIEW_COACHING": return "bg-green-100 text-green-600";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Meine Dokumente</h1>
          <p className="text-slate-600 mt-1">{documents.length} Dokument{documents.length !== 1 ? "e" : ""}</p>
        </div>
        <Link href="/dashboard/generate?type=cv">
          <Button>Neues Dokument</Button>
        </Link>
      </div>

      {documents.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📂</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Noch keine Dokumente</h3>
          <p className="text-slate-500 mb-6">Erstelle dein erstes Dokument, um loszulegen.</p>
          <Link href="/dashboard/generate?type=cv">
            <Button>Lebenslauf erstellen</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              hover
              className="p-5 flex items-center justify-between cursor-pointer"
              onClick={() => router.push(`/dashboard/documents/${doc.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${typeColor(doc.type)}`}>
                  {typeIcon(doc.type)}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{typeLabel(doc.type)}</span>
                    <span className="text-xs text-slate-300">·</span>
                    <span className="text-xs text-slate-500">
                      {new Date(doc.createdAt).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    {doc.isLocked && (
                      <>
                        <span className="text-xs text-slate-300">·</span>
                        <span className="text-xs text-amber-600 font-medium">🔒 Gesperrt</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
