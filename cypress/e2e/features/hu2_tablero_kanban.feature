Feature: Tablero de Tareas
  HU2: Como usuario, quiero ver mis tareas organizadas por estado, para entender el progreso de mi trabajo.

  Scenario: Visualización de columnas Kanban
    Given que el usuario navega a la vista de "Tareas"
    Then debería ver las columnas "Pendiente", "En Progreso" y "Finalizado"

  Scenario: Visualización de tareas en tarjetas
    Given que el usuario está en el tablero Kanban
    Then debería ver tarjetas de tareas con título y prioridad claramente visibles
