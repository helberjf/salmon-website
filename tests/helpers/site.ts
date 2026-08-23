import { expect, type Page } from '@playwright/test';

export const locales = [
  { code: 'pt', htmlLang: 'pt-BR' },
  { code: 'en', htmlLang: 'en' },
  { code: 'es', htmlLang: 'es' },
  { code: 'no', htmlLang: 'nb-NO' },
] as const;

export const primaryContentPaths = ['/', '/produtos', '/a-norwell', '/sobre'] as const;

export function localizedPath(locale: string, contentPath: string): string {
  return contentPath === '/' ? `/${locale}` : `/${locale}${contentPath}`;
}

export async function openApp(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toBeVisible();
}

export async function expectHealthyDocument(page: Page): Promise<void> {
  await expect(page).toHaveTitle(/\S+/);
  await expect(page.locator('main#main-content')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);

  const headingLevels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((headings) =>
    headings
      .filter((heading) => {
        const style = window.getComputedStyle(heading);
        return style.display !== 'none' && style.visibility !== 'hidden';
      })
      .map((heading) => Number(heading.tagName.slice(1))),
  );

  expect(headingLevels[0]).toBe(1);
  for (let index = 1; index < headingLevels.length; index += 1) {
    expect(
      headingLevels[index] - headingLevels[index - 1],
      `Heading level skipped at position ${index}: ${headingLevels.join(' -> ')}`,
    ).toBeLessThanOrEqual(1);
  }
}

export async function expectIndexableSeo(page: Page, expectedPath: string): Promise<void> {
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description?.trim().length, 'Meta description must be meaningful').toBeGreaterThan(50);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index\s*,\s*follow/i);

  const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonicalHref, 'A canonical URL must be present').toBeTruthy();
  const canonical = new URL(canonicalHref!);
  expect(canonical.protocol).toBe('https:');
  expect(canonical.pathname.replace(/\/$/, '') || '/').toBe(expectedPath);

  const alternateTags = await page
    .locator('link[rel="alternate"][hreflang]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('hreflang')));
  expect(new Set(alternateTags)).toEqual(new Set(['pt-BR', 'en', 'es', 'nb-NO', 'x-default']));

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /\S+/);
  const openGraphDescription = await page
    .locator('meta[property="og:description"]')
    .getAttribute('content');
  expect(openGraphDescription?.trim().length, 'Open Graph description must be meaningful').toBeGreaterThan(50);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonicalHref!);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/.+/);
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', /\S+/);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /^https:\/\/.+/);

  const structuredDataText = await page.locator('#structured-data').textContent();
  expect(structuredDataText, 'JSON-LD must be present').toBeTruthy();
  expect(() => JSON.parse(structuredDataText!)).not.toThrow();
  const structuredData = JSON.parse(structuredDataText!) as { '@graph'?: unknown[] };
  expect(Array.isArray(structuredData['@graph'])).toBe(true);
  expect(structuredData['@graph']!.length).toBeGreaterThanOrEqual(4);
}

export async function expectImagesAreUsable(page: Page): Promise<void> {
  const images = page.locator('img');
  const initialImageCount = await images.count();
  expect(initialImageCount).toBeGreaterThan(0);

  // Ask the browser to fetch every native-lazy image without sequential scroll
  // actions, which become flaky when several full-page checks run in parallel.
  await images.evaluateAll((elements) => {
    for (const element of elements) (element as HTMLImageElement).loading = 'eager';
  });
  await expect
    .poll(() =>
      images.evaluateAll((elements) =>
        elements.every((element) => {
          const image = element as HTMLImageElement;
          return image.complete && image.naturalWidth > 0;
        }),
      ),
    )
    .toBe(true);

  const failures = await images.evaluateAll((elements) =>
    elements.flatMap((element, index) => {
      const image = element as HTMLImageElement;
      const issues: string[] = [];
      if (!image.hasAttribute('alt')) issues.push('missing alt attribute');
      if (!image.complete || image.naturalWidth === 0) issues.push('failed to load');
      return issues.map((issue) => `image ${index} (${image.currentSrc || image.src}): ${issue}`);
    }),
  );

  expect(failures, failures.join('\n')).toEqual([]);
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      })),
    )
    .toEqual({ clientWidth: 375, scrollWidth: 375 });
}

export async function localImageDimensions(
  page: Page,
  absoluteImageUrl: string,
): Promise<{ width: number; height: number }> {
  const imagePath = `${new URL(absoluteImageUrl).pathname}${new URL(absoluteImageUrl).search}`;
  return page.evaluate(
    (src) =>
      new Promise<{ width: number; height: number }>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
        image.onerror = () => reject(new Error(`Could not load social image: ${src}`));
        image.src = src;
      }),
    imagePath,
  );
}
