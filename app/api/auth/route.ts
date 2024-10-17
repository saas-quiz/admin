"use server";

import { verifyToken } from "@/lib/utils";
import * as cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const cookies = cookie.parse(req.headers.get("cookie") || "");

      console.log("----------cookies api called-----------");

      if (!cookies?.auth_token) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
      }

      // get data from token
      const secret = process.env.JWT_SECRET as string;
      const decode = verifyToken(cookies.auth_token, secret);
      if (!decode) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
      }

      return NextResponse.json({ ok: true, message: "Request successful", data: decode }, { status: 200 });
    } catch (error: any) {
      console.error(error?.message);
      return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }
}
