// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO(config): reemplazar por el dominio definitivo de GeoCobre.
const SITE_URL = 'https://www.geocobre.cl';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Las páginas de agradecimiento no se indexan.
      filter: (page) => !/\/(gracias|thanks|obrigado|merci)\/$/.test(page),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en', pt: 'pt-BR', fr: 'fr' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
