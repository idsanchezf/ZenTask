# language: es
Característica: Tablero de Tareas

  Escenario: El usuario visualiza tareas en el tablero Kanban
    Dado que el usuario navega a la vista de "Tareas"
    Entonces debería ver las columnas "Pendiente", "En Progreso" y "Finalizado"
    Y cada columna debería contener tarjetas de tarea de ejemplo
