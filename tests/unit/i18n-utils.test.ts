import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LOCALE,
  LOCALES,
  getAlternates,
  getLangFromUrl,
  getLocalizedPath,
  LANGUAGE_NAMES,
  isLocale,
  t,
} from '../../src/i18n/utils';
import { es } from '../../src/i18n/es';
import { en } from '../../src/i18n/en';

describe('LOCALES', () => {
  it('soporta es, en, pt y fr con es por defecto', () => {
    expect(LOCALES).toEqual(['es', 'en', 'pt', 'fr']);
    expect(DEFAULT_LOCALE).toBe('es');
  });

  it('isLocale reconoce solo idiomas soportados', () => {
    expect(isLocale('fr')).toBe(true);
    expect(isLocale('de')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});

describe('t', () => {
  it('devuelve el diccionario del idioma', () => {
    expect(t('es')).toBe(es);
    expect(t('en')).toBe(en);
  });
});

describe('getLocalizedPath', () => {
  it('la página principal en español no lleva prefijo', () => {
    expect(getLocalizedPath('es', 'home')).toBe('/');
  });

  it('la página principal en otros idiomas lleva prefijo', () => {
    expect(getLocalizedPath('en', 'home')).toBe('/en/');
    expect(getLocalizedPath('pt', 'home')).toBe('/pt/');
    expect(getLocalizedPath('fr', 'home')).toBe('/fr/');
  });

  it('usa slugs traducidos para páginas secundarias', () => {
    expect(getLocalizedPath('es', 'privacy')).toBe('/privacidad/');
    expect(getLocalizedPath('en', 'privacy')).toBe('/en/privacy/');
    expect(getLocalizedPath('pt', 'thanks')).toBe('/pt/obrigado/');
    expect(getLocalizedPath('fr', 'thanks')).toBe('/fr/merci/');
  });
});

describe('getAlternates', () => {
  it('genera hreflang absolutos para los cuatro idiomas y x-default', () => {
    const alternates = getAlternates('home', 'https://geocobre.pages.dev');
    expect(alternates).toEqual([
      { hreflang: 'es', href: 'https://geocobre.pages.dev/' },
      { hreflang: 'en', href: 'https://geocobre.pages.dev/en/' },
      { hreflang: 'pt', href: 'https://geocobre.pages.dev/pt/' },
      { hreflang: 'fr', href: 'https://geocobre.pages.dev/fr/' },
      { hreflang: 'x-default', href: 'https://geocobre.pages.dev/' },
    ]);
  });

  it('tolera una barra final en el sitio', () => {
    expect(getAlternates('privacy', 'https://x.test/')[1]).toEqual({
      hreflang: 'en',
      href: 'https://x.test/en/privacy/',
    });
  });
});

describe('getLangFromUrl', () => {
  it('detecta el idioma por el primer segmento de la ruta', () => {
    expect(getLangFromUrl(new URL('https://x.test/en/'))).toBe('en');
    expect(getLangFromUrl(new URL('https://x.test/fr/merci/'))).toBe('fr');
  });

  it('usa español cuando no hay prefijo de idioma', () => {
    expect(getLangFromUrl(new URL('https://x.test/'))).toBe('es');
    expect(getLangFromUrl(new URL('https://x.test/privacidad/'))).toBe('es');
  });
});

describe('LANGUAGE_NAMES', () => {
  it('nombra cada idioma en su propia lengua', () => {
    expect(LANGUAGE_NAMES).toEqual({ es: 'Español', en: 'English', pt: 'Português', fr: 'Français' });
  });
});
