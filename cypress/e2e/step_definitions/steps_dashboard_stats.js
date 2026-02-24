/**
 * Steps del Dashboard de Estadísticas – HU10
 * Feature: hu10_dashboard_stats.feature
 */
import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// Given reutiliza el alias genérico ya definido en steps_calendario.js:
// 'que el usuario navega a la vista de {string}'
// No es necesario redefinirlo.

Then('debería ver 4 tarjetas KPI en el dashboard', () => {
    cy.get('.kpi-card').should('have.length', 4)
})

Then('la KPI {string} debería mostrar un número mayor a cero', (kpiLabel) => {
    cy.get('.kpi-card').contains(kpiLabel)
        .parents('.kpi-card')
        .find('.kpi-value')
        .invoke('text')
        .then(text => {
            expect(parseInt(text.trim())).to.be.greaterThan(0)
        })
})

Then('debería ver el gráfico de barras {string}', (title) => {
    cy.get('.chart-section').contains(title).should('be.visible')
    cy.get('.bar-chart').should('be.visible')
})

Then('debería ver el donut chart de distribución por prioridad', () => {
    cy.get('.donut-section').should('be.visible')
    cy.get('.donut-chart').should('be.visible')
    cy.get('.donut-legend').should('be.visible')
})

Then('debería ver la sección de próximas fechas de vencimiento', () => {
    cy.get('.upcoming-section').should('be.visible')
    cy.get('.upcoming-item').should('have.length.at.least', 1)
})
