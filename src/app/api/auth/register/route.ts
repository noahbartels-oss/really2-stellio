import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-Mail und Passwort sind erforderlich" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Passwort muss mindestens 8 Zeichen lang sein" },
        { status: 400 }
      );
    }

    // Test DB connection first
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      });
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Datenbankverbindung fehlgeschlagen. Bitte versuche es später erneut." },
        { status: 503 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Ein Konto mit dieser E-Mail existiert bereits" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
      const user = await prisma.user.create({
        data: {
          name: name || null,
          email,
          passwordHash,
        },
      });

      return NextResponse.json(
        { message: "Konto erfolgreich erstellt", userId: user.id },
        { status: 201 }
      );
    } catch (createError) {
      console.error("User creation error:", createError);
      return NextResponse.json(
        { error: "Konto konnte nicht erstellt werden. Bitte versuche es erneut." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    const message = error instanceof Error ? error.message : "Unbekannter Fehler";
    return NextResponse.json(
      { error: `Registrierung fehlgeschlagen: ${message}` },
      { status: 500 }
    );
  }
}
