import { Building2, Hotel, Store, Truck, UtensilsCrossed, Fish } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { audiences } from '@/data/audiences';
import { useI18n } from '@/i18n/I18nProvider';

const icons = [UtensilsCrossed, Hotel, Store, Truck, Fish, Building2];

export function Audiences() {
  const { t } = useI18n();

  return (
    <section id="clientes" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow={t('Quem atendemos')}
          title={t('Fornecimento pensado para cada tipo de operação')}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal
                key={audience.title}
                delay={(index % 3) * 0.07}
                className="group flex h-full gap-5 rounded-3xl border border-border bg-ice p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-ocean/25 hover:shadow-lg"
              >
                <Icon
                  size={24}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ocean transition-transform duration-300 group-hover:scale-110"
                />
                <div>
                  <h3 className="font-semibold text-navy">{t(audience.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(audience.description)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
