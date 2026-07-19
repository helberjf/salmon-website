import { Building2, Hotel, Store, Truck, UtensilsCrossed, Fish } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { audiences } from '@/data/audiences';

const icons = [UtensilsCrossed, Hotel, Store, Truck, Fish, Building2];

export function Audiences() {
  return (
    <section id="clientes" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Quem atendemos"
          title="Fornecimento pensado para cada tipo de operação"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={audience.title} delay={(index % 3) * 0.07}>
                <div className="flex h-full gap-5 rounded-lg border border-border bg-white p-6">
                  <Icon size={24} aria-hidden="true" className="mt-1 shrink-0 text-ocean" />
                  <div>
                    <h3 className="font-semibold text-navy">{audience.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {audience.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
