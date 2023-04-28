// / <reference types="Cypress" />

// Avoid alert repetition in case of testcase failure and improve stability
const randomString = Math.random().toString(36).substring(2, 7);

describe('TC-07 Creating Job Alerts as a guest user', () => {
    before(() => {
        cy.visitAndWait('/jobs')
    })
    it('1', () => {
        cy.get('.jss1>div:nth-child(1) div[index="1"]').click()
        cy.get('.jss1>div:nth-child(1) div[index="1"] .MuiGrid-item:nth-child(1) h6:nth-child(1)').then((el)=>{
            var text = el.text()
            cy.get('.jss1>div:nth-child(2) a[rel="noopener"]').should('contain.text',text)
        })
    })

    it('2&3', () => {
        /* no search */
        cy.get('#job-alert-banner-1').find('input').type(`svk${randomString}@mail.com`)
        cy.get('button:contains("Set Alert"):first').click()
        // type keyword in popup
        cy.get('div[role="dialog"] input[placeholder="e.g. Internship"]').type(`guest${randomString}`)
        cy.get('div[role="dialog"] button:contains("Create job alert")').click()
        cy.get('div[role="dialog"] h6').should('contain.text','Job alert created')
        cy.get('div[role="dialog"] button:contains("Done")').click()
    })

    it('4', () => {
        /* after search */
        cy.get('#job-alert-banner-1').find('input').clear().type(`svk${randomString}@mail.com`)
        // type keyword in input text
        cy.get('input[aria-label="discover job search"]').type(`guestSearch${randomString}`)
        cy.get('button:contains("Set Alert"):first').click()
        cy.get(`div[role="dialog"] input[value="guestSearch${randomString}"]`).should('exist')
        cy.get('div[role="dialog"] button:contains("Create job alert")').click()
        cy.get('div[role="dialog"] h6').should('contain.text','Job alert created')
        cy.get('div[role="dialog"] button:contains("Done")').click()
    })
})