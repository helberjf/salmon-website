import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from './route-seo.mjs';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const distDirectory = join(projectRoot, 'dist');
const sourceHtml = readFileSync(join(distDirectory, 'index.html'), 'utf8');
const companySource = readFileSync(join(projectRoot, 'src', 'data', 'company.ts'), 'utf8');
const siteUrlMatch = companySource.match(/siteUrl:\s*['"]([^'"]+)['"]/);
const companyNameMatch = companySource.match(/name:\s*['"]([^'"]+)['"]/);
const companyCnpjMatch = companySource.match(/cnpj:\s*['"]([^'"]+)['"]/);
if (!siteUrlMatch) throw new Error('Could not read siteUrl from src/data/company.ts.');
if (!companyNameMatch) throw new Error('Could not read name from src/data/company.ts.');
if (!companyCnpjMatch) throw new Error('Could not read cnpj from src/data/company.ts.');
const siteUrl = siteUrlMatch[1].replace(/\/+$/, '');
const companyName = companyNameMatch[1];
const companyCnpj = companyCnpjMatch[1];
const socialImagesByPage = {
  '': 'home.jpg',
  '/produtos': 'products.jpg',
  '/a-norwell': 'norwell.jpg',
  '/sobre': 'about.jpg',
  '/privacidade': 'privacy.jpg',
  '/termos': 'terms.jpg',
};

const languages = {
  pt: {
    html: 'pt-BR',
    og: 'pt_BR',
    country: 'Brasil',
    founderTitle: 'Fundadora e representante comercial no Brasil',
    organizationDescription:
      'Representação comercial e fornecimento B2B de salmão norueguês no Brasil, em conexão direta com a exportadora Norwell.',
    norwellDescription:
      'Fundada em 1996 em Florø, na costa oeste da Noruega, a Norwell é uma exportadora de porte médio de salmão e truta noruegueses. Cerca de 70% do seu capital pertence aos próprios produtores e 30% a colaboradores-chave — um arranjo societário que aproxima quem cria o peixe de quem o exporta.',
    knowsAbout: ['Salmão norueguês', 'Comércio internacional', 'Food service', 'Distribuição de pescados'],
    imageAlt: 'Produtor norueguês segurando um salmão inteiro junto a um fiorde',
  },
  en: {
    html: 'en',
    og: 'en_US',
    country: 'Brazil',
    founderTitle: 'Founder and commercial representative in Brazil',
    organizationDescription:
      'Commercial representation and B2B supply of Norwegian salmon in Brazil, directly connected to exporter Norwell.',
    norwellDescription:
      'Founded in 1996 in Florø, on Norway’s west coast, Norwell is a mid-sized exporter of Norwegian salmon and trout. Around 70% of the company is owned by the farmers themselves and 30% by key employees — an ownership structure that keeps those who raise the fish close to those who export it.',
    knowsAbout: ['Norwegian salmon', 'International trade', 'Food service', 'Seafood distribution'],
    imageAlt: 'Norwegian producer holding a whole salmon beside a fjord',
  },
  es: {
    html: 'es',
    og: 'es_ES',
    country: 'Brasil',
    founderTitle: 'Fundadora y representante comercial en Brasil',
    organizationDescription:
      'Representación comercial y suministro B2B de salmón noruego en Brasil, en conexión directa con la exportadora Norwell.',
    norwellDescription:
      'Fundada en 1996 en Florø, en la costa oeste de Noruega, Norwell es una exportadora de tamaño medio de salmón y trucha noruegos. Cerca del 70% de su capital pertenece a los propios productores y el 30% a colaboradores clave, una estructura societaria que acerca a quien cría el pescado con quien lo exporta.',
    knowsAbout: ['Salmón noruego', 'Comercio internacional', 'Food service', 'Distribución de productos del mar'],
    imageAlt: 'Productor noruego sosteniendo un salmón entero junto a un fiordo',
  },
  no: {
    html: 'nb-NO',
    og: 'nb_NO',
    country: 'Brasil',
    founderTitle: 'Grunnlegger og kommersiell representant i Brasil',
    organizationDescription:
      'Kommersiell representasjon og B2B-leveranser av norsk laks i Brasil, i direkte kontakt med eksportøren Norwell.',
    norwellDescription:
      'Norwell ble etablert i 1996 i Florø på Vestlandet og er en mellomstor eksportør av norsk laks og ørret. Rundt 70 % eies av oppdretterne selv og 30 % av nøkkelansatte — en eierstruktur som holder dem som produserer fisken tett på dem som eksporterer den.',
    knowsAbout: ['Norsk laks', 'Internasjonal handel', 'Food service', 'Distribusjon av sjømat'],
    imageAlt: 'Norsk produsent som holder en hel laks ved en fjord',
  },
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceRequired(html, pattern, replacement, label) {
  assert(pattern.test(html), `Could not replace ${label} in generated HTML.`);
  return html.replace(pattern, replacement);
}

function replaceMeta(html, attribute, value, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${value}["'][^>]*>`, 'i');
  return replaceRequired(
    html,
    pattern,
    `<meta ${attribute}="${value}" content="${escapeHtml(content)}" />`,
    `${attribute}=${value}`,
  );
}

function alternatesFor(contentPath) {
  const items = Object.entries(languages).map(
    ([language, locale]) =>
      `<link data-i18n-alternate rel="alternate" hreflang="${locale.html}" href="${siteUrl}/${language}${contentPath}" />`,
  );
  items.push(
    `<link data-i18n-alternate rel="alternate" hreflang="x-default" href="${siteUrl}${contentPath || '/'}" />`,
  );
  return items.join('\n    ');
}

function structuredData({ canonicalUrl, language, locale, page, title, description, socialImage }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: companyName,
        url: `${siteUrl}/`,
        taxID: companyCnpj,
        description: locale.organizationDescription,
        image: socialImage,
        founder: { '@id': `${siteUrl}/#mai-tonheim` },
        areaServed: { '@type': 'Country', name: locale.country },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rio de Janeiro',
          addressRegion: 'RJ',
          addressCountry: 'BR',
        },
        knowsAbout: locale.knowsAbout,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+55 21 96569-0982',
          email: 'mai@bridgepoint.international',
          areaServed: 'BR',
          availableLanguage: ['Portuguese', 'English', 'Spanish', 'Norwegian'],
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#norwell`,
        name: 'Norwell AS',
        url: 'https://www.norwell.no/',
        description: locale.norwellDescription,
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#mai-tonheim`,
        name: 'Mai Tonheim',
        jobTitle: locale.founderTitle,
        sameAs: 'https://www.linkedin.com/in/mai-tonheim-iam/',
        worksFor: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: companyName,
        inLanguage: locale.html,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': page.schemaType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: locale.html,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about:
          page.path === '/sobre'
            ? { '@id': `${siteUrl}/#mai-tonheim` }
            : page.path === '/a-norwell'
              ? { '@id': `${siteUrl}/#norwell` }
            : { '@id': `${siteUrl}/#organization` },
      },
    ],
  };
}

