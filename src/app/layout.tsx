import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Stellio – Deine KI-gestützte Bewerbungsplattform",
  description:
    "Erstelle professionelle Lebensläufe, überzeugende Bewerbungsschreiben und bereite dich mit KI-gestütztem Interview Coaching vor. Keine Vorlagen – echte, personalisierte Bewerbungen.",
  keywords: [
    "Bewerbung",
    "Lebenslauf",
    "CV",
    "Bewerbungsschreiben",
    "Interview",
    "KI",
    "AI",
    "Karriere",
    "Job",
  ],
  openGraph: {
    title: "Stellio – Deine KI-gestützte Bewerbungsplattform",
    description:
      "Hochwertige, personalisierte Bewerbungen die wirklich funktionieren.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
