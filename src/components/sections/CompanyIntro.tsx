import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Reveal } from '@/components/ui/Reveal';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShoreLine } from '@/components/ui/ShoreLine';
import { bridgePoint } from '@/data/bridgepoint';
import { founder } from '@/data/founder';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * Quem é a Bridge Point, logo depois do topo da home, na linha do site-base:
 * a experiência internacional da fundadora a serviço de empresas norueguesas
 * que querem atuar no Brasil. A parceria com a Norwell vem na seção seguinte.
 */
export function CompanyIntro() {
  const { href: localizedHref, t } = useI18n();

  return (
    <section id="bridge-point" className="bg-ice py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal direction="right" className="order-2 lg:order-1">
          <figure className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] bg-mist shadow-xl shadow-navy/10 lg:ml-0">
            <ResponsiveImage
              src={founder.introPhoto.src}
              alt={t(founder.introPhoto.alt)}
              sizes="(min-width: 1024px) 448px, calc(100vw - 40px)"
              maxWidth={800}
              className="aspect-[4/5] w-full object-cover object-[35%_50%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-navy text-white">
              <ShoreLine />
              <div className="px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-shore-light">
                  {t('Fundadora da Bridge Point')}
                </p>
                <p className="mt-1.5 text-xl font-normal">{founder.name}</p>
                <p className="mt-1 text-sm font-medium text-frost">
                  {t('Da diplomacia norueguesa aos negócios no Brasil.')}
                </p>
              </div>
            </figcaption>
          </figure>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow={t('Quem somos')} title={t('Visão internacional, com os pés no Brasil.')} />
          <Reveal delay={0.1} className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
            {bridgePoint.homeIntro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{t(paragraph)}</p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href={localizedHref('/sobre')}
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-7 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:border-ocean/40"
            >
              {t('Conheça a Bridge Point e a Mai')}
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
