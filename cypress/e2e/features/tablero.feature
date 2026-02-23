# language: es
Característica: Tablero de Tareas
  HU2: Como usuario, quiero ver mis tareas organizadas por estado, para entender el progreso de mi trabajo.

  Escenario: Visualización de columnas Kanban
    Dado que el usuario navega a la vista de "Tareas"
    Entonces debería ver las columnas "Pendiente", "En Progreso" y "Finalizado"

  Escenario: Visualización de tareas en tarjetas
    Dado que el usuario está en el tablero Kanban
    Entonces debería ver tarjetas de tareas con título y prioridad claramente visibles
