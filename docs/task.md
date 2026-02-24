# Tareas de Desarrollo: Aplicación de Productividad

## Fase 1: Planificación y Prototipado
- [x] Investigar mejores prácticas y características de apps de productividad (Notion, Todoist, Monday)
- [x] Crear proyecto en Stitch y generar prototipos de alta fidelidad
    - [x] Pantalla: Dashboard (Vista General)
    - [x] Pantalla: Lista de Tareas / Tablero Kanban
    - [x] Pantalla: Detalle de Tarea / Crear Tarea
- [x] Definir Historias de Usuario con Criterios de Aceptación en `implementation_plan.md`

## Fase 2: Configuración del Proyecto Vue.js
- [x] Inicializar proyecto Vue 3 + Vite (Estructura manual para Codespaces)
- [x] Configurar el sistema de diseño (CSS, Colores, Tipografía) basadas en el prototipo
- [x] Configurar Framework de Pruebas BDD (Archivos .feature generados)

## Fase 3: Implementación de Historias de Usuario (MVP)
- [x] Implementar HU1: Panel de Control y Navegación Principal
- [x] Implementar HU2: Visualización de Tareas (Kanban)
- [x] Implementar HU3: Captura Rápida de Tareas
- [x] Generar y ejecutar pruebas automatizadas BDD (Definición de escenarios)

## Fase 4: Verificación y Entrega
- [x] Validar funcionamiento de las 3 historias de usuario
- [x] Generar `walkthrough.md` con evidencias
- [x] Crear `README.md` con estándares de desarrollo
- [x] Crear Skill de desarrollo `ZenTaskDev`
- [x] Subir código al repositorio de GitHub

## Fase 5: Expansión de Funcionalidades (HUs 4-6)
- [x] Definir y planificar HUs 4, 5 y 6
- [x] Implementar HU4: Detalle y Edición de Tareas
- [x] Implementar HU5: Gestión de Estados (Movimiento)
- [x] Implementar HU6: Buscador y Filtros
- [x] Validar nuevas funcionalidades con BDD

## Fase 6: Mantenimiento y Limpieza (HU7)
- [x] Definir y planificar HU7: Borrado de Tareas
- [x] Implementar botón de borrado en tarjetas
- [x] Implementar función de borrado en modal de detalle
- [x] Validar borrado con pruebas BDD

## Fase 7: Etiquetas y Filtrado (HU8)
- [x] Definir y planificar HU8: Asignación de Etiquetas
- [x] Generar prototipo en Stitch
- [x] Crear `cypress/e2e/features/hu8_etiquetas.feature`
- [x] Crear step definitions HU8 en `steps_etiquetas.js`
- [x] Crear componente `src/components/TagChip.vue`
- [x] Implementar etiquetas en tarjetas del Kanban
- [x] Implementar filtros de etiqueta sobre el tablero
- [x] Implementar selector toggle de etiquetas en panel de detalle

## Fase 8: Calendario de Tareas (HU9)
- [x] Definir y planificar HU9: Calendario de Tareas
- [x] Generar prototipo en Stitch
- [x] Crear `cypress/e2e/features/hu9_calendario.feature` (5 escenarios)
- [x] Crear `cypress/e2e/step_definitions/steps_calendario.js`
- [x] Crear `src/views/CalendarioView.vue` con grid mensual
- [x] Añadir campo `dueDate` a objetos de tarea
- [x] Navegación entre meses (anterior / siguiente)
- [x] Resaltar día actual con acento azul-violeta
- [x] Tarjetas de tarea compactas en días con `dueDate`
- [x] Panel lateral de tareas del día seleccionado
- [x] Filtros de prioridad encima del calendario
- [x] Actualizar router (`/calendario`) y sidebar en `App.vue`
