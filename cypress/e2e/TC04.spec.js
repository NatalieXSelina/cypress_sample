// / <reference types="Cypress" />

describe('TC-04 Bookmark/Unbookmark Job Post', () => {
    before(() => {
        cy.visitAndWait('/jobs')
        cy.get('#log-in-button').click()
        cy.get('div[role="dialog"]').should('exist')
        cy.Login()
        // cy.get('button[id="wzrk-cancel"]').click()
    })

    it('2&3&4', () => {
        /* Job detail */
        /* Desktop & Tablet */
        cy.get('.jss1>div:nth-child(1) div[index="2"]').click()
        cy.get('.jss1>div:nth-child(1) div[index="2"] .MuiGrid-item:nth-child(1) h6:nth-child(1)').then((el)=>{
            var text = el.text()     
            cy.get('.jss1>div:nth-child(2) a[rel="noopener"]').should('contain.text',text)
        })
        /* Mobile */
        cy.viewport(375, 812)
        cy.get('#job-alert-banner-1').next().find('a').should('have.attr','href').then((href)=>{
            expect(href).to.includes('/jobs/jobs-')
        })
        cy.viewport(1680, 900) // back to normal size
        /* Bookmark */
        cy.get('#bookmark-icon-job-list-button:first').click()
        cy.get('svg[data-testid="BookmarkIcon"]').should('exist')
        cy.get('div[role="presentation"]').should('exist')
        cy.get('div[role="presentation"] h6').should('contain.text','Saved job successfully')
        /* Unbookmark */
        cy.get('svg[data-testid="BookmarkIcon"]:first').click()
        cy.get('div[role="presentation"]').should('exist')
        cy.get('div[role="presentation"] h6').should('contain.text','Unsaved job successfully')
    })
})