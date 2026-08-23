import { expect, test } from '@playwright/test';
import { openApp } from './helpers/site';

test.describe('progressive motion enhancement', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('loads GSAP on demand and activates the editorial scroll choreography', async ({ page }) => {
    await openApp(page, '/pt');

    await expect
      .poll(() =>
        page
          .locator('[data-gsap-parallax], [data-gsap-drift], [data-gsap-progress]')
          .evaluateAll((elements) =>
            elements.filter((element) => element.getAttribute('style')?.includes('transform')).length,
          ),
      )
      .toBeGreaterThan(0);

    await expect(page.locator('.ocean-glint')).toHaveCSS('animation-name', 'ocean-glint');
  });
});
