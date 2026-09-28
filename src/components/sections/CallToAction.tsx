import { Reveal } from '@/components/ui/Reveal';
import { images } from '@/data/images';
import { quoteCtaLabel } from '@/data/navigation';
import { useI18n } from '@/i18n/I18nProvider';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

export function CallToAction() {
  const { href: localizedHref, t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-ocean py-24 md:py-32">
      {images.callToAction.src && (
        <div data-gsap-parallax className="absolute -inset-[4%] will-change-transform">
          <ResponsiveImage
            src={images.callToAction.src}
            alt=""
            aria-hidden="true"
            sizes="100vw"
            maxWidth={1600}
            pictureClassName="block h-full w-full"
            className="h-full w-full object-cover opacity-30"
          />
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-ocean/60" />
      <div aria-hidden="true" className="ocean-glint absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-shore-light">{t('Próximo embarque')}</p>
          <h2 className="mt-4 text-4xl font-normal leading-tight text-white md:text-5xl">
            {t('O salmão certo para a sua operação começa com uma boa conversa.')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-white/85">
            {t(
              'Conte o produto, o volume e a frequência que procura. Estruturamos a especificação e a rota de fornecimento mais adequadas ao seu negócio.',
            )}
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href={localizedHref('/#contato')}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost sm:w-auto"
            >
              {t(quoteCtaLabel)}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
