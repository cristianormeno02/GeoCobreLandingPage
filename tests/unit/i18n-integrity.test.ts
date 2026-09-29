import { describe, expect, it } from 'vitest';
import { LOCALES, t } from '../../src/i18n/utils';

/** Devuelve las rutas de todas las hojas, p. ej. `hero.title` o `nav.links.0.label`. */
function leafPaths(value: unknown, prefix = ''): string[] {
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      leafPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

const source = leafPaths(t('es')).sort();

describe('integridad de traducciones', () => {
  it('el diccionario fuente tiene contenido', () => {
    expect(source.length).toBeGreaterThan(50);
  });

  for (const lang of LOCALES.filter((l) => l !== 'es')) {
    it(`${lang} tiene exactamente las mismas claves que es`, () => {
      const keys = leafPaths(t(lang)).sort();
      const missing = source.filter((k) => !keys.includes(k));
      const extra = keys.filter((k) => !source.includes(k));
      expect({ lang, missing, extra }).toEqual({ lang, missing: [], extra: [] });
    });

    it(`${lang} no tiene textos vacíos`, () => {
      const dict = t(lang);
      const empty = leafPaths(dict).filter((path) => {
        const leaf = path.split('.').reduce<unknown>((node, k) => (node as Record<string, unknown>)[k], dict);
        return typeof leaf === 'string' && leaf.trim() === '';
      });
      expect(empty).toEqual([]);
    });
  }
});
