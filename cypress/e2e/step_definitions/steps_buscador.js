/**
 * Steps de Buscador y Filtros – HU6
 * Feature: buscador_tareas.feature
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('existen tareas tituladas {string} y {string}', (title1, title2) => {
    cy.get('.kanban').contains(title1).should('be.visible')
    cy.get('.kanban').contains(title2).should('be.visible')
})

Given('que el usuario ha filtrado tareas por {string}', (text) => {
    cy.visit('/tareas')
    cy.get('.search-bar input').type(text)
})

When('escribe {string} en el buscador del tablero', (searchText) => {
    cy.get('.search-bar input').type(searchText)
})

When('limpia el campo de búsqueda', () => {
    cy.get('.search-bar input').clear()
})

Then('debería verse la tarea {string}', (title) => {
    cy.get('.task-card').contains(title).should('exist')
})

Then('no debería verse la tarea {string}', (title) => {
    cy.get('.task-card').contains(title).should('not.exist')
})

Then('deberían volver a verse todas las tareas', () => {
    cy.get('.task-card').should('have.length.at.least', 2)
})
