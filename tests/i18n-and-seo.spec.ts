import { expect, test } from '@playwright/test';
import {
  expectHealthyDocument,
  expectImagesAreUsable,
  expectIndexableSeo,
  locales,
  localImageDimensions,
  localizedPath,
  openApp,
  primaryContentPaths,
} from './helpers/site';

test.describe('localized pages and metadata', () => {
  for (const locale of locales) {
    test(`${locale.code.toUpperCase()} home has localized structure and SEO`, async ({ page }) => {
      const path = localizedPath(locale.code, '/');
      await openApp(page, path);

      await expect(page.locator('html')).toHaveAttribute('lang', locale.htmlLang);
      await expectHealthyDocument(page);
      await expectIndexableSeo(page, path);
      await expectImagesAreUsable(page);
    });

    test(`${locale.code.toUpperCase()} internal route remains in the selected language`, async ({ page }) => {
      const path = localizedPath(locale.code, '/produtos');
      await openApp(page, path);

      await expect(page.locator('html')).toHaveAttribute('lang', locale.htmlLang);
      await expect(page).toHaveURL(new RegExp(`/${locale.code}/produtos/?$`));
      await expectHealthyDocument(page);
      await expectIndexableSeo(page, path);

      const homeHref = await page
        .getByRole('link', { name: /voltar|volver|back|tilbake/i })
        .first()
        .getAttribute('href');
      expect(homeHref).toBeTruthy();
      expect(new URL(homeHref!, 'https://example.test').pathname).toBe(`/${locale.code}`);
    });
  }

  for (const contentPath of primaryContentPaths) {
    test(`PT primary page ${contentPath} has sound headings and images`, async ({ page }) => {
      const path = localizedPath('pt', contentPath);
      await openApp(page, path);
      await expectHealthyDocument(page);
      await expectIndexableSeo(page, path);
      await expectImagesAreUsable(page);
    });
  }

  test('primary pages use distinct 1200 x 630 social images', async ({ page }) => {
    const socialImages = new Set<string>();

    for (const contentPath of primaryContentPaths) {
      await openApp(page, localizedPath('pt', contentPath));
      const openGraphImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');

      expect(openGraphImage).toBeTruthy();
      expect(twitterImage).toBe(openGraphImage);
      socialImages.add(new URL(openGraphImage!).pathname);
      const dimensions = await localImageDimensions(page, openGraphImage!);
      expect(dimensions).toEqual({
        width: 1200,
        height: 630,
      });
    }

    expect(socialImages.size).toBe(primaryContentPaths.length);
  });

  test('unknown route renders an accessible localized 404 with noindex', async ({ page }) => {
    await openApp(page, '/en/route-that-does-not-exist');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText('Error 404')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Page not found');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex\s*,\s*nofollow/i,
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    await expectHealthyDocument(page);
  });

  test('hero responsive sources do not declare a fixed 1600px slot', async ({ page }) => {
    await openApp(page, '/pt');
    await expect(page.locator('#inicio source[sizes="1600px"]')).toHaveCount(0);
  });
});

test.describe('system-language gateway', () => {
  test.use({ locale: 'es-ES' });

  test('unprefixed home follows the browser language without persisting a forced locale', async ({ page }) => {
    await openApp(page, '/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Salmón noruego');
    await expect(page).toHaveURL(/\/$/);
  });
});
