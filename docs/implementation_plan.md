# Plan de Implementación: ZenTask MVP

Este documento detalla el plan para implementar los primeros módulos de la aplicación ZenTask basándose en los prototipos generados en Stitch.

## Historias de Usuario (User Stories)

### HU1: Panel de Control (Dashboard) y Navegación Principal
**Como** usuario, **quiero** tener un panel principal con navegación lateral, **para** moverme rápidamente entre mis tareas y proyectos.
- **Criterio 1**: Barra lateral persistente con enlaces a 'Panel de Control', 'Tareas' y 'Configuración'.
- **Criterio 2**: Estética de "Modo Oscuro" con efectos de glassmorphism.
- **Criterio 3**: Mensaje de bienvenida dinámico.

### HU2: Visualización de Tareas (Kanban simplificado)
**Como** usuario, **quiero** ver mis tareas organizadas por estado, **para** entender el progreso de mi trabajo.
- **Criterio 1**: Renderizar columnas: "Pendiente", "En Progreso", "Finalizado".
- **Criterio 2**: Tarjetas de tareas con título, prioridad y etiquetas visuales.

### HU3: Captura Rápida de Tareas
**Como** usuario, **quiero** añadir tareas rápidamente desde el panel principal, **para** no perder mis ideas.
- **Criterio 1**: Caja de texto "Entrada Rápida" en la parte superior del panel de control.
- **Criterio 2**: Al presionar 'Enter', la tarea se añade automáticamente a la lista "Pendiente".

### HU4: Detalle y Edición de Tareas
**Como** usuario, **quiero** ver y editar los detalles de una tarea, **para** mantener la información actualizada.
- **Criterio 1**: Al hacer clic en una tarea del tablero, se abre un modal de detalles.
- **Criterio 2**: Poder editar el título y la descripción desde el detalle.

### HU5: Gestión de Estados (Movimiento de Tareas)
**Como** usuario, **quiero** mover mis tareas entre estados, **para** gestionar el flujo de trabajo.
- **Criterio 1**: Botones de acción en cada tarjeta para mover a la siguiente/anterior columna.
- **Criterio 2**: Actualización instantánea de la UI al cambiar el estado.

### HU6: Buscador y Filtros
**Como** usuario, **quiero** filtrar mis tareas por nombre, **para** encontrar tareas específicas rápidamente.
- **Criterio 1**: Barra de búsqueda en la vista de Tareas que filtra en tiempo real.
- **Criterio 2**: Mensaje de "No se encontraron tareas" si no hay coincidencias.

### HU7: Borrado de Tareas
**Como** usuario, **quiero** eliminar tareas que ya no son necesarias, **para** mantener mi tablero organizado.
- **Criterio 1**: Icono de papelera en cada tarjeta para borrado rápido.
- **Criterio 2**: Botón de "Eliminar" dentro del modal de detalle con confirmación visual.

### HU8: Asignación y Filtrado de Etiquetas (Tags)
**Como** usuario, **quiero** asignar etiquetas a mis tareas y filtrar el tablero por ellas, **para** categorizar mi trabajo y encontrar tareas relacionadas rápidamente.
- **Criterio 1**: Cada tarea puede tener etiquetas de la lista: `Diseño`, `Dev`, `QA`, `Docs`.
- **Criterio 2**: Las etiquetas se muestran como chips de color en las tarjetas del tablero.
- **Criterio 3**: El panel de detalle permite activar/desactivar etiquetas con chips toggle.
- **Criterio 4**: Filtros de etiqueta encima del tablero; al activar uno, solo se muestran tareas con esa etiqueta.
- **Criterio 5**: El filtro de etiqueta y el buscador de texto funcionan simultáneamente.

### HU9: Calendario de Tareas
**Como** usuario, **quiero** ver mis tareas en un calendario mensual, **para** planificar mi trabajo en el tiempo.
- **Criterio 1**: Sección "Calendario" en la sidebar que navega a `/calendario`.
- **Criterio 2**: Grid mensual (7 columnas Lun–Dom) con mes y año actuales.
- **Criterio 3**: Navegación al mes anterior/siguiente con flechas ← →.
- **Criterio 4**: Día actual resaltado con acento azul-violeta.
- **Criterio 5**: Tareas con `dueDate` aparecen como tarjetas compactas en su día.
- **Criterio 6**: Clic en un día abre panel lateral con lista de tareas de ese día.
- **Criterio 7**: Chips de filtro por prioridad (Alta/Media/Baja) encima del grid.

### HU11: Drag & Drop en el Tablero Kanban
**Como** usuario, **quiero** arrastrar y soltar tarjetas entre columnas del tablero Kanban, **para** cambiar el estado de mis tareas de forma visual y rápida sin abrir el modal de detalle.
- **Criterio 1**: Todas las tarjetas del tablero son arrastrables (`draggable="true"`).
- **Criterio 2**: Al arrastrar una tarjeta, muestra efecto visual de elevación (opacidad reducida + rotación sutil).
- **Criterio 3**: La columna destino se resalta con borde punteado azul-violeta al recibir el hover de una tarjeta.
- **Criterio 4**: Al soltar la tarjeta en una columna distinta, el estado se actualiza automáticamente.
- **Criterio 5**: La tarjeta aparece instantáneamente en la nueva columna tras el drop.
- **Criterio 6**: Si se suelta fuera de una columna válida, la tarjeta regresa a su posición original.


---

## Configuración de Entorno (Codespaces)
Dado que el entorno local no dispone de Node.js, configuraremos el proyecto para ser ejecutado en **GitHub Codespaces**.

#### [NEW] [.devcontainer/devcontainer.json](file:///c:/@idsanchezf/TestAntigravityStitch/.devcontainer/devcontainer.json)
Configuración para aprovisionar un contenedor con Node.js 20 y extensiones de Vue.

