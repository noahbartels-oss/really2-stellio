interface GenerateInput {
  fullName: string;
  jobTitle: string;
  experience: string;
  skills: string;
  education: string;
  targetJob: string;
  languages?: string;
}

export async function generateCV(input: GenerateInput): Promise<string> {
  const prompt = `Du bist ein professioneller Bewerbungsberater und CV-Spezialist für den deutschsprachigen Markt (DACH-Region).

Erstelle einen hochwertigen, professionellen Lebenslauf für folgende Person:

Name: ${input.fullName}
Aktuelle Position: ${input.jobTitle}
Berufserfahrung: ${input.experience}
Fähigkeiten: ${input.skills}
Ausbildung: ${input.education}
Sprachen: ${input.languages || "Deutsch (Muttersprache)"}
Zielposition: ${input.targetJob}

Anforderungen:
- Professionelles, modernes Format
- Klar strukturiert mit Abschnitten
- Quantifizierte Erfolge wo möglich
- Auf die Zielposition zugeschnitten
- ATS-optimiert (Applicant Tracking System)
- Deutscher Standard (mit Foto-Platzhalter, persönliche Daten)

Formatiere den Lebenslauf in strukturiertem HTML mit sauberem Styling.
Nutze professionelle Sprache und starke Aktionsverben.`;

  return callAI(prompt);
}

export async function generateCoverLetter(input: GenerateInput): Promise<string> {
  const prompt = `Du bist ein professioneller Bewerbungsberater spezialisiert auf überzeugende Bewerbungsschreiben für den DACH-Markt.

Erstelle ein individuelles, überzeugendes Bewerbungsschreiben für:

Name: ${input.fullName}
Aktuelle Position: ${input.jobTitle}
Berufserfahrung: ${input.experience}
Fähigkeiten: ${input.skills}
Ausbildung: ${input.education}
Zielposition: ${input.targetJob}

Anforderungen:
- Persönlich und authentisch (nicht generisch!)
- Starker Einstieg, der Aufmerksamkeit erregt
- Konkrete Beispiele und Erfolge einbauen
- Motivation für die Zielposition klar machen
- Professioneller, aber lebendiger Schreibstil
- Deutsche Geschäftsbrief-Konventionen beachten
- DIN 5008 Format

Formatiere das Schreiben in strukturiertem HTML.
Das Ergebnis muss sich wie ein von einem Menschen geschriebener Brief lesen.`;

  return callAI(prompt);
}

export async function generateInterviewCoaching(input: GenerateInput): Promise<string> {
  const prompt = `Du bist ein erfahrener Interview-Coach und Karriereberater für den deutschsprachigen Markt.

Erstelle ein umfassendes Interview-Coaching für:

Name: ${input.fullName}
Aktuelle Position: ${input.jobTitle}
Berufserfahrung: ${input.experience}
Fähigkeiten: ${input.skills}
Zielposition: ${input.targetJob}

Erstelle folgende Abschnitte:

1. **Die 10 wahrscheinlichsten Interviewfragen** für die Zielposition
   - Für jede Frage: eine perfekte Beispielantwort
   - Tipps, was der Interviewer hören möchte

2. **STAR-Methode Beispiele** (Situation, Task, Action, Result)
   - 3 ausgearbeitete STAR-Geschichten basierend auf der Erfahrung

3. **Fragen an den Arbeitgeber**
   - 5 intelligente Rückfragen

4. **Do's and Don'ts**
   - Konkrete Verhaltenstipps

5. **Gehaltsverhandlung**
   - Tipps für die Zielposition

Formatiere alles in übersichtlichem HTML mit klaren Abschnitten.
Mach es persönlich und auf die Person zugeschnitten.`;

  return callAI(prompt);
}

async function callAI(prompt: string): Promise<string> {
  // Try Anthropic first, then OpenAI
  if (process.env.ANTHROPIC_API_KEY) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    return data.content?.[0]?.text || "";
  }

  if (process.env.OPENAI_API_KEY) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4096,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }

  // Demo mode - return sample content
  return generateDemoContent(prompt);
}

