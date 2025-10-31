"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Contato() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Contato pelo site");
    const body = encodeURIComponent(
      `Nome: ${name}\nEmpresa: ${company}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`
    );
    // Abre o e-mail padrão do usuário
    window.location.href = `mailto:comercial@tsmediagroup.com.br?subject=${subject}&body=${body}`;
  }

  const whatsappNumber = "5511973012833"; // 55 + DDD + número
  const whatsappText = encodeURIComponent(
    "Olá! Gostaria de falar com a TS Tech & Health pelo site."
  );

  return (
    <main className="font-sans">
      
      <section className="hero-bg-contato xl:mt-32 mt-20 h-[28vw] min-h-[280px] flex items-center">
        <div className="container py-8">
          <h1 className="fluid-h2 font-bold text-[#3E515B]">Entre em contato conosco</h1>
          <p className="text-[#646464] mt-10 max-w-xl">
            Nossa equipe está pronta para atender você com agilidade e
            garantir a melhor experiência possível.
          </p>
        </div>
      </section>

      
      <section className="py-14 font-poppins bg-white">
        <div className="container grid grid-cols-1 lg:grid-cols-2 md:gap-72 gap-12">
          
          <div>
            <h2 className="section-title text-nowrap text-[#3E515B] fluid-display mb-8">
              Formulário de Contato
            </h2>
            <p className="text-[#646464] small-tec mb-8 min-w-xl max-w-3xl">
              Preencha os campos abaixo e envie sua mensagem. Nosso time entrará
              em contato em breve para oferecer o suporte que você precisa.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                className="w-full rounded-xl text-[#929292] bg-[#F5F5F5] px-4 py-3 outline-none focus:ring-2 focus:ring-teal-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Empresa"
                className="w-full rounded-xl text-[#929292] bg-[#F5F5F5] px-4 py-3 outline-none focus:ring-2 focus:ring-teal-700"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl text-[#929292] bg-[#F5F5F5] px-4 py-3 outline-none focus:ring-2 focus:ring-teal-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Número"
                className="w-full rounded-xl text-[#929292] bg-[#F5F5F5] px-4 py-3 outline-none focus:ring-2 focus:ring-teal-700"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Escreva aqui sua mensagem"
                rows={5}
                className="w-full rounded-xl text-[#929292] bg-[#F5F5F5] px-4 py-3 outline-none focus:ring-2 focus:ring-teal-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <div className="flex gap-3">
                <button type="submit" className="w-full btn-primary">
                  Enviar
                </button>
              </div>
            </form>
          </div>

          {/* Informações de contato */}
          <div className="small-tec">
            <h2 className="section-title text-[#3E515B] fluid-display mb-4">Fale com a gente</h2>
            <p className="text-[#646464] small-tec mb-8 max-w-xl">
              Entre em contato conosco pelos dados abaixo ou através do
              formulário.
            </p>

            <div className="flex flex-col small-tec md:justify-start gap-2">
                <div className="flex gap-2">
                <Image src="/assets/Zap.png" alt="Whatsapp" width={16} height={16} className="w-5 h-5" />
                <span className=" text-black">
                11 97301-2833 (Whatsapp)
                </span>
                </div>
                <div className="flex gap-2">
                <Image src="/assets/Email.png" alt="Email" width={16} height={16} className="w-5 h-5" />
                <span className=" text-black">
                  comercial@tsmedicalgroup.com.br
                </span>
                </div>
                </div>

            <div className="mt-8 small-tec">
              <h3 className="font-semibold small-tec text-[#16514B] mb-2">Endereço</h3>
              <p className="small-tec text-[#646464]">
                Rua Alvarenga, 249 – Sala 03
                <br />
                Rudge Ramos, São Bernardo do Campo – SP
                <br />
                CEP: 09681-300
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


