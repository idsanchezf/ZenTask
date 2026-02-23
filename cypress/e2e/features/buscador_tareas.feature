Feature: Buscador de Tareas
  HU6: Como usuario, quiero filtrar mis tareas por nombre, para encontrar tareas específicas rápidamente.

  Scenario: Filtrar tareas por coincidencia parcial
    Given que el usuario está en el tablero Kanban
    And existen tareas tituladas "Llamar a Juan" y "Enviar email"
    When escribe "Llamar" en el buscador del tablero
    Then debería verse la tarea "Llamar a Juan"
    And no debería verse la tarea "Enviar email"

  Scenario: Limpiar filtro de búsqueda
    Given que el usuario ha filtrado tareas por "Llamar"
    When limpia el campo de búsqueda
    Then deberían volver a verse todas las tareas
