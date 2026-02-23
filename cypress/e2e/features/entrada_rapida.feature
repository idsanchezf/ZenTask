# language: es
Característica: Entrada Rápida de Tareas

  Escenario: El usuario añade una nueva tarea desde el panel
    Dado que el usuario está en la página del panel de control
    Cuando escribe "Lanzar campaña de marketing" en la barra de entrada rápida
    Y presiona el botón "Añadir"
    Entonces una nueva tarea "Lanzar campaña de marketing" debería ser procesada
