import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const companySource = readFileSync(join(projectRoot, 'src', 'data', 'company.ts'), 'utf8');
const siteUrlMatch = companySource.match(/siteUrl:\s*['"]([^'"]+)['"]/);
if (!siteUrlMatch) throw new Error('Could not read siteUrl from src/data/company.ts.');
const siteUrl = siteUrlMatch[1].replace(/\/+$/, '');

const languages = [
  { code: 'pt', tag: 'pt-BR' },
  { code: 'en', tag: 'en' },
  { code: 'es', tag: 'es' },
  { code: 'no', tag: 'nb-NO' },
];

const pages = [
  { path: '', priority: '1.0' },
  { path: '/produtos', priority: '0.9' },
  { path: '/a-norwell', priority: '0.8' },
  { path: '/sobre', priority: '0.7' },
  { path: '/privacidade', priority: '0.2' },
  { path: '/termos', priority: '0.2' },
];

function localizedUrl(language, path) {
  return `${siteUrl}/${language}${path}`;
}

function renderEntry(language, page) {
  const alternates = languages
    .map(
      (candidate) =>
        `    <xhtml:link rel="alternate" hreflang="${candidate.tag}" href="${localizedUrl(candidate.code, page.path)}" />`,
    )
    .join('\n');
  const defaultUrl = `${siteUrl}${page.path || '/'}`;

  return `  <url>
    <loc>${localizedUrl(language.code, page.path)}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
    <priority>${page.priority}</priority>
  </url>`;
}

const entries = pages.flatMap((page) =>
  languages.map((language) => renderEntry(language, page)),
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

writeFileSync(join(projectRoot, 'public', 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap with ${entries.length} localized URLs.`);
