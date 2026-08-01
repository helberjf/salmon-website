import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/ui/PageHero';
import { NorwellStory } from '@/components/sections/NorwellStory';
import { NorwegianSalmon } from '@/components/sections/NorwegianSalmon';
import { Gallery } from '@/components/sections/Gallery';
import { CallToAction } from '@/components/sections/CallToAction';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { SeafoodFromNorway } from '@/components/ui/SeafoodFromNorway';
import { norwell } from '@/data/norwell';
import { useI18n } from '@/i18n/I18nProvider';

export default function NorwellPage() {
  const { t } = useI18n();

  return (
    <PageShell titleSource="A Norwell | Nordic Salmon" resetScroll>
      <PageHero
        eyebrow={t('A origem do produto')}
        title={t('Norwell AS, a exportadora norueguesa que representamos')}
        description={t(
          'Fundada em 1996 em Florø, exporta salmão e truta do fiorde para mais de uma centena de mercados. Conheça a história, os valores e as certificações que sustentam cada embarque para o Brasil.',
        )}
        aside={
          <div className="flex flex-col items-start gap-7 rounded-[2rem] border border-white/12 bg-white/5 p-8 backdrop-blur">
            <NorwellLogo variant="white" height={38} />
            <p className="text-sm leading-relaxed text-frost">{t(norwell.tagline)}</p>
            <SeafoodFromNorway size={80} className="rounded-xl" />
          </div>
        }
      />
      <NorwellStory />
      <NorwegianSalmon />
      <Gallery />
      <CallToAction />
    </PageShell>
  );
}
