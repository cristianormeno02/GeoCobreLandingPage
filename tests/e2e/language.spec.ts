import { expect, test } from '@playwright/test';

const NATIVE = [
  ['es', 'Español', '/'],
  ['en', 'English', '/en/'],
  ['pt', 'Português', '/pt/'],
  ['fr', 'Français', '/fr/'],
] as const;

test('el selector ofrece los cuatro idiomas con su nombre nativo y atributo lang', async ({ page }) => {
  await page.goto('/');
  const switcher = page.getByRole('banner').getByRole('navigation', { name: 'Idioma' });
  for (const [lang, name, href] of NATIVE) {
    const link = switcher.getByRole('link', { name });
    await expect(link).toHaveAttribute('lang', lang);
    await expect(link).toHaveAttribute('href', href);
  }
  await expect(switcher.getByRole('link', { name: 'Español' })).toHaveAttribute('aria-current', 'page');
});

test('cambiar de idioma navega a la versión equivalente', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('banner')
    .getByRole('navigation', { name: 'Idioma' })
    .getByRole('link', { name: 'English' })
    .click();
  await expect(page).toHaveURL('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveText('We turn geological uncertainty into strategic decisions');
  const switcher = page.getByRole('banner').getByRole('navigation', { name: 'Language' });
  await expect(switcher.getByRole('link', { name: 'English' })).toHaveAttribute('aria-current', 'page');
  await expect(switcher.getByRole('link', { name: 'Español' })).not.toHaveAttribute('aria-current');
});

test('el selector también está disponible en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/fr/');
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Português' }).click();
  await expect(page).toHaveURL('/pt/');
});

test('no redirige según el idioma del navegador', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveURL('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await context.close();
});
