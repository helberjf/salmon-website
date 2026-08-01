import { LegalPage } from './LegalPage';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

export default function TermsOfUse() {
  const { t } = useI18n();

  return (
    <LegalPage title={t('Termos de Uso')}>
      <p>
        {t(
          'Ao acessar este website, o visitante concorda com os termos abaixo. Este site tem caráter institucional e informativo sobre as atividades da {company}.',
          { company: company.name },
        )}
      </p>

      <h2>{t('Conteúdo informativo')}</h2>
      <p>
        {t('As informações sobre produtos, formatos e condições apresentadas neste website não constituem oferta vinculante. A disponibilidade, os volumes, os preços e as condições comerciais devem ser confirmados diretamente com a empresa por meio dos canais oficiais.')}
      </p>

      <h2>{t('Propriedade intelectual')}</h2>
      <p>
        {t(
          'Os textos, a identidade visual e os demais elementos deste website pertencem à {company} ou a seus licenciantes e não podem ser reproduzidos sem autorização.',
          { company: company.name },
        )}
      </p>

      <h2>{t('Responsabilidade')}</h2>
      <p>
        {t('A empresa emprega esforços razoáveis para manter as informações atualizadas, mas não garante a ausência de imprecisões. Links externos são fornecidos apenas por conveniência.')}
      </p>

      <h2>{t('Contato')}</h2>
      <p>
        {t('Dúvidas sobre estes termos podem ser encaminhadas pelos canais de contato indicados neste website.')}
      </p>
    </LegalPage>
  );
}
