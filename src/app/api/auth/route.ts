import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { passcode } = (await request.json()) as { passcode: string };
  const expected = process.env.DEMO_PASSCODE;

  if (!expected) {
    // No passcode configured — allow access (dev mode)
    const res = NextResponse.json({ ok: true });
    (await cookies()).set("demo_auth", "open", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  }

  if (passcode !== expected) {
    return NextResponse.json({ ok: false, error: "Incorrect passcode" }, { status: 401 });
  }

  const token = Buffer.from(`${Date.now()}:${expected}`).toString("base64");

  const res = NextResponse.json({ ok: true });
  (await cookies()).set("demo_auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return res;
}
