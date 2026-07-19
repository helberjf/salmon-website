import { CalendarCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { commitments, industryPresence, testimonials } from '@/data/trust';

export function Trust() {
  return (
    <section id="confianca" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Relação de confiança"
          title="Transparência antes, durante e depois de cada operação"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {commitments.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="border-t-2 border-mist pt-5">
                <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {industryPresence.length > 0 && (
          <Reveal delay={0.1} className="mt-14 rounded-lg bg-background p-7 md:p-9">
            <h3 className="font-serif text-xl font-semibold text-navy">
              Presença no setor
            </h3>
            <p className="mt-2 text-sm text-muted">
              Participações recentes em eventos do mercado de pescados, representando o salmão
              norueguês.
            </p>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {industryPresence.map((item) => (
                <li key={item.event} className="flex gap-4">
                  <CalendarCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                  <div>
                    <p className="font-semibold text-navy">
                      {item.event} <span className="font-normal text-muted">· {item.location}</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
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
                <blockquote className="rounded-lg border border-border p-7">
                  <p className="leading-relaxed text-navy">“{testimonial.quote}”</p>
                  <footer className="mt-4 text-sm text-muted">
                    <strong className="text-navy">{testimonial.author}</strong> —{' '}
                    {testimonial.role}, {testimonial.company}
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
