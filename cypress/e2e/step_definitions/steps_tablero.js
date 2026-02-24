/**
 * Steps de Tablero Kanban – HU2
 * Feature: tablero.feature
 */
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que el usuario navega a la vista de {string}', (viewName) => {
    cy.visit('/')
    cy.get('.sidebar').contains(viewName).click()
})

Given('que el usuario está en el tablero Kanban', () => {
    cy.visit('/tareas')
})

Then('debería ver las columnas {string}, {string} y {string}', (col1, col2, col3) => {
    cy.get('.kanban').contains(col1)
    cy.get('.kanban').contains(col2)
    cy.get('.kanban').contains(col3)
})

Then('debería ver tarjetas de tareas con título y prioridad claramente visibles', () => {
    cy.get('.task-card').first().within(() => {
        cy.get('h4').should('be.visible')
        cy.get('.badge').should('be.visible')
    })
})
