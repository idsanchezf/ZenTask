Feature: Dashboard de Estadísticas
  HU10: Como usuario, quiero ver un resumen visual de mis tareas con métricas, para conocer mi productividad de un vistazo.

  Scenario: El dashboard muestra las 4 KPI cards
    Given que el usuario navega a la vista de "Panel de Control"
    Then debería ver 4 tarjetas KPI en el dashboard

  Scenario: El total de tareas es un número visible
    Given que el usuario navega a la vista de "Panel de Control"
    Then la KPI "Total Tareas" debería mostrar un número mayor a cero

  Scenario: El gráfico de barras por estado es visible
    Given que el usuario navega a la vista de "Panel de Control"
    Then debería ver el gráfico de barras "Tareas por Estado"

  Scenario: El donut de prioridad es visible con su leyenda
    Given que el usuario navega a la vista de "Panel de Control"
    Then debería ver el donut chart de distribución por prioridad

  Scenario: La sección de próximos vencimientos tiene tareas
    Given que el usuario navega a la vista de "Panel de Control"
    Then debería ver la sección de próximas fechas de vencimiento
