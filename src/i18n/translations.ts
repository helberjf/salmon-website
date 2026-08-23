export const supportedLanguages = ['pt', 'en', 'es', 'no'] as const;

export type Language = (typeof supportedLanguages)[number];
export type LanguagePreference = 'system' | Language;
export type TranslationVariables = Record<string, string | number>;
export type TranslationCatalog = Readonly<Record<string, string>>;

export const htmlLanguageTags: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
  no: 'nb-NO',
};

const portugueseCatalog: TranslationCatalog = Object.freeze({});
const loadedCatalogs: Partial<Record<Language, TranslationCatalog>> = {
  pt: portugueseCatalog,
};
const pendingCatalogs: Partial<Record<Exclude<Language, 'pt'>, Promise<TranslationCatalog>>> = {};

const catalogLoaders: Record<Exclude<Language, 'pt'>, () => Promise<TranslationCatalog>> = {
  en: () => import('./catalogs/en').then(({ default: catalog }) => catalog),
  es: () => import('./catalogs/es').then(({ default: catalog }) => catalog),
  no: () => import('./catalogs/no').then(({ default: catalog }) => catalog),
};

/** Returns a catalog already available in memory without starting a network request. */
export function getLoadedTranslations(language: Language): TranslationCatalog | undefined {
  return loadedCatalogs[language];
}

/**
 * Loads a single language catalog and shares the same promise across concurrent callers.
 * Portuguese needs no catalog because the source phrase is already the Portuguese copy.
 */
export function loadTranslations(language: Language): Promise<TranslationCatalog> {
  const loadedCatalog = loadedCatalogs[language];
  if (loadedCatalog) return Promise.resolve(loadedCatalog);

  if (language === 'pt') return Promise.resolve(portugueseCatalog);

  const pendingCatalog = pendingCatalogs[language];
  if (pendingCatalog) return pendingCatalog;

  const request = catalogLoaders[language]().then(
    (catalog) => {
      loadedCatalogs[language] = catalog;
      delete pendingCatalogs[language];
      return catalog;
    },
    (error: unknown) => {
      delete pendingCatalogs[language];
      throw error;
    },
  );
  pendingCatalogs[language] = request;
  return request;
}

const variablePattern = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;

export function translate(
  catalog: TranslationCatalog,
  source: string,
  variables: TranslationVariables = {},
): string {
  const template = catalog[source] ?? source;

  return template.replace(variablePattern, (placeholder, variableName: string) => {
    const value = variables[variableName];
    return value === undefined ? placeholder : String(value);
  });
}
