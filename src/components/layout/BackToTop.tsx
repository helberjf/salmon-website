import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrolled } from '@/hooks/useScrolled';
import { useI18n } from '@/i18n/I18nProvider';

export function BackToTop() {
  const visible = useScrolled(400);
  const { t } = useI18n();

  if (!visible) return null;

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      aria-label={t('Voltar ao topo')}
      className="floating-safe-bottom fixed bottom-5 left-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-navy/80 text-white shadow-lg backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-navy sm:flex"
    >
      <ChevronUp size={20} aria-hidden="true" />
    </motion.button>
  );
}
