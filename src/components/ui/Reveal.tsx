import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
  amount?: number;
}

/** Entrada editorial ao rolar, respeitando a preferência de movimento do sistema. */
export function Reveal({
  children,
  delay = 0,
  className,
  direction = 'up',
  amount = 0.18,
}: RevealProps) {
  const offset = {
    up: { x: 0, y: 28 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, ...offset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount, margin: '-48px' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
