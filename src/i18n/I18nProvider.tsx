import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'wouter';
import { company } from '@/data/company';
import { norwell } from '@/data/norwell';
import {
  htmlLanguageTags,
  supportedLanguages,
  translate,
  type Language,
  type LanguagePreference,
  type TranslationVariables,
} from './translations';
import {
  languageFromPathname,
  localizeHref,
  stripLanguagePrefix,
  unlocalizedHref,
} from './routing';

const STORAGE_KEY = 'nordic-salmon.language';
const DEFAULT_LANGUAGE: Language = 'pt';
const HOME_TITLE = 'Bridge Point | Salmão Norueguês B2B no Brasil';
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
  href: (path: string) => string;
  t: (source: string, variables?: TranslationVariables) => string;
}

interface PageSeo {
  title: string;
  description: string;
  path: string;
  schemaType: 'WebPage' | 'AboutPage' | 'CollectionPage';
  indexable: boolean;
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

function seoForCurrentPath(pathname: string): PageSeo {
  const path = stripLanguagePrefix(pathname).replace(/\/+$/, '') || '/';

  if (path === '/a-norwell' || path === '/norwell') {
    return {
      title: 'A Norwell | Bridge Point',
      description:
        'Fundada em 1996 em Florø, exporta salmão e truta do fiorde para mais de uma centena de mercados. Conheça a história, os valores e as certificações que sustentam cada embarque para o Brasil.',
      path: '/a-norwell',
      schemaType: 'AboutPage',
      indexable: true,
    };
  }

  if (path === '/produtos') {
    return {
      title: 'Produtos | Bridge Point',
      description:
        'Todo o portfólio disponível para o mercado brasileiro, com a apresentação e o público indicado de cada item. Especificações e volumes são fechados na cotação.',
      path,
      schemaType: 'CollectionPage',
      indexable: true,
    };
  }

  if (path === '/sobre') {
    return {
      title: 'Sobre Mai Tonheim | Bridge Point',
      description:
        'Conheça Mai Tonheim, fundadora da Bridge Point, e sua trajetória conectando Noruega e Brasil por meio de comércio sustentável, entrada em mercados e parcerias estratégicas.',
      path,
      schemaType: 'AboutPage',
      indexable: true,
    };
  }

  if (path === '/privacidade') {
    return {
      title: 'Política de Privacidade | Bridge Point',
      description:
        'Saiba como a Bridge Point trata os dados informados em seus canais de contato e solicitações comerciais.',
      path,
      schemaType: 'WebPage',
      indexable: true,
    };
  }

  if (path === '/termos') {
    return {
      title: 'Termos de Uso | Bridge Point',
      description:
        'Consulte as condições de uso do website institucional da Bridge Point e as informações aplicáveis ao conteúdo publicado.',
      path,
      schemaType: 'WebPage',
      indexable: true,
    };
  }

  if (path === '/') {
    return {
      title: HOME_TITLE,
      description: SITE_DESCRIPTION,
      path,
      schemaType: 'WebPage',
      indexable: true,
    };
  }

  return {
    title: 'Página não encontrada | Bridge Point',
    description: SITE_DESCRIPTION,
    path,
    schemaType: 'WebPage',
    indexable: false,
  };
}

function setMetaContent(selector: string, attributes: Record<string, string>, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLinkHref(selector: string, attributes: Record<string, string>, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.href = href;
}

function updateAlternateLinks(siteUrl: string, contentPath: string): void {
  document.head.querySelectorAll('[data-i18n-alternate]').forEach((element) => element.remove());

  supportedLanguages.forEach((language) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = htmlLanguageTags[language];
    link.href = `${siteUrl}${localizeHref(contentPath, language)}`;
    link.dataset.i18nAlternate = 'true';
    document.head.appendChild(link);
  });

  const defaultLink = document.createElement('link');
  defaultLink.rel = 'alternate';
  defaultLink.hreflang = 'x-default';
  defaultLink.href = `${siteUrl}${contentPath}`;
  defaultLink.dataset.i18nAlternate = 'true';
  document.head.appendChild(defaultLink);
}

function updateOpenGraphAlternateLocales(language: Language): void {
  document.head.querySelectorAll('[data-og-locale-alternate]').forEach((element) => element.remove());

  supportedLanguages
    .filter((candidate) => candidate !== language)
    .forEach((candidate) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:locale:alternate');
      meta.content = openGraphLocales[candidate];
      meta.dataset.ogLocaleAlternate = 'true';
      document.head.appendChild(meta);
    });
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [location, navigate] = useLocation();
  const [storedPreference, setStoredPreference] = useState<LanguagePreference>(readStoredPreference);
  const [systemLanguage, setSystemLanguage] = useState<Language>(detectSystemLanguage);
  const routeLanguage = languageFromPathname(location);
  const language = routeLanguage ?? (storedPreference === 'system' ? systemLanguage : storedPreference);
  const preference: LanguagePreference = routeLanguage ?? storedPreference;

