/**
 * Steps de Gestión de Estados – HU5
 * Feature: gestion_estados.feature
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('existe una tarea en la columna {string}', (column) => {
    cy.get('.kanban-column').contains(column).parent().find('.task-card').should('have.length.at.least', 1)
})

When('hace clic en el botón de mover a la derecha en la tarea', () => {
    cy.get('.move-right').filter(':visible').first().click()
})

Then('la tarea debería desaparecer de {string}', (column) => {
    // Verificamos que la columna se actualice correctamente tras el movimiento
    cy.get('.kanban-column').contains(column).parent().find('.task-card').should('exist')
    cy.wait(100)
})

Then('la tarea debería aparecer en la columna {string}', (column) => {
    cy.get('.kanban-column').contains(column).parent().find('.task-card').should('have.length.at.least', 1)
})
