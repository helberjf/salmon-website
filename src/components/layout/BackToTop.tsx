import { ChevronUp } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { useScrolled } from '@/hooks/useScrolled';
import { useI18n } from '@/i18n/I18nProvider';

export function BackToTop() {
  const visible = useScrolled(400);
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();

  if (!visible) return null;

  return (
    <m.button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      aria-label={t('Voltar ao topo')}
      className="floating-safe-bottom fixed bottom-5 left-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-navy/80 text-white shadow-lg backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:flex"
    >
      <ChevronUp size={20} aria-hidden="true" />
    </m.button>
  );
}
