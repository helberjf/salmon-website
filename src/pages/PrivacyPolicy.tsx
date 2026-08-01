import { LegalPage } from './LegalPage';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  return (
    <LegalPage title={t('Política de Privacidade')}>
      <p>
        {t(
          'A {company} respeita a privacidade dos visitantes deste website e trata os dados pessoais recebidos em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).',
          { company: company.name },
        )}
      </p>

      <h2>{t('Dados coletados')}</h2>
      <p>
        {t('Coletamos apenas os dados fornecidos voluntariamente por meio do formulário de contato: nome, empresa, cargo, e-mail, telefone, cidade, estado e informações sobre o interesse comercial. Não coletamos dados sensíveis.')}
      </p>

      <h2>{t('Finalidade do tratamento')}</h2>
      <ul>
        <li>{t('Responder às solicitações de contato e de proposta comercial;')}</li>
        <li>{t('Elaborar e enviar propostas relacionadas ao fornecimento de produtos;')}</li>
        <li>{t('Manter o relacionamento comercial solicitado pelo titular.')}</li>
      </ul>

      <h2>{t('Compartilhamento')}</h2>
      <p>
        {t('Os dados não são vendidos nem compartilhados com terceiros para fins de marketing. O compartilhamento ocorre apenas quando necessário à execução da relação comercial ou por obrigação legal.')}
      </p>

      <h2>{t('Direitos do titular')}</h2>
      <p>
        {t('Nos termos da LGPD, o titular pode solicitar a confirmação de tratamento, o acesso, a correção ou a exclusão de seus dados a qualquer momento, pelos canais de contato indicados neste website.')}
      </p>

      <h2>{t('Retenção e segurança')}</h2>
      <p>
        {t('Os dados são mantidos apenas pelo período necessário às finalidades descritas e protegidos por medidas técnicas e organizacionais adequadas.')}
      </p>
    </LegalPage>
  );
}
