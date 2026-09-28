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

  test('primary navigation lists each destination once, plus a single quote CTA', async ({ page }) => {
    await openApp(page, '/pt');

    const primaryNavigation = page.getByRole('navigation', { name: 'Navegação principal', exact: true });
    const links = primaryNavigation.getByRole('link');
    await expect(links).toHaveText(['Início', 'Norwell', 'Produtos', 'Sobre', 'Contato', 'Solicitar cotação']);

    const hrefs = await links.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('href')),
    );
    expect(hrefs).toEqual([
      '/pt#inicio',
      '/pt/a-norwell',
      '/pt/produtos',
      '/pt/sobre',
      '/pt#contato',
      '/pt#contato',
    ]);
    // "Início" fica destacado só no topo da home, não no meio da página.
    await expect(primaryNavigation.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'location');
    await page.locator('#produtos').scrollIntoViewIfNeeded();
    await expect(primaryNavigation.getByRole('link', { name: 'Início' })).not.toHaveAttribute('aria-current', 'location');
    await expect(page.getByRole('link', { name: 'Bridge Point — voltar ao início' })).toBeVisible();
  });

  test('home hero leads to contact, "Quem somos" and the Norwell partnership, and contact has a WhatsApp shortcut', async ({ page }) => {
    await openApp(page, '/pt');

    const hero = page.locator('#inicio');
    await expect(hero.getByRole('link', { name: 'Fale com a Bridge Point' })).toHaveAttribute('href', '/pt#contato');
    await expect(hero.getByRole('link', { name: 'Quem somos' })).toHaveAttribute('href', '/pt/sobre');
    await expect(hero.getByRole('link', { name: /Representante oficial da Norwell no Brasil/ })).toHaveAttribute(
      'href',
      '/pt#parceria-norwell',
    );

    const partnership = page.locator('#parceria-norwell');
    await expect(partnership.getByRole('link', { name: 'Solicitar cotação' })).toHaveAttribute('href', '/pt#contato');
    await expect(partnership.getByRole('link', { name: 'Ver produtos' })).toHaveAttribute('href', '/pt/produtos');

    await page.locator('#contato').scrollIntoViewIfNeeded();
    const contact = page.locator('section#contato');
    const whatsApp = contact.getByRole('link', { name: 'Conversar pelo WhatsApp' });
    await expect(whatsApp).toHaveAttribute('href', /^https:\/\/wa\.me\/5521965690982\?text=/);
    await expect(whatsApp).toHaveAttribute('target', '_blank');
    await expect(contact.getByRole('link', { name: '+55 21 96569-0982' })).toHaveAttribute('href', 'tel:+5521965690982');
  });

  test('"Sobre a Mai" jumps to the founder section on the About page', async ({ page }) => {
    await openApp(page, '/pt/sobre');

    await page.getByRole('link', { name: 'Sobre a Mai' }).click();

    await expect(page).toHaveURL(/\/pt\/sobre#mai$/);
    await expect(page.getByRole('heading', { name: 'Mai Sissel Tonheim', level: 2 })).toBeInViewport();
  });

  test('Norwell page links its logo and a dedicated button to the official website', async ({ page }) => {
    await openApp(page, '/pt/a-norwell');

    const officialButton = page.getByRole('link', { name: /^Visitar o site oficial da Norwell/ }).first();
    await expect(officialButton).toHaveAttribute('href', 'https://www.norwell.no');
    await expect(officialButton).toHaveAttribute('target', '_blank');
    await expect(officialButton).toHaveAttribute('rel', /noopener/);

    const logoLink = page.getByRole('link', { name: /norwell\.no \(abre em nova aba\)/ });
    await expect(logoLink).toHaveAttribute('href', 'https://www.norwell.no');
    await expect(logoLink.getByRole('img', { name: 'Norwell AS' })).toBeVisible();
  });

  test('legal pages are final: no template notice and the legal entity is identified', async ({ page }) => {
    for (const [path, updatedAt] of [
      ['/pt/privacidade', '28 de setembro de 2026'],
      ['/pt/termos', '26 de setembro de 2026'],
    ]) {
      await openApp(page, path);
      await expect(page.getByText('modelo institucional básico')).toHaveCount(0);
      await expect(page.locator('main')).toContainText('Bridgepoint Consultancy Ltda,');
      await expect(page.locator('main')).toContainText(`Última atualização: ${updatedAt}.`);
    }
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
