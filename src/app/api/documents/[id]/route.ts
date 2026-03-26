import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { id } = await params;

    const document = await prisma.document.findFirst({
      where: { id, userId },
    });

    if (!document) {
      return NextResponse.json({ error: "Dokument nicht gefunden" }, { status: 404 });
    }

    // If locked, only return preview
    if (document.isLocked) {
      return NextResponse.json({
        document: {
          id: document.id,
          type: document.type,
          title: document.title,
          content: document.preview,
          isLocked: true,
          createdAt: document.createdAt,
        },
      });
    }

    return NextResponse.json({
      document: {
        id: document.id,
        type: document.type,
        title: document.title,
        content: document.content,
        isLocked: false,
        createdAt: document.createdAt,
      },
    });
  } catch (error) {
    console.error("Document fetch error:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden des Dokuments" },
      { status: 500 }
    );
  }
}
