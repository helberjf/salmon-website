import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { navLinks } from '@/data/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { BrandMark } from '@/components/ui/BrandMark';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { useI18n } from '@/i18n/I18nProvider';

export function Header() {
  const isScrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useI18n();
  const [location] = useLocation();
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.sectionId).filter(Boolean),
    [],
  );
  const activeSection = useScrollSpy(sectionIds);

  const isLinkActive = (href: string, sectionId: string) =>
    sectionId ? location === '/' && activeSection === sectionId : location === href;

  const solid = isScrolled || mobileOpen;

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-navy/95 shadow-xl shadow-navy-dark/15 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div aria-hidden="true" className="nordic-stripe h-[3px] w-full" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="/#inicio" aria-label={t('Nordic Salmon — voltar ao início')}>
          <BrandMark inverse />
        </a>

        <nav aria-label={t('Navegação principal')} className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isLinkActive(link.href, link.sectionId) ? 'location' : undefined}
              className={`group relative py-1 text-[0.82rem] font-semibold transition-colors hover:text-white ${
                isLinkActive(link.href, link.sectionId) ? 'text-white' : 'text-white/70'
              }`}
            >
              {t(link.label)}
              {/* Sublinhado que cresce a partir do centro no hover e fica fixo no item ativo. */}
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-0.5 w-full origin-center bg-salmon transition-transform duration-300 group-hover:scale-x-100 ${
                  isLinkActive(link.href, link.sectionId) ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
          <LanguageSelector />
          <a
            href="/#contato"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:bg-frost"
          >
            {t('Cotação B2B')}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="-mr-2 rounded-full border border-white/15 p-2.5 text-white transition-colors hover:bg-white/10 xl:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
          aria-label={mobileOpen ? t('Fechar menu') : t('Abrir menu')}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label={t('Navegação principal (celular)')}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-white/10 bg-navy px-5 pb-7 pt-2 shadow-2xl xl:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isLinkActive(link.href, link.sectionId) ? 'location' : undefined}
                className={`block border-b border-white/10 py-3.5 font-medium transition-colors hover:text-frost ${
                  isLinkActive(link.href, link.sectionId) ? 'text-frost' : 'text-white'
                }`}
              >
                {t(link.label)}
              </a>
            ))}
            <div className="mt-5 flex items-center gap-4">
              <LanguageSelector align="start" onSelect={() => setMobileOpen(false)} />
              <a
                href="/#contato"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-full bg-white px-4 py-3.5 text-center text-sm font-bold text-navy"
              >
                {t('Solicitar cotação B2B')}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
