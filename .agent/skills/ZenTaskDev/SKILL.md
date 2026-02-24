---
name: ZenTaskDev
description: Metodología estandarizada para la construcción de Historias de Usuario (HU) con BDD y diseño premium para el proyecto ZenTask.
---

# Skill: Desarrollo ZenTask

Esta skill define el proceso obligatorio para expandir la aplicación ZenTask, asegurando coherencia visual y calidad técnica mediante BDD.

## 1. Fase de Definición (HU y Criterios)
Al iniciar o modificar una HU, se debe actualizar obligatoriamente en `docs/implementation_plan.md`:
- **Formato HU**: "Como [rol], quiero [acción], para [valor]".
- **Criterios de Aceptación**: Lista numerada de condiciones verificables.

## 2. Fase de Diseño y Prototipado
- Usar la herramienta **Stitch** para generar prototipos que sigan el lenguaje visual actual.
- **Tokens de Diseño**:
  - Clase `.glass`: Para el efecto de desenfoque.
  - Acentos: Gradient de `--accent-blue` a `--accent-violet`.
  - Modo: Siempre Dark Mode.

## 3. Fase de Calidad (BDD de Cypress)
Antes de escribir código Vue, se debe crear la prueba funcional:
- **Ubicación del Feature**: `cypress/e2e/features/[nombre-hu].feature`.
- **Formato Gherkin Híbrido**:
  - Keywords (EN): `Feature`, `Scenario`, `Given`, `When`, `Then`, `And`.
  - Contenido (ES): Descripción de la acción y el resultado.
- **Organización de Step Definitions** (regla obligatoria):
  - Cada HU tiene **su propio archivo** en `cypress/e2e/step_definitions/steps_[nombre-hu].js`.
  - Nunca usar un archivo monolítico `steps.js`. Cypress carga todos los `.js` de la carpeta automáticamente.
  - Convención de nombres: `steps_navegacion.js`, `steps_tablero.js`, `steps_entrada_rapida.js`, `steps_detalle.js`, `steps_estados.js`, `steps_buscador.js`, `steps_borrado.js`, `steps_etiquetas.js`, etc.
  - Los pasos compartidos entre HUs (ej. `guarda los cambios`) se definen en el archivo de la HU que los origina.
  - Si un paso del `.feature` usa palabras semánticas adicionales (ej. **"de nuevo"**, **"también"**), se debe añadir un **alias** con el mismo texto exacto apuntando a la misma implementación. Ejemplo:
    ```js
    // Paso original
    When('hace clic en el filtro de etiqueta {string}', (tag) => { ... })
    // Alias semántico – mismo cuerpo, texto distinto
    When('hace clic de nuevo en el filtro de etiqueta {string}', (tag) => { ... })
    ```

## 4. Fase de Implementación (Vue 3)
- **Componentes**: Deben ser atómicos y reutilizables.
- **Estilos**: Preferir el uso de variables globales definidas en `index.css`.

## 5. Fase de Verificación y Reporte
Es mandatorio ejecutar el ciclo completo de pruebas localmente (o en Codespace) antes de subir cambios:
1. `npm run test:bdd` (Ejecución).
2. `npm run report:generate` (Procesamiento).
3. `npm run report:open` (Validación visual del reporte).

## 6. Documentación y Sincronización
- **Carpeta `docs/`**: Es obligatorio mantener actualizados los archivos `docs/implementation_plan.md`, `docs/task.md` y `docs/walkthrough.md` ante cualquier cambio funcional o nueva HU.
- **Commits**: Deben ser descriptivos: `Feat: ...`, `Fix: ...`, `Refactor: ...`.
- **README**: Asegurar que el `README.md` refleje cualquier cambio en la arquitectura o dependencias.
