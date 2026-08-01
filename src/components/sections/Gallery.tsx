import { galleryImages } from '@/data/images';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useI18n } from '@/i18n/I18nProvider';

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
              className={`${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''} ${
                index === 3 ? 'lg:col-span-2' : ''
              } h-full`}
            >
              <figure className="group relative h-full overflow-hidden rounded-2xl bg-navy-dark">
                <img
                  src={item.src}
                  alt={t(item.alt)}
                  loading="lazy"
                  decoding="async"
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
