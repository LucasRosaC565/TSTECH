import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TS Tech & Health",
  description:
    "Soluções minimamente invasivas para cirurgias de alta tecnologia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        <header className="border-b bg-[#FAFAFA] backdrop-blur">
          <div className="container flex items-center justify-between h-32">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/assets/Logo.png"
                alt="TS Tech & Health"
                className="h-26 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6 fluid-body font-medium text-[#646464]">
              <Link href="/" className="hover:text-[#16514B]">
                Início
              </Link>
              <a href="#sobre" className="hover:text-[#16514B]">
                Sobre nós
              </a>
              <Link href="/artigos" className="hover:text-[#16514B]">
                Blog
              </Link>
              <a href="#" className="hover:text-[#16514B]">
                Convênios
              </a>
              <a href="#contato" className="hover:text-[#16514B]">
                Contato
              </a>
              <a href="#produtos" className="btn-primary h-10 px-5">
                Produtos
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer id="contato" className="mt-20 justify-center border-t">
          <div className="container flex flex-col items-center justify-center py-10 md:grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col items-center justify-center">
              <div>
                <img
                  src="/assets/Logo.png"
                  alt="TS Tech & Health"
                  className="h-36"
                />
                <h4 className="font-semibold fluid-body text-[#16514B] mb-2">Endereço</h4>
                <p className="mt-4 fluid-body text-black">
                  Rua Afonsina, 248 – Sala 03
                  <br /> Rudge Ramos, São Bernardo do Campo – SP
                  <br /> CEP: 09061-300
                </p>
              </div>
            </div>

            <div>
              <div>
                <h4 className="font-semibold fluid-body text-[#16514B] mb-2">
                  Fale conosco
                </h4>
                <div className="flex items-center gap-2">
                <img src="/assets/zap.png" alt="Whatsapp" className="w-5 h-5" />
                <span className="fluid-body text-black">
                  11 4367-3090 (Whatsapp)
                </span>
                </div>
  
                <div className="flex items-center mt-2 gap-2">
                <img src="/assets/email.png" alt="Email" className="w-5 h-5" />
                <span className="fluid-body text-black">
                  comercial@tsmedicalgroup.com.br
                </span>
                </div>
              </div>
              <h4 className="font-semibold mt-16 fluid-body text-[#16514B] mb-2">
                Redes sociais
              </h4>
              <div className="flex flex-wrap gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 26 26"
                  fill="none"
                  className="bg-[#16514B] p-1 rounded-sm"
                >
                  <path
                    d="M13.0046 7.38452C9.89917 7.38452 7.39429 9.8894 7.39429 12.9949C7.39429 16.1003 9.89917 18.6052 13.0046 18.6052C16.1101 18.6052 18.615 16.1003 18.615 12.9949C18.615 9.8894 16.1101 7.38452 13.0046 7.38452ZM13.0046 16.6423C10.9978 16.6423 9.35718 15.0066 9.35718 12.9949C9.35718 10.9832 10.9929 9.34741 13.0046 9.34741C15.0164 9.34741 16.6521 10.9832 16.6521 12.9949C16.6521 15.0066 15.0115 16.6423 13.0046 16.6423ZM20.1531 7.15503C20.1531 7.88257 19.5671 8.46362 18.8445 8.46362C18.1169 8.46362 17.5359 7.87769 17.5359 7.15503C17.5359 6.43237 18.1218 5.84644 18.8445 5.84644C19.5671 5.84644 20.1531 6.43237 20.1531 7.15503ZM23.8689 8.48315C23.7859 6.73022 23.3855 5.17749 22.1013 3.89819C20.822 2.6189 19.2693 2.21851 17.5164 2.13062C15.7097 2.02808 10.2947 2.02808 8.48804 2.13062C6.73999 2.21362 5.18726 2.61401 3.90308 3.89331C2.6189 5.17261 2.22339 6.72534 2.1355 8.47827C2.03296 10.2849 2.03296 15.7 2.1355 17.5066C2.21851 19.2595 2.6189 20.8123 3.90308 22.0916C5.18726 23.3708 6.73511 23.7712 8.48804 23.8591C10.2947 23.9617 15.7097 23.9617 17.5164 23.8591C19.2693 23.7761 20.822 23.3757 22.1013 22.0916C23.3806 20.8123 23.781 19.2595 23.8689 17.5066C23.9714 15.7 23.9714 10.2898 23.8689 8.48315ZM21.5349 19.4451C21.1541 20.4021 20.4167 21.1394 19.4548 21.5251C18.0144 22.0964 14.5964 21.9646 13.0046 21.9646C11.4128 21.9646 7.98999 22.0916 6.55444 21.5251C5.59741 21.1443 4.86011 20.407 4.47437 19.4451C3.90308 18.0046 4.03491 14.5867 4.03491 12.9949C4.03491 11.4031 3.90796 7.98022 4.47437 6.54468C4.85522 5.58765 5.59253 4.85034 6.55444 4.4646C7.99487 3.89331 11.4128 4.02515 13.0046 4.02515C14.5964 4.02515 18.0193 3.89819 19.4548 4.4646C20.4119 4.84546 21.1492 5.58276 21.5349 6.54468C22.1062 7.98511 21.9744 11.4031 21.9744 12.9949C21.9744 14.5867 22.1062 18.0095 21.5349 19.4451Z"
                    fill="white"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 26 26"
                  fill="none"
                  className="bg-[#16514B] p-1 rounded-sm"
                >
                  <path
                    d="M25.1094 13C25.1094 6.31055 19.6895 0.890625 13 0.890625C6.31055 0.890625 0.890625 6.31055 0.890625 13C0.890625 19.0439 5.31885 24.0537 11.1079 24.9629V16.5005H8.03174V13H11.1079V10.332C11.1079 7.29736 12.9146 5.62109 15.6816 5.62109C17.0068 5.62109 18.3926 5.85742 18.3926 5.85742V8.83594H16.8652C15.3613 8.83594 14.8921 9.76953 14.8921 10.7271V13H18.2505L17.7134 16.5005H14.8921V24.9629C20.6812 24.0537 25.1094 19.0439 25.1094 13Z"
                    fill="white"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 26 26"
                  fill="none"
                  className="bg-[#16514B] p-1 rounded-sm"
                >
                  <path
                    d="M22.375 2.0625H3.62012C2.76074 2.0625 2.0625 2.77051 2.0625 3.63965V22.3604C2.0625 23.2295 2.76074 23.9375 3.62012 23.9375H22.375C23.2344 23.9375 23.9375 23.2295 23.9375 22.3604V3.63965C23.9375 2.77051 23.2344 2.0625 22.375 2.0625ZM8.67383 20.8125H5.43164V10.373H8.67871V20.8125H8.67383ZM7.05273 8.94727C6.0127 8.94727 5.17285 8.10254 5.17285 7.06738C5.17285 6.03223 6.0127 5.1875 7.05273 5.1875C8.08789 5.1875 8.93262 6.03223 8.93262 7.06738C8.93262 8.10742 8.09277 8.94727 7.05273 8.94727ZM20.8271 20.8125H17.585V15.7344C17.585 14.5234 17.5605 12.9658 15.9004 12.9658C14.2109 12.9658 13.9521 14.2842 13.9521 15.6465V20.8125H10.71V10.373H13.8203V11.7988H13.8643C14.2988 10.9785 15.3584 10.1143 16.9355 10.1143C20.2168 10.1143 20.8271 12.2773 20.8271 15.0898V20.8125Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center small text-black pb-6">
            Copyright 2025 © TS Tech & Health – Todos os direitos reservados
          </div>
        </footer>
      </body>
    </html>
  );
}
