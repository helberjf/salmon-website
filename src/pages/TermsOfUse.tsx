import { LegalPage } from './LegalPage';
import { company } from '@/data/company';

export default function TermsOfUse() {
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Ao acessar este website, o visitante concorda com os termos abaixo. Este site tem caráter
        institucional e informativo sobre as atividades da {company.name}.
      </p>

      <h2>Conteúdo informativo</h2>
      <p>
        As informações sobre produtos, formatos e condições apresentadas neste website não
        constituem oferta vinculante. A disponibilidade, os volumes, os preços e as condições
        comerciais devem ser confirmados diretamente com a empresa por meio dos canais oficiais.
      </p>

      <h2>Propriedade intelectual</h2>
      <p>
        Os textos, a identidade visual e os demais elementos deste website pertencem à{' '}
        {company.name} ou a seus licenciantes e não podem ser reproduzidos sem autorização.
      </p>

      <h2>Responsabilidade</h2>
      <p>
        A empresa emprega esforços razoáveis para manter as informações atualizadas, mas não
        garante a ausência de imprecisões. Links externos são fornecidos apenas por conveniência.
      </p>

      <h2>Contato</h2>
      <p>
        Dúvidas sobre estes termos podem ser encaminhadas pelos canais de contato indicados neste
        website.
      </p>
    </LegalPage>
  );
}
