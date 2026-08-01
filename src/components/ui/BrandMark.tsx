import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

interface BrandMarkProps {
  inverse?: boolean;
  /** Esconde o descritor — usado onde o espaço é curto. */
  compact?: boolean;
}

/**
 * Assinatura tipográfica da empresa.
 *
 * Sem símbolo por decisão consciente: o nome fantasia ainda é provisório
 * (ver "Dados pendentes" no README) e o topo já carrega o logotipo da Norwell,
 * de modo que um segundo símbolo competiria com ele. Quando o nome for
 * definitivo, este componente é o único ponto a trocar.
 */
export function BrandMark({ inverse = false, compact = false }: BrandMarkProps) {
  const { t } = useI18n();

  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`font-serif text-[1.35rem] font-semibold tracking-[-0.015em] ${
          inverse ? 'text-white' : 'text-navy'
        }`}
      >
        {company.name}
      </span>
      {!compact && (
        <span className="mt-2 flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className={`h-px w-5 ${inverse ? 'bg-salmon-light' : 'bg-salmon'}`}
          />
          <span
            className={`text-[0.625rem] font-bold uppercase tracking-[0.26em] ${
              inverse ? 'text-white/60' : 'text-slate-blue'
            }`}
          >
            {t('Noruega · Brasil')}
          </span>
        </span>
      )}
    </span>
  );
}
