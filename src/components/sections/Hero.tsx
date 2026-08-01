import { motion } from 'framer-motion';
import { ArrowRight, Globe2, MessageCircle, ShieldCheck, Ship, Snowflake } from 'lucide-react';
import { images } from '@/data/images';
import { hasWhatsApp, whatsAppLink } from '@/utils/whatsapp';

const trustItems = [
  { icon: ShieldCheck, label: 'Origem norueguesa' },
  { icon: Snowflake, label: 'Fresco ou congelado' },
  { icon: Ship, label: 'Via aérea ou marítima' },
  { icon: Globe2, label: 'Atendimento em todo o Brasil' },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-30" />
      <div aria-hidden="true" className="absolute -left-40 top-28 h-96 w-96 rounded-full bg-ocean-light/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[820px] w-full max-w-7xl items-center gap-14 px-5 pb-36 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-40 lg:pt-36">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-frost backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-salmon" />
            Representação comercial · Noruega → Brasil
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="max-w-[13ch] text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl"
          >
            Salmão norueguês, <span className="text-salmon">direto da origem.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/72 sm:text-xl"
          >
            Conectamos empresas brasileiras à exportadora Norwell e a produtores selecionados da
            costa norueguesa, com especificação sob medida e logística de ponta a ponta.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#produtos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
            >
              Conhecer o portfólio
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            {hasWhatsApp && (
              <a
                href={whatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Falar com a Mai
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[540px] lg:mx-0"
        >
          <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border border-white/10" />
          <figure className="relative overflow-hidden rounded-[2rem] bg-ocean shadow-2xl shadow-black/30">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              className="aspect-[4/5] w-full object-cover object-center"
              fetchPriority="high"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-frost">Costa da Noruega</p>
              <p className="mt-2 max-w-xs font-serif text-2xl font-semibold leading-tight text-white">
                Qualidade construída na origem
              </p>
            </figcaption>
          </figure>
          <figure className="absolute -bottom-12 -left-8 hidden w-48 overflow-hidden rounded-2xl border-4 border-navy bg-white shadow-2xl sm:block lg:-left-16 lg:w-56">
            <img
              src={images.heroDetail.src}
              alt={images.heroDetail.alt}
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-navy">
              Atlantic salmon · premium
            </figcaption>
          </figure>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-navy-dark/60 py-5 backdrop-blur-xl">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 text-xs font-semibold text-white/80 sm:text-sm lg:grid-cols-4 lg:px-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <Icon size={17} aria-hidden="true" className="text-salmon" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
