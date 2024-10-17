"use server";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  if (req.method === "DELETE") {
    const response = NextResponse.json({ ok: true });

    response.cookies.delete("auth_token");
    response.cookies.delete("refresh_token");

    return response;
  } else {
    return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }
}
