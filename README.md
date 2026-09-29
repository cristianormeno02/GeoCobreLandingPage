# GeoCobre — Sitio institucional

Landing page multilingüe (es, en, pt, fr) de GeoCobre, construida con Astro y Tailwind CSS.
Especificación y plan en `openspec/changes/landing-page-base/`.

## Requisitos

- Node.js ≥ 20
- Copiar `.env.example` a `.env` y completar `PUBLIC_WEB3FORMS_KEY`

## Comandos

| Comando | Acción |
| :-- | :-- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Verifica tipos (`astro check`) y genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |
| `npm test` | Pruebas unitarias (Vitest) |
| `npm run test:e2e` | Pruebas end-to-end y accesibilidad (Playwright + axe) en 360/768/1280/1920px |
| `npm run lighthouse` | Auditoría Lighthouse móvil de los 4 idiomas (requiere `npm run preview`; umbral 90) |

La primera vez que se ejecutan las pruebas e2e: `npx playwright install chromium`.

## Estructura

- `src/i18n/` — diccionarios por idioma (`es.ts` es la fuente) y utilidades
- `src/data/` — datos editables del sitio (contacto, servicios, equipo, cursos, aliados)
- `src/lib/` — lógica pura: validación, envío del formulario, enlace de WhatsApp
- `src/components/` — secciones de la página
- `tests/unit/`, `tests/e2e/` — pruebas
