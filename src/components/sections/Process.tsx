import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';
import { processImages } from '@/data/images';
import { useI18n } from '@/i18n/I18nProvider';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

const stages = [
  { label: 'Ova', image: processImages.eggs },
  { label: 'Smolt', image: processImages.smolt },
  { label: 'Mar', image: processImages.farm },
  { label: 'Processamento', image: processImages.processing },
];

export function Process() {
  const { t } = useI18n();

  return (
    <section id="como-trabalhamos" className="bg-ice py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={t('Da necessidade à entrega')}
              title={t('Comercial simples. Operação rigorosa.')}
              description={t('Uma interlocução única no Brasil, conectada diretamente à equipe exportadora e à cadeia de produção norueguesa.')}
            />
            <div className="mt-10 grid grid-cols-2 gap-3">
              {stages.map((stage) => (
                <figure
                  key={stage.label}
                  data-gsap-drift
                  className="group relative overflow-hidden rounded-2xl bg-mist will-change-transform"
                >
                  <ResponsiveImage
                    src={stage.image}
                    alt=""
                    sizes="(min-width: 1280px) 250px, (min-width: 1024px) 20vw, calc((100vw - 52px) / 2)"
                    maxWidth={800}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-navy/85 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur">
                    {t(stage.label)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="relative">
            <div aria-hidden="true" className="mb-7 hidden h-px overflow-hidden bg-ocean/15 sm:block">
              <span
                data-gsap-progress
                className="block h-full origin-left bg-gradient-to-r from-ocean via-seagrass to-salmon will-change-transform"
              />
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <li key={step.title} className="h-full">
                  <Reveal
                    delay={(index % 2) * 0.08}
                    direction={index % 2 ? 'left' : 'right'}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ocean/25 hover:shadow-lg"
                  >
                    <span aria-hidden="true" className="font-serif text-3xl font-semibold text-ocean/70 transition-colors duration-300 group-hover:text-ocean">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-6 text-lg font-semibold text-navy">{t(step.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{t(step.description)}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
