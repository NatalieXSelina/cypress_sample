// / <reference types="Cypress" />

describe('TC-05 Applying Jobs', () => {
    before(() => {
        cy.visitAndWait('/jobs')
        cy.get('#log-in-button').click()
        cy.get('div[role="dialog"]').should('exist')
        cy.Login()
        // cy.get('button[id="wzrk-cancel"]').click()
    })
    
    it('3', () => {
        cy.get('button:contains("Apply")').click()
        cy.get('div[role="presentation"]').should('exist')
        cy.get('div[role="presentation"] h6').should('contain.text','Your application has been sent!')
    })
})