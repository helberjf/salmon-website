import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { images } from '@/data/images';
import { useI18n } from '@/i18n/I18nProvider';

/**
 * Apresentação curta da home com um atalho para cada página interna. Cada
 * cartão leva a um conteúdo que não se repete na home.
 */
const pathways = [
  {
    href: '/a-norwell',
    image: images.about,
    eyebrow: 'A origem',
    title: 'Norwell',
    description: 'A exportadora norueguesa fundada em 1996: história, valores e certificações.',
    cta: 'Conhecer a Norwell',
  },
  {
    href: '/produtos',
    image: images.fjordFillet,
    eyebrow: 'O portfólio',
    title: 'Produtos e processo',
    description: 'Cortes, formatos e conservação — e o caminho do salmão da origem até a sua operação.',
    cta: 'Ver produtos',
  },
  {
    href: '/sobre',
    image: images.bridge,
    eyebrow: 'Quem faz a ponte',
    title: 'Bridge Point e Mai',
    description: 'Quem representa a Norwell no Brasil e a trajetória da fundadora.',
    cta: 'Sobre nós',
  },
];

export function Pathways() {
  const { href: localizedHref, t } = useI18n();

  return (
    <section id="empresa" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow={t('Bridge Point + Norwell')}
            title={t('Uma ponte comercial com os dois pés na origem')}
          />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">
              {t(
                'Representamos no Brasil a Norwell, exportadora norueguesa especializada em salmão e sediada em Florø. A empresa construiu sua atuação em parceria com produtores da costa da Noruega, combinando escala internacional e proximidade na cadeia.',
              )}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {pathways.map((item, index) => (
            <li key={item.href}>
              <Reveal delay={index * 0.08} className="h-full">
                <Link
                  href={localizedHref(item.href)}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-ice transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ocean/25 hover:shadow-xl"
                >
                  <div className="overflow-hidden bg-mist">
                    <ResponsiveImage
                      src={item.image.src}
                      alt=""
                      sizes="(min-width: 1280px) 395px, (min-width: 768px) calc((100vw - 112px) / 3), calc(100vw - 40px)"
                      maxWidth={800}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ocean-light">
                      {t(item.eyebrow)}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold text-navy">{t(item.title)}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t(item.description)}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ocean transition-colors group-hover:text-navy">
                      {t(item.cta)}
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
