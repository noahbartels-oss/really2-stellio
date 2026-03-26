import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "E-Mail ist erforderlich" },
      { status: 400 }
    );
  }

  // In production: send password reset email via email service
  // For now, return success regardless (security best practice)
  return NextResponse.json({
    message: "Falls ein Konto mit dieser E-Mail existiert, wurde ein Reset-Link gesendet.",
  });
}
