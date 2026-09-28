import { LegalPage } from './LegalPage';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

export default function TermsOfUse() {
  const { t } = useI18n();
  const owner = { company: company.legalName || company.name, cnpj: company.cnpj };

  return (
    <LegalPage title={t('Termos de Uso')} updatedAt="26 de setembro de 2026">
      <p>
        {t(
          'Estes Termos regulam o uso deste website, mantido pela {company}, inscrita no CNPJ {cnpj}, com sede no Rio de Janeiro/RJ ("Bridge Point"). Ao navegar pelo site, você concorda com as condições abaixo.',
          owner,
        )}
      </p>

      <h2>{t('1. Finalidade do site')}</h2>
      <p>
        {t(
          'O site apresenta a Bridge Point, a sua atuação como representante da Norwell AS no Brasil e os produtos disponíveis para empresas brasileiras, e permite solicitar cotações.',
        )}
      </p>

      <h2>{t('2. Informações sem caráter de oferta')}</h2>
      <p>
        {t(
          'As informações sobre produtos, formatos, especificações, certificações e logística são descritivas e não constituem oferta vinculante. Preços, volumes, disponibilidade, prazos e condições comerciais só valem quando confirmados por escrito em proposta enviada pela Bridge Point.',
        )}
      </p>

      <h2>{t('3. Uso adequado')}</h2>
      <p>
        {t(
          'Você se compromete a fornecer informações verdadeiras no formulário e a não usar o site para fins ilícitos, para enviar conteúdo ofensivo ou automatizado, nem para tentar comprometer a sua segurança ou disponibilidade.',
        )}
      </p>

      <h2>{t('4. Propriedade intelectual')}</h2>
      <ul>
        <li>
          {t(
            'A marca, o logotipo, os textos e a identidade visual da Bridge Point pertencem à {company}.',
            owner,
          )}
        </li>
        <li>
          {t(
            'A marca, o logotipo e as fotografias da Norwell AS pertencem à Norwell AS e são usados com a sua autorização.',
          )}
        </li>
        <li>
          {t('O selo "Seafood from Norway" pertence ao Conselho Norueguês de Pescados (Norwegian Seafood Council).')}
        </li>
      </ul>
      <p>
        {t('Nenhum desses elementos pode ser copiado, reproduzido ou usado sem autorização prévia do respectivo titular.')}
      </p>

      <h2>{t('5. Links externos')}</h2>
      <p>
        {t(
          'O site contém links para sites de terceiros, como o da Norwell AS, o LinkedIn e o WhatsApp. Esses sites têm termos e políticas próprios, pelos quais a Bridge Point não responde.',
        )}
      </p>

      <h2>{t('6. Comunicação por WhatsApp')}</h2>
      <p>
        {t(
          'Ao usar o formulário ou o botão de WhatsApp, você é direcionado ao aplicativo para enviar a mensagem. O envio é uma decisão sua, e o tratamento dos dados segue a nossa Política de Privacidade.',
        )}
      </p>

      <h2>{t('7. Responsabilidade')}</h2>
      <p>
        {t(
          'Empregamos esforços razoáveis para manter o site disponível e as informações corretas e atualizadas, mas não garantimos a ausência de interrupções ou imprecisões. A Bridge Point não responde por decisões tomadas apenas com base no conteúdo do site, sem confirmação em proposta escrita.',
        )}
      </p>

      <h2>{t('8. Alterações')}</h2>
      <p>
        {t(
          'Estes Termos podem ser atualizados a qualquer momento. A versão vigente é sempre a publicada nesta página, com a data indicada ao final.',
        )}
      </p>

      <h2>{t('9. Lei aplicável e foro')}</h2>
      <p>
        {t(
          'Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca da Capital do Estado do Rio de Janeiro para resolver eventuais controvérsias, salvo disposição legal em contrário.',
        )}
      </p>

      <h2>{t('10. Contato')}</h2>
      <p>
        {t('Dúvidas sobre estes Termos podem ser enviadas para {email}.', { email: company.email })}
      </p>
    </LegalPage>
  );
}
