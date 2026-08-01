import { ArrowUpRight, BadgeCheck, MapPin, Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SeafoodFromNorway } from '@/components/ui/SeafoodFromNorway';
import { norwell, values } from '@/data/norwell';
import { useI18n } from '@/i18n/I18nProvider';

/** História, missão, valores e certificações da exportadora representada. */
export function NorwellStory() {
  const { t, language } = useI18n();

  return (
    <>
      <section id="a-empresa" className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow={t('A exportadora')}
                title={t('Uma casa de exportação com os produtores no controle')}
              />
              <Reveal delay={0.1} className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
                <p>{t(norwell.intro)}</p>
                <p>
                  {t(
                    'Da sede em Florø, na costa oeste norueguesa, a operação se estende a escritórios comerciais em Aalborg, Londres e Kuala Lumpur — a estrutura que sustenta o fornecimento para o Brasil.',
                  )}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <a
                  href={norwell.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 py-1.5 text-sm font-bold text-ocean transition-colors hover:text-navy"
                >
                  {t('Visitar o site da Norwell')}
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Reveal>
            </div>

            <div>
              <ul className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {norwell.facts.map((fact, index) => (
                  <li key={fact.value}>
                    <Reveal
                      delay={index * 0.07}
                      className="h-full rounded-2xl border border-border bg-ice p-6 lg:flex lg:items-baseline lg:gap-6"
                    >
                      <p className="font-serif text-3xl font-semibold text-navy lg:shrink-0 lg:basis-28">
                        {t(fact.value)}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted lg:mt-0">
                        {t(fact.label)}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>

              <Reveal delay={0.24} className="mt-5 rounded-2xl border border-border bg-ice p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ocean-light">
                  {t('Onde estão')}
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {norwell.offices.map((office) => (
                    <li key={office.city} className="flex items-start gap-3 text-sm">
                      <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-ocean" />
                      <span>
                        <span className="font-bold text-navy">
                          {office.city}, {t(office.country)}
                        </span>
                        <span className="mt-0.5 block text-muted">{t(office.role)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} className="mt-20 md:mt-24">
            <figure className="relative overflow-hidden rounded-[2rem] bg-norwell px-7 py-12 text-white md:px-14 md:py-16">
              <Quote size={140} aria-hidden="true" className="absolute -right-6 -top-8 text-white/[0.07]" />
              <div className="relative max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                  {t('Missão')}
                </p>
                <blockquote className="mt-5 font-serif text-3xl font-semibold leading-tight md:text-4xl">
                  “{t(norwell.mission)}”
                </blockquote>
                <figcaption className="mt-6 text-sm leading-relaxed text-white/70">
                  {t(
                    'Missão da Norwell AS, aplicada por sua representação comercial no Brasil: usar bem os recursos por meio de planejamento, precisão e prioridades claras — para que o parceiro tenha previsibilidade em toda a cadeia.',
                  )}
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="valores" className="bg-ice py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow={t('Valores')}
            title={t('Os mesmos três princípios, dos fiordes ao cliente brasileiro')}
          />

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={index * 0.08}
                  className="h-full rounded-3xl border border-border bg-white p-8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="font-serif text-2xl font-semibold text-navy">{t(item.title)}</p>
                  {/* O termo original só acrescenta informação fora do inglês. */}
                  {language !== 'en' && (
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-blue">
                      {item.original}
                    </p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-muted">{t(item.description)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="certificacoes" className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow={t('Certificações na origem')}
                title={t('A procedência é auditada antes de virar promessa comercial')}
                description={t(
                  'As certificações abaixo são mantidas pela Norwell AS e cobrem a produção e a cadeia de custódia na Noruega. Os certificados em vigor, com suas validades, são publicados pela própria exportadora.',
                )}
              />
              <Reveal delay={0.12}>
                <a
                  href={norwell.certificatesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 py-1.5 text-sm font-bold text-ocean transition-colors hover:text-navy"
                >
                  {t('Ver os certificados da Norwell')}
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <div className="mt-8 flex items-center gap-4">
                  <SeafoodFromNorway size={64} className="rounded-lg" />
                  <p className="max-w-[16rem] text-xs leading-relaxed text-slate-blue">
                    {t('Selo de origem do setor pesqueiro norueguês, exibido pela Norwell AS.')}
                  </p>
                </div>
              </Reveal>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {norwell.certifications.map((certification, index) => (
                <li key={certification.abbr}>
                  <Reveal
                    delay={(index % 2) * 0.08}
                    className="h-full rounded-2xl border border-border bg-ice p-6"
                  >
                    <div className="flex items-center gap-2.5">
                      <BadgeCheck size={18} aria-hidden="true" className="shrink-0 text-norwell" />
                      <p className="text-sm font-bold text-navy">{certification.abbr}</p>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-blue">
                      {t(certification.name)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {t(certification.description)}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
