// / <reference types="Cypress" />

describe('TC-01 Navigating to Job Seeker Web as a fresh user', () => {
    before(() => {
        cy.visitAndWait('/')
    })
    it('1&2', () => {
        /* DynamicEffects and title */
        cy.get('.MuiGrid-container[opacity="1"]:first')
            .wait(2000)
            .should('have.attr','opacity','0')
        cy.get('div.MuiGrid-root>div:nth-child(1)>div>div:nth-child(1)>div:nth-child(1)').should('contain.text','Find your ultimatefirstdreamidealnext job')
        /* Trending Searches */
        cy.get('div.MuiGrid-root>div:nth-child(1)>div>div:nth-child(1)>div:nth-child(3)>div:nth-child(1)').should('contain.text','Trending')
        /* Company Spotlight */
        cy.get('a[aria-label]').filter(':not([aria-label="open drawer"])').should('have.length',9)
        /* Ad Banner */
        cy.get('button[style="transform: translateX(50%);"]').next().find('a[rel="noopener noreferrer"]').should('have.length',9)
    })

    it('3', () => {
        cy.get('#nav-jobs-button')
            .should('have.text','jobs')
            .parent().should('have.attr','href','/jobs')
        cy.get('#nav-companies-button')
            .should('have.text','companies')
            .parent().parent().should('have.attr','href','/companies')
        cy.get('#nav-for-employers-button').should('have.text','for employers')
        cy.get('#log-in-button').should('have.text','log in')
        cy.get('#log-in-button').click()
        cy.get('div[role="dialog"]').should('exist')
        cy.get('div[role="dialog"] button[tabindex="0"]:first').click()
        cy.get('#sign-up-button').should('have.text','sign up')
        cy.get('#sign-up-button').click()
        cy.get('div[role="dialog"]').should('exist')
        cy.get('div[role="dialog"] button[tabindex="0"]:first').click()
    })
})