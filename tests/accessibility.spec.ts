import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { localizedPath, openApp, primaryContentPaths } from './helpers/site';

test.describe('@a11y WCAG A and AA automated checks', () => {
  for (const contentPath of primaryContentPaths) {
    test(`PT ${contentPath} has no detectable WCAG A/AA violations`, async ({ page }) => {
      await openApp(page, localizedPath('pt', contentPath));

      if (contentPath === '/') {
        await page.locator('#contato').scrollIntoViewIfNeeded();
        await expect(page.locator('#contato form')).toBeVisible();
      }

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(
        results.violations,
        results.violations
          .map(
            (violation) =>
              `${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help}\n${violation.nodes
                .map((node) => `  ${node.target.join(' ')}: ${node.failureSummary ?? ''}`)
                .join('\n')}`,
          )
          .join('\n\n'),
      ).toEqual([]);
    });
  }

  test('English home also passes automated WCAG A/AA checks', async ({ page }) => {
    await openApp(page, '/en');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
