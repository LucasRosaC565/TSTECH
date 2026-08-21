import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Usa apenas Web Crypto para funcionar tanto no runtime Edge (middleware)
// quanto no runtime Node (route handlers).

export const SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 horas
const PBKDF2_DIGEST = "SHA-256";

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(value: string): Uint8Array {
  const pad = value.length % 4 === 0 ? "" : "=".repeat(4 - (value.length % 4));
  const bin = atob(value.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64Decode(value: string): Uint8Array {
  const bin = atob(value);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Comparação em tempo constante — evita vazar informação por timing. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function requireSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET ausente ou curto demais (mínimo 32 caracteres)."
    );
  }
  return secret;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(requireSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function sign(payload: string): Promise<string> {
  const sig = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(),
    new TextEncoder().encode(payload)
  );
  return b64urlEncode(new Uint8Array(sig));
}

/** Emite um token de sessão assinado, com expiração embutida. */
export async function createSessionToken(subject: string): Promise<string> {
  const payload = b64urlEncode(
    new TextEncoder().encode(
      JSON.stringify({
        sub: subject,
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
      })
    )
  );
  return `${payload}.${await sign(payload)}`;
}

/** Valida assinatura e expiração. Retorna o subject ou null. */
export async function verifySessionToken(
  token: string | undefined
): Promise<string | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  let expected: string;
  try {
    expected = await sign(payload);
  } catch {
    return null; // segredo não configurado — nega acesso
  }

  if (!timingSafeEqual(b64urlDecode(signature), b64urlDecode(expected))) {
    return null;
  }

  try {
    const data = JSON.parse(new TextDecoder().decode(b64urlDecode(payload)));
    if (typeof data.exp !== "number" || data.exp < Date.now() / 1000) {
      return null;
    }
    return typeof data.sub === "string" ? data.sub : null;
  } catch {
    return null;
  }
}

/**
 * Deriva o hash PBKDF2 de uma senha, no formato pbkdf2:iter:salt:hash.
 * Separador `:` de propósito — o dotenv-expand do Next trata `$` como
 * interpolação de variável e corromperia o valor lido do .env.
 */
export async function hashPassword(
  password: string,
  saltBytes?: Uint8Array,
  iterations = 210_000
): Promise<string> {
  const salt = saltBytes ?? crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as unknown as BufferSource,
      iterations,
      hash: PBKDF2_DIGEST,
    },
    key,
    256
  );
  const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u));
  return `pbkdf2:${iterations}:${b64(salt)}:${b64(new Uint8Array(bits))}`;
}

/** Confere a senha contra um hash no formato acima. */
export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < 1) return false;

  const candidate = await hashPassword(password, b64Decode(parts[2]), iterations);
  return timingSafeEqual(
    new TextEncoder().encode(candidate),
    new TextEncoder().encode(stored)
  );
}

/**
 * Guarda para route handlers do admin.
 * Retorna uma resposta 401 quando não autenticado, ou null quando liberado.
 */
export async function requireAdmin(
  request: NextRequest | Request
): Promise<NextResponse | null> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  const token = match?.slice(SESSION_COOKIE.length + 1);

  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  return null;
}
