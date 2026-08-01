import { ArrowRight, ArrowUpRight, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { founder } from '@/data/founder';
import { useI18n } from '@/i18n/I18nProvider';

function FounderVisual() {
  const { t } = useI18n();

  if (founder.photo) {
    return (
      <img
        src={founder.photo}
        alt={t(`Fotografia de ${founder.name}`)}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-[2rem] object-cover object-top lg:aspect-square"
      />
    );
  }

  const initials = founder.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <div className="relative flex min-h-[23rem] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-navy p-7 text-white lg:min-h-[24rem] lg:p-8">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[50px] border-ocean-light/15" />
      <div aria-hidden="true" className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[60px] border-salmon/10" />
      <span className="relative text-xs font-bold uppercase tracking-[0.18em] text-salmon">
        {t('Noruega · Brasil')}
      </span>
      <div className="relative">
        <span aria-hidden="true" className="font-serif text-7xl font-semibold tracking-tight text-white/12 lg:text-8xl">
          {initials}
        </span>
        <p className="mt-2 max-w-sm font-serif text-xl font-medium leading-snug text-white lg:text-2xl">
          {t(founder.profileHeadline)}
        </p>
      </div>
      <div className="relative border-t border-white/15 pt-5">
        <p className="font-serif text-2xl font-semibold">{t(founder.name)}</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-frost/60">
          {t(founder.title)}
        </p>
      </div>
    </div>
  );
}

export function Founder() {
  const { t } = useI18n();

  return (
    <section id="fundadora" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-md lg:mx-0">
            <FounderVisual />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow={t('Representação no Brasil')}
              title={t('Experiência internacional transformada em acesso comercial')}
            />
            <Reveal delay={0.1} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              <p>{t(founder.shortSummary)}</p>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2.5">
              {founder.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-ice px-4 py-2 text-sm font-semibold text-ocean"
                >
                  {t(area)}
                </span>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ocean"
              >
                {t('Conheça a trajetória completa')}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-ice"
              >
                <Linkedin size={16} aria-hidden="true" />
                {t('Ver perfil no LinkedIn')}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
