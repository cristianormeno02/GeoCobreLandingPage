# Diseño Técnico: Landing Page Base para GeoCobre

## Context

Véase `proposal.md` para la motivación y el contexto del negocio. GeoCobre necesita un sitio institucional rápido, accesible, multilingüe (es, en, pt, fr) y con buen posicionamiento orgánico en consultoría geológica y exploración minera. Es una micro-empresa: el sitio debe ser barato de mantener, sin servidor propio y con contenido fácil de editar en archivos de datos.

## Goals / Non-Goals

**Goals:**
- Sitio estático (SSG) con Astro y Tailwind CSS v4, con Lighthouse móvil ≥ 90 en las cuatro categorías.
- Componentes semánticos y modulares por sección, alimentados por archivos de datos y diccionarios de traducción.
- Cuatro idiomas con rutas propias, selector de idioma y SEO multilingüe (`hreflang`).
- Paleta mineral con tokens de color que cumplen WCAG 2.1 AA.
- Formulario con entrega real, anti-spam y consentimiento; botón flotante de WhatsApp.
- Desarrollo guiado por pruebas: lógica pura con Vitest y comportamiento de página con Playwright + axe.

**Non-Goals:**
- CMS headless o panel de administración.
- Pasarela de pagos o inscripción online a cursos.
- Autenticación o portal privado de clientes.
- Blog o sección de noticias.
- Redirección automática por idioma del navegador.
- Traducción automática en tiempo de ejecución.

## Decisions

### 1. Astro como framework base
- **Decisión:** Astro (última versión estable) en modo estático, con i18n routing nativo.
- **Razón:** No envía JavaScript al navegador por defecto, tiene buen soporte de SEO, optimiza imágenes con `astro:assets` y trae enrutamiento i18n incorporado.
- **Alternativas:** *Next.js* (demasiado servidor y complejidad para una landing); *HTML vanilla* (difícil de mantener en cuatro idiomas).

### 2. Tailwind CSS v4 e identidad de marca
- **Decisión:** Tailwind v4 mediante `@tailwindcss/vite`, con tokens definidos en `src/styles/global.css` usando `@theme`. No hay `tailwind.config.js`.
- **Tokens de color** (el contraste se verifica con axe en la suite e2e):

  | Token | Valor | Uso permitido |
  |---|---|---|
  | `--color-copper-400` | `#E08A5C` | Texto y acentos sobre fondo oscuro (≈ 6.8:1 sobre `slate-950`) |
  | `--color-copper-600` | `#C86432` | Marca: fondos de botón con texto `slate-950`, íconos, bordes, texto ≥ 24px sobre claro. **No** para texto normal sobre blanco (≈ 3.9:1) |
  | `--color-copper-700` | `#A04F26` | Texto y enlaces sobre fondo claro (≈ 5.8:1 sobre blanco) |
  | `--color-slate-950` | `#0F172A` | Fondos oscuros y texto principal sobre claro |
  | `--color-mineral-50` | `#F8FAFC` | Fondos claros de sección |
  | `--color-quartz-200` | `#E2E8F0` | Bordes y separadores |

- **Tipografía:** fuente sans auto-hospedada con `@fontsource` (sin llamadas a Google Fonts) para evitar bloqueos de render y cumplir privacidad.

### 3. Internacionalización
- **Decisión:** i18n nativo de Astro con `defaultLocale: 'es'`, `locales: ['es','en','pt','fr']` y `prefixDefaultLocale: false`. Las rutas son `/`, `/en/`, `/pt/` y `/fr/`.
- **Páginas:** `src/pages/index.astro` (es) y `src/pages/[lang]/index.astro` con `getStaticPaths` para en/pt/fr. Ambas renderizan el mismo componente `HomePage.astro` con la prop `lang`.
- **Diccionarios:** `src/i18n/{es,en,pt,fr}.ts` exportan objetos tipados. `es.ts` es la fuente y los demás se tipan como `Dictionary = typeof es`, así TypeScript falla en compilación si falta una clave. Además, un test de Vitest compara las claves en profundidad.
- **Helpers:** `src/i18n/utils.ts` con `t(lang)`, `getLocalizedPath(lang, path)` y `getAlternates(path)` (para `hreflang`), todos cubiertos por pruebas unitarias.
- **Variantes:** `pt` redactado en portugués de Brasil y `fr` en francés neutro (ver Preguntas abiertas).
- **Alternativas:** *astro-i18next* (dependencia extra innecesaria); *Content Collections por idioma* (más estructura de la necesaria para una sola página; se puede migrar si se agrega un blog).

