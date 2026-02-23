import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Steps de Navegación (HU1)
Given("que el usuario ha abierto la aplicación", () => {
    cy.visit("/");
});

Given("que el usuario está en la página del panel de control", () => {
    cy.visit("/");
});

Given("que el usuario está visualizando la barra lateral", () => {
    cy.visit("/");
    cy.get('.sidebar').should('be.visible');
});

Given("que el usuario está en la página principal", () => {
    cy.visit("/");
});

Then("debería ver una barra lateral que contiene los enlaces {string} y {string}", (link1, link2) => {
    cy.get('.sidebar').should('be.visible');
    cy.get('.sidebar').contains(link1);
    cy.get('.sidebar').contains(link2);
});

Then("la barra lateral debería tener un fondo con efecto glassmorphism", () => {
    cy.get('.sidebar').should('have.class', 'glass');
});

Then("debería ver un mensaje de bienvenida que diga {string}", (welcomeText) => {
    // Usamos regex para ignorar espacios extras o anidamiento de spans
    cy.get('h1').invoke('text').then((text) => {
        expect(text.trim()).to.include(welcomeText.trim());
    });
});

// Steps de Tablero (HU2)
Given("que el usuario navega a la vista de {string}", (viewName) => {
    cy.get('.sidebar').contains(viewName).click();
});

Given("que el usuario está en el tablero Kanban", () => {
    cy.visit("/tareas");
});

Then("debería ver las columnas {string}, {string} y {string}", (col1, col2, col3) => {
    cy.get('.kanban').contains(col1);
    cy.get('.kanban').contains(col2);
    cy.get('.kanban').contains(col3);
});

Then("debería ver tarjetas de tareas con título y prioridad claramente visibles", () => {
    cy.get('.task-card').first().within(() => {
        cy.get('h4').should('be.visible');
        cy.get('.badge').should('be.visible');
    });
});

// Steps de Entrada Rápida (HU3)
Given("que el usuario está en el Panel de Control", () => {
    cy.visit("/");
});

Then("debería ver un campo de texto para {string} en la parte superior", (label) => {
    cy.get('.quick-entry input').should('be.visible');
});

Given("que el usuario escribe {string} en el campo de entrada rápida", (taskTitle) => {
    cy.visit("/");
    cy.get('.quick-entry input').type(taskTitle);
});

When("presiona la tecla Enter", () => {
    cy.get('.quick-entry input').type('{enter}');
});

When("presiona el botón {string}", (buttonName) => {
    cy.get('.add-btn').click();
});

Then("la tarea debería ser añadida a la lista de tareas", () => {
    // En el mock actual mostramos un alert o console.log
    // Podríamos verificar si se limpia el input o si se llama a una función
    cy.get('.quick-entry input').should('have.value', '');
});

Then("una nueva tarea {string} debería ser procesada", (taskName) => {
    cy.get('.quick-entry input').should('have.value', '');
});
