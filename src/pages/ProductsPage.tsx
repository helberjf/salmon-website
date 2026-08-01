import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/ui/PageHero';
import { Products } from '@/components/sections/Products';
import { Differentials } from '@/components/sections/Differentials';
import { Trust } from '@/components/sections/Trust';
import { CallToAction } from '@/components/sections/CallToAction';
import { norwell } from '@/data/norwell';
import { useI18n } from '@/i18n/I18nProvider';

export default function ProductsPage() {
  const { t } = useI18n();

  return (
    <PageShell titleSource="Produtos | Bridge Point" resetScroll>
      <PageHero
        eyebrow={t('Portfólio')}
        title={t('Formatos, cortes e conservação para cada operação')}
        description={t(
          'Todo o portfólio disponível para o mercado brasileiro, com a apresentação e o público indicado de cada item. Especificações e volumes são fechados na cotação.',
        )}
        aside={
          <div className="rounded-[2rem] border border-white/12 bg-white/5 p-8 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-salmon-light">
              {t('Linhas da exportadora')}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-frost">
              {norwell.portfolio.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-salmon-light"
                  />
                  {t(line)}
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <Products />
      <Differentials />
      <Trust />
      <CallToAction />
    </PageShell>
  );
}
