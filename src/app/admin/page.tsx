"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      window.location.href = "/admin/dashboard";
    } else {
      const msg = await res.text();
      setError(msg || "Credenciais inválidas");
    }
  }

  return (
    <main className="min-h-[60vh] mt-32 flex items-center justify-center py-16">
      <form onSubmit={handleSubmit} className="bg-white border shadow-sm rounded-2xl p-6 w-full max-w-md">
        <h1 className="fluid-h2 font-bold text-[#3E515B] mb-4">Área Administrativa</h1>
        <p className="text-sm text-gray-600 mb-6">Acesso restrito</p>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              className="w-full text-black rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#16514B33] focus:border-[#16514B]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              className="w-full text-black rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#16514B33] focus:border-[#16514B]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full mt-4">Entrar</button>
        </div>
      </form>
    </main>
  );
}