function renderRoute(language, page, localized = true) {
  const locale = languages[language];
  const contentPath = page.path;
  const routePath = localized ? `/${language}${contentPath}` : contentPath || '/';
  const canonicalUrl = `${siteUrl}${routePath}`;
  const title = page.title[language];
  const description = page.description[language];
  const socialImageName = socialImagesByPage[page.path] ?? socialImagesByPage[''];
  const socialImage = `${siteUrl}/images/social/${socialImageName}`;
  let html = sourceHtml;

  html = replaceRequired(html, /<html\s+lang=["'][^"']+["']>/i, `<html lang="${locale.html}">`, 'html lang');
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`, 'title');
  html = replaceMeta(html, 'name', 'description', description);
  html = replaceMeta(html, 'name', 'robots', 'index, follow');
  html = html.replace(/\s*<link\s+data-i18n-alternate[^>]*>/gi, '');
  html = replaceRequired(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonicalUrl}" />\n    ${alternatesFor(contentPath)}`,
    'canonical and alternate links',
  );
  html = replaceMeta(html, 'property', 'og:locale', locale.og);
  html = html.replace(/\s*<meta\s+data-og-locale-alternate[^>]*>/gi, '');
  html = replaceRequired(
    html,
    /<meta\s+property=["']og:locale["'][^>]*>/i,
    (match) => {
      const alternates = Object.values(languages)
        .filter((candidate) => candidate.og !== locale.og)
        .map(
          (candidate) =>
            `<meta data-og-locale-alternate property="og:locale:alternate" content="${candidate.og}" />`,
        )
        .join('\n    ');
      return `${match}\n    ${alternates}`;
    },
    'Open Graph locale alternates',
  );
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
  html = replaceMeta(html, 'property', 'og:image', socialImage);
  html = replaceMeta(html, 'property', 'og:image:alt', title);
  html = replaceMeta(html, 'property', 'og:image:width', '1200');
  html = replaceMeta(html, 'property', 'og:image:height', '630');
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', description);
  html = replaceMeta(html, 'name', 'twitter:image', socialImage);
  html = replaceMeta(html, 'name', 'twitter:image:alt', title);

  const schema = JSON.stringify(
    structuredData({ canonicalUrl, language, locale, page, title, description, socialImage }),
  );
  html = replaceRequired(
    html,
    /<script\s+id=["']structured-data["'][^>]*>[\s\S]*?<\/script>/i,
    `<script id="structured-data" type="application/ld+json">${schema}</script>`,
    'structured data',
  );

  return { html, routePath };
}

function writeRoute(routePath, html) {
  if (routePath === '/') {
    writeFileSync(join(distDirectory, 'index.html'), html, 'utf8');
    return;
  }

  const extensionTarget = join(distDirectory, `${routePath.slice(1)}.html`);
  const directoryTarget = join(distDirectory, routePath.slice(1), 'index.html');
  mkdirSync(dirname(extensionTarget), { recursive: true });
  mkdirSync(dirname(directoryTarget), { recursive: true });
  writeFileSync(extensionTarget, html, 'utf8');
  writeFileSync(directoryTarget, html, 'utf8');
}

let generatedCount = 0;
for (const [language, locale] of Object.entries(languages)) {
  for (const page of Object.values(pages)) {
    const rendered = renderRoute(language, page);
    writeRoute(rendered.routePath, rendered.html);
    generatedCount += 1;
  }
}

for (const page of Object.values(pages)) {
  const rendered = renderRoute('pt', page, false);
  writeRoute(rendered.routePath, rendered.html);
}

// `/norwell` is a compatibility alias requested by the business. It reuses
// the canonical `/a-norwell` metadata so search engines see one authoritative URL.
for (const language of Object.keys(languages)) {
  const rendered = renderRoute(language, pages.norwell);
  writeRoute(`/${language}/norwell`, rendered.html);
}
writeRoute('/norwell', renderRoute('pt', pages.norwell, false).html);

console.log(
  `Generated static metadata for ${generatedCount} localized routes, ${Object.keys(pages).length} x-default routes and 5 Norwell aliases.`,
);
