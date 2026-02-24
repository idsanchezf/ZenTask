Feature: Navegación del Panel de Control
  HU1: Como usuario, quiero tener un panel principal con navegación lateral, para moverme rápidamente entre mis tareas y proyectos.

  Scenario: Verificar barra lateral persistente
    Given que el usuario ha abierto la aplicación
    Then debería ver una barra lateral que contiene los enlaces "Panel de Control" y "Tareas"

  Scenario: Verificar el estilo premium de la barra lateral
    Given que el usuario está visualizando la barra lateral
    Then la barra lateral debería tener un fondo con efecto glassmorphism

  Scenario: Verificar mensaje de bienvenida dinámico
    Given que el usuario está en la página principal
    Then debería ver un mensaje de bienvenida que diga "Bienvenido de nuevo, Usuario"
