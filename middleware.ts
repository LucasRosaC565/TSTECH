import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // O login precisa ficar acessível sem sessão.
  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthenticated = Boolean(await verifySessionToken(token));

  // Rotas de API respondem 401 em vez de redirecionar.
  if (pathname.startsWith("/api/admin")) {
    return isAuthenticated
      ? NextResponse.next()
      : NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const isLoginPage = pathname === "/admin";

  if (isLoginPage) {
    if (isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
