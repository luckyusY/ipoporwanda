import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "admin_session";

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get(COOKIE)?.value;
  const secret = process.env.ADMIN_SECRET;
  return !!secret && session === secret;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin API routes — return 401 JSON, don't redirect
  if (pathname.startsWith("/api/admin/")) {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Allow login page through always
  if (pathname === "/admin/login") {
    // Redirect away if already logged in
    if (isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Protect all other /admin/* pages
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated(request)) {
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
