import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Compass,
  GraduationCap,
  Handshake,
  Languages,
  Linkedin,
  MapPin,
  Ship,
} from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BridgePointLogo } from '@/components/ui/BridgePointLogo';
import { NorwellLogo } from '@/components/ui/NorwellLogo';
import { ShoreLine } from '@/components/ui/ShoreLine';
import { bridgePoint } from '@/data/bridgepoint';
import { founder } from '@/data/founder';
import { images } from '@/data/images';
import { quoteCtaLabel } from '@/data/navigation';
import { useI18n } from '@/i18n/I18nProvider';

const serviceIcons = [Compass, Handshake, Ship];

/**
 * Quem somos: a Bridge Point (primeiro a consultoria, depois a parceria com a
 * Norwell em destaque) e, em seguida, a fundadora. O botão "Sobre a Mai" do
 * topo leva direto à parte dela (#mai), sem precisar de outra página.
 */
export default function AboutPage() {
  const { href: localizedHref, t } = useI18n();

  return (
    <PageShell titleSource="Sobre | Bridge Point" resetScroll mainClassName="bg-white">
      <PageHero
        eyebrow={t('Sobre a Bridge Point')}
        title={t('Perspectiva internacional. Conhecimento do mercado brasileiro.')}
        description={t('Negócios entre Noruega e Brasil, com a Norwell como principal parceira.')}
        actions={
          <>
            <a
              href="#mai"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
            >
              {t('Sobre a Mai')}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href={localizedHref('/#contato')}
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              {t(quoteCtaLabel)}
            </a>
          </>
        }
        aside={
          <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-navy-dark/40">
            <ResponsiveImage
              src={images.bridge.src}
              alt={t(images.bridge.alt)}
              sizes="(min-width: 1024px) 448px, calc(100vw - 40px)"
              maxWidth={800}
              loading="eager"
              className="aspect-[4/3] w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <BridgePointLogo variant="white" height={30} />
            </figcaption>
          </figure>
        }
      />

      {/* Bridge Point: primeiro a consultoria, depois a parceria principal */}
      <section id="bridge-point" className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-8">
          <SectionHeading
            eyebrow={t('Quem somos')}
            title={t('Consultoria de entrada no mercado brasileiro')}
          />
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted">
            {bridgePoint.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{t(paragraph)}</p>
            ))}
          </Reveal>
        </div>

        {/* Destaque da parceria principal. Fundo sjøgrønn: o manual da Norwell só
            admite o logotipo em negativo sobre essa cor. */}
        <div className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
          <Reveal className="overflow-hidden rounded-[2rem] bg-navy text-white">
            <ShoreLine />
            <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-shore-light">
                  {t('Principal parceria')}
                </p>
                <h3 className="mt-4 text-3xl font-normal leading-tight md:text-4xl">
                  {t('Representante da Norwell no Brasil')}
                </h3>
                <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-frost">
                  {t(bridgePoint.norwellPartnership)}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={localizedHref('/a-norwell')}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
                  >
                    {t('Conhecer a Norwell')}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                  <a
                    href={localizedHref('/#contato')}
                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
                  >
                    {t(quoteCtaLabel)}
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <NorwellLogo layout="main" variant="negative" height={150} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
          <h3 className="text-2xl font-light text-navy md:text-3xl">
            {t('Como a Bridge Point pode apoiar sua empresa')}
          </h3>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {bridgePoint.services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <li key={service.title}>
                  <Reveal
                    delay={index * 0.07}
                    className="h-full rounded-3xl border border-border bg-ice p-7"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-shore">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <h4 className="text-xl font-semibold leading-snug text-navy">{t(service.title)}</h4>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {service.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-shore" />
                          {t(item)}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{t(bridgePoint.servicesNote)}</p>
          <a
            href={localizedHref('/#contato')}
            data-contact-interest="market"
            className="group mt-6 inline-flex items-center gap-2 py-1.5 text-sm font-bold text-ocean transition-colors hover:text-navy"
          >
            {t('Fale conosco sobre seu projeto no Brasil')}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>

      {/* Método */}
      <section className="bg-ice py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
            <SectionHeading eyebrow={t('Como trabalhamos')} title={t('Entender, conectar e desenvolver')} />
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted">{t(bridgePoint.approach)}</p>
            </Reveal>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {bridgePoint.method.map((stage, index) => (
              <li key={stage.step}>
                <Reveal delay={index * 0.07} className="h-full rounded-3xl border border-border bg-white p-7">
                  <div className="flex items-baseline gap-4">
                    <span aria-hidden="true" className="text-4xl font-light text-ocean">
                      {stage.step}
                    </span>
                    <h3 className="text-xl font-semibold text-navy">{t(stage.title)}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{t(stage.description)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mai — destino do botão "Sobre a Mai" */}
      <section id="mai" aria-labelledby="mai-titulo" className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
          <Reveal direction="right">
            <figure className="overflow-hidden rounded-[2rem] bg-[#f3efe7] px-4 pt-8">
              <ResponsiveImage
                src={founder.photo.src}
                alt={t(founder.photo.alt)}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, calc(100vw - 72px)"
                maxWidth={1200}
                className="mx-auto w-full object-contain"
              />
            </figure>
          </Reveal>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean">
              {t('Fundadora da Bridge Point')}
            </p>
            <h2
              id="mai-titulo"
              className="mt-4 text-4xl font-light leading-tight tracking-[-0.025em] text-navy md:text-5xl"
            >
              {founder.name}
            </h2>
            <p className="mt-4 text-xl font-light leading-snug text-ocean md:text-2xl">
              {t(founder.profileHeadline)}
            </p>
            <Reveal delay={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {founder.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{t(paragraph)}</p>
              ))}
            </Reveal>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:border-ocean/30 hover:bg-ice"
            >
              <Linkedin size={17} aria-hidden="true" />
              {t('Ver perfil no LinkedIn')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ice py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal className="rounded-3xl border border-border bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness size={24} aria-hidden="true" className="shrink-0 text-ocean" />
                <h3 className="text-xl font-semibold text-navy">{t('Áreas de atuação')}</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {founder.focusAreas.map((area) => (
                  <li key={area} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-shore" />
                    {t(area)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="rounded-3xl border border-border bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <GraduationCap size={24} aria-hidden="true" className="shrink-0 text-ocean" />
                <h3 className="text-xl font-semibold text-navy">{t('Formação')}</h3>
              </div>
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
              <div className="flex items-center gap-3">
                <Languages size={24} aria-hidden="true" className="shrink-0 text-ocean" />
                <h3 className="text-xl font-semibold text-navy">{t('Idiomas')}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t(founder.languagesNote)}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="presenca-institucional">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean">
              {t('Presença institucional')}
            </p>
            <h2
              id="presenca-institucional"
              className="mt-4 text-4xl font-light leading-tight tracking-[-0.025em] text-navy md:text-5xl"
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
                  <div className={`${image.frame === '3/4' ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-navy-dark`}>
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

      <section className="bg-ice py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean">
              {t('Trajetória profissional')}
            </p>
            <h2 className="mt-4 text-4xl font-light leading-tight tracking-[-0.025em] text-navy md:text-5xl">
              {t('Uma carreira construída entre mercados, diplomacia e impacto')}
            </h2>
          </Reveal>

          <ol className="relative mt-12 space-y-5 before:absolute before:bottom-8 before:left-[0.44rem] before:top-8 before:w-px before:bg-border md:before:left-[11.45rem]">
            {founder.career.map((entry, index) => (
              <li
                key={`${entry.period}-${entry.organization}`}
                className="relative pl-8 md:grid md:grid-cols-[10rem_1fr] md:gap-12 md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-8 h-3.5 w-3.5 rounded-full border-4 border-ice bg-shore shadow-[0_0_0_1px_var(--color-border)] md:left-[11rem]"
                />
                <Reveal delay={(index % 3) * 0.04} className="pt-7 md:text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ocean">{t(entry.period)}</p>
                </Reveal>
                <Reveal
                  delay={(index % 3) * 0.04 + 0.04}
                  className="rounded-3xl border border-border bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:p-7"
                >
                  <h3 className="text-xl font-semibold text-navy">{t(entry.role)}</h3>
                  <p className="mt-1 font-semibold text-ocean">{t(entry.organization)}</p>
                  <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
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

      <section className="relative overflow-hidden bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-end gap-8 px-5 pt-16 md:grid-cols-[1.2fr_0.8fr] md:pt-20 lg:px-8">
          <Reveal className="pb-16 md:pb-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-shore-light">
              {t('Fale com a Mai')}
            </p>
            <h2 className="mt-3 text-3xl font-normal leading-tight md:text-4xl">
              {t('Importação de salmão da Norwell ou entrada no mercado brasileiro?')}
            </h2>
            <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-frost">
              {t('Conte o que a sua empresa procura. A Mai responde pessoalmente, em português, inglês ou norueguês.')}
            </p>
            <a
              href={localizedHref('/#contato')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
            >
              {t(quoteCtaLabel)}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
          <div className="mx-auto w-full max-w-sm self-end md:max-w-md">
            <ResponsiveImage
              src={founder.ctaPhoto.src}
              alt={t(founder.ctaPhoto.alt)}
              sizes="(min-width: 768px) 448px, calc(100vw - 40px)"
              maxWidth={800}
              className="w-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
