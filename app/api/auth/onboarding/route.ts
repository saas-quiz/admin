"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Onboarding
 * PUT /api/auth/onboarding
 * body: { name, email }
 * action: "update user"
 */
export async function PUT(req: NextRequest) {
  if (req.method === "PUT") {
    try {
      const { name, email } = await req.json();
      if (!name || !email) {
        return NextResponse.json({ ok: false, error: "Invalid request body!" }, { status: 400 });
      }

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ ok: false, error: "User not found!" }, { status: 404 });
      }

      // Update user
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { name, isOnBoarded: true },
      });

      const response = NextResponse.json({ ok: true, message: "Sign in successful", data: updatedUser }, { status: 200 });

      return response;
    } catch (error: any) {
      console.error(error?.message);
      return NextResponse.json({ ok: false, error: "Something went wrong!" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }
}
