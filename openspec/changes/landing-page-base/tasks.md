## 1. Configuración del Proyecto y Herramientas

- [ ] 1.1 Inicializar Astro (modo estático, TypeScript estricto) en el directorio raíz y verificar `npm run build`
- [ ] 1.2 Integrar Tailwind CSS v4 con `@tailwindcss/vite` y definir los tokens de color, tipografía (`@fontsource`) y estilos base con `@theme` en `src/styles/global.css`
- [ ] 1.3 Configurar Vitest (`npm test`) con un test trivial en `tests/unit/` y verificar que pasa
- [ ] 1.4 Configurar Playwright (`npm run test:e2e`) contra `astro preview` con `@axe-core/playwright` y proyectos de viewport 360/768/1280/1920
- [ ] 1.5 Configurar i18n en `astro.config.mjs` (`defaultLocale: 'es'`, `locales: ['es','en','pt','fr']`, `prefixDefaultLocale: false`), `site` y `@astrojs/sitemap` con i18n
- [ ] 1.6 Crear `.env.example` con `PUBLIC_WEB3FORMS_KEY` y documentar comandos en `README.md`

## 2. Datos, i18n y Lógica Pura (TDD con Vitest)

- [ ] 2.1 Test rojo → implementar `src/i18n/utils.ts` (`t`, `getLocalizedPath`, `getAlternates`)
- [ ] 2.2 Crear `src/i18n/es.ts` como diccionario fuente y `en.ts`, `pt.ts`, `fr.ts` tipados como `Dictionary`; test de integridad que falla si falta una clave en cualquier idioma
- [ ] 2.3 Crear `src/data/site.ts` (correo, WhatsApp, dominio) y `services.ts`, `team.ts`, `courses.ts`, `partners.ts` con contenido provisional marcado `TODO`
- [ ] 2.4 Test rojo → implementar `src/lib/validation.ts` (obligatorios, formato de email, mensaje ≥ 20 caracteres, consentimiento, tipo de consulta válido, mensajes por idioma)
- [ ] 2.5 Test rojo → implementar `src/lib/submit.ts` con `fetch` inyectado (éxito, error HTTP, error de red, honeypot con contenido)
- [ ] 2.6 Test rojo → implementar `src/lib/whatsapp.ts` (`buildWhatsAppUrl` normaliza dígitos y codifica el mensaje)

## 3. Layout, SEO y Navegación (TDD con Playwright)

- [ ] 3.1 Test e2e rojo (metadatos, `lang`, `hreflang`, JSON-LD por idioma) → implementar `Layout.astro` y `HomePage.astro` con las páginas `index.astro` y `[lang]/index.astro`
- [ ] 3.2 Implementar `SkipLink.astro` con test de que es el primer elemento enfocable
- [ ] 3.3 Test e2e rojo (enlaces ancla, sticky, menú móvil con `aria-expanded`, cierre con `Escape`) → implementar `Navbar.astro`
- [ ] 3.4 Test e2e rojo (cambio de idioma, `aria-current`) → implementar `LanguageSwitcher.astro`
- [ ] 3.5 Crear `404.astro`, `public/robots.txt` e imagen Open Graph por defecto; test de que la 404 enlaza al inicio

## 4. Secciones Institucionales (TDD con Playwright)

- [ ] 4.1 Test rojo (un solo `h1`, badges TRL 5 / Morro del Cobre, bajada TRL, CTAs) → implementar `Hero.astro`
- [ ] 4.2 Test rojo (etapas muestreo → análisis → interpretación y los dos beneficios) → implementar `Methodology.astro`
- [ ] 4.3 Test rojo (grupos Campo y Laboratorio, CTA con `?tipo=`) → implementar `Services.astro` a partir de `services.ts`
- [ ] 4.4 Test rojo (caso Morro del Cobre, escala TRL 1–9 con el 5 resaltado) → implementar `Validation.astro`
- [ ] 4.5 Test rojo (una tarjeta por miembro, `alt` en fotos) → implementar `Team.astro`
- [ ] 4.6 Test rojo (estado vacío con CTA "Capacitación" y estado con cursos) → implementar `Training.astro`
- [ ] 4.7 Test rojo (cuatro tipos de aliado, CTA "Alianza", sin logos si `partners.ts` está vacío) → implementar `Alliances.astro`

## 5. Conversión y Pie de Página (TDD con Playwright)

- [ ] 5.1 Test rojo (errores con `aria-invalid`/`aria-describedby`, foco al primer error, preselección por `?tipo=`) → implementar `ContactForm.astro` usando `validation.ts`
- [ ] 5.2 Test rojo (red interceptada: éxito con `aria-live` y formulario limpio; error con datos conservados) → conectar `submit.ts` con Web3Forms y honeypot
- [ ] 5.3 Crear páginas de gracias y aviso de privacidad localizadas para el envío sin JavaScript
- [ ] 5.4 Test rojo (URL `wa.me` con mensaje del idioma activo, `rel`, sin tapar el botón de envío a 360px) → implementar `WhatsAppButton.astro`
- [ ] 5.5 Test rojo (`mailto`, WhatsApp, aviso de privacidad, año) → implementar `Footer.astro`

## 6. Contenido y Traducción

- [ ] 6.1 Reemplazar los `TODO` de contenido (equipo, Morro del Cobre, servicios, cursos, datos de contacto) con información confirmada por GeoCobre
- [ ] 6.2 Incorporar logotipo SVG, favicon e imágenes (campo, microscopía) optimizadas con `astro:assets`
- [ ] 6.3 Completar traducciones en, pt y fr usando el glosario de `openspec/config.yaml` y obtener revisión técnica de un especialista

## 7. Verificación y Despliegue

- [ ] 7.1 Ejecutar `npm test`, `npm run test:e2e` y `npm run build` sin errores ni advertencias
- [ ] 7.2 Verificar ausencia de desbordamiento horizontal y 0 violaciones axe *serious/critical* en los cuatro idiomas y cuatro anchos
- [ ] 7.3 Auditar con Lighthouse (móvil) cada idioma y alcanzar ≥ 90 en las cuatro categorías
- [ ] 7.4 Enviar un formulario real desde `astro preview` y confirmar la recepción en el correo de GeoCobre
- [ ] 7.5 Configurar el despliegue en Netlify con `PUBLIC_WEB3FORMS_KEY` y validar el sitio publicado contra los criterios de aceptación de `proposal.md`
