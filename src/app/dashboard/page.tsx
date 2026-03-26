"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
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

function DashboardContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents || []))
      .catch(() => {});
  }, []);

  const userName = session?.user?.name?.split(" ")[0] || "dort";

  const actions = [
    {
      title: "Lebenslauf erstellen",
      description: "Professioneller, ATS-optimierter Lebenslauf",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: "/dashboard/generate?type=cv",
      color: "blue",
    },
    {
      title: "Bewerbungsschreiben erstellen",
      description: "Individuelles, überzeugendes Anschreiben",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: "/dashboard/generate?type=cover-letter",
      color: "purple",
    },
    {
      title: "Interview Coaching",
      description: "Persönliche Vorbereitung auf dein Interview",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: "/dashboard/generate?type=interview",
      color: "green",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    green: "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white",
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case "CV":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "COVER_LETTER":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case "CV": return "bg-blue-100 text-blue-600";
      case "COVER_LETTER": return "bg-purple-100 text-purple-600";
      default: return "bg-green-100 text-green-600";
    }
  };

  return (
    <div>
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Zahlung erfolgreich! Deine Dokumente sind jetzt freigeschaltet.
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Hallo {userName}!
        </h1>
        <p className="text-slate-600">
          Starte deine Bewerbung jetzt – wähle, was du erstellen möchtest.
        </p>
      </div>

      {/* Action cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card hover className="p-6 group cursor-pointer h-full">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${colorClasses[action.color as keyof typeof colorClasses]}`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-slate-500">{action.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent documents */}
      {documents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Letzte Dokumente</h2>
            <Link href="/dashboard/documents">
              <Button variant="ghost" size="sm">
                Alle anzeigen
              </Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {documents.slice(0, 5).map((doc) => (
              <Card
                key={doc.id}
                className="p-4 flex items-center justify-between cursor-pointer"
                hover
                onClick={() => router.push(`/dashboard/documents/${doc.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColor(doc.type)}`}>
                    {typeIcon(doc.type)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{doc.title}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(doc.createdAt).toLocaleDateString("de-DE")}
                      {doc.isLocked && (
                        <span className="ml-2 text-amber-600 font-medium">Gesperrt</span>
                      )}
                    </p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Card>
            ))}
          </div>
        </div>
      )}

      {documents.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Noch keine Dokumente</h3>
          <p className="text-slate-500 mb-6">
            Erstelle jetzt deinen ersten Lebenslauf oder dein Bewerbungsschreiben.
          </p>
          <Link href="/dashboard/generate?type=cv">
            <Button>Lebenslauf erstellen</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
