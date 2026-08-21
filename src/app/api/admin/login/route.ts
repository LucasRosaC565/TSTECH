import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  let email: unknown;
  let password: unknown;
  try {
    ({ email, password } = await request.json());
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  const validEmail = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validEmail || !passwordHash) {
    console.error("ADMIN_EMAIL ou ADMIN_PASSWORD_HASH não configurados.");
    return NextResponse.json(
      { error: "Autenticação indisponível" },
      { status: 503 }
    );
  }

  const emailOk = email.trim().toLowerCase() === validEmail.toLowerCase();
  // Sempre confere a senha, mesmo com e-mail errado, para não vazar
  // por timing quais e-mails existem.
  const passwordOk = await verifyPassword(password, passwordHash);

  if (!emailOk || !passwordOk) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(validEmail), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}

/** Logout: derruba a sessão. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
