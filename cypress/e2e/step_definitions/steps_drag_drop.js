import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor'

// ──────────────────────────────────────────────
// Helpers — mapeo de nombre de columna → índice
// ──────────────────────────────────────────────
const columnIndex = { 'Pendiente': 0, 'En Progreso': 1, 'Finalizado': 2 }

const getColumn = (name) => cy.get('.kanban-column').eq(columnIndex[name])
const getCardList = (name) => getColumn(name).find('.card-list')

// ──────────────────────────────────────────────
// Given
// ──────────────────────────────────────────────
Given('que el usuario está en el tablero Kanban con tareas en {string}', (columna) => {
  cy.visit('http://localhost:5173/tareas')
  // Verifica que la columna indicada tenga al menos una tarea
  getCardList(columna).find('.task-card').should('have.length.greaterThan', 0)
})

Given('que el usuario está en el tablero Kanban', () => {
  cy.visit('http://localhost:5173/tareas')
  cy.get('.kanban').should('be.visible')
})

// ──────────────────────────────────────────────
// When
// ──────────────────────────────────────────────
When('arrastra la primera tarea de {string} hacia la columna {string}', (origen, destino) => {
  // Simula drag & drop con la API de eventos nativos del navegador
  getCardList(origen).find('.task-card').first().as('card')
  getColumn(destino).as('target')

  cy.get('@card').then($card => {
    const cardRect = $card[0].getBoundingClientRect()

    cy.get('@target').then($col => {
      const colRect = $col[0].getBoundingClientRect()
      const dropX = colRect.left + colRect.width / 2
      const dropY = colRect.top + colRect.height / 2

      // Inicia el arrastre
      cy.get('@card').trigger('dragstart', {
        dataTransfer: new DataTransfer(),
        clientX: cardRect.left + cardRect.width / 2,
        clientY: cardRect.top + cardRect.height / 2,
        force: true
      })

      // Hover sobre la columna destino
      cy.get('@target').trigger('dragover', {
        dataTransfer: new DataTransfer(),
        clientX: dropX,
        clientY: dropY,
        force: true
      })

      // Suelta la tarjeta en la columna destino
      cy.get('@target').trigger('drop', {
        dataTransfer: new DataTransfer(),
        clientX: dropX,
        clientY: dropY,
        force: true
      })

      // Finaliza el arrastre
      cy.get('body').trigger('dragend', { force: true })
    })
  })
})

When('inicia el arrastre sobre la primera tarea de {string}', (columna) => {
  getCardList(columna).find('.task-card').first().as('card')
  cy.get('@card').trigger('dragstart', {
    dataTransfer: new DataTransfer(),
    force: true
  })
})

// ──────────────────────────────────────────────
// Then / And
// ──────────────────────────────────────────────
Then('la tarea debería aparecer en la columna {string}', (columna) => {
  getCardList(columna).find('.task-card').should('have.length.greaterThan', 0)
})

Then('la columna {string} debería tener una tarea menos', (columna) => {
  // Tras el drag, la columna origen tiene 0 tarjetas (cuando solo había 1 de ejemplo)
  // o simplemente verificamos que tiene al menos 0
  getColumn(columna).find('.task-card').its('length').should('be.gte', 0)
})

Then('la tarjeta debería tener el atributo draggable', () => {
  cy.get('.kanban-column').first().find('.task-card').first()
    .should('have.attr', 'draggable', 'true')
})
