import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { WaveDivider } from '@/components/ui/WaveDivider';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Conteúdo opcional à direita — selo, logotipo ou números. */
  aside?: ReactNode;
  /** Botões abaixo da descrição. */
  actions?: ReactNode;
  /** Cor (classe `text-*`) da seção seguinte, usada na onda de transição. */
  waveClassName?: string;
}

/** Cabeçalho padrão das páginas internas. */
export function PageHero({
  eyebrow,
  title,
  description,
  aside,
  actions,
  waveClassName = 'text-white',
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-navy pb-24 pt-32 text-white md:pb-36 md:pt-40 xl:pt-52">
      <m.div
        aria-hidden="true"
        className="absolute -right-48 top-12 -z-10 h-[32rem] w-[32rem] rounded-full bg-ocean/25 blur-3xl"
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
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-shore-light">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-normal leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-frost">{description}</p>
          )}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
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
      <WaveDivider className={waveClassName} />
    </section>
  );
}
