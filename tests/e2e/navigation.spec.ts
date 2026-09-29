import { expect, test } from '@playwright/test';

const SECTIONS = [
  ['Metodología', 'metodologia'],
  ['Servicios', 'servicios'],
  ['Validación', 'validacion'],
  ['Clientes', 'clientes'],
  ['Equipo', 'equipo'],
  ['Capacitación', 'capacitacion'],
  ['Alianzas', 'alianzas'],
  ['Contacto', 'contacto'],
] as const;

test('el primer elemento enfocable es "Saltar al contenido"', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  await expect(focused).toHaveText('Saltar al contenido');
  await expect(focused).toHaveAttribute('href', '#contenido');
  await expect(page.locator('main#contenido')).toHaveCount(1);
});

test.describe('escritorio', () => {
  test('muestra todos los enlaces de sección y el CTA', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    for (const [label, id] of SECTIONS) {
      const link = nav.getByRole('link', { name: label, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', `#${id}`);
    }
    await expect(page.getByRole('banner').getByRole('link', { name: 'Solicitar asesoría' })).toHaveAttribute(
      'href',
      '#contacto',
    );
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeHidden();
  });

  test('cada enlace lleva a su sección sin que el encabezado la cubra', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    for (const [label, id] of SECTIONS) {
      await nav.getByRole('link', { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const heading = page.locator(`#${id} h2`).first();
      await expect(heading).toBeInViewport();
      const headerBottom = await page.getByRole('banner').evaluate((el) => el.getBoundingClientRect().bottom);
      const headingTop = await heading.evaluate((el) => el.getBoundingClientRect().top);
      expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
    }
  });

  test('el encabezado permanece visible al desplazarse', async ({ page }) => {
    await page.goto('/');
    await page.mouse.wheel(0, 3000);
    await page.waitForFunction(() => window.scrollY > 1000);
    const top = await page.getByRole('banner').evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBe(0);
  });
});

test.describe('móvil', () => {
  test.use({ viewport: { width: 360, height: 780 } });

  test('el menú se abre, se cierra con Escape y al elegir un enlace', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Navegación principal' });
    const openButton = page.getByRole('button', { name: 'Abrir menú' });

    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
    await expect(nav.getByRole('link', { name: 'Servicios', exact: true })).toBeHidden();

    await openButton.click();
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    for (const [label] of SECTIONS) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }

    await page.keyboard.press('Escape');
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
    await expect(nav.getByRole('link', { name: 'Servicios', exact: true })).toBeHidden();

    await openButton.click();
    await nav.getByRole('link', { name: 'Servicios', exact: true }).click();
    await expect(page).toHaveURL(/#servicios$/);
    await expect(openButton).toHaveAttribute('aria-expanded', 'false');
  });
});