### 4. Contenido basado en datos
- `src/data/site.ts`: nombre, dominio, correo, número de WhatsApp y redes. Es la única fuente de estos valores.
- `src/data/services.ts`, `team.ts`, `courses.ts` y `partners.ts`: listas con ids estables. Los textos traducibles se referencian por clave de diccionario.
- `partners.ts` contiene solo aliados **confirmados**; si está vacío, la sección de alianzas muestra únicamente la invitación.
- `courses.ts` vacío muestra el estado "oferta en desarrollo".

### 5. Formulario de contacto
- **Decisión:** Web3Forms. Es gratuito, no necesita backend y no expone el correo de destino. La access key va en `PUBLIC_WEB3FORMS_KEY` (clave pública por diseño del servicio, restringida al dominio).
- **Lógica:**
  - `src/lib/validation.ts`: función pura `validateContact(data, lang)` que devuelve errores por campo. Se prueba con Vitest.
  - `src/lib/submit.ts`: `submitContact(data, fetchFn)` con la dependencia de `fetch` inyectada para poder probarla.
  - `ContactForm.astro` contiene un `<script>` mínimo que conecta DOM, validación y envío.
- **Anti-spam:** campo honeypot oculto (`botcheck`) compatible con Web3Forms.
- **Mejora progresiva:** sin JavaScript, el formulario hace POST nativo a Web3Forms con `redirect` a la página de gracias del idioma.
- **Preselección:** los CTAs enlazan a `?tipo=<id>#contacto`; el script lee el parámetro `tipo` al cargar y preselecciona la opción si es un id válido.
- **Privacidad:** checkbox obligatorio que enlaza al aviso de privacidad (`/privacidad`, localizado).

### 6. WhatsApp
- `src/lib/whatsapp.ts`: `buildWhatsAppUrl(number, message)` genera `https://wa.me/<dígitos>?text=<encodeURIComponent(message)>`. Se prueba con Vitest.
- `WhatsAppButton.astro`: `<a>` fijo con `aria-label` traducido, `target="_blank"` y `rel="noopener noreferrer"`. En móvil se añade `padding-bottom` al `<main>` o al footer para que el botón no tape contenido.

### 7. Estructura de componentes
```
src/
  components/
    Navbar.astro            LanguageSwitcher.astro   SkipLink.astro
    Hero.astro              Methodology.astro        Services.astro
    Validation.astro        Team.astro               Training.astro
    Alliances.astro         ContactForm.astro        WhatsAppButton.astro
    Footer.astro            HomePage.astro
  layouts/Layout.astro      (SEO, hreflang, JSON-LD, fuentes, favicon)
  i18n/{es,en,pt,fr}.ts, utils.ts
  data/site.ts, services.ts, team.ts, courses.ts, partners.ts
  lib/validation.ts, submit.ts, whatsapp.ts
  pages/index.astro, [lang]/index.astro, 404.astro,
        privacidad.astro, [lang]/privacy.astro, gracias.astro, [lang]/thanks.astro
  styles/global.css
tests/
  unit/        (Vitest)
  e2e/         (Playwright + @axe-core/playwright)
```
Los ids de ancla son fijos en español en todos los idiomas (`#servicios`, etc.) para que la lógica y las pruebas sean simples. Solo cambian las etiquetas visibles.

