import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { LOCALE_PATHS, LOCALES } from './helpers';

for (const lang of LOCALES) {
  test.describe(`página principal (${lang})`, () => {
    test('no tiene desbordamiento horizontal', async ({ page }) => {
      await page.goto(LOCALE_PATHS[lang]);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });

    test('no tiene violaciones axe serias o críticas', async ({ page }) => {
      await page.goto(LOCALE_PATHS[lang]);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const serious = violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target.join(' ')) }));
      expect(serious).toEqual([]);
    });
  });
}
