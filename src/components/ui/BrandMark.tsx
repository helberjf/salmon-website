import { useI18n } from '@/i18n/I18nProvider';

interface BrandMarkProps {
  inverse?: boolean;
  compact?: boolean;
}

export function BrandMark({ inverse = false, compact = false }: BrandMarkProps) {
  const { t } = useI18n();
  const primary = inverse ? 'text-white' : 'text-navy';
  const secondary = inverse ? 'text-white/55' : 'text-slate-blue';

  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${
          inverse ? 'border-white/30' : 'border-navy/20'
        }`}
      >
        <span className="absolute h-6 w-6 rounded-full border-2 border-salmon border-l-transparent" />
        <span className={`h-1.5 w-1.5 rounded-full ${inverse ? 'bg-white' : 'bg-navy'}`} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className={`block text-[0.82rem] font-bold uppercase tracking-[0.18em] ${primary}`}>
            Nordic Salmon
          </span>
          <span className={`mt-1.5 block text-[0.58rem] font-semibold uppercase tracking-[0.2em] ${secondary}`}>
            {t('Norway · Brazil')}
          </span>
        </span>
      )}
    </span>
  );
}
