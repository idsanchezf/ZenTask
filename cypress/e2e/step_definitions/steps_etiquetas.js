/**
 * Steps de Etiquetas (Tags) – HU8
 * Feature: hu8-etiquetas.feature
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que el usuario ha activado el filtro de etiqueta {string}', (tag) => {
    cy.visit('/tareas')
    cy.get('.tag-filters .tag-chip').contains(tag).click()
})

When('hace clic en el filtro de etiqueta {string}', (tag) => {
    cy.get('.tag-filters .tag-chip').contains(tag).click()
})

When('activa la etiqueta {string} en el panel de etiquetas', (tag) => {
    cy.get('.tag-selector .tag-chip').contains(tag).click()
})

Then('las tarjetas de tarea deberían mostrar al menos una etiqueta', () => {
    cy.get('.task-card').first().find('.tag-chip').should('have.length.at.least', 1)
})

Then('la tarea en el tablero debería mostrar la etiqueta {string}', (tag) => {
    cy.get('.task-card').first().find('.tag-chip').contains(tag).should('exist')
})

Then('solo deberían verse tarjetas con la etiqueta {string}', (tag) => {
    cy.get('.task-card').each(($card) => {
        cy.wrap($card).find('.tag-chip').contains(tag).should('exist')
    })
})
