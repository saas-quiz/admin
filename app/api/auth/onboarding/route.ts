"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTokens, hashPassword } from "@/lib/utils";

/**
 * Onboarding
 * PUT /api/auth/onboarding
 * body: { name, email }
 * action: "update user", "generate tokens"
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

      // Create JWT token
      const secret = process.env.JWT_SECRET as string;
      const tokens = generateTokens({ id: user.id, email: user.email }, secret);

      user.password = null;
      const response = NextResponse.json({ ok: true, message: "Sign in successful", data: user }, { status: 200 });

      // Set cookies
      response.cookies.set("auth_token", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      });
      response.cookies.set("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      });

      return response;
    } catch (error: any) {
      console.error(error?.message);
      return NextResponse.json({ ok: false, error: "Something went wrong!" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }
}
