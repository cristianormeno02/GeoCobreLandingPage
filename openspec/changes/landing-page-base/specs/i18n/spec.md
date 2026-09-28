## Purpose

Permite que el sitio de GeoCobre se consulte en español, inglés, portugués y francés para alcanzar a clientes, laboratorios, universidades y organismos internacionales.

## ADDED Requirements

### Requirement: Idiomas Soportados y Rutas
El sistema SHALL publicar el sitio completo en español (`es`, idioma por defecto), inglés (`en`), portugués (`pt`) y francés (`fr`), con las rutas `/`, `/en/`, `/pt/` y `/fr/` respectivamente. Cada página SHALL declarar su idioma en el atributo `lang` del elemento `<html>`.

#### Scenario: Acceso a cada idioma
- **WHEN** el usuario solicita `/`, `/en/`, `/pt/` o `/fr/`
- **THEN** se entrega la página con todo el contenido visible en el idioma correspondiente
- **AND** `<html lang>` vale `es`, `en`, `pt` o `fr` según la ruta

#### Scenario: Sin redirección automática
- **WHEN** un usuario cuyo navegador prefiere otro idioma accede a `/`
- **THEN** el sistema muestra la versión en español sin redirigir automáticamente

### Requirement: Selector de Idioma
El sistema SHALL mostrar en el encabezado y el pie de página un selector que permita cambiar entre los cuatro idiomas, identificando cada opción con su nombre nativo (Español, English, Português, Français) e indicando el idioma activo.

#### Scenario: Cambio de idioma
- **WHEN** el usuario selecciona otro idioma en el selector
- **THEN** navega a la ruta equivalente en ese idioma
- **AND** el idioma activo queda marcado con `aria-current="page"`

#### Scenario: Selector accesible
- **WHEN** el usuario usa el selector con teclado o lector de pantalla
- **THEN** cada opción es enfocable y su nombre accesible incluye el nombre nativo del idioma con su atributo `lang`

### Requirement: Integridad de Traducciones
El sistema SHALL almacenar los textos de interfaz y contenido en diccionarios por idioma con el mismo conjunto de claves. La compilación o las pruebas SHALL fallar si falta una clave en algún idioma.

#### Scenario: Clave faltante
- **WHEN** un diccionario de idioma no contiene una clave presente en el diccionario español
- **THEN** la prueba de integridad de traducciones falla indicando el idioma y la clave

### Requirement: SEO Multilingüe
El sistema SHALL incluir en cada página enlaces `hreflang` hacia las cuatro versiones y `x-default` hacia la versión en español, metadatos traducidos, `og:locale` correcto y todas las URLs de idioma en el `sitemap.xml`.

#### Scenario: Etiquetas hreflang
- **WHEN** un rastreador solicita cualquier versión de idioma
- **THEN** el HTML contiene `link rel="alternate"` con `hreflang` `es`, `en`, `pt`, `fr` y `x-default` apuntando a URLs absolutas

#### Scenario: Sitemap multilingüe
- **WHEN** se genera el sitio
- **THEN** `sitemap.xml` contiene las URLs de los cuatro idiomas
