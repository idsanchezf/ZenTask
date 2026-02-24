Feature: Etiquetas de Tareas
  HU8: Como usuario, quiero asignar etiquetas a mis tareas y filtrar el tablero por ellas, para categorizar mi trabajo rápidamente.

  Scenario: Las etiquetas se muestran en las tarjetas del tablero
    Given que el usuario está en el tablero Kanban
    Then las tarjetas de tarea deberían mostrar al menos una etiqueta

  Scenario: El usuario asigna una etiqueta desde el detalle de tarea
    Given que el usuario tiene abierto el detalle de una tarea
    When activa la etiqueta "QA" en el panel de etiquetas
    And guarda los cambios
    Then la tarea en el tablero debería mostrar la etiqueta "QA"

  Scenario: El usuario filtra el tablero por etiqueta
    Given que el usuario está en el tablero Kanban
    When hace clic en el filtro de etiqueta "Dev"
    Then solo deberían verse tarjetas con la etiqueta "Dev"

  Scenario: Desactivar el filtro restaura todas las tareas
    Given que el usuario ha activado el filtro de etiqueta "Dev"
    When hace clic de nuevo en el filtro de etiqueta "Dev"
    Then deberían volver a verse todas las tareas
