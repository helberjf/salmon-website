import { motion } from 'framer-motion';
import { Anchor, Globe2, ShieldCheck, Snowflake } from 'lucide-react';
import { images } from '@/data/images';

const trustItems = [
  { icon: Anchor, label: 'Origem norueguesa' },
  { icon: ShieldCheck, label: 'Procedência documentada' },
  { icon: Snowflake, label: 'Cadeia refrigerada' },
  { icon: Globe2, label: 'Experiência internacional' },
];

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[92dvh] flex-col justify-center overflow-hidden bg-navy">
      <img
        src={images.hero.src}
        alt={images.hero.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy/65" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-32 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-frost"
          >
            Noruega — Brasil
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl font-semibold leading-[1.12] text-white sm:text-5xl lg:text-6xl"
          >
            Excelência norueguesa conectada ao mercado brasileiro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            Importação e fornecimento de salmão norueguês com procedência, conhecimento
            internacional e atendimento comercial personalizado.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3.5 font-semibold text-navy transition-colors hover:bg-frost"
            >
              Solicitar uma proposta
            </a>
            <a
              href="#fundadora"
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Conhecer nossa história
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/10 bg-navy/50 py-5 backdrop-blur-md md:block">
        <ul className="mx-auto flex max-w-6xl items-center justify-between px-5 text-sm font-medium text-white/90 lg:px-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <Icon size={17} aria-hidden="true" className="text-frost" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
