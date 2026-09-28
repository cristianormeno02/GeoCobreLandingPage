## Purpose

Proporciona la estructura web institucional, navegación, presentación de servicios y validación técnica de GeoCobre para clientes del sector minero y académico.

## ADDED Requirements

### Requirement: Navegación y Encabezado Institucional
El sistema SHALL presentar un encabezado fijo/sticky con la identidad visual de GeoCobre, enlaces a secciones principales (Servicios, Metodología, Casos, Capacitaciones, Alianzas, Contacto) y un botón de llamada a la acción para solicitud de asesoría.

#### Scenario: Visualización y navegación en escritorio
- **WHEN** un usuario accede a la página principal desde un dispositivo de escritorio
- **THEN** el sistema muestra la barra de navegación completa con enlaces activos y botón CTA "Solicitar Asesoría"

#### Scenario: Navegación móvil responsiva
- **WHEN** un usuario accede desde un dispositivo móvil o pantalla estrecha (<768px)
- **THEN** el sistema presenta un menú hamburguesa desplegable que permite acceder a todas las secciones sin desbordamiento horizontal

### Requirement: Hero Section con Propuesta de Valor y Credenciales
El sistema SHALL desplegar una sección principal de alto impacto con el titular estratégico de la compañía, resumen de servicios en campo y laboratorio, y distintivos de credibilidad (TRL 5, validación en Morro del Cobre).

#### Scenario: Carga inicial de la Hero Section
- **WHEN** un visitante ingresa a la landing page
- **THEN** el sistema renderiza el titular "Transformamos Incertidumbre Geológica en Decisiones Estratégicas", badges de TRL 5 y enlace de acción inmediata hacia servicios o contacto

### Requirement: Catálogo de Servicios Especializados de Campo y Laboratorio
El sistema SHALL detallar las dos áreas operativas fundamentales de GeoCobre: servicios de campo (logueo, mapeo, muestreo) y servicios de laboratorio (análisis macro y microscópico de muestras de roca, petrografía, calcografía).

#### Scenario: Inspección de servicios geológicos
- **WHEN** el usuario navega a la sección de servicios
- **THEN** el sistema presenta tarjetas organizadas para campo y laboratorio con especificaciones de metodologías aplicadas y beneficios técnicos

### Requirement: Sección de Validación y Nivel de Madurez (TRL 5)
El sistema SHALL exhibir la evidencia de madurez tecnológica y validación en el proyecto minero "Morro del Cobre", destacando la reducción de riesgos financieros y ambientales mediante investigación aplicada.

#### Scenario: Consulta de antecedentes técnicos
- **WHEN** el usuario revisa la sección de validación y experiencia
- **THEN** el sistema muestra el caso de estudio de Morro del Cobre y la explicación del estándar TRL 5 aplicado a la exploración minera

### Requirement: Capacitaciones y Alianzas Estratégicas
El sistema SHALL presentar la oferta formativa (cursos especializados en geología y exploración) y la red de colaboración estratégica con laboratorios nacionales/internacionales, mineras, gobierno y universidades.

#### Scenario: Exploración de cursos y alianzas
- **WHEN** el usuario consulta el área institucional
- **THEN** el sistema lista las temáticas de capacitación disponibles y los logos/referencias del ecosistema de alianzas de GeoCobre
