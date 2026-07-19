import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { differentials } from '@/data/differentials';
import { images } from '@/data/images';

export function Differentials() {
  return (
    <section id="diferenciais" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Diferenciais"
              title="O que sustenta a confiança dos nossos parceiros"
              description="Não prometemos o que não podemos cumprir. Estes são os pontos em que nossa atuação se diferencia de fato."
            />
            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <img
                src={images.differentials.src}
                alt={images.differentials.alt}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
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
                    <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{item.description}</p>
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
