# language: es
Característica: Navegación del Panel de Control
  HU1: Como usuario, quiero tener un panel principal con navegación lateral, para moverme rápidamente entre mis tareas y proyectos.

  Escenario: Verificar barra lateral persistente
    Dado que el usuario ha abierto la aplicación
    Entonces debería ver una barra lateral que contiene los enlaces "Panel de Control" y "Tareas"

  Escenario: Verificar el estilo premium de la barra lateral
    Dado que el usuario está visualizando la barra lateral
    Entonces la barra lateral debería tener un fondo con efecto glassmorphism

  Escenario: Verificar mensaje de bienvenida dinámico
    Dado que el usuario está en la página principal
    Entonces debería ver un mensaje de bienvenida que diga "Bienvenido de nuevo, Usuario"
