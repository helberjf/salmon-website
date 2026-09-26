import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/ui/PageHero';
import { About } from '@/components/sections/About';
import { NorwellStory } from '@/components/sections/NorwellStory';
import { NorwegianSalmon } from '@/components/sections/NorwegianSalmon';
import { Gallery } from '@/components/sections/Gallery';
import { CallToAction } from '@/components/sections/CallToAction';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { SeafoodFromNorway } from '@/components/ui/SeafoodFromNorway';
import { norwell } from '@/data/norwell';
import { quoteCtaLabel } from '@/data/navigation';
import { useI18n } from '@/i18n/I18nProvider';

export default function NorwellPage() {
  const { href: localizedHref, t } = useI18n();

  return (
    <PageShell titleSource="A Norwell | Bridge Point" resetScroll>
      <PageHero
        eyebrow={t('A origem do produto')}
        title={t('Norwell AS, a exportadora norueguesa que representamos')}
        description={t(
          'Fundada em 1996 em Florø, exporta salmão e truta do fiorde para mais de uma centena de mercados. Conheça a história, os valores e as certificações que sustentam cada embarque para o Brasil.',
        )}
        waveClassName="text-ice"
        actions={
          <>
            <a
              href={norwell.site}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Visitar o site oficial da Norwell (abre em nova aba)')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
            >
              {t('Visitar o site oficial da Norwell')}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={localizedHref('/#contato')}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              {t(quoteCtaLabel)}
            </a>
          </>
        }
        aside={
          <a
            href={norwell.site}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('norwell.no — site oficial da Norwell AS (abre em nova aba)')}
            className="group flex flex-col items-start gap-7 rounded-[2rem] border border-white/12 bg-white/5 p-8 backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <NorwellLogo variant="white" height={38} />
            <p className="text-sm leading-relaxed text-frost">{t(norwell.tagline)}</p>
            <SeafoodFromNorway size={80} className="rounded-xl" />
            <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
              norwell.no
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        }
      />
      <About />
      <NorwellStory />
      <NorwegianSalmon />
      <Gallery />
      <CallToAction />
    </PageShell>
  );
}
