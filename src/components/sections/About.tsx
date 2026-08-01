import { ArrowUpRight, BadgeCheck, CheckCircle2, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SeafoodFromNorway } from '@/components/ui/SeafoodFromNorway';
import { images } from '@/data/images';
import { norwell, values } from '@/data/norwell';
import { useI18n } from '@/i18n/I18nProvider';

const highlights = [
  {
    value: '1996',
    label: 'Ano de fundação da Norwell na Noruega',
  },
  {
    value: '+100',
    label: 'Mercados alcançados pelo salmão norueguês',
  },
  {
    value: '2 modais',
    label: 'Fornecimento por via aérea ou marítima',
  },
];

const partnership = [
  'Produtores familiares cuidadosamente selecionados',
  'Especificações padrão ou desenvolvidas sob medida',
  'Produtos frescos, congelados e de alto valor agregado',
];

export function About() {
  const { t, language } = useI18n();

  return (
    <section id="empresa" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <Reveal direction="right">
            <div className="relative">
              <figure className="overflow-hidden rounded-[2rem] bg-mist">
                <img
                  src={images.about.src}
                  alt={t(images.about.alt)}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
              <SeafoodFromNorway
                size={76}
                className="absolute -right-3 -top-6 rounded-xl shadow-xl shadow-navy/20 sm:-right-6"
              />
              <div className="relative mx-4 -mt-8 max-w-sm rounded-2xl bg-navy p-6 text-white shadow-2xl sm:absolute sm:-bottom-8 sm:right-8 sm:mx-0 sm:mt-0 sm:max-w-xs">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-salmon">{t('Parceiro na origem')}</p>
                <p className="mt-2 font-serif text-2xl font-semibold">Norwell AS</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {t('Exportadora norueguesa com presença global e relações de longo prazo com produtores.')}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="pt-8 lg:pt-0">
            <SectionHeading
              eyebrow={t('Nordic Salmon + Norwell')}
              title={t('Uma ponte comercial com os dois pés na origem')}
            />
            <Reveal delay={0.1} className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                {t(
                  'Representamos no Brasil a Norwell, exportadora norueguesa especializada em salmão e sediada em Florø. A empresa construiu sua atuação em parceria com produtores da costa da Noruega, combinando escala internacional e proximidade na cadeia.',
                )}
              </p>
              <p>
                {t(
                  'Fundada em 1996, a Norwell tem cerca de 70% do seu capital nas mãos dos próprios produtores e 30% com colaboradores-chave — um arranjo societário que aproxima quem cria o peixe de quem o exporta. Da sede em Florø, a operação se estende a escritórios comerciais em Aalborg, Londres e Kuala Lumpur.',
                )}
              </p>
              <p>
                {t(
                  'Para o cliente brasileiro, isso significa acesso qualificado à origem, comunicação direta e uma solução desenhada a partir do produto, volume e ritmo de cada operação.',
                )}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3">
                {partnership.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-navy">
                    <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-ocean" />
                    {t(item)}
                  </li>
                ))}
              </ul>
              <a
                href={norwell.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 group inline-flex items-center gap-2 py-1.5 text-sm font-bold text-ocean transition-colors hover:text-navy"
              >
                {t('Conhecer a Norwell')}
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>

            <ul className="mt-10 grid gap-5 border-t border-border pt-8 sm:grid-cols-3">
              {highlights.map((item) => (
                <li key={item.value}>
                  <p className="font-serif text-2xl font-semibold text-navy">{t(item.value)}</p>
                  <p className="mt-1.5 text-sm leading-snug text-muted">{t(item.label)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Missão e valores herdados da Norwell AS e aplicados à representação no Brasil */}
        <Reveal delay={0.1} className="mt-24 md:mt-32">
          <figure className="relative overflow-hidden rounded-[2rem] bg-norwell px-7 py-12 text-white md:px-14 md:py-16">
            <Quote
              size={140}
              aria-hidden="true"
              className="absolute -right-6 -top-8 text-white/[0.07]"
            />
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

        <div className="mt-16 md:mt-20">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-light">
              {t('Valores')}
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.025em] text-navy md:text-4xl">
              {t('Os mesmos três princípios, dos fiordes ao cliente brasileiro')}
            </h3>
            <div aria-hidden="true" className="mt-6 h-1 w-10 rounded-full bg-salmon" />
          </Reveal>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={index * 0.08}
                  className="h-full rounded-3xl border border-border bg-ice p-7 transition-transform duration-300 hover:-translate-y-1"
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

        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <div className="grid gap-10 rounded-[2rem] border border-border bg-ice p-7 md:p-11 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-light">
                {t('Certificações na origem')}
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-navy md:text-3xl">
                {t('A procedência é auditada antes de virar promessa comercial')}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {t(
                  'As certificações abaixo são mantidas pela Norwell AS e cobrem a produção e a cadeia de custódia na Noruega. Os certificados em vigor, com suas validades, são publicados pela própria exportadora.',
                )}
              </p>
              <a
                href={norwell.certificatesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 group inline-flex items-center gap-2 py-1.5 text-sm font-bold text-ocean transition-colors hover:text-navy"
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
                <p className="text-xs leading-relaxed text-slate-blue">
                  {t('Selo de origem do setor pesqueiro norueguês, exibido pela Norwell AS.')}
                </p>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {norwell.certifications.map((certification) => (
                <li
                  key={certification.abbr}
                  className="rounded-2xl border border-border bg-white p-5"
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
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