### 8. Estrategia de pruebas (TDD)
- **Vitest (unitarias):** validación, envío con `fetch` simulado, URL de WhatsApp, helpers i18n e integridad de claves de diccionario.
- **Playwright (e2e sobre `astro preview`):** navegación y menú móvil, cambio de idioma, `hreflang`/metadatos, envío de formulario con la red interceptada (éxito y error), botón de WhatsApp, desbordamiento a 360/768/1280/1920px y axe por idioma.
- **Lighthouse CI:** auditoría final contra el umbral ≥ 90 (tarea de verificación, no bloquea el ciclo TDD).

### 9. SEO
- `@astrojs/sitemap` con opción `i18n`, `robots.txt` estático y `site` configurado en `astro.config.mjs`.
- JSON-LD `ProfessionalService` en `Layout.astro` (nombre, url, email, areaServed, knowsAbout: geología, exploración minera, petrografía).
- Imagen Open Graph 1200×630 por defecto.

### 10. Despliegue
- **Decisión:** Netlify (o Vercel) con build `npm run build` y publicación de `dist/`; previews por PR.
- La variable `PUBLIC_WEB3FORMS_KEY` se configura en el panel del hosting.

## Risks / Trade-offs

- **[Calidad de traducción técnica]** La terminología geológica (logueo, sondaje, petrografía) tiene equivalentes específicos por idioma. → *Mitigación:* glosario en `openspec/config.yaml` y revisión por un profesional antes de publicar. Las traducciones iniciales se marcan como borrador.
- **[Cuatro idiomas multiplican el mantenimiento]** → *Mitigación:* claves tipadas más un test de integridad; el contenido estructural vive en `src/data/`.
- **[Confidencialidad de Morro del Cobre]** → *Mitigación:* solo se publica el resumen autorizado explícitamente por GeoCobre.
- **[Dependencia de Web3Forms]** Límite del plan gratuito o caída del servicio. → *Mitigación:* manejo de error con correo y WhatsApp como alternativas; `submit.ts` aislado para cambiar de proveedor fácilmente.
- **[Imágenes pesadas de microscopía]** → *Mitigación:* `<Image />` de `astro:assets` con AVIF/WebP, `loading="lazy"` fuera del primer pantallazo y dimensiones explícitas para evitar CLS.
- **[Contenido pendiente]** Equipo, cursos y fotos aún no disponibles. → *Mitigación:* los componentes se construyen contra los datos; el lanzamiento se bloquea hasta completar los `TODO` de contenido.

## Migration Plan

1. Inicializar Astro + Tailwind v4 + Vitest + Playwright.
2. Construir i18n, datos y lógica pura con TDD.
3. Construir componentes con TDD e2e y ensamblarlos en `HomePage.astro`.
4. Cargar contenido real y traducciones revisadas.
5. Verificación completa (tests, build, Lighthouse, axe) y despliegue en Netlify.
6. Rollback: redeploy del build anterior desde el panel del hosting.

## Open Questions

- [ ] **TODO(contenido):** Perfiles del equipo (nombres, roles, formación, fotos).
- [ ] **TODO(contenido):** Información autorizada del caso Morro del Cobre (ubicación, alcance, resultados publicables, fotos).
- [ ] **TODO(contenido):** Confirmar la lista definitiva de servicios de campo además del logueo (¿mapeo?, ¿muestreo?) y de laboratorio (¿petrografía?, ¿calcografía / microscopía de luz reflejada?).
- [ ] **TODO(contenido):** Temáticas de cursos, si ya existen.
- [ ] **TODO(config):** Número de WhatsApp, correo de contacto y dominio definitivo.
- [ ] **TODO(marca):** Logotipo en SVG y confirmación de la paleta.
- [ ] **TODO(i18n):** ¿Portugués de Brasil o de Portugal? ¿Francés orientado a Canadá/África o neutro?
- [ ] **TODO(legal):** Razón social y país para el aviso de privacidad (supuesto actual: Chile, Ley 19.628 / 21.719).
