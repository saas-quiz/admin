import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const id = req.url.split("/").pop();

    const group = await prisma.group.findUnique({
      where: { id },
      include: { quizzes: true, admin: { select: { name: true } } },
    });

    return NextResponse.json({ ok: true, message: "Data fetched successfully", group }, { status: 200 });
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
