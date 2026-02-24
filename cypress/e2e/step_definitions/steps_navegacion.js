/**
 * Steps de Navegación – HU1
 * Feature: navegacion.feature
 */
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que el usuario ha abierto la aplicación', () => {
    cy.visit('/')
})

Given('que el usuario está en la página del panel de control', () => {
    cy.visit('/')
})

Given('que el usuario está visualizando la barra lateral', () => {
    cy.visit('/')
    cy.get('.sidebar').should('be.visible')
})

Given('que el usuario está en la página principal', () => {
    cy.visit('/')
})

Then('debería ver una barra lateral que contiene los enlaces {string} y {string}', (link1, link2) => {
    cy.get('.sidebar').should('be.visible')
    cy.get('.sidebar').contains(link1)
    cy.get('.sidebar').contains(link2)
})

Then('la barra lateral debería tener un fondo con efecto glassmorphism', () => {
    cy.get('.sidebar').should('have.class', 'glass')
})

Then('debería ver un mensaje de bienvenida que diga {string}', (welcomeText) => {
    cy.get('h1').invoke('text').then((text) => {
        expect(text.trim()).to.include(welcomeText.trim())
    })
})
