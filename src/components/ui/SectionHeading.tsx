import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = 'left',
  dark = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            dark ? 'text-frost' : 'text-ocean-light'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-4xl font-semibold leading-[1.08] tracking-[-0.025em] md:text-5xl ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={`mt-6 h-1 w-10 rounded-full bg-salmon ${align === 'center' ? 'mx-auto' : ''}`}
      />
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-frost' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
