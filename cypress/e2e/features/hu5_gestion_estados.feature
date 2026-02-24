Feature: Gestión de Estados
  HU5: Como usuario, quiero mover mis tareas entre estados, para gestionar el flujo de trabajo.

  Scenario: Mover tarea a 'En Progreso'
    Given que el usuario está en el tablero Kanban
    And existe una tarea en la columna "Pendiente"
    When hace clic en el botón de mover a la derecha en la tarea
    Then la tarea debería desaparecer de "Pendiente"
    And la tarea debería aparecer en la columna "En Progreso"

  Scenario: Mover tarea a 'Finalizado'
    Given que el usuario está en el tablero Kanban
    And existe una tarea en la columna "En Progreso"
    When hace clic en el botón de mover a la derecha en la tarea
    Then la tarea debería aparecer en la columna "Finalizado"
