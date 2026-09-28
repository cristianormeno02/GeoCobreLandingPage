## Purpose

Proporciona la estructura web institucional, navegación, presentación de servicios, validación técnica, SEO y accesibilidad del sitio de GeoCobre para clientes del sector minero, instituciones y profesionales.

## ADDED Requirements

### Requirement: Navegación y Encabezado Institucional
El sistema SHALL presentar un encabezado sticky con el logotipo de GeoCobre, enlaces ancla a las secciones Metodología (`#metodologia`), Servicios (`#servicios`), Validación (`#validacion`), Equipo (`#equipo`), Capacitación (`#capacitacion`), Alianzas (`#alianzas`) y Contacto (`#contacto`), el selector de idioma y un botón CTA "Solicitar asesoría" que lleva a `#contacto`.

#### Scenario: Navegación en escritorio
- **WHEN** un usuario accede a la página con un ancho de ventana ≥ 768px
- **THEN** el encabezado muestra todos los enlaces de sección, el selector de idioma y el botón CTA visibles sin menú desplegable
- **AND** al hacer clic en un enlace la página se desplaza a la sección correspondiente y el encabezado no la cubre

#### Scenario: Encabezado persistente
- **WHEN** el usuario se desplaza hacia abajo en la página
- **THEN** el encabezado permanece visible en la parte superior de la ventana

#### Scenario: Menú móvil
- **WHEN** un usuario accede con un ancho de ventana < 768px
- **THEN** los enlaces se ocultan tras un botón de menú con `aria-expanded="false"` y etiqueta accesible
- **AND** al activarlo se muestran todos los enlaces, `aria-expanded` pasa a `"true"` y no hay desbordamiento horizontal
- **AND** al seleccionar un enlace o presionar `Escape` el menú se cierra

### Requirement: Hero con Propuesta de Valor y Credenciales
El sistema SHALL mostrar una sección de apertura con el titular de la propuesta de valor, un subtítulo que resuma los servicios de campo y laboratorio, distintivos de credibilidad y CTAs hacia servicios y contacto.

#### Scenario: Carga inicial
- **WHEN** un visitante carga la página en español
- **THEN** se muestra un único `<h1>` con el texto "Transformamos incertidumbre geológica en decisiones estratégicas"
- **AND** se muestran los distintivos "TRL 5" y "Validado en Morro del Cobre"
- **AND** se muestran un CTA principal hacia `#contacto` y uno secundario hacia `#servicios`

#### Scenario: TRL explicado
- **WHEN** el visitante lee el distintivo "TRL 5"
- **THEN** junto al distintivo se muestra una bajada breve que explica su significado (tecnología validada en un entorno relevante)

### Requirement: Metodología y Enfoque de Investigación Aplicada
El sistema SHALL explicar el enfoque de GeoCobre: muestreo, análisis e interpretación de resultados basados en los aspectos genéticos de los depósitos, y sus beneficios en reducción de riesgo financiero e impacto ambiental.

#### Scenario: Lectura de la metodología
- **WHEN** el usuario navega a `#metodologia`
- **THEN** se muestran las etapas muestreo → análisis → interpretación en orden
- **AND** se muestran por separado los beneficios "reducción de riesgo financiero" y "reducción de impacto ambiental"

### Requirement: Catálogo de Servicios de Campo y Laboratorio
El sistema SHALL presentar dos grupos de servicios: Campo (logueo de testigos/sondajes, muestreo y asesoramiento en terreno) y Laboratorio (análisis macroscópico de muestras de roca y análisis microscópico mediante microscopio), además de la interpretación integrada de resultados. Los nombres de servicio SHALL provenir de una única fuente de datos editable.

#### Scenario: Inspección de servicios
- **WHEN** el usuario navega a `#servicios`
- **THEN** se muestran dos grupos titulados "Campo" y "Laboratorio", cada uno con al menos un servicio con título y descripción
- **AND** cada tarjeta de servicio incluye un enlace a `#contacto` que preselecciona el tipo de consulta correspondiente

### Requirement: Validación y Madurez Tecnológica (TRL 5)
El sistema SHALL exhibir la validación del servicio en el proyecto Morro del Cobre y explicar la escala TRL con el nivel 5 destacado, publicando únicamente la información autorizada por GeoCobre.

#### Scenario: Consulta de antecedentes
- **WHEN** el usuario navega a `#validacion`
- **THEN** se muestra el caso Morro del Cobre con su resumen autorizado
- **AND** se muestra una representación de la escala TRL 1–9 con el nivel 5 resaltado y su definición

