# Diseño Técnico: Landing Page Base para GeoCobre

## Context

Véase `proposal.md` para la motivación y el contexto del negocio. GeoCobre requiere una plataforma de difusión técnica de alta velocidad, posicionamiento SEO orgánico en consultoría minera y estética moderna asociada a la geología y minería del cobre.

## Goals / Non-Goals

**Goals:**
- Implementar una arquitectura web estática (SSG) de carga ultrarrápida (Core Web Vitals óptimos) usando Astro y Tailwind CSS.
- Diseñar componentes modulares y semánticos para cada sección de la landing page.
- Establecer una paleta de colores coherente con la identidad mineral: tonos cobre (`#C86432`), pizarra oscura (`#0F172A`) y acentos de cuarzo/mineral claro.
- Proveer validación de formularios en cliente y botón flotante de WhatsApp accesible.
- Garantizar diseño 100% responsivo para móviles, tablets y monitores de alta resolución.

**Non-Goals:**
- No incluye backend de gestión de contenidos (CMS headless) en esta fase inicial.
- No incluye pasarela de pagos para compra online de cursos en esta etapa (las solicitudes se canalizan vía cotización directa).
- No requiere autenticación de usuarios ni portal privado de clientes en la v1.

## Decisions

### 1. Astro como Framework Base
- **Decisión:** Utilizar **Astro** (versión actual) con compilación estática (SSG).
- **Razón:** Cero JavaScript por defecto hacia el navegador para contenido puramente informativo; velocidad de carga inigualable; excelente soporte para metadatos SEO.
- **Alternativas consideradas:**
  - *Next.js*: Excesivo overhead y complejidad de servidor para una landing page de consultoría.
  - *HTML/CSS vanilla*: Menor modularidad y mayor dificultad para reutilizar componentes y mantener código a futuro.

### 2. Tailwind CSS para Estilos e Identidad de Marca
- **Decisión:** Integrar Tailwind CSS configurando una paleta personalizada para GeoCobre (`copper`, `slate-dark`, `mineral-light`).
- **Razón:** Estilizado atómico, diseño responsivo fluido y fácil mantenimiento del sistema de diseño.
- **Alternativas consideradas:**
  - *CSS Modules / Vanilla CSS*: Menor consistencia y mayor lentitud en maquetación de prototipos técnicos.

### 3. Estructura de Componentes
- `src/components/`:
  - `Navbar.astro`: Navegación sticky y responsive con menú móvil.
  - `Hero.astro`: Sección de apertura con propuesta de valor y badges TRL 5.
  - `ValueProp.astro`: Enfoque de investigación aplicada y aspectos genéticos de depósitos.
  - `Services.astro`: Grid de tarjetas para Geología de Campo y Laboratorio.
  - `ValidationTRL.astro`: Caso Morro del Cobre y madurez tecnológica.
  - `TrainingAndAlliances.astro`: Cursos y red de colaboración estratégica.
  - `ContactForm.astro`: Formulario interactivo con validación.
  - `WhatsAppButton.astro`: Botón flotante persistente con enlace seguro.
  - `Footer.astro`: Pie de página institucional y enlaces.
- `src/layouts/Layout.astro`: Layout global con SEO metadata, fuentes y favicons.
- `src/pages/index.astro`: Página principal ensambladora.

## Risks / Trade-offs

- **[Riesgo: Envío de correos desde sitio estático]** → *Mitigación:* Se implementa validación del formulario en el cliente con feedback visual y soporte para integración transparente con servicios de entrega sin servidor (como Formspree, Web3Forms o endpoint API) o mailto fallback, complementado con WhatsApp directo.
- **[Riesgo: Rendimiento de imágenes geológicas de alta resolución]** → *Mitigación:* Uso del componente nativo de optimización de imágenes de Astro (`<Image />` de `astro:assets`) para convertir y servir formatos modernos como WebP/AVIF.

## Migration Plan

1. Inicialización del proyecto Astro con Tailwind en el workspace.
2. Construcción de componentes atómicos y ensamble en `index.astro`.
3. Verificación de build estático (`astro build`) y previsualización local (`astro preview`).
