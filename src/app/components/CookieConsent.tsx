"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "tstech-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage indisponível (modo privado / cookies bloqueados)
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignora falha de persistência
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <p className="small text-black">
          Usamos cookies para manter o site funcionando e entender como ele é
          utilizado. Você pode aceitar ou recusar os cookies não essenciais.
          Saiba mais na nossa{" "}
          <Link
            href="/politica-de-privacidade"
            className="font-semibold text-[#16514B] underline"
          >
            Política de Privacidade (LGPD)
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="small rounded-sm border border-[#16514B] px-4 py-2 font-semibold text-[#16514B] transition-colors hover:bg-[#16514B]/10"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="small rounded-sm bg-[#16514B] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#123f3a]"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
