import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.url.split("/").pop();

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: { select: { answer: false, id: true, title: true, quizId: true, options: true } },
        images: true,
      },
    });

    if (!quiz?.published) {
      return NextResponse.json({ ok: true, error: "This link is not valid!", quiz }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: "Data fetched successfully", quiz }, { status: 200 });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
