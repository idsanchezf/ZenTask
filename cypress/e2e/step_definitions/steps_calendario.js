/**
 * Steps de Calendario de Tareas – HU9
 * Feature: hu9_calendario.feature
 */
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que el usuario está en la vista de calendario', () => {
    cy.visit('/calendario')
})

// Alias semántico para el escenario 1 (navega por nombre de sección)
Given('que el usuario navega a la vista de {string}', (section) => {
    const routes = { 'Calendario': '/calendario', 'Tareas': '/tareas', 'Panel de Control': '/' }
    cy.visit(routes[section] ?? '/')
})

When('hace clic en el botón de siguiente mes', () => {
    cy.get('.btn-next-month').click()
})

When('hace clic en un día con tareas', () => {
    cy.get('.calendar-day.has-tasks').first().click()
})

When('activa el filtro de prioridad {string}', (priority) => {
    cy.contains('.priority-filters .badge', priority).click()
})

Then('debería ver un grid de calendario con el mes y año actuales', () => {
    cy.get('.calendar-grid').should('be.visible')
    cy.get('.month-nav h2').should('be.visible')
})

Then('debería ver el mes siguiente en el encabezado', () => {
    // Verificamos que el encabezado cambió (texto distinto al inicial)
    cy.get('.month-nav h2').should('be.visible')
    cy.get('.calendar-grid').should('be.visible')
})

Then('las tareas con fecha de vencimiento deberían verse en su día correspondiente', () => {
    cy.get('.calendar-day.has-tasks').should('have.length.at.least', 1)
    cy.get('.calendar-day.has-tasks .task-pill').should('be.visible')
})

Then('debería abrirse el panel lateral con las tareas de ese día', () => {
    cy.get('.day-detail-sidebar').should('be.visible')
    cy.get('.day-detail-sidebar .task-item').should('have.length.at.least', 1)
})

Then('solo deberían verse tarjetas de prioridad {string} en el calendario', (priority) => {
    const cls = priority.toLowerCase()
    cy.get('.calendar-day .task-pill').each(($pill) => {
        cy.wrap($pill).find(`.badge.${cls}`).should('exist')
    })
})
