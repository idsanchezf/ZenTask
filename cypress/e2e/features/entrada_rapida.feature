Feature: Entrada Rápida de Tareas
  HU3: Como usuario, quiero añadir tareas rápidamente desde el panel principal, para no perder mis ideas.

  Scenario: Presencia del campo de entrada rápida
    Given que el usuario está en el Panel de Control
    Then debería ver un campo de texto para "Entrada Rápida" en la parte superior

  Scenario: Añadir tarea presionando Enter
    Given que el usuario escribe "Nueva tarea de prueba" en el campo de entrada rápida
    When presiona la tecla Enter
    Then la tarea debería ser añadida a la lista de tareas
