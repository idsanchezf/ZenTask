Feature: Drag & Drop en el Tablero Kanban
  HU11: Como usuario, quiero arrastrar tarjetas entre columnas del Kanban para cambiar su estado visualmente.

  Scenario: El usuario arrastra una tarea a la columna En Progreso
    Given que el usuario está en el tablero Kanban con tareas en "Pendiente"
    When arrastra la primera tarea de "Pendiente" hacia la columna "En Progreso"
    Then la tarea debería aparecer en la columna "En Progreso"
    And la columna "Pendiente" debería tener una tarea menos

  Scenario: La tarjeta muestra efecto visual durante el arrastre
    Given que el usuario está en el tablero Kanban
    When inicia el arrastre sobre la primera tarea de "Pendiente"
    Then la tarjeta debería tener el atributo draggable

  Scenario: El usuario arrastra una tarea a la columna Finalizado
    Given que el usuario está en el tablero Kanban con tareas en "Pendiente"
    When arrastra la primera tarea de "Pendiente" hacia la columna "Finalizado"
    Then la tarea debería aparecer en la columna "Finalizado"
