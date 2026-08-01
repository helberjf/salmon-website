import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  htmlLanguageTags,
  supportedLanguages,
  translate,
  type Language,
  type LanguagePreference,
  type TranslationVariables,
} from './translations';

const STORAGE_KEY = 'nordic-salmon.language';
const DEFAULT_LANGUAGE: Language = 'pt';
const HOME_TITLE = 'Nordic Salmon | Salmão Norueguês B2B no Brasil';
const SITE_DESCRIPTION =
  'Representação comercial e fornecimento B2B de salmão norueguês no Brasil, em conexão direta com a exportadora Norwell. Produtos frescos, congelados e sob medida.';

const openGraphLocales: Record<Language, string> = {
  pt: 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
  no: 'nb_NO',
};

interface I18nContextValue {
  language: Language;
  preference: LanguagePreference;
  setPreference: (preference: LanguagePreference) => void;
  t: (source: string, variables?: TranslationVariables) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value !== null && supportedLanguages.some((language) => language === value);
}

export function languageFromLocale(locale: string): Language | null {
  const primarySubtag = locale.trim().toLowerCase().split(/[-_]/)[0];

  if (primarySubtag === 'pt') return 'pt';
  if (primarySubtag === 'en') return 'en';
  if (primarySubtag === 'es') return 'es';
  if (primarySubtag === 'no' || primarySubtag === 'nb' || primarySubtag === 'nn') return 'no';

  return null;
}

export function detectSystemLanguage(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;

  const candidates = navigator.languages?.length
    ? navigator.languages
    : navigator.language
      ? [navigator.language]
      : [];

  for (const candidate of candidates) {
    const language = languageFromLocale(candidate);
    if (language) return language;
  }

  return DEFAULT_LANGUAGE;
}

function readStoredPreference(): LanguagePreference {
  if (typeof window === 'undefined') return 'system';

  try {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(storedLanguage) ? storedLanguage : 'system';
  } catch {
    return 'system';
  }
}

function titleSourceForCurrentPath(): string {
  if (typeof window === 'undefined') return HOME_TITLE;

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/privacidade') return 'Política de Privacidade | Nordic Salmon';
  if (path === '/termos') return 'Termos de Uso | Nordic Salmon';
  if (path === '/sobre') return 'Sobre Mai Tonheim | Nordic Salmon';
  if (path === '/a-norwell') return 'A Norwell | Nordic Salmon';
  if (path === '/produtos') return 'Produtos | Nordic Salmon';
  if (path !== '/') return 'Página não encontrada | Nordic Salmon';
  return HOME_TITLE;
}

function setMetaContent(selector: string, content: string): void {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [preference, setPreferenceState] = useState<LanguagePreference>(readStoredPreference);
  const [systemLanguage, setSystemLanguage] = useState<Language>(detectSystemLanguage);
  const language = preference === 'system' ? systemLanguage : preference;

  const setPreference = useCallback((nextPreference: LanguagePreference) => {
    setPreferenceState(nextPreference);

    try {
      if (nextPreference === 'system') {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, nextPreference);
      }
    } catch {
      // Language selection still works for this session when storage is unavailable.
    }
  }, []);

  const t = useCallback(
    (source: string, variables?: TranslationVariables) =>
      translate(language, source, variables),
    [language],
  );

  useEffect(() => {
    const updateSystemLanguage = () => setSystemLanguage(detectSystemLanguage());
    window.addEventListener('languagechange', updateSystemLanguage);
    return () => window.removeEventListener('languagechange', updateSystemLanguage);
  }, []);

  useEffect(() => {
    const htmlLanguage = htmlLanguageTags[language];
    const title = t(titleSourceForCurrentPath());
    const description = t(SITE_DESCRIPTION);

    document.documentElement.lang = htmlLanguage;
    document.title = title;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:locale"]', openGraphLocales[language]);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [language, t]);

  const value = useMemo<I18nContextValue>(
    () => ({ language, preference, setPreference, t }),
    [language, preference, setPreference, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}

export type { Language, LanguagePreference, TranslationVariables } from './translations';