  const setPreference = useCallback(
    (nextPreference: LanguagePreference) => {
      setStoredPreference(nextPreference);

      try {
        if (nextPreference === 'system') {
          window.localStorage.removeItem(STORAGE_KEY);
        } else {
          window.localStorage.setItem(STORAGE_KEY, nextPreference);
        }
      } catch {
        // Language selection still works for this session when storage is unavailable.
      }

      const currentHref = `${location}${window.location.search}${window.location.hash}`;
      const nextHref =
        nextPreference === 'system'
          ? unlocalizedHref(currentHref)
          : localizeHref(currentHref, nextPreference);

      if (nextHref !== currentHref) navigate(nextHref);
    },
    [location, navigate],
  );

  const href = useCallback((path: string) => localizeHref(path, language), [language]);
  const t = useCallback(
    (source: string, variables?: TranslationVariables) => translate(language, source, variables),
    [language],
  );

  useEffect(() => {
    const updateSystemLanguage = () => setSystemLanguage(detectSystemLanguage());
    window.addEventListener('languagechange', updateSystemLanguage);
    return () => window.removeEventListener('languagechange', updateSystemLanguage);
  }, []);

  useEffect(() => {
    const htmlLanguage = htmlLanguageTags[language];
    const page = seoForCurrentPath(location);
    const title = t(page.title);
    const description = t(page.description);
    const siteUrl = company.siteUrl.replace(/\/+$/, '');
    const canonicalUrl = page.indexable
      ? `${siteUrl}${routeLanguage ? localizeHref(page.path, routeLanguage) : page.path}`
      : `${siteUrl}${window.location.pathname}`;
    const socialImage = `${siteUrl}/images/catalog/fisherman-salmon.webp`;
    const socialImageAlt = t('Produtor norueguês segurando um salmão inteiro junto a um fiorde');

    document.documentElement.lang = htmlLanguage;
    document.title = title;

    setMetaContent('meta[name="description"]', { name: 'description' }, description);
    setMetaContent(
      'meta[name="robots"]',
      { name: 'robots' },
      page.indexable ? 'index, follow' : 'noindex, nofollow',
    );
    setLinkHref('link[rel="canonical"]', { rel: 'canonical' }, canonicalUrl);
    setMetaContent('meta[property="og:locale"]', { property: 'og:locale' }, openGraphLocales[language]);
    setMetaContent('meta[property="og:title"]', { property: 'og:title' }, title);
    setMetaContent('meta[property="og:description"]', { property: 'og:description' }, description);
    setMetaContent('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    setMetaContent('meta[property="og:image"]', { property: 'og:image' }, socialImage);
    setMetaContent('meta[property="og:image:alt"]', { property: 'og:image:alt' }, socialImageAlt);
    setMetaContent('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
    setMetaContent('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
    setMetaContent('meta[name="twitter:image"]', { name: 'twitter:image' }, socialImage);
    setMetaContent('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, socialImageAlt);

    if (page.indexable) {
      updateAlternateLinks(siteUrl, page.path);
      updateOpenGraphAlternateLocales(language);
    } else {
      document.head
        .querySelectorAll('[data-i18n-alternate], [data-og-locale-alternate]')
        .forEach((element) => element.remove());
    }

    let structuredData = document.getElementById('structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'structured-data';
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: company.name,
          url: siteUrl,
          taxID: company.cnpj,
          description: t(company.description),
          image: socialImage,
          founder: { '@id': `${siteUrl}/#mai-tonheim` },
          areaServed: { '@type': 'Country', name: t('Brasil') },
          address: {
            '@type': 'PostalAddress',
            addressLocality: company.city,
            addressRegion: company.state,
            addressCountry: 'BR',
          },
          knowsAbout: [
            t('Salmão norueguês'),
            t('Comércio internacional'),
            'Food service',
            t('Distribuição de pescados'),
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: company.phone,
            email: company.email,
            areaServed: 'BR',
            availableLanguage: ['Portuguese', 'English', 'Spanish', 'Norwegian'],
          },
        },
        {
          '@type': 'Organization',
          '@id': `${siteUrl}/#norwell`,
          name: norwell.name,
          url: norwell.site,
          description: t(norwell.intro),
        },
        {
          '@type': 'Person',
          '@id': `${siteUrl}/#mai-tonheim`,
          name: 'Mai Tonheim',
          jobTitle: t('Fundadora e representante comercial no Brasil'),
          sameAs: company.linkedin,
          worksFor: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: company.name,
          inLanguage: htmlLanguage,
          publisher: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': page.schemaType,
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          inLanguage: htmlLanguage,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about:
            page.path === '/sobre'
              ? { '@id': `${siteUrl}/#mai-tonheim` }
              : page.path === '/a-norwell'
                ? { '@id': `${siteUrl}/#norwell` }
              : { '@id': `${siteUrl}/#organization` },
        },
      ],
    });
  }, [language, location, routeLanguage, t]);

  const value = useMemo<I18nContextValue>(
    () => ({ language, preference, setPreference, href, t }),
    [href, language, preference, setPreference, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}

export type { Language, LanguagePreference, TranslationVariables } from './translations';
