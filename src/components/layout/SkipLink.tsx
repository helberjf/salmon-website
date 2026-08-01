import { useI18n, type Language } from '@/i18n/I18nProvider';

const labels: Record<Language, string> = {
  pt: 'Pular para o conteúdo principal',
  en: 'Skip to main content',
  es: 'Saltar al contenido principal',
  no: 'Hopp til hovedinnholdet',
};

/** Atalho de teclado visível ao receber foco, antes da navegação global. */
export function SkipLink() {
  const { language } = useI18n();

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 text-sm font-bold text-navy shadow-xl transition-transform focus:translate-y-0"
    >
      {labels[language]}
    </a>
  );
}
