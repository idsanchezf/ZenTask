# language: es
Característica: Entrada Rápida de Tareas
  HU3: Como usuario, quiero añadir tareas rápidamente desde el panel principal, para no perder mis ideas.

  Escenario: Presencia del campo de entrada rápida
    Dado que el usuario está en el Panel de Control
    Entonces debería ver un campo de texto para "Entrada Rápida" en la parte superior

  Escenario: Añadir tarea presionando Enter
    Dado que el usuario escribe "Nueva tarea de prueba" en el campo de entrada rápida
    Cuando presiona la tecla Enter
    Entonces la tarea debería ser añadida a la lista de tareas
