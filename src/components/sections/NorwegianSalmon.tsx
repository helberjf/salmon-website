import { ChefHat, MapPin, Search, Snowflake } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { images } from '@/data/images';

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

export function NorwegianSalmon() {
  return (
    <section id="salmao" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <figure className="overflow-hidden rounded-lg">
              <img
                src={images.salmon.src}
                alt={images.salmon.alt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="O produto"
              title="Por que o salmão norueguês"
              description="Reconhecido pelos mercados mais exigentes do mundo, o salmão da Noruega combina origem controlada, qualidade constante e uma cadeia de fornecimento madura."
            />
            <div className="mt-10 space-y-8">
              {attributes.map(({ icon: Icon, title, description }, index) => (
                <Reveal key={title} delay={index * 0.08}>
                  <div className="flex gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-mist text-ocean">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{description}</p>
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
