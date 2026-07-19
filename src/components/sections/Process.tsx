import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';

export function Process() {
  return (
    <section id="como-trabalhamos" className="bg-navy py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          dark
          align="center"
          eyebrow="Método"
          title="Como trabalhamos"
          description="Um processo estruturado e transparente, do primeiro contato ao relacionamento de longo prazo."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={(index % 3) * 0.08}>
              <li className="relative border-t border-white/15 pt-6">
                <span
                  aria-hidden="true"
                  className="font-serif text-3xl font-semibold text-frost/50"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-frost/80">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
