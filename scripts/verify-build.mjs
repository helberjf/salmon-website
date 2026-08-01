import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const distDirectory = join(projectRoot, 'dist');
const languages = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
  no: 'nb-NO',
};
const contentPaths = ['', '/produtos', '/a-norwell', '/sobre', '/privacidade', '/termos'];
const companySource = readFileSync(join(projectRoot, 'src', 'data', 'company.ts'), 'utf8');
const siteUrlMatch = companySource.match(/siteUrl:\s*['"]([^'"]+)['"]/);
if (!siteUrlMatch) throw new Error('Could not read siteUrl from src/data/company.ts.');
const siteUrl = siteUrlMatch[1].replace(/\/+$/, '');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

let verifiedCount = 0;
for (const [language, htmlLanguage] of Object.entries(languages)) {
  for (const contentPath of contentPaths) {
    const routePath = `/${language}${contentPath}`;
    const filePath = join(distDirectory, `${routePath.slice(1)}.html`);
    assert(existsSync(filePath), `Missing static route HTML: ${routePath}`);
    const html = readFileSync(filePath, 'utf8');
    const directoryHtml = readFileSync(join(distDirectory, routePath.slice(1), 'index.html'), 'utf8');
    const canonical = `${siteUrl}${routePath}`;

    assert(directoryHtml === html, `Static route aliases differ: ${routePath}`);
    assert(html.includes(`<html lang="${htmlLanguage}">`), `Wrong lang attribute: ${routePath}`);
    assert(html.includes(`<link rel="canonical" href="${canonical}" />`), `Wrong canonical: ${routePath}`);
    assert((html.match(/data-i18n-alternate/g) ?? []).length === 5, `Wrong hreflang count: ${routePath}`);
    assert(html.includes(`"@id":"${canonical}#webpage"`), `Wrong structured data URL: ${routePath}`);
    assert(!html.includes('/src/main.tsx'), `Unbuilt script reference found: ${routePath}`);
    verifiedCount += 1;
  }
}

for (const contentPath of contentPaths) {
  const relativePath = contentPath ? `${contentPath.slice(1)}.html` : 'index.html';
  const html = readFileSync(join(distDirectory, relativePath), 'utf8');
  const canonical = `${siteUrl}${contentPath || '/'}`;
  assert(html.includes(`<link rel="canonical" href="${canonical}" />`), `Wrong x-default canonical: ${contentPath || '/'}`);
  if (contentPath) {
    const directoryHtml = readFileSync(join(distDirectory, contentPath.slice(1), 'index.html'), 'utf8');
    assert(directoryHtml === html, `x-default route aliases differ: ${contentPath}`);
  }
}

for (const [language, htmlLanguage] of Object.entries(languages)) {
  const aliasPath = `/${language}/norwell`;
  const canonicalPath = `/${language}/a-norwell`;
  const aliasHtml = readFileSync(join(distDirectory, `${aliasPath.slice(1)}.html`), 'utf8');
  const aliasDirectoryHtml = readFileSync(
    join(distDirectory, aliasPath.slice(1), 'index.html'),
    'utf8',
  );
  const canonicalHtml = readFileSync(
    join(distDirectory, `${canonicalPath.slice(1)}.html`),
    'utf8',
  );

  assert(aliasDirectoryHtml === aliasHtml, `Norwell alias files differ: ${aliasPath}`);
  assert(aliasHtml === canonicalHtml, `Norwell alias metadata differs: ${aliasPath}`);
  assert(aliasHtml.includes(`<html lang="${htmlLanguage}">`), `Wrong alias lang: ${aliasPath}`);
  assert(
    aliasHtml.includes(`<link rel="canonical" href="${siteUrl}${canonicalPath}" />`),
    `Wrong Norwell alias canonical: ${aliasPath}`,
  );
}

const norwellAliasHtml = readFileSync(join(distDirectory, 'norwell.html'), 'utf8');
assert(
  norwellAliasHtml === readFileSync(join(distDirectory, 'norwell', 'index.html'), 'utf8'),
  'Unprefixed Norwell alias files differ.',
);
assert(
  norwellAliasHtml === readFileSync(join(distDirectory, 'a-norwell.html'), 'utf8'),
  'Unprefixed Norwell alias metadata differs from the canonical route.',
);
assert(
  norwellAliasHtml.includes(`<link rel="canonical" href="${siteUrl}/a-norwell" />`),
  'Wrong unprefixed Norwell alias canonical.',
);

console.log(
  `Verified static metadata for ${verifiedCount} localized routes, ${contentPaths.length} x-default routes and 5 Norwell aliases.`,
);
