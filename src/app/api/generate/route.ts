import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateCV, generateCoverLetter, generateInterviewCoaching } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { type, fullName, jobTitle, experience, skills, education, targetJob, languages } = await req.json();

    if (!type || !fullName || !jobTitle || !experience || !skills || !targetJob) {
      return NextResponse.json(
        { error: "Bitte fülle alle Pflichtfelder aus" },
        { status: 400 }
      );
    }

    const input = { fullName, jobTitle, experience, skills, education: education || "", targetJob, languages };

    let content: string;
    let title: string;
    let docType: "CV" | "COVER_LETTER" | "INTERVIEW_COACHING";

    switch (type) {
      case "cv":
        content = await generateCV(input);
        title = `Lebenslauf – ${fullName}`;
        docType = "CV";
        break;
      case "cover-letter":
        content = await generateCoverLetter(input);
        title = `Bewerbungsschreiben – ${targetJob}`;
        docType = "COVER_LETTER";
        break;
      case "interview":
        content = await generateInterviewCoaching(input);
        title = `Interview Coaching – ${targetJob}`;
        docType = "INTERVIEW_COACHING";
        break;
      default:
        return NextResponse.json({ error: "Ungültiger Typ" }, { status: 400 });
    }

    // Create preview (first ~40% of content)
    const previewLength = Math.floor(content.length * 0.4);
    const preview = content.substring(0, previewLength);

    // Save to database
    const document = await prisma.document.create({
      data: {
        userId,
        type: docType,
        title,
        content,
        preview,
        isLocked: true,
      },
    });

    // Save/update user profile
    const existingProfile = await prisma.userProfile.findFirst({
      where: { userId },
    });

    if (existingProfile) {
      await prisma.userProfile.update({
        where: { id: existingProfile.id },
        data: { fullName, jobTitle, experience, skills, education, targetJob, languages },
      });
    } else {
      await prisma.userProfile.create({
        data: { userId, fullName, jobTitle, experience, skills, education, targetJob, languages },
      });
    }

    return NextResponse.json({
      document: {
        id: document.id,
        title: document.title,
        preview: document.preview,
        isLocked: document.isLocked,
        type: document.type,
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Generierung fehlgeschlagen. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
