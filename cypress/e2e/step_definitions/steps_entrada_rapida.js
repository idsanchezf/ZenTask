/**
 * Steps de Entrada Rápida – HU3
 * Feature: entrada_rapida.feature
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que el usuario está en el Panel de Control', () => {
    cy.visit('/')
})

Given('que el usuario escribe {string} en el campo de entrada rápida', (taskTitle) => {
    cy.visit('/')
    cy.get('.quick-entry input').type(taskTitle)
})

Then('debería ver un campo de texto para {string} en la parte superior', (_label) => {
    cy.get('.quick-entry input').should('be.visible')
})

When('presiona la tecla Enter', () => {
    cy.get('.quick-entry input').type('{enter}')
})

When('presiona el botón {string}', (_buttonName) => {
    cy.get('.add-btn').click()
})

Then('la tarea debería ser añadida a la lista de tareas', () => {
    cy.get('.quick-entry input').should('have.value', '')
})

Then('una nueva tarea {string} debería ser procesada', (_taskName) => {
    cy.get('.quick-entry input').should('have.value', '')
})
