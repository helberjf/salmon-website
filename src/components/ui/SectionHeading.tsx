import { m, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const child = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <m.div
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={`max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <m.p
          variants={child}
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            dark ? 'text-shore-light' : 'text-ocean'
          }`}
        >
          {eyebrow}
        </m.p>
      )}
      <m.h2
        variants={child}
        // Manual da Norwell: títulos grandes em Light sobre fundo claro e em
        // Book (400) sobre fundo escuro.
        className={`text-4xl leading-[1.1] tracking-[-0.025em] md:text-5xl ${
          dark ? 'font-normal text-white' : 'font-light text-navy'
        }`}
      >
        {title}
      </m.h2>
      {description && (
        <m.p
          variants={child}
          className={`mt-5 text-lg leading-relaxed ${dark ? 'font-medium text-frost' : 'text-muted'}`}
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}
