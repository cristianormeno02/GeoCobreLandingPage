import { es } from './es';
import { en } from './en';
import { pt } from './pt';
import { fr } from './fr';
import type { Dictionary } from './types';

export const LOCALES = ['es', 'en', 'pt', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es, en, pt, fr };

/** Slugs traducidos de cada página; `home` es la raíz del idioma. */
export const ROUTES = {
  home: { es: '', en: '', pt: '', fr: '' },
  privacy: { es: 'privacidad', en: 'privacy', pt: 'privacidade', fr: 'confidentialite' },
  thanks: { es: 'gracias', en: 'thanks', pt: 'obrigado', fr: 'merci' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function t(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export function getLocalizedPath(lang: Locale, route: RouteKey): string {
  const prefix = lang === DEFAULT_LOCALE ? '' : `/${lang}`;
  const slug = ROUTES[route][lang];
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

export function getAlternates(route: RouteKey, site: string): { hreflang: string; href: string }[] {
  const origin = site.replace(/\/+$/, '');
  const alternates = LOCALES.map((lang) => ({
    hreflang: lang,
    href: `${origin}${getLocalizedPath(lang, route)}`,
  }));
  return [...alternates, { hreflang: 'x-default', href: `${origin}${getLocalizedPath(DEFAULT_LOCALE, route)}` }];
}

export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

/** Texto de contenido editable con una versión por idioma. */
export type Localized = Record<Locale, string>;

/** Nombre de cada idioma en su propia lengua, para el selector. */
export const LANGUAGE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
};
