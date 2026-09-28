## Purpose

Permite a los usuarios y potenciales clientes mineros enviar requerimientos de cotización técnica y contactar directamente a los especialistas de GeoCobre.

## ADDED Requirements

### Requirement: Formulario de Contacto y Solicitud de Cotización
El sistema SHALL proveer un formulario interactivo accesible que capture los datos del contacto (nombre completo, correo electrónico, empresa o institución, tipo de servicio requerido y mensaje con detalles técnicos del proyecto).

#### Scenario: Envío exitoso de formulario de cotización
- **WHEN** el usuario completa todos los campos requeridos y presiona "Enviar Consulta"
- **THEN** el sistema valida los datos en el cliente, muestra un mensaje de confirmación de envío y limpia el formulario

#### Scenario: Validación de campos obligatorios
- **WHEN** el usuario intenta enviar el formulario dejando campos obligatorios en blanco o con formato de email inválido
- **THEN** el sistema resalta los campos con error y previene el envío indicando el motivo de la validación

### Requirement: Canal Directo de Comunicación vía WhatsApp
El sistema SHALL disponer de un botón flotante accesible persistente que redirija directamente al canal oficial de WhatsApp de GeoCobre con un mensaje predefinido para cotizaciones inmediatas.

#### Scenario: Clic en el botón flotante de WhatsApp
- **WHEN** el usuario hace clic o pulsa en el botón flotante de WhatsApp
- **THEN** el sistema abre una nueva pestaña con la API de WhatsApp preconfigurada con el número de contacto de GeoCobre y el texto de saludo inicial
