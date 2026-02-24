Feature: Calendario de Tareas
  HU9: Como usuario, quiero ver mis tareas en un calendario mensual, para planificar mi trabajo en el tiempo.

  Scenario: El usuario accede a la vista de calendario
    Given que el usuario navega a la vista de "Calendario"
    Then debería ver un grid de calendario con el mes y año actuales

  Scenario: El usuario navega al mes siguiente
    Given que el usuario está en la vista de calendario
    When hace clic en el botón de siguiente mes
    Then debería ver el mes siguiente en el encabezado

  Scenario: Las tareas con fecha aparecen en el día correcto
    Given que el usuario está en la vista de calendario
    Then las tareas con fecha de vencimiento deberían verse en su día correspondiente

  Scenario: El usuario selecciona un día y ve sus tareas
    Given que el usuario está en la vista de calendario
    When hace clic en un día con tareas
    Then debería abrirse el panel lateral con las tareas de ese día

  Scenario: El filtro de prioridad oculta tareas
    Given que el usuario está en la vista de calendario
    When activa el filtro de prioridad "Alta"
    Then solo deberían verse tarjetas de prioridad "Alta" en el calendario
