import { CalendarCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { commitments, industryPresence, testimonials } from '@/data/trust';
import { useI18n } from '@/i18n/I18nProvider';

export function Trust() {
  const { t } = useI18n();

  return (
    <section id="confianca" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t('Relação de confiança')}
          title={t('Transparência antes, durante e depois de cada operação')}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {commitments.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="border-t-2 border-mist pt-5">
              <h3 className="text-lg font-semibold text-navy">{t(item.title)}</h3>
              <p className="mt-2 leading-relaxed text-muted">{t(item.description)}</p>
            </Reveal>
          ))}
        </div>

        {industryPresence.length > 0 && (
          <Reveal delay={0.1} className="mt-14 rounded-[2rem] bg-background p-7 md:p-11">
            <h3 className="font-serif text-xl font-semibold text-navy">
              {t('Presença no setor')}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {t('Participações recentes em eventos do mercado de pescados, representando o salmão norueguês.')}
            </p>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {industryPresence.map((item) => (
                <li key={item.event} className="flex gap-4">
                  <CalendarCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                  <div>
                    <p className="font-semibold text-navy">
                      {item.event} <span className="font-normal text-muted">· {t(item.location)}</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{t(item.note)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {testimonials.length > 0 && (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Reveal key={testimonial.author}>
                <blockquote className="rounded-3xl border border-border p-7">
                  <p className="leading-relaxed text-navy">“{t(testimonial.quote)}”</p>
                  <footer className="mt-4 text-sm text-muted">
                    <strong className="text-navy">{testimonial.author}</strong> —{' '}
                    {t(testimonial.role)}, {testimonial.company}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
