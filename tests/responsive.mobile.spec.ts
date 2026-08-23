import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import {
  expectNoHorizontalOverflow,
  localizedPath,
  openApp,
  primaryContentPaths,
} from './helpers/site';

test.describe('375px mobile experience', () => {
  for (const contentPath of primaryContentPaths) {
    test(`${contentPath} does not overflow horizontally`, async ({ page }) => {
      await openApp(page, localizedPath('pt', contentPath));
      await expectNoHorizontalOverflow(page);
    });
  }

  test('mobile menu is keyboard-accessible and changes language', async ({ page }) => {
    await openApp(page, '/pt');
    const menuButton = page.locator('button[aria-controls="menu-mobile"]');
    await expect(menuButton).toHaveAccessibleName('Abrir menu');
    const buttonBox = await menuButton.boundingBox();

    expect(buttonBox).not.toBeNull();
    expect(buttonBox!.width).toBeGreaterThanOrEqual(44);
    expect(buttonBox!.height).toBeGreaterThanOrEqual(44);

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(menuButton).toHaveAccessibleName('Fechar menu');
    await expect(page.locator('#menu-mobile')).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    const languageButton = page.locator('#menu-mobile').getByRole('button', {
      name: 'Selecionar idioma',
    });
    await languageButton.click();
    const languageList = page.getByRole('list', { name: 'Selecionar idioma' });
    await expect(languageList).toBeVisible();
    await languageList.getByRole('button', { name: 'English' }).click();

    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#menu-mobile')).toHaveCount(0);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });

  test('Escape closes the mobile menu and restores focus', async ({ page }) => {
    await openApp(page, '/pt');
    const menuButton = page.getByRole('button', { name: 'Abrir menu' });
    await menuButton.click();
    await page.keyboard.press('Escape');

    await expect(page.locator('#menu-mobile')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  });

  test('@a11y mobile home has no detectable WCAG A/AA violations', async ({ page }) => {
    await openApp(page, '/pt');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
