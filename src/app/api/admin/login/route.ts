import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const validEmail = "tstech@tsmedicalgroup.com";
  const validPassword = "tsTECH@24803$";

  if (email === validEmail && password === validPassword) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_auth", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  }

  return new NextResponse("Credenciais inválidas", { status: 401 });
}


