import { supportedLanguages, type Language } from './translations';

const languageSet = new Set<string>(supportedLanguages);
const staticContentPaths = new Set([
  '/',
  '/produtos',
  '/a-norwell',
  '/norwell',
  '/sobre',
  '/privacidade',
  '/termos',
]);

/** Returns the language encoded in the first URL segment, when present. */
export function languageFromPathname(pathname: string): Language | null {
  const segment = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  return segment && languageSet.has(segment) ? (segment as Language) : null;
}

/** Removes a supported language prefix while preserving the content path. */
export function stripLanguagePrefix(pathname: string): string {
  const language = languageFromPathname(pathname);
  if (!language) return pathname || '/';

  const withoutLanguage = pathname.replace(new RegExp(`^/${language}(?=/|$)`, 'i'), '');
  return withoutLanguage || '/';
}

/** Builds a crawlable, language-specific internal URL. */
export function localizeHref(href: string, language: Language): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = beforeHash.indexOf('?');
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : '';
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const contentPath = stripLanguagePrefix(pathname || '/');
  const localizedPath = contentPath === '/' ? `/${language}` : `/${language}${contentPath}`;

  return `${localizedPath}${query}${hash}`;
}

export function unlocalizedHref(href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = beforeHash.indexOf('?');
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : '';
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;

  return `${stripLanguagePrefix(pathname || '/')}${query}${hash}`;
}

/** Converts generated .html aliases back to the public, extensionless route. */
export function normalizeStaticHtmlPathname(pathname: string): string | null {
  let normalized: string;

  if (pathname === '/index.html') {
    normalized = '/';
  } else if (pathname.endsWith('/index.html')) {
    normalized = pathname.slice(0, -'/index.html'.length) || '/';
  } else if (pathname.endsWith('.html')) {
    normalized = pathname.slice(0, -'.html'.length) || '/';
  } else {
    return null;
  }

  const contentPath = stripLanguagePrefix(normalized).replace(/\/+$/, '') || '/';
  if (!staticContentPaths.has(contentPath)) return null;

  const language = languageFromPathname(normalized);
  return language ? localizeHref(contentPath, language) : contentPath;
}
