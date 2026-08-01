import { galleryImages } from '@/data/images';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useI18n } from '@/i18n/I18nProvider';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

export function Gallery() {
  const { t } = useI18n();

  return (
    <section id="galeria" className="bg-navy py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            dark
            eyebrow={t('Da origem à mesa')}
            title={t('Um produto, muitas possibilidades')}
            description={t('Cor vibrante, textura delicada e versatilidade para cardápios, varejo e experiências gastronômicas de alto padrão.')}
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/55">
            {t('Fotografias do catálogo oficial da empresa e do acervo da Norwell AS.')}
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((item, index) => (
            <Reveal
              key={item.src}
              delay={(index % 4) * 0.06}
              /* Além da quarta foto vira rolagem decorativa no celular. */
              className={`${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''} ${
                index === 3 ? 'lg:col-span-2' : ''
              } ${index >= 4 ? 'hidden sm:block' : ''} h-full`}
            >
              <figure className="group relative h-full overflow-hidden rounded-2xl bg-navy-dark">
                <ResponsiveImage
                  src={item.src}
                  alt={t(item.alt)}
                  sizes={
                    index === 0 || index === 3
                      ? '(min-width: 1280px) 604px, (min-width: 1024px) calc((100vw - 80px) / 2), (min-width: 640px) calc((100vw - 56px) / 2), calc(100vw - 40px)'
                      : '(min-width: 1280px) 294px, (min-width: 1024px) calc((100vw - 96px) / 4), (min-width: 640px) calc((100vw - 56px) / 2), calc(100vw - 40px)'
                  }
                  maxWidth={index === 0 || index === 3 ? 1200 : 800}
                  media={index >= 4 ? '(min-width: 640px)' : undefined}
                  preventFallbackDownload={index >= 4}
                  pictureClassName="block h-full w-full"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-bold text-white">
                  {t(item.label)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
