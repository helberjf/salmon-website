import { ChefHat, Dna, MapPin, Search, Snowflake } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { images } from '@/data/images';
import { useI18n } from '@/i18n/I18nProvider';

const attributes = [
  {
    icon: MapPin,
    title: 'Origem e habitat',
    description:
      'Criado nas águas frias e limpas da costa norueguesa, condição natural para textura firme e sabor equilibrado.',
  },
  {
    icon: Search,
    title: 'Procedência e rastreabilidade',
    description:
      'A cadeia produtiva norueguesa opera com identificação de origem e controles reconhecidos internacionalmente.',
  },
  {
    icon: Snowflake,
    title: 'Conservação e cadeia do frio',
    description:
      'Temperatura controlada da origem ao destino, preservando frescor, cor e características do produto.',
  },
  {
    icon: ChefHat,
    title: 'Versatilidade profissional',
    description:
      'Do sushi ao forno: cortes e formatos que atendem cozinhas profissionais e o varejo com constância.',
  },
];

const qualityMarks = [
  { icon: Snowflake, label: 'Águas frias' },
  { icon: Search, label: 'Rastreabilidade' },
  { icon: Dna, label: 'Non-GMO' },
];

export function NorwegianSalmon() {
  const { t } = useI18n();

  return (
    <section id="salmao" className="overflow-hidden bg-ice py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-20">
          <Reveal direction="right" className="order-2 lg:order-1">
            <figure className="relative overflow-hidden rounded-[2rem] bg-mist">
              <img
                src={images.salmon.src}
                alt={t(images.salmon.alt)}
                loading="lazy"
                decoding="async"
                className="aspect-[5/4] w-full object-cover"
              />
              <figcaption className="absolute inset-x-5 bottom-5 rounded-2xl bg-navy/90 p-5 text-white backdrop-blur sm:inset-x-auto sm:right-6 sm:max-w-xs">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-salmon">Salmo salar</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {t('Textura firme, sabor delicado e qualidade consistente ao longo das estações.')}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={t('Origem norueguesa')}
              title={t('Qualidade que começa muito antes do embarque')}
              description={t('Criado nas águas frias e cristalinas da costa norueguesa, o salmão se desenvolve em uma cadeia monitorada — da ova ao produto final.')}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {qualityMarks.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-bold text-navy">
                  <Icon size={15} aria-hidden="true" className="text-ocean" />
                  {t(label)}
                </span>
              ))}
            </div>
            <div className="mt-10 space-y-8">
              {attributes.map(({ icon: Icon, title, description }, index) => (
                <Reveal key={title} delay={index * 0.08}>
                  <div className="flex gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ocean shadow-sm">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{t(title)}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{t(description)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
