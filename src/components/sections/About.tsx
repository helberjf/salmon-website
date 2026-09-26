import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SeafoodFromNorway } from '@/components/ui/SeafoodFromNorway';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { images } from '@/data/images';
import { useI18n } from '@/i18n/I18nProvider';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

const partnership = [
  'Produtores familiares cuidadosamente selecionados',
  'Especificações padrão ou desenvolvidas sob medida',
  'Produtos frescos, congelados e de alto valor agregado',
];

/**
 * O que a representação da Norwell significa para o cliente brasileiro.
 * Abre a página /a-norwell; os números da exportadora ficam em NorwellStory.
 */
export function About() {
  const { t } = useI18n();

  return (
    <section id="parceria" className="bg-ice py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <Reveal direction="right">
            <div className="relative">
              <figure className="overflow-hidden rounded-[2rem] bg-mist">
                <ResponsiveImage
                  src={images.about.src}
                  alt={t(images.about.alt)}
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 43vw, calc(100vw - 40px)"
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
              <SeafoodFromNorway
                size={76}
                className="absolute -right-3 -top-6 rounded-xl shadow-xl shadow-navy/20 sm:-right-6"
              />
              <div className="relative mx-4 -mt-8 max-w-sm rounded-2xl bg-navy p-6 text-white shadow-2xl sm:absolute sm:-bottom-8 sm:right-8 sm:mx-0 sm:mt-0 sm:max-w-xs">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
                  {t('Parceiro na origem')}
                </p>
                <NorwellLogo variant="white" height={30} className="mt-3.5" />
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {t('Exportadora norueguesa com presença global e relações de longo prazo com produtores.')}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="pt-8 lg:pt-0">
            <SectionHeading
              eyebrow={t('Bridge Point + Norwell')}
              title={t('Uma ponte comercial com os dois pés na origem')}
            />
            <Reveal delay={0.1} className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                {t(
                  'Representamos no Brasil a Norwell, exportadora norueguesa especializada em salmão e sediada em Florø. A empresa construiu sua atuação em parceria com produtores da costa da Noruega, combinando escala internacional e proximidade na cadeia.',
                )}
              </p>
              <p>
                {t(
                  'Para o cliente brasileiro, isso significa acesso qualificado à origem, comunicação direta e uma solução desenhada a partir do produto, volume e ritmo de cada operação.',
                )}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {partnership.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-navy">
                    <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
