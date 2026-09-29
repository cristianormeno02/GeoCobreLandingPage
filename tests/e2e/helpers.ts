export const LOCALE_PATHS = { es: '/', en: '/en/', pt: '/pt/', fr: '/fr/' } as const;
export type TestLocale = keyof typeof LOCALE_PATHS;
export const LOCALES = Object.keys(LOCALE_PATHS) as TestLocale[];
export const SITE = 'https://www.geocobre.cl';
