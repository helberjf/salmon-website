import { ArrowUpRight, GraduationCap, Languages, Linkedin, Mail } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { founder } from '@/data/founder';
import { company } from '@/data/company';

function FounderVisual() {
  if (founder.photo) {
    return (
      <img
        src={founder.photo}
        alt={`Fotografia de ${founder.name}`}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-[2rem] object-cover object-top"
      />
    );
  }

  const initials = founder.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <div className="relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-navy p-8 text-white">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[50px] border-ocean-light/15" />
      <div aria-hidden="true" className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[60px] border-salmon/10" />
      <span className="relative text-xs font-bold uppercase tracking-[0.18em] text-salmon">
        Noruega · Brasil
      </span>
      <div className="relative">
        <span aria-hidden="true" className="font-serif text-8xl font-semibold tracking-tight text-white/12">
          {initials}
        </span>
        <blockquote className="mt-4 max-w-sm font-serif text-2xl font-medium leading-snug text-white">
          “Relações comerciais sólidas começam com clareza, confiança e conhecimento dos dois mercados.”
        </blockquote>
      </div>
      <div className="relative border-t border-white/15 pt-5">
        <p className="font-serif text-2xl font-semibold">{founder.name}</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-frost/60">{founder.title}</p>
      </div>
    </div>
  );
}

export function Founder() {
  const selectedCareer = founder.career.slice(0, 4);

  return (
    <section id="fundadora" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-lg lg:mx-0">
            <FounderVisual />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${company.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-ice"
              >
                <Mail size={16} aria-hidden="true" />
                Enviar e-mail
              </a>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-ice"
              >
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Representação no Brasil"
              title="Experiência internacional transformada em acesso comercial"
            />
            <Reveal delay={0.1} className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
              {founder.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-9 grid gap-4 rounded-2xl bg-ice p-6 sm:grid-cols-2">
              <div className="flex items-start gap-3.5">
                <GraduationCap size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                <div>
                  <h3 className="text-sm font-bold text-navy">Formação internacional</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">MSc pela SOAS University of London e formação diplomática norueguesa.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Languages size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                <div>
                  <h3 className="text-sm font-bold text-navy">Comunicação sem fronteiras</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">Experiência multicultural e atuação profissional em sete idiomas.</p>
                </div>
              </div>
            </Reveal>

            <div className="mt-10">
              <h3 className="font-serif text-2xl font-semibold text-navy">Trajetória em destaque</h3>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {selectedCareer.map((entry, index) => (
                  <Reveal key={`${entry.period}-${entry.organization}`} delay={(index % 2) * 0.05}>
                    <li className="h-full rounded-2xl border border-border p-5">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ocean">{entry.period}</p>
                      <h4 className="mt-2 font-semibold text-navy">{entry.role}</h4>
                      <p className="mt-1 text-sm text-muted">{entry.organization}</p>
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
