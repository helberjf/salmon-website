import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Languages } from 'lucide-react';
import { useI18n, type LanguagePreference } from '@/i18n/I18nProvider';

interface LanguageSelectorProps {
  className?: string;
  /** Fecha o menu do cabeçalho móvel junto com a escolha. */
  onSelect?: () => void;
  /**
   * De que lado do botão a lista se abre. No cabeçalho móvel o botão fica à
   * esquerda da linha, então ancorar à direita jogaria a lista para fora da tela.
   */
  align?: 'start' | 'end';
}

/**
 * Botão de idioma: mostra só o ícone e, por padrão, segue o idioma do sistema
 * do visitante. Ao tocar, abre a lista para trocar manualmente.
 *
 * Foi feito com botões em vez de um <select> nativo porque no iOS qualquer
 * campo de formulário com fonte menor que 16px provoca zoom automático ao
 * receber foco — e o rótulo aqui precisa ser pequeno.
 */
const languageOptions: ReadonlyArray<{ value: LanguagePreference; label: string }> = [
  { value: 'system', label: 'Idioma do sistema' },
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'no', label: 'Norsk' },
];

export function LanguageSelector({
  className = '',
  onSelect,
  align = 'end',
}: LanguageSelectorProps) {
  const { preference, setPreference, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = (value: LanguagePreference) => {
    setPreference(value);
    setOpen(false);
    onSelect?.();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t('Selecionar idioma')}
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-white transition-colors sm:h-9 sm:w-9 ${
          open
            ? 'border-white/50 bg-white/15'
            : 'border-white/20 bg-white/8 hover:border-white/35 hover:bg-white/12'
        }`}
      >
        <Languages size={18} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`absolute z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-white/15 bg-navy-dark p-1.5 shadow-2xl shadow-navy-dark/50 ${
              align === 'start' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
            }`}
          >
            {languageOptions.map((option) => {
              const selected = preference === option.value;
              return (
                <li key={option.value} role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    onClick={() => choose(option.value)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors ${
                      selected ? 'bg-white/12 text-white' : 'text-white/75 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    {option.value === 'system' ? t(option.label) : option.label}
                    {selected && <Check size={16} aria-hidden="true" className="shrink-0 text-salmon-light" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
