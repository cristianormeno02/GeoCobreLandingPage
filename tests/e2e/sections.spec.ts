import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('hero', () => {
  test('muestra titular, credenciales y CTAs', async ({ page }) => {
    const hero = page.locator('#inicio');
    await expect(hero.getByRole('heading', { level: 1 })).toHaveText(
      'Transformamos incertidumbre geológica en decisiones estratégicas',
    );
    await expect(hero.getByText('TRL 5', { exact: true })).toBeVisible();
    await expect(hero.getByText('Tecnología validada en un entorno relevante')).toBeVisible();
    await expect(hero.getByText('Validado en Morro del Cobre')).toBeVisible();
    await expect(hero.getByRole('link', { name: 'Solicitar asesoría' })).toHaveAttribute('href', '#contacto');
    await expect(hero.getByRole('link', { name: 'Ver servicios' })).toHaveAttribute('href', '#servicios');
  });
});

test.describe('metodología', () => {
  test('muestra las etapas en orden y los dos beneficios', async ({ page }) => {
    const section = page.locator('#metodologia');
    await expect(section.locator('ol > li h3')).toHaveText(['Muestreo', 'Análisis', 'Interpretación']);
    await expect(section.getByRole('heading', { name: 'Reducción de riesgo financiero' })).toBeVisible();
    await expect(section.getByRole('heading', { name: 'Reducción de impacto ambiental' })).toBeVisible();
  });
});

test.describe('servicios', () => {
  test('agrupa los servicios en Campo y Laboratorio con CTA preseleccionado', async ({ page }) => {
    const section = page.locator('#servicios');
    for (const [group, type] of [
      ['Campo', 'field'],
      ['Laboratorio', 'lab'],
    ] as const) {
      const region = section.getByRole('region', { name: group });
      const cards = region.getByRole('article');
      expect(await cards.count()).toBeGreaterThanOrEqual(1);
      for (const card of await cards.all()) {
        await expect(card.getByRole('heading', { level: 4 })).toBeVisible();
        await expect(card.getByRole('link', { name: /Consultar/ })).toHaveAttribute('href', `?tipo=${type}#contacto`);
      }
    }
    await expect(section.getByRole('heading', { name: 'Interpretación integrada de resultados' })).toBeVisible();
  });
});

test.describe('validación', () => {
  test('muestra el caso Morro del Cobre y la escala TRL con el nivel 5 resaltado', async ({ page }) => {
    const section = page.locator('#validacion');
    await expect(section.getByRole('heading', { name: 'Proyecto Morro del Cobre' })).toBeVisible();
    await expect(section.locator('ol[data-trl-scale] > li')).toHaveCount(9);
    const current = section.locator('ol[data-trl-scale] > li[aria-current="step"]');
    await expect(current).toHaveCount(1);
    await expect(current).toContainText('5');
    await expect(current).toContainText('Tecnología validada en entorno relevante');
  });
});

test.describe('equipo', () => {
  test('muestra una tarjeta por especialista con nombre, rol y especialidad', async ({ page }) => {
    const cards = page.locator('#equipo').getByRole('article');
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
    for (const card of await cards.all()) {
      await expect(card.getByRole('heading', { level: 3 })).not.toBeEmpty();
      await expect(card.locator('[data-role]')).not.toBeEmpty();
      await expect(card.locator('[data-specialty]')).not.toBeEmpty();
    }
    for (const img of await page.locator('#equipo img').all()) {
      await expect(img).toHaveAttribute('alt', /^Fotografía de .+/);
    }
  });
});

test.describe('capacitación', () => {
  test('sin cursos confirmados muestra oferta en desarrollo y CTA', async ({ page }) => {
    const section = page.locator('#capacitacion');
    await expect(section.getByText('Oferta formativa en desarrollo')).toBeVisible();
    await expect(section.getByRole('link', { name: 'Solicitar información' })).toHaveAttribute(
      'href',
      '?tipo=training#contacto',
    );
  });
});

test.describe('alianzas', () => {
  test('muestra los cuatro tipos de aliado, el CTA y ningún logo sin confirmar', async ({ page }) => {
    const section = page.locator('#alianzas');
    await expect(section.locator('h3')).toHaveText([
      'Laboratorios',
      'Organismos gubernamentales',
      'Empresas mineras',
      'Universidades',
    ]);
    await expect(section.getByRole('link', { name: 'Proponer una alianza' })).toHaveAttribute(
      'href',
      '?tipo=alliance#contacto',
    );
    await expect(section.locator('img')).toHaveCount(0);
  });
});
