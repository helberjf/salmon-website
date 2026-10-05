import { ArrowRight, ArrowUpRight, Globe2, ShieldCheck, Ship, Snowflake } from 'lucide-react';
import { Link } from 'wouter';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { Reveal } from '@/components/ui/Reveal';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { ShoreLine } from '@/components/ui/ShoreLine';
import { images } from '@/data/images';
import { quoteCtaLabel } from '@/data/navigation';
import { norwell } from '@/data/norwell';
import { useI18n } from '@/i18n/I18nProvider';

const trustItems = [
  { icon: ShieldCheck, label: 'Origem norueguesa' },
  { icon: Snowflake, label: 'Fresco ou congelado' },
  { icon: Ship, label: 'Via aérea ou marítima' },
  { icon: Globe2, label: 'Atendimento em todo o Brasil' },
];

/**
 * A oferta da Norwell para o Brasil: o salmão, o público (importadores,
 * atacadistas e distribuidores) e o caminho para a cotação.
 */
export function NorwellPartnership() {
  const { href: localizedHref, t } = useI18n();

  return (
    <section id="parceria-norwell" className="bg-navy text-white">
      <ShoreLine />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-shore-light">
              {t('Para o mercado brasileiro')}
            </p>
            <h2 className="mt-5 text-4xl font-normal leading-[1.05] tracking-[-0.03em] md:text-6xl">
              {t('Salmão norueguês,')}{' '}
              <span className="text-shore">{t('direto dos fiordes.')}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-frost">
              {t(
                'Salmão da Norwell para importadores, atacadistas e distribuidores de todo o Brasil, com especificação sob medida e logística de ponta a ponta.',
              )}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold text-white/85">
              {trustItems.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon size={17} aria-hidden="true" className="shrink-0 text-shore" />
                  {t(label)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={localizedHref('/#contato')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
              >
                {t(quoteCtaLabel)}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <Link
                href={localizedHref('/produtos')}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
              >
                {t('Ver produtos')}
              </Link>
              <Link
                href={localizedHref('/sobre')}
                className="group inline-flex min-h-11 items-center justify-center gap-2 px-3 font-bold text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline sm:justify-start"
              >
                {t('Conhecer a Norwell')}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left">
          <figure className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-ocean shadow-2xl shadow-black/25 lg:mr-0">
            <ResponsiveImage
              src={images.fjordFillet.src}
              alt={t(images.fjordFillet.alt)}
              sizes="(min-width: 1280px) 540px, (min-width: 1024px) 42vw, calc(100vw - 40px)"
              maxWidth={1200}
              className="aspect-[4/3] w-full object-cover"
            />
            {/* Logotipo da Norwell sobre sjøgrønn sólido, como o manual pede. */}
            <figcaption className="bg-navy">
              <ShoreLine />
              <a
                href={norwell.site}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-5 px-6 py-5 transition-colors hover:bg-navy-dark"
              >
                <NorwellLogo variant="negative" height={30} className="shrink-0" />
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  norwell.no
                  <span className="sr-only">{t('(abre em nova aba)')}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
