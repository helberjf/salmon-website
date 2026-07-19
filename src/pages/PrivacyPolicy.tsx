import { LegalPage } from './LegalPage';
import { company } from '@/data/company';

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        A {company.name} respeita a privacidade dos visitantes deste website e trata os dados
        pessoais recebidos em conformidade com a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018 — LGPD).
      </p>

      <h2>Dados coletados</h2>
      <p>
        Coletamos apenas os dados fornecidos voluntariamente por meio do formulário de contato:
        nome, empresa, cargo, e-mail, telefone, cidade, estado e informações sobre o interesse
        comercial. Não coletamos dados sensíveis.
      </p>

      <h2>Finalidade do tratamento</h2>
      <ul>
        <li>Responder às solicitações de contato e de proposta comercial;</li>
        <li>Elaborar e enviar propostas relacionadas ao fornecimento de produtos;</li>
        <li>Manter o relacionamento comercial solicitado pelo titular.</li>
      </ul>

      <h2>Compartilhamento</h2>
      <p>
        Os dados não são vendidos nem compartilhados com terceiros para fins de marketing. O
        compartilhamento ocorre apenas quando necessário à execução da relação comercial ou por
        obrigação legal.
      </p>

      <h2>Direitos do titular</h2>
      <p>
        Nos termos da LGPD, o titular pode solicitar a confirmação de tratamento, o acesso, a
        correção ou a exclusão de seus dados a qualquer momento, pelos canais de contato indicados
        neste website.
      </p>

      <h2>Retenção e segurança</h2>
      <p>
        Os dados são mantidos apenas pelo período necessário às finalidades descritas e protegidos
        por medidas técnicas e organizacionais adequadas.
      </p>
    </LegalPage>
  );
}
