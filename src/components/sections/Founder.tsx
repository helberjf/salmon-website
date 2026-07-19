import { GraduationCap, Languages, Linkedin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { founder } from '@/data/founder';

function FounderPortrait() {
  if (founder.photo) {
    return (
      <img
        src={founder.photo}
        alt={`Fotografia de ${founder.name}`}
        loading="lazy"
        className="aspect-[3/4] w-full rounded-lg object-cover object-top"
      />
    );
  }

  // Monograma exibido enquanto a fotografia oficial não é definida em src/data/founder.ts.
  const initials = founder.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <div
      role="img"
      aria-label={`Monograma de ${founder.name} — fotografia em breve`}
      className="flex aspect-[3/4] w-full items-center justify-center rounded-lg bg-gradient-to-br from-navy to-ocean"
    >
      <span aria-hidden="true" className="font-serif text-7xl font-semibold text-frost/60">
        {initials}
      </span>
    </div>
  );
}

export function Founder() {
  return (
    <section id="fundadora" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
            <FounderPortrait />
            <div className="mt-6">
              <p className="font-serif text-2xl font-semibold text-navy">{founder.name}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-ocean">
                {founder.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{founder.headline}</p>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ocean transition-colors hover:text-navy"
                >
                  <Linkedin size={16} aria-hidden="true" />
                  Perfil no LinkedIn
                </a>
              )}
            </div>

            <div className="mt-8 space-y-5 rounded-lg border border-border bg-white p-6">
              <div className="flex items-start gap-3.5">
                <GraduationCap size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">Formação</h3>
                  <ul className="mt-1.5 space-y-1 text-sm text-muted">
                    {founder.education.map((item) => (
                      <li key={item.degree}>
                        {item.degree} — {item.institution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Languages size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                <div>
                  <h3 className="text-sm font-semibold text-navy">Idiomas</h3>
                  <p className="mt-1.5 text-sm text-muted">{founder.languagesNote}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow="Fundadora"
              title="Experiência internacional a serviço de relações comerciais sólidas"
            />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {founder.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>

            <div id="experiencia" className="mt-12 scroll-mt-24">
              <Reveal>
                <h3 className="font-serif text-2xl font-semibold text-navy">
                  Trajetória internacional
                </h3>
              </Reveal>
              <ol className="mt-7 space-y-0 border-l border-border">
                {founder.career.map((entry, index) => (
                  <Reveal key={`${entry.period}-${entry.organization}`} delay={(index % 4) * 0.05}>
                    <li className="relative pb-8 pl-7 last:pb-0">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-ocean bg-white"
                      />
                      <p className="text-xs font-semibold uppercase tracking-wider text-ocean">
                        {entry.period}
                      </p>
                      <h4 className="mt-1 font-semibold text-navy">
                        {entry.role} · {entry.organization}
                      </h4>
                      <p className="mt-0.5 text-xs text-muted">{entry.location}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{entry.description}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
