import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { differentials } from '@/data/differentials';
import { images } from '@/data/images';
import { useI18n } from '@/i18n/I18nProvider';

export function Differentials() {
  const { t } = useI18n();

  return (
    <section id="diferenciais" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={t('Diferenciais')}
              title={t('O que sustenta a confiança dos nossos parceiros')}
              description={t('Não prometemos o que não podemos cumprir. Estes são os pontos em que nossa atuação se diferencia de fato.')}
            />
            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <picture>
                <source media="(min-width: 1024px)" srcSet={images.differentials.src} />
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  alt={t(images.differentials.alt)}
                  loading="lazy"
                  decoding="async"
                  width={2200}
                  height={1466}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              </picture>
            </Reveal>
          </div>

          <ul className="space-y-7">
            {differentials.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 0.07}>
                <li className="flex gap-5">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-ocean">
                    <Check size={15} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{t(item.title)}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{t(item.description)}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
