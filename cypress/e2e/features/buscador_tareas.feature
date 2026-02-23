Feature: Buscador de Tareas
  HU6: Como usuario, quiero filtrar mis tareas por nombre, para encontrar tareas específicas rápidamente.

  Scenario: Filtrar tareas por coincidencia parcial
    Given que el usuario está en el tablero Kanban
    And existen tareas tituladas "Diseñar arquitectura base" y "Configurar entorno BDD"
    When escribe "Diseñar" en el buscador del tablero
    Then debería verse la tarea "Diseñar arquitectura base"
    And no debería verse la tarea "Configurar entorno BDD"

  Scenario: Limpiar filtro de búsqueda
    Given que el usuario ha filtrado tareas por "Diseñar"
    When limpia el campo de búsqueda
    Then deberían volver a verse todas las tareas
