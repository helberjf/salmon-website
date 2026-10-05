import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { Reveal } from '@/components/ui/Reveal';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShoreLine } from '@/components/ui/ShoreLine';
import { images } from '@/data/images';
import { norwell } from '@/data/norwell';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * Quem é a Norwell, logo depois do topo da home: a exportadora, em poucos
 * números. A história completa, os valores e as certificações ficam em /sobre.
 */
export function NorwellIntro() {
  const { href: localizedHref, t } = useI18n();

  return (
    <section id="norwell" className="bg-ice py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal direction="right" className="order-2 lg:order-1">
          <figure className="mx-auto max-w-md overflow-hidden rounded-[2rem] bg-mist shadow-xl shadow-navy/10 lg:ml-0">
            <ResponsiveImage
              src={images.about.src}
              alt={t(images.about.alt)}
              sizes="(min-width: 1024px) 448px, calc(100vw - 40px)"
              maxWidth={800}
              className="aspect-[4/3] w-full object-cover"
            />
            {/* Logotipo sobre sjøgrønn sólido; o slogan segue a regra do "payoff" do manual (p. 15). */}
            <figcaption className="bg-navy">
              <ShoreLine />
              <div className="flex items-end justify-between gap-6 px-6 py-6">
                <NorwellLogo variant="negative" height={34} className="shrink-0" />
                <p lang="en" className="max-w-[11rem] text-right text-xl font-bold leading-snug text-shore">
                  {norwell.tagline}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={t('A exportadora')}
            title={t('Uma casa de exportação com os produtores no controle')}
          />
          <Reveal delay={0.1} className="mt-7 text-lg leading-relaxed text-muted">
            <p>{t(norwell.intro)}</p>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {norwell.facts.map((fact, index) => (
              <li key={fact.value}>
                <Reveal delay={0.12 + index * 0.06} className="h-full rounded-2xl border border-border bg-white p-5">
                  <p className="text-3xl font-light text-navy">{t(fact.value)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t(fact.label)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <Link
              href={localizedHref('/sobre')}
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-7 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:border-ocean/40"
            >
              {t('Conhecer a Norwell')}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
