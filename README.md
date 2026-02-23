# ZenTask - Plataforma de Productividad Premium

ZenTask es una aplicación de productividad diseñada con una estética de alta gama basada en **Glassmorphism** y **Modo Oscuro**. Este repositorio está configurado para ser desarrollado en **GitHub Codespaces**.

## 🚀 Guía de Desarrollo

Para mantener la coherencia del proyecto al agregar nuevas Historias de Usuario (HU), se deben seguir estas reglas:

### 1. Estándares de Diseño
- **Estética**: Mantener el efecto glassmorphism usando la clase `.glass` y los tokens definidos en `src/assets/index.css`.
- **Colores**: Usar las variables CSS `--accent-blue` y `--accent-violet` para acentos y gradientes.
- **Tipografía**: Fuente principal es **Inter**.

### 2. Ciclo de Vida de una HU
Toda nueva funcionalidad debe seguir este flujo:
1.  **Definición**: Redactar la HU con sus criterios de aceptación en el plan de implementación.
2.  **BDD (Pruebas)**: Crear el archivo `.feature` en `cypress/e2e/features/` antes de codificar.
3.  **Implementación**: Desarrollar los componentes Vue en `src/` y los step definitions en `cypress/e2e/step_definitions/`.
4.  **Validación**: Ejecutar pruebas y generar reporte de calidad.

### 3. Estándares de BDD (Cypress + Cucumber)
- **Idioma Gherkin**: Se debe usar un formato **híbrido**:
    - **Palabras Reservadas**: Siempre en **inglés** (`Feature`, `Scenario`, `Given`, `When`, `Then`, `And`).
    - **Contenido y Pasos**: Todo el texto descriptivo y los pasos deben estar en **español**.
- **Localización de Steps**: Los archivos JavaScript de definición de pasos deben estar en `cypress/e2e/step_definitions/`.

### 4. Comandos del Proyecto
- **Ejecutar App**: `npm run dev`
- **Correr Pruebas**: `npm run test:bdd`
- **Generar Reporte**: `npm run report:generate` (Ver resultados en `cypress/reports/html/index.html`).

---

## 🛠️ Entorno
El proyecto está optimizado para **GitHub Codespaces**. Al abrir el repositorio en un Codespace, el archivo `.devcontainer/devcontainer.json` se encargará de instalar Node.js, las extensiones de Vue, Cypress y Cucumber automáticamente.
