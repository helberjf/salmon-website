import { ArrowUpRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/ui/PageHero';
import { About } from '@/components/sections/About';
import { NorwellStory } from '@/components/sections/NorwellStory';
import { NorwegianSalmon } from '@/components/sections/NorwegianSalmon';
import { Representative } from '@/components/sections/Representative';
import { Gallery } from '@/components/sections/Gallery';
import { CallToAction } from '@/components/sections/CallToAction';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { SeafoodFromNorway } from '@/components/ui/SeafoodFromNorway';
import { norwell } from '@/data/norwell';
import { quoteCtaLabel } from '@/data/navigation';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * Sobre: a Norwell — a atuação no Brasil, a história, a missão, os valores e as
 * certificações. A BridgePoint, sua representante no país, entra só em um bloco
 * curto (Representative). /a-norwell e /norwell são endereços antigos desta
 * mesma página.
 */
export default function AboutPage() {
  const { href: localizedHref, t } = useI18n();

  return (
    <PageShell titleSource="Sobre a Norwell | Norwell Brasil" resetScroll>
      <PageHero
        eyebrow={t('Sobre a Norwell')}
        title={t('Exportadora norueguesa de salmão, com representação no Brasil')}
        description={t(
          'A Norwell AS, fundada em 1996 em Florø, exporta salmão e truta do fiorde para mais de uma centena de mercados. No Brasil, atende importadores, atacadistas e distribuidores por meio da BridgePoint, sua representante oficial.',
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
          /**
           * Cartão sjøgrønn sólido: o manual da Norwell só admite o logotipo em
           * negativo sobre essa cor. O slogan segue a regra do "payoff" (p. 15):
           * fjæregrønn, em inglês original e alinhado à base do logotipo. Os
           * espaçamentos respeitam a área de proteção de meio símbolo.
           */
          <a
            href={norwell.site}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-9 rounded-[2rem] border border-white/15 bg-navy p-9 transition-colors hover:border-shore/60"
          >
            <div className="flex items-end justify-between gap-9">
              <p lang="en" className="text-xl font-bold leading-snug text-shore">
                {norwell.tagline}
              </p>
              <NorwellLogo layout="main" variant="negative" eager height={96} className="shrink-0" />
            </div>
            <div className="flex items-center justify-between gap-6">
              <SeafoodFromNorway size={72} className="rounded-xl" />
              <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                norwell.no
                <span className="sr-only">{t('(abre em nova aba)')}</span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </a>
        }
      />
      <About />
      <NorwellStory />
      <NorwegianSalmon />
      <Representative />
      <Gallery />
      <CallToAction />
    </PageShell>
  );
}
