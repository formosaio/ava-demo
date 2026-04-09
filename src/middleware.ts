import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow: login page, auth API, static assets, favicon
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  // No passcode configured — skip auth entirely (local dev)
  if (!process.env.DEMO_PASSCODE) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("demo_auth");
  if (authCookie?.value) {
    // Validate the token contains the correct passcode
    try {
      const decoded = Buffer.from(authCookie.value, "base64").toString();
      if (decoded.includes(process.env.DEMO_PASSCODE)) {
        return NextResponse.next();
      }
    } catch {
      // Invalid cookie — fall through to redirect
    }
  }

  // Redirect to login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
