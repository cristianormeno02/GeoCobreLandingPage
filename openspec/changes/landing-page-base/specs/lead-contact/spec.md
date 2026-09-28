## Purpose

Permite a potenciales clientes, profesionales e instituciones enviar consultas a GeoCobre y contactar directamente a sus especialistas.

## ADDED Requirements

### Requirement: Formulario de Contacto
El sistema SHALL proveer en `#contacto` un formulario accesible con los campos: nombre completo (obligatorio), correo electrónico (obligatorio, formato válido), empresa o institución (opcional), país (opcional), tipo de consulta (obligatorio: Servicio de campo, Análisis de laboratorio, Capacitación, Alianza estratégica, Otro), mensaje (obligatorio, mínimo 20 caracteres) y aceptación del aviso de privacidad (obligatoria). Cada campo SHALL tener una etiqueta visible asociada.

#### Scenario: Envío exitoso
- **WHEN** el usuario completa los campos obligatorios con valores válidos y presiona "Enviar consulta"
- **THEN** el sistema deshabilita el botón y muestra un estado de envío
- **AND** envía los datos al servicio de entrega configurado
- **AND** al recibir respuesta exitosa muestra un mensaje de confirmación anunciado por lectores de pantalla (`aria-live`) y limpia el formulario

#### Scenario: Campos obligatorios o formato inválido
- **WHEN** el usuario intenta enviar con campos obligatorios vacíos, un correo con formato inválido, un mensaje de menos de 20 caracteres o sin aceptar el aviso de privacidad
- **THEN** el sistema no envía la solicitud
- **AND** marca cada campo inválido con `aria-invalid="true"` y un mensaje de error asociado mediante `aria-describedby`
- **AND** mueve el foco al primer campo inválido

#### Scenario: Fallo de entrega
- **WHEN** el servicio de entrega responde con error o no hay conexión
- **THEN** el sistema muestra un mensaje de error con el correo y el WhatsApp como alternativas
- **AND** conserva los datos ingresados y vuelve a habilitar el botón

#### Scenario: Protección anti-spam
- **WHEN** el campo trampa oculto (honeypot) llega con contenido
- **THEN** el sistema descarta el envío sin mostrar error al usuario

#### Scenario: Tipo de consulta preseleccionado
- **WHEN** el usuario llega a `#contacto` desde un CTA que indica un tipo de consulta
- **THEN** el selector de tipo de consulta muestra ese valor preseleccionado

#### Scenario: Idioma del formulario
- **WHEN** el formulario se muestra en un idioma distinto del español
- **THEN** etiquetas, opciones, mensajes de error y confirmación aparecen en ese idioma
- **AND** el envío incluye el idioma del usuario

### Requirement: Canal Directo por WhatsApp
El sistema SHALL mostrar un botón flotante persistente con etiqueta accesible que abra `https://wa.me/<número>` con un mensaje predefinido en el idioma activo, en una nueva pestaña con `rel="noopener noreferrer"`.

#### Scenario: Clic en el botón de WhatsApp
- **WHEN** el usuario activa el botón flotante
- **THEN** se abre una nueva pestaña hacia `wa.me` con el número configurado y el texto de saludo URL-codificado en el idioma activo

#### Scenario: Sin obstrucción de contenido
- **WHEN** la página se muestra en un ancho < 768px
- **THEN** el botón no cubre el botón "Enviar consulta" ni los enlaces del pie de página
