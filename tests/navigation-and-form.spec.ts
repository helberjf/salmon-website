import { expect, test } from '@playwright/test';
import { openApp } from './helpers/site';

test.describe('navigation and contact form', () => {
  test('desktop navigation keeps visitors in the active locale', async ({ page }) => {
    await openApp(page, '/es');

    const primaryNavigation = page.getByRole('navigation', { name: /navegación principal$/i });
    await primaryNavigation.getByRole('link', { name: 'Productos', exact: true }).click();

    await expect(page).toHaveURL(/\/es\/produtos\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('empty contact form exposes translated field errors without external navigation', async ({
    context,
    page,
  }) => {
    const externalRequests: string[] = [];
    await context.route(/https?:\/\/(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\/.*/i, (route) => {
      externalRequests.push(route.request().url());
      return route.abort();
    });

    await openApp(page, '/pt#contato');
    const form = page.locator('#contato form');
    await expect(form).toBeVisible();

    const pagesBeforeSubmit = context.pages().length;
    await form.getByRole('button', { name: 'Continuar pelo WhatsApp' }).click();

    await expect(form.getByLabel('Nome completo')).toHaveAttribute('aria-invalid', 'true');
    await expect(form.getByLabel('E-mail')).toHaveAttribute('aria-invalid', 'true');
    await expect(form.getByLabel('Telefone / WhatsApp')).toHaveAttribute('aria-invalid', 'true');
    await expect(form.locator('[role="alert"]')).not.toHaveCount(0);
    await expect(form).toBeVisible();
    expect(context.pages()).toHaveLength(pagesBeforeSubmit);
    expect(externalRequests).toEqual([]);
    await expect(page).toHaveURL(/\/pt#contato$/);
  });
});
