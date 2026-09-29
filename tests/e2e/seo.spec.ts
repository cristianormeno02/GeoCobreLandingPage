import { expect, test } from '@playwright/test';
import { LOCALE_PATHS, LOCALES, SITE } from './helpers';

for (const lang of LOCALES) {
  test(`metadatos SEO e i18n (${lang})`, async ({ page }) => {
    await page.goto(LOCALE_PATHS[lang]);

    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page).toHaveTitle(/GeoCobre/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}${LOCALE_PATHS[lang]}`);

    for (const property of ['og:title', 'og:description', 'og:image', 'og:locale', 'og:url', 'og:type']) {
      await expect(page.locator(`meta[property="${property}"]`)).toHaveAttribute('content', /.+/);
    }
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\//);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) => links.map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')]));
    expect(alternates).toEqual([
      ['es', `${SITE}/`],
      ['en', `${SITE}/en/`],
      ['pt', `${SITE}/pt/`],
      ['fr', `${SITE}/fr/`],
      ['x-default', `${SITE}/`],
    ]);

    const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '');
    expect(jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'GeoCobre',
      url: `${SITE}${LOCALE_PATHS[lang]}`,
    });
  });
}

test('la página principal tiene un único h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
});

test('la 404 enlaza al inicio y no se indexa', async ({ page }) => {
  const response = await page.goto('/no-existe/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  await expect(page).toHaveURL('/');
});

test('robots.txt permite rastrear y declara el sitemap', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).toContain('Allow: /');
  expect(body).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
});

test('la imagen Open Graph existe', async ({ page, request }) => {
  await page.goto('/');
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
  const response = await request.get(new URL(ogImage!).pathname);
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('image/');
});

test('el sitemap incluye las cuatro versiones de idioma', async ({ request }) => {
  const body = await (await request.get('/sitemap-0.xml')).text();
  for (const path of Object.values(LOCALE_PATHS)) {
    expect(body).toContain(`<loc>${SITE}${path}</loc>`);
  }
  expect(body).not.toContain('404');
});
