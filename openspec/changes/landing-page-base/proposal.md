# Propuesta: Landing Page Base para GeoCobre

## Why

GeoCobre es una micro-empresa de consultoría geológica que ofrece asesoría integral en exploración minera basada en investigación aplicada, con servicios tanto en campo como en laboratorio. Su enfoque combina muestreo, análisis e interpretación de resultados a partir de los aspectos genéticos de los depósitos, transformando la incertidumbre geológica en decisiones estratégicas y reduciendo riesgos financieros e impactos ambientales. El servicio alcanzó un nivel de madurez tecnológica TRL 5 y fue validado en el proyecto Morro del Cobre.

Actualmente GeoCobre no cuenta con presencia digital institucional para:
- Comunicar su propuesta de valor a empresas mineras y equipos de exploración.
- Exhibir sus capacidades de campo (logueo y otras actividades de asesoramiento) y laboratorio (análisis macroscópico y microscópico de muestras de roca).
- Difundir su futura oferta de cursos de capacitación.
- Abrir la puerta a alianzas estratégicas con laboratorios nacionales e internacionales, organismos gubernamentales, empresas mineras y universidades.

Dado que parte de su público objetivo (laboratorios, mineras y universidades extranjeras) es internacional, el sitio debe estar disponible en **español, inglés, portugués y francés**.

## What Changes

- Creación del proyecto web base con **Astro** (SSG) y **Tailwind CSS v4**, con suite de pruebas (Vitest + Playwright + axe).
- Identidad visual mineral: cobre, pizarra/grafito y acentos minerales claros, con tokens de color que cumplen contraste WCAG 2.1 AA.
- Sitio multilingüe (es por defecto, en, pt, fr) con selector de idioma y SEO internacional (`hreflang`).
- Secciones institucionales:
  - **Hero** con propuesta de valor y credenciales (TRL 5 explicado, validación en Morro del Cobre).
  - **Metodología**: investigación aplicada, aspectos genéticos de los depósitos, reducción de riesgo financiero e impacto ambiental.
  - **Servicios**: campo (logueo, muestreo y asesoramiento en terreno) y laboratorio (análisis macroscópico y microscópico de roca), más interpretación de resultados.
  - **Validación**: caso Morro del Cobre y madurez tecnológica TRL 5.
  - **Equipo**: perfiles profesionales de los especialistas (contenido pendiente de confirmar).
  - **Capacitación**: oferta de cursos (en desarrollo, con solicitud de información).
  - **Alianzas**: invitación a colaborar dirigida a laboratorios, mineras, organismos públicos y universidades (presentado como objetivo, sin logos de socios no confirmados).
- Módulo de contacto y conversión:
  - Formulario con tipo de consulta (campo, laboratorio, capacitación, alianza, otro), entrega real vía Web3Forms, anti-spam y consentimiento de datos.
  - Botón flotante de WhatsApp con mensaje predefinido en el idioma activo.
- SEO técnico: metadatos por idioma, Open Graph, sitemap, robots, datos estructurados `ProfessionalService`, página 404.
- Despliegue estático en hosting gratuito (Netlify o Vercel).

## Capabilities

### New Capabilities
- `landing-page`: Estructura, navegación, secciones institucionales, SEO técnico, accesibilidad y diseño responsivo.
- `lead-contact`: Formulario de contacto con entrega real y canal directo de WhatsApp.
- `i18n`: Contenido y rutas en español, inglés, portugués y francés, con selector de idioma y SEO multilingüe.

### Modified Capabilities
*(Ninguna, proyecto nuevo)*

## Acceptance Criteria

1. El sitio compila con `npm run build` sin errores ni advertencias y genera páginas estáticas para `/`, `/en/`, `/pt/`, `/fr/` y `404`.
2. `npm test` (Vitest) y `npm run test:e2e` (Playwright) pasan en verde.
3. Lighthouse (móvil) ≥ 90 en Performance, Accessibility, Best Practices y SEO para cada idioma.
4. 0 violaciones de axe-core de severidad *serious* o *critical* en cada idioma.
5. Sin desbordamiento horizontal en anchos de 360px, 768px, 1280px y 1920px.
6. Todas las claves de traducción existen en los cuatro idiomas (verificado por test).
7. Un envío válido del formulario llega efectivamente al correo de GeoCobre; un fallo de red muestra un mensaje de error y conserva los datos ingresados.
8. El botón de WhatsApp abre `wa.me` con el número configurado y un mensaje en el idioma activo.
9. Ningún texto del sitio afirma alianzas, clientes o cursos que GeoCobre no haya confirmado.

## Impact

- Código nuevo: proyecto Astro + Tailwind CSS + pruebas.
- Dependencias de desarrollo: Node.js ≥ 20, Astro, Tailwind CSS v4, Vitest, Playwright, @axe-core/playwright, @astrojs/sitemap.
- Servicio externo gratuito: Web3Forms (entrega de formularios).
- Sin servidor propio ni costos fijos: sitio estático.
- Requiere traducción técnica revisada por un especialista para en/pt/fr.
