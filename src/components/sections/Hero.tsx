import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { images } from '@/data/images';
import { quoteCtaLabel } from '@/data/navigation';
import { BridgePointLogo } from '@/components/ui/BridgePointLogo';
import { ShoreLine } from '@/components/ui/ShoreLine';
import { useI18n } from '@/i18n/I18nProvider';
import { getResponsiveImageSources } from '@/components/ui/ResponsiveImage';

/**
 * Topo da home: a Norwell no Brasil. O logotipo da Norwell fica no cabeçalho,
 * sobre sjøgrønn sólido; a Bridge Point, sua representante no país, assina a
 * faixa do pé e é apresentada mais abaixo, em #representante.
 */
export function Hero() {
  const { href: localizedHref, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const backgroundSources = getResponsiveImageSources(images.heroBackground.src, 1600);
  const reveal = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  });

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex flex-col overflow-hidden bg-navy text-white lg:min-h-svh"
    >
      {/* Hamnøy, nas Lofoten, no inverno: a costa norueguesa de onde o salmão vem. */}
      <picture>
        <source
          media="(max-width: 639px)"
          type="image/avif"
          srcSet={images.heroBackground.mobileAvifSrcSet}
          sizes="100vw"
        />
        <source
          media="(max-width: 639px)"
          type="image/webp"
          srcSet={images.heroBackground.mobileWebpSrcSet}
          sizes="100vw"
        />
        <source
          type="image/avif"
          srcSet={backgroundSources.avifSrcSet}
          sizes="(min-width: 1600px) 1600px, 100vw"
        />
        <source
          type="image/webp"
          srcSet={backgroundSources.webpSrcSet}
          sizes="(min-width: 1600px) 1600px, 100vw"
        />
        <m.img
          aria-hidden="true"
          src={images.heroBackground.src}
          srcSet={backgroundSources.webpSrcSet}
          sizes="100vw"
          width={backgroundSources.width}
          height={backgroundSources.height}
          alt=""
          style={{ y: shouldReduceMotion ? 0 : backdropY }}
          className="absolute inset-0 h-[112%] w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      {/* Véus em sjøgrønn: escuros atrás do título e do cabeçalho, abertos no centro da foto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy/90 lg:bg-[linear-gradient(to_right,var(--color-navy)_0%,rgb(20_83_83/0.78)_40%,rgb(20_83_83/0.2)_75%,rgb(20_83_83/0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/60 lg:from-navy/60 lg:via-transparent lg:to-navy/55"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-10 pt-24 lg:px-8 lg:pb-16 lg:pt-32 xl:pt-40">
        <div className="grid w-full gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <m.div {...reveal(0.05)}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-shore-light">
              {t('Norwell no Brasil')}
            </p>
            <h1 className="mt-4 text-[2.1rem] font-normal leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
              {t('Salmão norueguês da Norwell,')}{' '}
              <span className="text-shore">{t('com atendimento no Brasil.')}</span>
            </h1>
          </m.div>

          {/**
           * No desktop o texto fica num cartão claro sobre a foto, como os
           * cartões do exemplo de site do manual da Norwell (p. 18).
           */}
          <m.div
            {...reveal(0.2)}
            className="lg:overflow-hidden lg:rounded-2xl lg:bg-ice/95 lg:text-navy lg:shadow-2xl lg:shadow-navy-dark/30 lg:backdrop-blur"
          >
            <ShoreLine className="hidden lg:block" />
            <div className="lg:p-9">
              <p className="text-lg font-medium leading-relaxed text-white sm:text-xl lg:font-normal lg:text-navy">
                {t(
                  'Salmão de uma exportadora norueguesa fundada em 1996, para importadores, atacadistas e distribuidores de todo o Brasil.',
                )}
              </p>
              {/* No celular fica só na faixa do pé, que diz o mesmo — assim ela cabe na primeira tela. */}
              <p className="mt-3 hidden leading-relaxed text-frost sm:block lg:mt-4 lg:text-muted">
                {t(
                  'O atendimento é local e em português, pela Bridge Point, representante oficial da Norwell no país.',
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-7">
                <a
                  href={localizedHref('/#contato')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost sm:px-6 sm:py-3.5 lg:bg-navy lg:text-white lg:hover:bg-ocean"
                >
                  {t(quoteCtaLabel)}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href={localizedHref('/sobre')}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-navy/40 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 sm:px-6 sm:py-3.5 lg:border-navy/25 lg:bg-transparent lg:text-navy lg:hover:border-navy/50"
                >
                  {t('Conhecer a Norwell')}
                </a>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      {/**
       * Faixa da representante, ligada à foto pela fjærestreken. Aparece já na
       * primeira tela do celular e leva à apresentação da Bridge Point.
       */}
      <m.div {...reveal(0.35)} className="relative z-10 bg-navy">
        <ShoreLine />
        <a
          href={localizedHref('/#representante')}
          className="group mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 sm:gap-6 lg:px-8"
        >
          <BridgePointLogo variant="white" eager height={26} className="shrink-0" />
          <span aria-hidden="true" className="h-9 w-px shrink-0 bg-white/20" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold uppercase tracking-[0.14em] text-shore-light">
              {t('Representante oficial da Norwell no Brasil')}
            </span>
            <span className="mt-0.5 block text-sm font-medium text-white/85">
              {t('Atendimento local, em português, a partir do Rio de Janeiro.')}
            </span>
          </span>
          <ArrowDown
            size={18}
            aria-hidden="true"
            className="hidden shrink-0 text-shore transition-transform duration-300 group-hover:translate-y-0.5 sm:block"
          />
        </a>
      </m.div>
    </section>
  );
}
