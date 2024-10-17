"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, generateTokens, hashPassword } from "@/lib/utils";

/**
 * Sign in
 * POST /api/auth/signin
 * body: { email, password }
 * action: "find user", "verify password", "generate tokens"
 */
export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { name, email, password, googleId } = await req.json();
      if (!email && (!password || !googleId)) {
        return NextResponse.json({ ok: false, error: "Invalid request body!" }, { status: 400 });
      }

      // Find user
      const user = await prisma.user.upsert({
        where: { email },
        create: { name, email, password: hashPassword(password), googleId },
        update: {},
      });

      // if (!user) {
      //   // Create user
      //   const newUser = await prisma.user.create({ data: { email, password: hashPassword(password) } });
      //   return NextResponse.json({ ok: true, message: "Please complete your profile", data: newUser }, { status: 200 });
      // } else {
      if (user.googleId) {
        return NextResponse.json({ ok: false, error: "Please sign in with Google!" }, { status: 200 });
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ ok: false, error: "Invalid password!" }, { status: 401 });
      }

      //@ts-ignore
      delete user.password;

      // return if user is not onboarded yet
      if (!user.isOnBoarded) {
        return NextResponse.json({ ok: true, message: "Please complete your profile", data: user }, { status: 200 });
      }

      // Create JWT token
      const secret = process.env.JWT_SECRET as string;
      const tokens = generateTokens({ id: user.id, email: user.email }, secret);

      // remove password key from user
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
    return NextResponse.json({ ok: false, error: "Method not allowed", status: 405 });
  }
}
