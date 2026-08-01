import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe2, MessageCircle, ShieldCheck, Ship, Snowflake } from 'lucide-react';
import { images } from '@/data/images';
import { hasWhatsApp, whatsAppLink } from '@/utils/whatsapp';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

const trustItems = [
  { icon: ShieldCheck, label: 'Origem norueguesa' },
  { icon: Snowflake, label: 'Fresco ou congelado' },
  { icon: Ship, label: 'Via aérea ou marítima' },
  { icon: Globe2, label: 'Atendimento em todo o Brasil' },
];

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={sectionRef} id="inicio" className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-30" />
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="absolute -left-40 top-28 h-96 w-96 rounded-full bg-ocean-light/20 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[8%] top-28 hidden h-56 w-56 rounded-full border border-white/10 lg:block"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-32 lg:min-h-svh lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-40 lg:pt-36">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-frost backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-salmon" />
            {t('Representação comercial · Noruega → Brasil')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="max-w-[13ch] text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl"
          >
            {t('Salmão norueguês,')}{' '}
            <span className="text-salmon">{t('direto da origem.')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/72 sm:text-xl"
          >
            {t(
              'Conectamos empresas brasileiras à exportadora Norwell e a produtores selecionados da costa norueguesa, com especificação sob medida e logística de ponta a ponta.',
            )}
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
              {t('Conhecer o portfólio')}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            {hasWhatsApp && (
              <a
                href={whatsAppLink(t(company.whatsappMessage))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {t('Falar com a Mai')}
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          style={{ y: imageY }}
          className="relative mx-auto w-full max-w-[540px] lg:mx-0"
        >
          <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border border-white/10" />
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-ocean shadow-2xl shadow-black/30"
          >
            <motion.img
              src={images.hero.src}
              alt={t(images.hero.alt)}
              className="aspect-[4/5] w-full object-cover object-center"
              fetchPriority="high"
              initial={{ scale: 1.07 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-frost">{t('Costa da Noruega')}</p>
              <p className="mt-2 max-w-xs font-serif text-2xl font-semibold leading-tight text-white">
                {t('Qualidade construída na origem')}
              </p>
            </figcaption>
          </motion.figure>
          <motion.figure
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-12 -left-8 hidden w-48 overflow-hidden rounded-2xl border-4 border-navy bg-white shadow-2xl sm:block lg:-left-16 lg:w-56"
          >
            <img
              src={images.heroDetail.src}
              alt={t(images.heroDetail.alt)}
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-navy">
              Atlantic salmon · premium
            </figcaption>
          </motion.figure>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-navy-dark/70 py-5 backdrop-blur-xl lg:absolute lg:inset-x-0 lg:bottom-0">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 text-xs font-semibold text-white/80 sm:text-sm lg:grid-cols-4 lg:px-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <Icon size={17} aria-hidden="true" className="text-salmon" />
              {t(label)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
