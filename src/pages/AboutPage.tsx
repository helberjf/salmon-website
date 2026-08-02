import { m, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Languages,
  Linkedin,
  MapPin,
} from 'lucide-react';
import { Link } from 'wouter';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { founder } from '@/data/founder';
import { useI18n } from '@/i18n/I18nProvider';

function FounderPortrait() {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  if (founder.aboutHeroPhoto) {
    return (
      <ResponsiveImage
        src={founder.aboutHeroPhoto.src}
        alt={t(founder.aboutHeroPhoto.alt)}
        sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, calc(100vw - 40px)"
        maxWidth={480}
        loading="eager"
        fetchPriority="high"
        pictureClassName="block h-full w-full"
        className="aspect-[3/4] h-full w-full bg-navy-dark object-contain"
      />
    );
  }

  const initials = founder.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <div className="relative flex aspect-[4/5] min-h-[24rem] flex-col justify-between overflow-hidden bg-navy-dark p-8 text-white">
      <m.div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[54px] border-ocean-light/20"
        initial={shouldReduceMotion ? false : { opacity: 0, rotate: -12, scale: 0.9 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
      />
      <div aria-hidden="true" className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-[58px] border-salmon/10" />
      <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-salmon-light">
        {t('Noruega · Brasil')}
      </span>
      <span aria-hidden="true" className="relative font-serif text-8xl font-semibold text-white/15 sm:text-9xl">
        {initials}
      </span>
      <div className="relative border-t border-white/15 pt-5">
        <p className="font-serif text-2xl font-semibold">{t(founder.name)}</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-frost/70">
          {t(founder.title)}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { href: localizedHref, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageShell titleSource="Sobre Mai Tonheim | Bridge Point" resetScroll mainClassName="overflow-hidden bg-white">
        <section className="relative isolate bg-navy pb-20 pt-32 text-white md:pb-28 md:pt-40">
          <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-80" />
          <m.div
            aria-hidden="true"
            className="absolute -right-48 top-12 -z-10 h-[32rem] w-[32rem] rounded-full bg-ocean-light/15 blur-3xl"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Link
                href={localizedHref('/')}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-frost transition-colors hover:text-white"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                {t('Voltar ao site')}
              </Link>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-salmon-light">
                {t('Liderança e representação no Brasil')}
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                {t(founder.name)}
              </h1>
              <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug text-white/95 md:text-3xl">
                {t(founder.profileHeadline)}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-frost">
                {t(founder.shortSummary)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
                >
                  <Linkedin size={17} aria-hidden="true" />
                  {t('Ver perfil no LinkedIn')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  href={localizedHref('/#contato')}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
                >
                  {t('Conversar sobre uma parceria')}
                </a>
              </div>
            </m.div>

            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
              className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-navy-dark/40 lg:mx-0 lg:justify-self-end"
            >
              <FounderPortrait />
            </m.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-8">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-light">
                {t('Perfil profissional')}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.025em] text-navy md:text-5xl">
                {t('Experiência internacional a serviço de conexões duradouras')}
              </h2>
              <div aria-hidden="true" className="mt-6 h-1 w-10 rounded-full bg-salmon" />
            </Reveal>

            <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted">
              {founder.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{t(paragraph)}</p>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28" aria-labelledby="presenca-institucional">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-light">
                {t('Presença institucional')}
              </p>
              <h2
                id="presenca-institucional"
                className="mt-4 scroll-mt-28 text-4xl font-semibold leading-tight tracking-[-0.025em] text-navy md:text-5xl"
              >
                {t('Noruega e Brasil em ação')}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {t('Registros de uma trajetória dedicada à diplomacia comercial, à cooperação e à criação de pontes entre os dois países.')}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {founder.gallery.map((image, index) => (
                <Reveal key={image.src} delay={(index % 2) * 0.07}>
                  <figure
                    className={`mx-auto w-full overflow-hidden rounded-3xl border border-border bg-white shadow-sm ${
                      image.src.includes('norway-brazil') ? 'max-w-xs' : 'max-w-md'
                    }`}
                  >
                    <div
                      className={`${image.frame === '3/4' ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-navy-dark`}
                    >
                      <ResponsiveImage
                        src={image.src}
                        alt={t(image.alt)}
                        sizes="(min-width: 1024px) 448px, (min-width: 768px) calc((100vw - 64px) / 2), calc(100vw - 40px)"
                        maxWidth={800}
                        pictureClassName="block h-full w-full"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <figcaption className="p-5 text-sm font-semibold leading-relaxed text-navy">
                      {t(image.caption)}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ice py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              <Reveal className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <BriefcaseBusiness size={24} aria-hidden="true" className="text-ocean" />
                <h2 className="mt-5 text-xl font-semibold text-navy">{t('Áreas de atuação')}</h2>
                <ul className="mt-4 space-y-3">
                  {founder.focusAreas.map((area) => (
                    <li key={area} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-salmon" />
                      {t(area)}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.08} className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <GraduationCap size={24} aria-hidden="true" className="text-ocean" />
                <h2 className="mt-5 text-xl font-semibold text-navy">{t('Formação')}</h2>
                <ul className="mt-4 space-y-5">
                  {founder.education.map((education) => (
                    <li key={education.degree}>
                      <p className="text-sm font-bold leading-relaxed text-navy">{t(education.degree)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{t(education.institution)}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16} className="rounded-3xl border border-border bg-white p-7 shadow-sm">
                <Languages size={24} aria-hidden="true" className="text-ocean" />
                <h2 className="mt-5 text-xl font-semibold text-navy">{t('Idiomas')}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t(founder.languagesNote)}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-light">
                {t('Trajetória profissional')}
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.025em] text-navy md:text-5xl">
                {t('Uma carreira construída entre mercados, diplomacia e impacto')}
              </h2>
              <div aria-hidden="true" className="mt-6 h-1 w-10 rounded-full bg-salmon" />
            </Reveal>

            <ol className="relative mt-12 space-y-5 before:absolute before:bottom-8 before:left-[0.44rem] before:top-8 before:w-px before:bg-border md:before:left-[11.45rem]">
              {founder.career.map((entry, index) => (
                <li key={`${entry.period}-${entry.organization}`} className="relative pl-8 md:grid md:grid-cols-[10rem_1fr] md:gap-12 md:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-8 h-3.5 w-3.5 rounded-full border-4 border-white bg-salmon shadow-[0_0_0_1px_var(--color-border)] md:left-[11rem]"
                  />
                  <Reveal delay={(index % 3) * 0.04} className="pt-7 md:text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-ocean">
                      {t(entry.period)}
                    </p>
                  </Reveal>
                  <Reveal
                    delay={(index % 3) * 0.04 + 0.04}
                    className="rounded-3xl border border-border bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:p-7"
                  >
                    <h3 className="text-xl font-semibold text-navy">{t(entry.role)}</h3>
                    <p className="mt-1 font-semibold text-ocean">{t(entry.organization)}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-blue">
                      <MapPin size={14} aria-hidden="true" />
                      {t(entry.location)}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{t(entry.description)}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-navy py-16 text-white md:py-20">
          <Reveal className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-salmon-light">
                {t('Construa a próxima parceria')}
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                {t('Conecte sua operação ao seafood norueguês com visão local.')}
              </h2>
            </div>
            <a
              href={localizedHref('/#contato')}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
            >
              {t('Fale com a Bridge Point')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </section>
    </PageShell>
  );
}
