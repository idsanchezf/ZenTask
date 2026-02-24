/**
 * Steps de Borrado de Tareas – HU7
 * Feature: borrado_tareas.feature
 */
import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

When('hace clic en el icono de borrar de la tarea', () => {
    cy.get('.delete-btn').first().click()
})

When('confirma la eliminación', () => {
    // Cypress envía `true` a los confirm() por defecto; se fuerza explícitamente
    cy.on('window:confirm', () => true)
})

When('hace clic en el enlace {string}', (linkText) => {
    cy.get('.delete-link').contains(linkText).click()
})

Then('la tarea debería desaparecer de su columna', () => {
    cy.get('.task-detail-sidebar').should('not.exist')
})

Then('la tarea {string} debería desaparecer del tablero', (title) => {
    cy.get('.task-card').contains(title).should('not.exist')
})
