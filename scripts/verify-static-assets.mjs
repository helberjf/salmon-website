import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return readFileSync(join(projectRoot, relativePath));
}

function jpegDimensions(buffer) {
  assert(buffer[0] === 0xff && buffer[1] === 0xd8, 'Invalid JPEG signature.');
  let offset = 2;

  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const segmentLength = buffer.readUInt16BE(offset);
    const startOfFrame = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker);
    if (startOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }
    offset += segmentLength;
  }

  throw new Error('JPEG dimensions were not found.');
}

const responsiveDirectory = join(projectRoot, 'public', 'images', 'responsive');
const responsiveFiles = readdirSync(responsiveDirectory).filter((name) => !name.startsWith('.'));
const responsivePairs = new Map();
const expectedVariants = {
  'culinary-01': [480, 800, 1200],
  'culinary-02': [480, 800],
  'culinary-03': [480, 800],
  'culinary-04': [480, 800, 1200],
  'culinary-05': [480, 800],
  'norway-farm-wide': [480, 800, 1200],
  'norway-fjord': [480, 800, 1200],
  'norway-fjord-portrait': [540, 1080],
  'norwell-hero': [480, 800, 1200, 1600],
  'norwell-hero-mobile': [480, 694],
  'norwell-salmon-dish': [480, 800],
  'mai-tonheim-consulate': [480, 800],
  'mai-tonheim-diplomacy': [480],
  'mai-tonheim-portrait': [480, 800],
  'mai-tonheim-salmon-preparation': [480, 800],
  'mai-tonheim-salmon-presentation': [480, 800, 1200],
  processing: [480, 800],
  'salmon-eggs': [480, 800],
  'salmon-farm': [480, 800],
  'salmon-fillet': [480, 800, 1200],
  'salmon-origin': [480, 800, 1200],
  'salmon-portions': [480, 800, 1200],
  'salmon-smoked': [480, 800, 1200],
  'salmon-underwater': [480, 800, 1200, 1600],
  'salmon-whole': [480, 800, 1200],
  smolt: [480, 800],
};
const expectedVariantKeys = new Set(
  Object.entries(expectedVariants).flatMap(([stem, widths]) =>
    widths.map((width) => `${stem}-${width}`),
  ),
);

for (const name of responsiveFiles) {
  const match = name.match(/^(.+)-(\d+)\.(avif|webp)$/);
  assert(match, `Unexpected responsive image filename: ${name}`);
  assert(statSync(join(responsiveDirectory, name)).size > 0, `Empty responsive image: ${name}`);

  const [, stem, width, extension] = match;
  const key = `${stem}-${width}`;
  const formats = responsivePairs.get(key) ?? new Set();
  formats.add(extension);
  responsivePairs.set(key, formats);

  const header = readFileSync(join(responsiveDirectory, name)).subarray(0, 16);
  if (extension === 'webp') {
    assert(header.toString('ascii', 0, 4) === 'RIFF', `Invalid WebP header: ${name}`);
    assert(header.toString('ascii', 8, 12) === 'WEBP', `Invalid WebP signature: ${name}`);
  } else {
    assert(header.toString('ascii', 4, 12) === 'ftypavif', `Invalid AVIF signature: ${name}`);
  }
}

assert(responsivePairs.size > 0, 'No responsive image pairs found.');
for (const key of expectedVariantKeys) {
  assert(responsivePairs.has(key), `Missing responsive image variant: ${key}`);
}
for (const [key, formats] of responsivePairs) {
  assert(expectedVariantKeys.has(key), `Unexpected responsive image variant: ${key}`);
  assert(formats.has('avif') && formats.has('webp'), `Missing AVIF/WebP pair: ${key}`);
}

for (const fontName of [
  'playfair-display-latin-variable.woff2',
  'plus-jakarta-sans-latin-variable.woff2',
]) {
  const font = read(`public/fonts/${fontName}`);
  assert(font.subarray(0, 4).toString('ascii') === 'wOF2', `Invalid WOFF2 font: ${fontName}`);
}

for (const licenseName of ['PlayfairDisplay-OFL.txt', 'PlusJakartaSans-OFL.txt']) {
  assert(read(`public/fonts/licenses/${licenseName}`).length > 1_000, `Missing font license: ${licenseName}`);
}

for (const socialImage of [
  'home.jpg',
  'products.jpg',
  'norwell.jpg',
  'about.jpg',
  'privacy.jpg',
  'terms.jpg',
]) {
  const image = read(`public/images/social/${socialImage}`);
  assert(image.length > 40_000, `Social image is unexpectedly small: ${socialImage}`);
  assert(image.length < 500_000, `Social image is too large: ${socialImage}`);
  const dimensions = jpegDimensions(image);
  assert(
    dimensions.width === 1200 && dimensions.height === 630,
    `Social image must be 1200x630: ${socialImage}`,
  );
}

const sitemap = read('public/sitemap.xml').toString('utf8');
assert((sitemap.match(/<url>/g) ?? []).length === 24, 'Sitemap must contain 24 localized URLs.');
assert((sitemap.match(/hreflang="x-default"/g) ?? []).length === 24, 'Sitemap x-default links are incomplete.');

const companySource = read('src/data/company.ts').toString('utf8');
const siteUrlMatch = companySource.match(/siteUrl:\s*['"]([^'"]+)['"]/);
assert(siteUrlMatch, 'Missing siteUrl in src/data/company.ts.');
const siteUrl = siteUrlMatch[1].replace(/\/+$/, '');
for (const path of ['index.html', 'public/robots.txt', 'public/sitemap.xml']) {
  assert(read(path).toString('utf8').includes(siteUrl), `Canonical siteUrl is inconsistent in ${path}.`);
}

const fontSources = `${read('index.html')}\n${read('src/index.css')}`;
assert(!/fonts\.(googleapis|gstatic)\.com/.test(fontSources), 'External Google Fonts reference found.');

console.log(
  `Static assets verified: ${responsivePairs.size} AVIF/WebP pairs, local fonts, licenses and sitemap.`,
);
