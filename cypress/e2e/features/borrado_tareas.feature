Feature: Borrado de Tareas
  HU7: Como usuario, quiero eliminar tareas que ya no son necesarias, para mantener mi tablero organizado.

  Scenario: El usuario elimina una tarea desde el tablero
    Given que el usuario está en el tablero Kanban
    And existe una tarea en la columna "Pendiente"
    When hace clic en el icono de borrar de la tarea
    And confirma la eliminación
    Then la tarea debería desaparecer de "Pendiente"

  Scenario: El usuario elimina una tarea desde el detalle
    Given que el usuario tiene abierto el detalle de una tarea
    When hace clic en el enlace "Eliminar Tarea"
    And confirma la eliminación
    Then la tarea debería desaparecer de su columna
