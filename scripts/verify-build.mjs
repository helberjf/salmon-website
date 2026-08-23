import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from './route-seo.mjs';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const distDirectory = join(projectRoot, 'dist');
const languages = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
  no: 'nb-NO',
};
const pagesByPath = new Map(Object.values(pages).map((page) => [page.path, page]));
const contentPaths = [...pagesByPath.keys()];
const socialImagesByPath = {
  '': 'home.jpg',
  '/produtos': 'products.jpg',
  '/a-norwell': 'norwell.jpg',
  '/sobre': 'about.jpg',
  '/privacidade': 'privacy.jpg',
  '/termos': 'terms.jpg',
};
const companySource = readFileSync(join(projectRoot, 'src', 'data', 'company.ts'), 'utf8');
const siteUrlMatch = companySource.match(/siteUrl:\s*['"]([^'"]+)['"]/);
if (!siteUrlMatch) throw new Error('Could not read siteUrl from src/data/company.ts.');
const siteUrl = siteUrlMatch[1].replace(/\/+$/, '');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function decodeHtml(value) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readTitle(html, routePath) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(match, `Missing title: ${routePath}`);
  return decodeHtml(match[1].trim());
}

function readMeta(html, attribute, value, routePath) {
  const tag = html.match(
    new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(value)}["'][^>]*>`, 'i'),
  );
  assert(tag, `Missing ${attribute}=${value}: ${routePath}`);
  const content = tag[0].match(/\bcontent=(["'])(.*?)\1/i);
  assert(content, `Missing content for ${attribute}=${value}: ${routePath}`);
  return decodeHtml(content[2]);
}

function readStructuredData(html, routePath) {
  const match = html.match(
    /<script\s+id=["']structured-data["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  assert(match, `Missing structured data: ${routePath}`);
  try {
    return JSON.parse(match[1]);
  } catch {
    throw new Error(`Invalid structured data JSON: ${routePath}`);
  }
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
    const title = readTitle(html, routePath);
    const description = readMeta(html, 'name', 'description', routePath);
    const expectedPage = pagesByPath.get(contentPath);
    assert(expectedPage, `Missing canonical SEO source: ${routePath}`);
    const expectedTitle = expectedPage.title[language];
    const expectedDescription = expectedPage.description[language];
    const socialImage = `${siteUrl}/images/social/${socialImagesByPath[contentPath]}`;
    const structuredData = readStructuredData(html, routePath);
    const pageSchema = structuredData['@graph']?.find(
      (item) => item['@id'] === `${canonical}#webpage`,
    );

    assert(directoryHtml === html, `Static route aliases differ: ${routePath}`);
    assert(html.includes(`<html lang="${htmlLanguage}">`), `Wrong lang attribute: ${routePath}`);
    assert(html.includes(`<link rel="canonical" href="${canonical}" />`), `Wrong canonical: ${routePath}`);
    assert(title === expectedTitle, `Wrong localized title: ${routePath}`);
    assert(description === expectedDescription, `Wrong localized description: ${routePath}`);
    assert(readMeta(html, 'property', 'og:title', routePath) === title, `Wrong og:title: ${routePath}`);
    assert(
      readMeta(html, 'property', 'og:description', routePath) === description,
      `Wrong og:description: ${routePath}`,
    );
    assert(readMeta(html, 'property', 'og:url', routePath) === canonical, `Wrong og:url: ${routePath}`);
    assert(readMeta(html, 'name', 'twitter:title', routePath) === title, `Wrong twitter:title: ${routePath}`);
    assert(
      readMeta(html, 'name', 'twitter:description', routePath) === description,
      `Wrong twitter:description: ${routePath}`,
    );
    assert(
      readMeta(html, 'property', 'og:image', routePath) === socialImage,
      `Wrong social image: ${routePath}`,
    );
    assert(
      readMeta(html, 'name', 'twitter:image', routePath) === socialImage,
      `Wrong Twitter image: ${routePath}`,
    );
    assert(html.includes('<meta property="og:image:width" content="1200" />'), `Wrong social image width: ${routePath}`);
    assert(html.includes('<meta property="og:image:height" content="630" />'), `Wrong social image height: ${routePath}`);
    assert((html.match(/data-i18n-alternate/g) ?? []).length === 5, `Wrong hreflang count: ${routePath}`);
    assert(html.includes(`"@id":"${canonical}#webpage"`), `Wrong structured data URL: ${routePath}`);
    assert(pageSchema, `Missing localized WebPage schema: ${routePath}`);
    assert(pageSchema['@type'] === expectedPage.schemaType, `Wrong structured data type: ${routePath}`);
    assert(pageSchema.name === title, `Wrong structured data title: ${routePath}`);
    assert(pageSchema.description === description, `Wrong structured data description: ${routePath}`);
    assert(pageSchema.inLanguage === htmlLanguage, `Wrong structured data language: ${routePath}`);
    assert(pageSchema.url === canonical, `Wrong structured data canonical: ${routePath}`);
    assert(!html.includes('/src/main.tsx'), `Unbuilt script reference found: ${routePath}`);
    verifiedCount += 1;
  }
}

for (const contentPath of contentPaths) {
  const relativePath = contentPath ? `${contentPath.slice(1)}.html` : 'index.html';
  const html = readFileSync(join(distDirectory, relativePath), 'utf8');
  const canonical = `${siteUrl}${contentPath || '/'}`;
  const expectedPage = pagesByPath.get(contentPath);
  assert(expectedPage, `Missing canonical x-default SEO source: ${contentPath || '/'}`);
  assert(readTitle(html, contentPath || '/') === expectedPage.title.pt, `Wrong x-default title: ${contentPath || '/'}`);
  assert(
    readMeta(html, 'name', 'description', contentPath || '/') === expectedPage.description.pt,
    `Wrong x-default description: ${contentPath || '/'}`,
  );
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