function generateDemoContent(prompt: string): string {
  if (prompt.includes("Lebenslauf")) {
    return `<div class="cv-document">
<header style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
<h1 style="font-size: 28px; color: #1e293b; margin: 0;">Max Mustermann</h1>
<p style="color: #64748b; margin: 4px 0;">Senior Software Engineer</p>
<p style="color: #64748b; font-size: 14px;">Berlin, Deutschland • max@email.de • +49 170 1234567</p>
</header>

<section style="margin-bottom: 20px;">
<h2 style="color: #2563eb; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Berufsprofil</h2>
<p style="color: #334155; line-height: 1.6;">Erfahrener Software Engineer mit über 5 Jahren Expertise in der Entwicklung skalierbarer Webanwendungen. Nachgewiesene Erfolge in der Führung agiler Teams und der Implementierung innovativer Lösungen, die Geschäftsprozesse um bis zu 40% optimiert haben.</p>
</section>

<section style="margin-bottom: 20px;">
<h2 style="color: #2563eb; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Berufserfahrung</h2>
<div style="margin-bottom: 16px;">
<h3 style="color: #1e293b; margin: 0;">Senior Software Engineer</h3>
<p style="color: #2563eb; margin: 2px 0;">TechCorp GmbH | 2021 – Heute</p>
<ul style="color: #334155; line-height: 1.8;">
<li>Leitung eines 5-köpfigen Entwicklungsteams bei der Migration einer Legacy-Anwendung zu Microservices</li>
<li>Reduzierung der Ladezeiten um 60% durch Performance-Optimierung</li>
<li>Einführung von CI/CD-Pipelines, die die Deployment-Frequenz um 300% steigerten</li>
</ul>
</div>
</section>

<section style="margin-bottom: 20px;">
<h2 style="color: #2563eb; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Ausbildung</h2>
<h3 style="color: #1e293b; margin: 0;">B.Sc. Informatik</h3>
<p style="color: #2563eb; margin: 2px 0;">Technische Universität Berlin | 2015 – 2019</p>
</section>

<section style="margin-bottom: 20px;">
<h2 style="color: #2563eb; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Kenntnisse</h2>
<p style="color: #334155;">React, TypeScript, Node.js, Python, AWS, Docker, Kubernetes, PostgreSQL, MongoDB, GraphQL</p>
</section>

<section>
<h2 style="color: #2563eb; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Sprachen</h2>
<p style="color: #334155;">Deutsch (Muttersprache) • Englisch (Verhandlungssicher) • Französisch (Grundkenntnisse)</p>
</section>
</div>`;
  }

  if (prompt.includes("Bewerbungsschreiben")) {
    return `<div class="cover-letter">
<div style="text-align: right; color: #64748b; margin-bottom: 24px;">
<p>Max Mustermann<br/>Musterstraße 42<br/>10115 Berlin<br/><br/>Berlin, den ${new Date().toLocaleDateString("de-DE")}</p>
</div>

<div style="margin-bottom: 24px;">
<p style="color: #334155;"><strong>Firma GmbH</strong><br/>Personalabteilung<br/>Firmenstraße 1<br/>10117 Berlin</p>
</div>

<h2 style="color: #1e293b; font-size: 18px; margin-bottom: 16px;">Bewerbung als Senior Software Engineer</h2>

<div style="color: #334155; line-height: 1.8;">
<p>Sehr geehrte Damen und Herren,</p>

<p>als ich Ihre Stellenausschreibung gelesen habe, wusste ich sofort: Diese Position vereint genau die Herausforderungen, die mich als Entwickler antreiben. In den letzten fünf Jahren habe ich nicht nur Code geschrieben – ich habe Teams aufgebaut, Architekturen neu gedacht und messbare Geschäftsergebnisse geliefert.</p>

<p>Bei der TechCorp GmbH habe ich ein 5-köpfiges Team geleitet und unsere Legacy-Plattform erfolgreich zu einer modernen Microservices-Architektur migriert. Das Ergebnis: 60% schnellere Ladezeiten und eine 300% höhere Deployment-Frequenz. Diese Erfahrung hat mir gezeigt, dass technische Exzellenz und pragmatisches Denken Hand in Hand gehen müssen.</p>

<p>Was mich besonders an Ihrem Unternehmen reizt, ist Ihr Fokus auf innovative Lösungen in einem dynamischen Umfeld. Meine Expertise in React, TypeScript und Cloud-Architekturen möchte ich einsetzen, um Ihr Produkt auf das nächste Level zu bringen.</p>

<p>Ich freue mich darauf, in einem persönlichen Gespräch zu zeigen, wie ich Ihr Team verstärken kann.</p>

<p>Mit freundlichen Grüßen<br/><br/><em>Max Mustermann</em></p>
</div>
</div>`;
  }

  return `<div class="interview-coaching">
<h1 style="color: #1e293b; border-bottom: 2px solid #2563eb; padding-bottom: 12px;">Interview Coaching – Dein persönlicher Leitfaden</h1>

<section style="margin: 24px 0;">
<h2 style="color: #2563eb;">🎯 Top 10 Interviewfragen</h2>

<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 12px 0;">
<h3 style="color: #1e293b;">1. "Erzählen Sie uns von sich."</h3>
<p style="color: #334155; line-height: 1.6;"><strong>Perfekte Antwort:</strong> "Ich bin Software Engineer mit über 5 Jahren Erfahrung in der Webentwicklung. Bei meinem aktuellen Arbeitgeber leite ich ein Team von 5 Entwicklern und habe eine erfolgreiche Plattform-Migration verantwortet. Mich treibt die Kombination aus technischer Exzellenz und echtem Business Impact an – und genau das sehe ich in dieser Position."</p>
<p style="color: #2563eb; font-size: 14px;">💡 <em>Tipp: Halte deine Antwort unter 2 Minuten. Fokus auf relevante Highlights.</em></p>
</div>

<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 12px 0;">
<h3 style="color: #1e293b;">2. "Was ist Ihre größte Stärke?"</h3>
<p style="color: #334155; line-height: 1.6;"><strong>Perfekte Antwort:</strong> "Meine größte Stärke ist es, komplexe technische Probleme in pragmatische Lösungen zu übersetzen. Bei der Migration unserer Plattform habe ich einen schrittweisen Ansatz gewählt, der das Risiko minimierte und gleichzeitig schnelle Ergebnisse lieferte."</p>
<p style="color: #2563eb; font-size: 14px;">💡 <em>Tipp: Immer mit einem konkreten Beispiel belegen.</em></p>
</div>

<div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 12px 0;">
<h3 style="color: #1e293b;">3. "Wo sehen Sie sich in 5 Jahren?"</h3>
<p style="color: #334155; line-height: 1.6;"><strong>Perfekte Antwort:</strong> "In 5 Jahren möchte ich eine technische Führungsrolle einnehmen, in der ich sowohl die Architektur als auch die Teamentwicklung mitgestalte. Ich sehe diese Position als idealen nächsten Schritt auf diesem Weg."</p>
</div>
</section>

<section style="margin: 24px 0;">
<h2 style="color: #2563eb;">⭐ STAR-Methode Beispiele</h2>
<div style="background: #eff6ff; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
<h3>Beispiel: Plattform-Migration</h3>
<p><strong>Situation:</strong> Legacy-Monolith mit wachsenden Performance-Problemen</p>
<p><strong>Task:</strong> Migration zu Microservices ohne Downtime</p>
<p><strong>Action:</strong> Strangler-Fig-Pattern implementiert, schrittweise Services extrahiert</p>
<p><strong>Result:</strong> 60% schnellere Ladezeiten, 300% mehr Deployments, null Ausfallzeit</p>
</div>
</section>

<section style="margin: 24px 0;">
<h2 style="color: #2563eb;">❓ Intelligente Rückfragen</h2>
<ol style="color: #334155; line-height: 2;">
<li>Wie sieht der typische Entwicklungszyklus in Ihrem Team aus?</li>
<li>Was sind die größten technischen Herausforderungen aktuell?</li>
<li>Wie fördern Sie die Weiterentwicklung Ihrer Mitarbeiter?</li>
<li>Welche Technologien planen Sie in den nächsten 12 Monaten einzusetzen?</li>
<li>Wie würden Sie die Teamkultur in drei Worten beschreiben?</li>
</ol>
</section>

<section style="margin: 24px 0;">
<h2 style="color: #2563eb;">✅ Do's and Don'ts</h2>
<div style="display: grid; gap: 16px;">
<div style="background: #f0fdf4; padding: 16px; border-radius: 8px;">
<h3 style="color: #16a34a;">Do's</h3>
<ul><li>Recherchiere das Unternehmen gründlich</li><li>Bereite konkrete Beispiele vor</li><li>Stelle Rückfragen</li><li>Sei authentisch</li></ul>
</div>
<div style="background: #fef2f2; padding: 16px; border-radius: 8px;">
<h3 style="color: #dc2626;">Don'ts</h3>
<ul><li>Schlecht über frühere Arbeitgeber sprechen</li><li>Unvorbereitet erscheinen</li><li>Nur Ja/Nein antworten</li><li>Gehaltsthema zu früh ansprechen</li></ul>
</div>
</div>
</section>
</div>`;
}
