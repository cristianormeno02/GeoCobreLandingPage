# GeoCobreSite — Agent Guidelines (OpenSpec + Superpowers)

Este proyecto se desarrolla bajo la metodología combinada de **OpenSpec (Gobierno de Especificaciones)** y **Superpowers (Disciplina de Ejecución)**.

---

## 1. Principio Fundamental: SDD (Spec-Driven Development)

No se realiza "vibe coding" ni se escribe código directamente sin especificación y plan acordados:
1. **Definir el "Qué" con OpenSpec**: Especificaciones formales, diseño y desglose de tareas en `openspec/changes/<change-name>/`.
2. **Ejecutar el "Cómo" con Superpowers**: Disciplina de ingeniería, TDD (Test-Driven Development), lluvia de ideas, depuración sistemática y verificación antes de dar por terminado.

---

## 2. Flujo de Trabajo Integrado

### Fase 1: Brainstorming & Propuesta
* Cuando el usuario proponga una nueva característica o cambio importante:
  - Activar el skill de Superpowers `brainstorming` para clarificar intención, alcance y requerimientos.
  - Usar OpenSpec para estructurar la propuesta: `/opsx-propose <nombre-del-cambio>` (o `openspec new change <nombre-del-cambio>`).
  - Generar los artefactos de OpenSpec en `openspec/changes/<nombre-del-cambio>/`:
    - `proposal.md`: Propósito, alcance y criterios de aceptación.
    - `specs/`: Requerimientos detallados y deltas funcionales.
    - `design.md`: Decisiones técnicas y arquitectura.
    - `tasks.md`: Lista granular de tareas secuenciales.
  - Presentar y validar el diseño con el usuario antes de proceder a la implementación.

### Fase 2: Planificación e Implementación
* Usar `/opsx-apply` o el skill `executing-plans` / `subagent-driven-development` de Superpowers.
* Aplicar TDD (`test-driven-development`):
  1. Escribir prueba que falle (Red).
  2. Verificar que falle por la razón esperada.
  3. Implementar el código mínimo para pasar la prueba (Green).
  4. Refactorizar manteniendo pruebas verdes (Refactor).
* Para tareas complejas o autónomas:
  - Despachar subagentes (`invoke_subagent`) para tareas aisladas.
  - Realizar revisión de dos etapas: conformidad con la especificación y calidad de código.

### Fase 3: Depuración (Si surgen errores)
* Si ocurre un bug o error inesperado, invocar `systematic-debugging`:
  - No adivinar ni aplicar parches a ciegas.
  - Aislar la causa raíz con evidencia antes de modificar código.

### Fase 4: Verificación y Archivo
* Antes de dar cualquier tarea o cambio por completado:
  - Invocar `verification-before-completion`: ejecutar suite de pruebas, validar build, linter y criterios de aceptación de OpenSpec.
  - Usar `/opsx-archive` para consolidar las especificaciones en `openspec/specs/` y archivar el cambio.

---

## 3. Mapeo de Herramientas en Google Antigravity

| Acción requerida | Herramienta en Antigravity |
| :--- | :--- |
| **Despachar subagente** | `invoke_subagent` con `TypeName: "self"` (completo) o `"research"` (solo lectura). |
| **Seguimiento de tareas** | Artefacto de tareas (`write_to_file` con `IsArtifact: true` y lista `- [ ]`), actualizado con `replace_file_content`. |
| **Comandos OpenSpec** | Ejecución de `openspec <comando>` vía `run_command` o invocación de skills en `.agent/skills/`. |
| **Skills disponibles** | Ubicados en `.agent/skills/` (tanto OpenSpec como Superpowers disponibles bajo demanda). |

---

## 4. Regla de Invocación de Skills (Superpowers Bootstrap)

Antes de realizar cualquier acción o responder con asunciones, revisar si aplica un skill relevante (`brainstorming`, `writing-plans`, `test-driven-development`, `systematic-debugging`, `verification-before-completion`, `openspec-propose`, `openspec-apply`, etc.) e invocarlo explícitamente.
