import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

/**
 * Guarda de sessão para route handlers do admin (runtime Node).
 * Retorna 401 quando não autenticado, ou null quando liberado.
 *
 * Duplica a checagem do middleware de propósito: falhas de bypass de
 * middleware são uma classe recorrente de CVE no Next.js, então as rotas
 * não devem depender só dele.
 */
export async function requireAdminSession(): Promise<NextResponse | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  return null;
}
