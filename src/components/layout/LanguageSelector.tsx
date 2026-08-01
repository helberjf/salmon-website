import { ChevronDown, Languages } from 'lucide-react';
import { useI18n, type LanguagePreference } from '@/i18n/I18nProvider';

interface LanguageSelectorProps {
  className?: string;
}

const languageOptions: ReadonlyArray<{ value: LanguagePreference; label: string }> = [
  { value: 'system', label: 'Sistema' },
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'no', label: 'Norsk' },
];

export function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { preference, setPreference, t } = useI18n();

  return (
    <label
      className={`relative inline-flex h-9 items-center rounded-full border border-white/20 bg-white/8 text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/12 focus-within:border-white/50 ${className}`}
    >
      <span className="sr-only">{t('Selecionar idioma')}</span>
      <Languages aria-hidden="true" className="pointer-events-none ml-3 shrink-0 text-frost" size={15} />
      <select
        value={preference}
        onChange={(event) => setPreference(event.target.value as LanguagePreference)}
        aria-label={t('Selecionar idioma')}
        title={preference === 'system' ? t('Idioma do sistema') : t('Selecionar idioma')}
        className="h-full max-w-[7.75rem] cursor-pointer appearance-none bg-transparent py-0 pl-2 pr-7 text-xs font-semibold text-white outline-none [color-scheme:dark]"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value} className="bg-navy text-white">
            {option.value === 'system' ? t(option.label) : option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 text-frost"
        size={13}
      />
    </label>
  );
}