### Requirement: Equipo Profesional
El sistema SHALL presentar a los especialistas de GeoCobre con nombre, rol, formación y área de especialidad, a partir de una fuente de datos editable.

#### Scenario: Consulta del equipo
- **WHEN** el usuario navega a `#equipo`
- **THEN** se muestra una tarjeta por especialista con nombre, rol y especialidad
- **AND** cada fotografía tiene texto alternativo con el nombre de la persona

### Requirement: Capacitación
El sistema SHALL presentar la oferta de cursos de capacitación. Mientras no existan cursos confirmados, SHALL indicar que la oferta está en desarrollo e invitar a solicitar información.

#### Scenario: Sin cursos confirmados
- **WHEN** la fuente de datos de cursos está vacía y el usuario navega a `#capacitacion`
- **THEN** se muestra un mensaje de oferta en desarrollo y un CTA hacia `#contacto` con el tipo de consulta "Capacitación" preseleccionado

#### Scenario: Con cursos confirmados
- **WHEN** la fuente de datos contiene cursos
- **THEN** se muestra una tarjeta por curso con título, modalidad y descripción breve

### Requirement: Alianzas Estratégicas
El sistema SHALL presentar la invitación a formar alianzas con laboratorios nacionales e internacionales, organismos gubernamentales, empresas mineras y universidades, sin mostrar nombres ni logos de organizaciones que no hayan confirmado la alianza.

#### Scenario: Consulta de alianzas
- **WHEN** el usuario navega a `#alianzas`
- **THEN** se muestran los cuatro tipos de aliado buscados con una breve descripción del valor de la colaboración
- **AND** se muestra un CTA hacia `#contacto` con el tipo de consulta "Alianza" preseleccionado
- **AND** solo se muestran logos presentes en la lista de aliados confirmados

### Requirement: Pie de Página Institucional
El sistema SHALL mostrar un pie de página con logotipo, enlaces a secciones, correo de contacto, enlace a WhatsApp, selector de idioma, aviso de privacidad y año de copyright.

#### Scenario: Visualización del pie de página
- **WHEN** el usuario llega al final de la página
- **THEN** se muestran el correo como enlace `mailto:`, el enlace de WhatsApp, el enlace al aviso de privacidad y el año actual de compilación

### Requirement: SEO Técnico
El sistema SHALL generar para cada idioma metadatos únicos (`<title>`, `meta description`, canonical, Open Graph y Twitter Card), un `sitemap.xml`, un `robots.txt` y datos estructurados JSON-LD de tipo `ProfessionalService`.

#### Scenario: Metadatos presentes
- **WHEN** un rastreador solicita la página de cualquier idioma
- **THEN** el HTML contiene `<title>`, `meta description`, `link rel="canonical"`, `og:title`, `og:description`, `og:image`, `og:locale` y un bloque JSON-LD válido

#### Scenario: Página no encontrada
- **WHEN** se solicita una ruta inexistente
- **THEN** se devuelve la página 404 con enlace a la página principal

### Requirement: Accesibilidad WCAG 2.1 AA
El sistema SHALL cumplir WCAG 2.1 nivel AA: contraste mínimo 4.5:1 para texto normal y 3:1 para texto grande, navegación completa por teclado, foco visible, jerarquía de encabezados correcta, texto alternativo en imágenes y respeto de `prefers-reduced-motion`.

#### Scenario: Auditoría automática
- **WHEN** se ejecuta axe-core sobre la página de cada idioma
- **THEN** no se reportan violaciones de severidad *serious* o *critical*

#### Scenario: Navegación por teclado
- **WHEN** el usuario recorre la página solo con `Tab`
- **THEN** todos los elementos interactivos reciben foco visible en orden lógico
- **AND** el primer elemento enfocable es un enlace "Saltar al contenido"

### Requirement: Diseño Responsivo y Rendimiento
El sistema SHALL adaptarse a móviles, tablets y escritorio sin desbordamiento horizontal y SHALL servir imágenes optimizadas en formatos modernos.

#### Scenario: Anchos de referencia
- **WHEN** la página se renderiza a 360px, 768px, 1280px y 1920px de ancho
- **THEN** el ancho del documento no supera el ancho de la ventana

#### Scenario: Rendimiento móvil
- **WHEN** se audita la página con Lighthouse en perfil móvil
- **THEN** las categorías Performance, Accessibility, Best Practices y SEO obtienen ≥ 90
