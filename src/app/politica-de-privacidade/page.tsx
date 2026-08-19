import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | TS Tech & Health",
  description:
    "Política de Privacidade e tratamento de dados pessoais da TS Tech & Health, em conformidade com a LGPD (Lei nº 13.709/2018).",
};

const ultimaAtualizacao = "17 de agosto de 2026";
const emailEncarregado = "comercial@tsmedicalgroup.com.br";

export default function PoliticaDePrivacidade() {
  return (
    <main className="font-sans xl:mt-32 mt-20">
      <section className="py-14 bg-white">
        <div className="container max-w-4xl">
          <h1 className="fluid-h2 font-bold text-[#3E515B]">
            Política de Privacidade
          </h1>
          <p className="text-[#646464] small mt-4">
            Última atualização: {ultimaAtualizacao}
          </p>

          <div className="mt-10 flex flex-col gap-10 text-[#646464] small">
            <div>
              <p>
                A TS Tech &amp; Health respeita a sua privacidade e trata os
                dados pessoais coletados neste site em conformidade com a Lei
                Geral de Proteção de Dados Pessoais – LGPD (Lei nº 13.709/2018).
                Esta política explica quais dados coletamos, por que coletamos,
                como os utilizamos e quais são os seus direitos.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                1. Quem é o controlador dos seus dados
              </h2>
              <p>
                A TS Tech &amp; Health, com endereço na Rua Afonsina, 248 – Sala
                03, Rudge Ramos, São Bernardo do Campo – SP, CEP 09061-300, é a
                controladora dos dados pessoais tratados por meio deste site.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                2. Quais dados coletamos
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>
                  <strong>Dados que você nos fornece:</strong> nome, empresa,
                  e-mail, telefone e o conteúdo da mensagem enviada pelo
                  formulário de contato ou pelo WhatsApp.
                </li>
                <li>
                  <strong>Dados técnicos de navegação:</strong> informações
                  geradas automaticamente pelo acesso ao site, como endereço IP,
                  data e hora do acesso, páginas visitadas, tipo de navegador e
                  dispositivo.
                </li>
              </ul>
              <p className="mt-3">
                Não solicitamos dados pessoais sensíveis, como dados de saúde,
                por meio deste site. Pedimos que você não inclua informações
                dessa natureza — suas ou de terceiros — nas mensagens enviadas.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                3. Para que usamos os dados e com que base legal
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>
                  Responder a contatos, dúvidas e solicitações de orçamento —
                  com base no seu consentimento e nos procedimentos preliminares
                  relacionados a contrato (art. 7º, I e V, da LGPD).
                </li>
                <li>
                  Manter o relacionamento comercial e enviar informações sobre
                  nossos produtos e serviços — com base no legítimo interesse ou
                  no seu consentimento (art. 7º, I e IX, da LGPD).
                </li>
                <li>
                  Garantir a segurança, o funcionamento e a melhoria do site —
                  com base no legítimo interesse (art. 7º, IX, da LGPD).
                </li>
                <li>
                  Cumprir obrigações legais e regulatórias aplicáveis (art. 7º,
                  II, da LGPD).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                4. Compartilhamento de dados
              </h2>
              <p>
                Não vendemos seus dados pessoais. O compartilhamento ocorre
                apenas quando necessário, com: provedores de hospedagem e
                infraestrutura de TI que operam o site; plataformas de
                comunicação utilizadas no atendimento, como o WhatsApp; e
                autoridades públicas, quando houver obrigação legal ou ordem
                judicial. Esses terceiros tratam os dados conforme nossas
                instruções e políticas próprias de privacidade.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                5. Cookies
              </h2>
              <p>
                Utilizamos apenas cookies e tecnologias equivalentes necessários
                ao funcionamento e à segurança do site, incluindo os que mantêm
                a sessão de usuários administrativos. Você pode bloquear ou
                apagar cookies nas configurações do seu navegador, ciente de que
                isso pode afetar o funcionamento de partes do site.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                6. Por quanto tempo guardamos seus dados
              </h2>
              <p>
                Mantemos os dados pelo tempo necessário para atender à
                finalidade que motivou a coleta, para o cumprimento de
                obrigações legais e para o exercício regular de direitos.
                Encerrado esse prazo, os dados são eliminados ou anonimizados.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                7. Segurança
              </h2>
              <p>
                Adotamos medidas técnicas e administrativas para proteger os
                dados pessoais contra acessos não autorizados e situações
                acidentais ou ilícitas de destruição, perda, alteração ou
                divulgação.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                8. Seus direitos como titular
              </h2>
              <p>
                Nos termos do art. 18 da LGPD, você pode solicitar a confirmação
                da existência de tratamento, o acesso aos seus dados, a correção
                de dados incompletos ou desatualizados, a anonimização, o
                bloqueio ou a eliminação de dados desnecessários ou tratados em
                desconformidade com a lei, a portabilidade, a informação sobre
                compartilhamentos, bem como revogar o consentimento a qualquer
                momento.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                9. Como exercer seus direitos
              </h2>
              <p>
                Envie sua solicitação para{" "}
                <a
                  href={`mailto:${emailEncarregado}`}
                  className="text-[#16514B] underline"
                >
                  {emailEncarregado}
                </a>
                . Responderemos no menor prazo possível, podendo solicitar
                informações adicionais para confirmar sua identidade.
              </p>
            </div>

            <div>
              <h2 className="font-semibold fluid-body text-[#16514B] mb-2">
                10. Alterações desta política
              </h2>
              <p>
                Esta política pode ser atualizada a qualquer momento. A versão
                vigente estará sempre disponível nesta página, com a respectiva
                data de atualização.
              </p>
            </div>

            <div>
              <Link href="/contato" className="text-[#16514B] underline">
                Fale conosco
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
