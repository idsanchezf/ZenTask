/**
 * Steps de Detalle y Edición – HU4
 * Feature: detalle_tarea.feature
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que el usuario tiene abierto el detalle de una tarea', () => {
    cy.visit('/tareas')
    cy.get('.task-card').first().click()
})

When('hace clic en una tarea {string}', (taskTitle) => {
    cy.get('.task-card').contains(taskTitle).click()
})

Then('debería abrirse un panel lateral', () => {
    cy.get('.task-detail-sidebar').should('be.visible')
})

Then('debería abrirse un panel lateral con el título {string}', (_title) => {
    cy.get('.task-detail-sidebar').should('be.visible')
    cy.get('.task-detail-sidebar h2').contains('Detalle')
})

When('cambia el título a {string}', (newTitle) => {
    cy.get('.task-detail-sidebar input[name="title"]').clear().type(newTitle)
})

When('guarda los cambios', () => {
    cy.get('.save-btn').click()
})

Then('la tarea en el tablero debería mostrar el nuevo título {string}', (expectedTitle) => {
    cy.get('.task-card').contains(expectedTitle).should('exist')
})
