import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';
import { processImages } from '@/data/images';

const stages = [
  { label: 'Ova', image: processImages.eggs },
  { label: 'Smolt', image: processImages.smolt },
  { label: 'Mar', image: processImages.farm },
  { label: 'Processamento', image: processImages.processing },
];

export function Process() {
  return (
    <section id="como-trabalhamos" className="bg-ice py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Da necessidade à entrega"
              title="Comercial simples. Operação rigorosa."
              description="Uma interlocução única no Brasil, conectada diretamente à equipe exportadora e à cadeia de produção norueguesa."
            />
            <div className="mt-10 grid grid-cols-2 gap-3">
              {stages.map((stage) => (
                <figure key={stage.label} className="group relative overflow-hidden rounded-2xl bg-mist">
                  <img src={stage.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-navy/85 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur">
                    {stage.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={(index % 2) * 0.08}>
              <li className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm">
                <span aria-hidden="true" className="font-serif text-3xl font-semibold text-ocean/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-lg font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
