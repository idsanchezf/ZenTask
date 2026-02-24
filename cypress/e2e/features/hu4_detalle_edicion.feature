Feature: Detalle y Edición de Tareas
  HU4: Como usuario, quiero ver y editar los detalles de una tarea, para mantener la información actualizada.

  Scenario: Abrir modal de detalle
    Given que el usuario está en el tablero Kanban
    When hace clic en una tarea "Diseñar arquitectura base"
    Then debería abrirse un panel lateral

  Scenario: Editar título de tarea
    Given que el usuario tiene abierto el detalle de una tarea
    When cambia el título a "Título modificado"
    And guarda los cambios
    Then la tarea en el tablero debería mostrar el nuevo título "Título modificado"