---

## Prototipos de Referencia
- [Dashboard](https://lh3.googleusercontent.com/aida/AOfcidXrou6wv2wn2uRtNcaw6lCak8E1uawrgtzAIyg0YvOJt0RAiKWxnpjkJXCkkgC3_E4AYLgEtype-Nd2KiolEk7QdTSH3b8W0_3hNmPa67YBAQQF3SgH87BDF1ywArEOHg_2xKXo916AeWx0JkPT5YQClhtZaPBT8EA3jLorKgVVrhjtgQEJ7wTayKTNn0xO_FbF752Mxww_exkEp9t1sz_cTODEqu6pX4fDZkl78A-ER2tLSqSHsnmeqpE)
- [Kanban](https://lh3.googleusercontent.com/aida/AOfcidV6b-j7W2yEQatqaVsFFi6prJRMLZfxfGTKD-v5BDVZu_5jebrPWWbIa7Le9yP1XfP7V8QDdY0Ez1BL3Op-9DTNI8N16dwXaVcC7dcpp6cIA2wN6i6ZGA6OnF_hKVvUeNr5p0ikktIUEV2przc7bY4P3iCIWxAUJBav3D3uos0ZB6_8oYI-ZB18oRzIhGo8GBWAVJkCFB8aQ6h5YHHHfla7-yuw8qwXV4KspbyPbZhWWRORD48TImpCRQ)

---

## Cambios Propuestos

### Frontend (Vue.js)

#### [NEW] [App.vue](file:///c:/@idsanchezf/TestAntigravityStitch/src/App.vue)
Estructura base con barra lateral y visualización de rutas.

#### [NEW] [DashboardView.vue](file:///c:/@idsanchezf/TestAntigravityStitch/src/views/DashboardView.vue)
Implementación de la HU1 y HU3 (Entrada Rápida).

#### [NEW] [TaskListView.vue](file:///c:/@idsanchezf/TestAntigravityStitch/src/views/TaskListView.vue)
Implementación de la HU2 (Kanban simplificado).

#### [NEW] [index.css](file:///c:/@idsanchezf/TestAntigravityStitch/src/assets/index.css)
Definición de tokens de diseño (colores, desenfoque, gradientes).

---

## Plan de Verificación

### Pruebas Automatizadas (BDD)
Utilizaremos **Cypress** con el preprocesador de **Cucumber** para implementar pruebas basadas en comportamiento (BDD). Se ha configurado un sistema de reportes HTML para visualizar los resultados.

#### Comandos de Prueba
- `npm run test:bdd`: Ejecuta las pruebas y genera el archivo JSON de resultados.
- `npm run report:generate`: Procesa el JSON y genera un reporte HTML legible en `cypress/reports/html/`.

#### Escenarios BDD (.feature)

**HU1: Navegación del Panel de Control**
```gherkin
Feature: Navegación del Panel de Control
  Scenario: El usuario abre el panel y ve la barra lateral
    Given que el usuario está en la página del panel de control
    Then debería ver una barra lateral con "Entrada", "Hoy" y "Próximo"
    And el mensaje de bienvenida debería decir "Bienvenido de nuevo"
```

**HU2: Tablero de Tareas**
```gherkin
Feature: Tablero de Tareas
  Scenario: El usuario visualiza tareas en el tablero Kanban
    Given que el usuario navega a la vista de "Tareas"
    Then debería ver las columnas "Pendiente", "En Progreso" y "Finalizado"
    And cada columna debería contener al menos una tarjeta de tarea de ejemplo
```

**HU3: Entrada Rápida de Tareas**
```gherkin
Feature: Entrada Rápida de Tareas
  Scenario: El usuario añade una nueva tarea desde el panel
    Given que el usuario está en la página del panel de control
    When escribe "Lanzar campaña de marketing" en la barra de entrada rápida
    And presiona Enter
    Then una nueva tarea "Lanzar campaña de marketing" debería aparecer en la columna "Pendiente"
```

**HU4: Detalle y Edición**
```gherkin
Feature: Detalle y Edición de Tareas
  Scenario: El usuario edita la descripción de una tarea
    Given que el usuario está en el tablero Kanban
    When hace clic en la primera tarea
    And cambia la descripción a "Nueva descripción detallada"
    And guarda los cambios
    Then el detalle debería mostrar la nueva descripción
```

**HU5: Cambio de Estado**
```gherkin
Feature: Gestión de Estados
  Scenario: El usuario mueve una tarea a En Progreso
    Given que el usuario tiene una tarea en "Pendiente"
    When hace clic en el botón "Iniciar" de la tarea
    Then la tarea debería moverse a la columna "En Progreso"
```

**HU6: Filtrado de Tareas**
```gherkin
Feature: Buscador de Tareas
  Scenario: El usuario busca una tarea por nombre
    Given que el usuario está en el tablero Kanban con tareas "Llamar cliente" y "Enviar factura"
    When escribe "Llamar" en el buscador
    Then solo debería verse la tarea "Llamar cliente"
```

**HU7: Borrado de Tareas**
```gherkin
Feature: Borrado de Tareas
  Scenario: El usuario elimina una tarea desde el tablero
    Given que el usuario tiene una tarea llamada "Configurar entorno BDD"
    When hace clic en el icono de borrar de la tarea
    Then la tarea "Configurar entorno BDD" debería desaparecer del tablero
```

---

## Verificación Manual
1. Abrir la aplicación y verificar que la barra lateral esté presente y los enlaces funcionen.
2. Escribir una tarea en la "Entrada Rápida" y verificar que se añada a la lista.
3. Navegar a la vista de tareas y confirmar la organización en columnas.
