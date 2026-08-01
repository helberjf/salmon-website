import { m, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useI18n } from '@/i18n/I18nProvider';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Conteúdo opcional à direita — selo, logotipo ou números. */
  aside?: React.ReactNode;
}

/** Cabeçalho padrão das páginas internas. */
export function PageHero({ eyebrow, title, description, aside }: PageHeroProps) {
  const { href: localizedHref, t } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-navy pb-20 pt-32 text-white md:pb-28 md:pt-40">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-80" />
      <m.div
        aria-hidden="true"
        className="absolute -right-48 top-12 -z-10 h-[32rem] w-[32rem] rounded-full bg-ocean-light/15 blur-3xl"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />

      <div
        className={`mx-auto grid max-w-7xl gap-12 px-5 lg:px-8 ${
          aside ? 'lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-20' : ''
        }`}
      >
        <m.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Link
            href={localizedHref('/')}
            className="mb-8 inline-flex items-center gap-2 py-1 text-sm font-semibold text-frost transition-colors hover:text-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t('Voltar ao site')}
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-salmon-light">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-frost">{description}</p>
          )}
        </m.div>

        {aside && (
          <m.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
            className="lg:justify-self-end"
          >
            {aside}
          </m.div>
        )}
      </div>
    </section>
  );
}
