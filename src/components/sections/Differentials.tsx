import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { differentials } from '@/data/differentials';
import { images } from '@/data/images';
import { useI18n } from '@/i18n/I18nProvider';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

export function Differentials() {
  const { t } = useI18n();

  return (
    <section id="diferenciais" className="bg-ice py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={t('Diferenciais')}
              title={t('O que sustenta a confiança dos nossos parceiros')}
              description={t('Não prometemos o que não podemos cumprir. Estes são os pontos em que nossa atuação se diferencia de fato.')}
            />
            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <ResponsiveImage
                src={images.differentials.src}
                alt={t(images.differentials.alt)}
                sizes="(min-width: 1280px) 520px, 46vw"
                maxWidth={1200}
                media="(min-width: 1024px)"
                preventFallbackDownload
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
            </Reveal>
          </div>

          <ul className="space-y-4">
            {differentials.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={(index % 3) * 0.07}
                  className="group flex gap-5 rounded-2xl border border-transparent bg-white/70 p-5 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-white"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-ocean transition-colors duration-300 group-hover:bg-ocean group-hover:text-white">
                    <Check size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{t(item.title)}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{t(item.description)}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
