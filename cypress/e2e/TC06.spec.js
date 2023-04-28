// / <reference types="Cypress" />

// Avoid alert repetition in case of testcase failure and improve stability
const randomString = Math.random().toString(36).substring(2, 7);

describe('TC-06 Creating a Job Alert as registered user', () => {
    beforeEach(() => {
        cy.visitAndWait('/jobs')
        cy.get('#log-in-button').click()
        cy.get('div[role="dialog"]').should('exist')
        cy.Login()
        // cy.get('button[id="wzrk-cancel"]').click()
    })
    
    it('no keyword with daily and Email & Push Notification', () => {
        /* no search */
        cy.get('#job-alert-banner-1').should('contain.text','Send me job matchesSet Alert')
        cy.get('button:contains("Set Alert"):first').click()
        // type keyword in popup
        cy.get('div[role="dialog"] input[placeholder="E.g. Data Analyst"]').type(`test${randomString}`)
        // default choose daily and Email & Push Notification
        cy.get('div[role="dialog"]').should('contain.text','Job alert will be sent daily when new jobs are available.')
        cy.get('div[role="dialog"] button:contains("Create Alert")').click()
        cy.get('div[role="presentation"]').should('exist')
        cy.get('div[role="presentation"] h6').should('contain.text','Job alert created.')
    })

    it('after search with weekly and Email', () => {
        /* after search */
        // type keyword in input text
        cy.get('input[aria-label="discover job search"]').type(`it${randomString}`)
        cy.get('#job-alert-banner-1').should('contain.text','Send me matches for this searchSet Alert')
        cy.get('button:contains("Set Alert"):first').click()
        cy.get(`div[role="dialog"] input[value="it${randomString}"]`).should('exist')
        // choose weekly and Push Notification
        cy.get('div[role="dialog"] button:contains("Weekly")').click()
        cy.get('div[role="dialog"]').should('contain.text','Job alert will be sent every Monday when new jobs are available.')
        cy.get('div[role="dialog"] button:contains("Push Notification"):last').click()
        cy.get('div[role="dialog"] button:contains("Create Alert")').click()
        cy.get('div[role="presentation"]').should('exist')
        cy.get('div[role="presentation"] h6').should('contain.text','Job alert created.')
    })
})

describe('TC-06 Job Alert Page', () => {
    before(() => {
        cy.visitAndWait('/jobs')
        cy.get('#log-in-button').click()
        cy.get('div[role="dialog"]').should('exist')
        cy.Login()
        // cy.get('button[id="wzrk-cancel"]').click()
        cy.visitAndWait('/profile#manage-job-alerts')
    })
    
    it('10&11&12', () => {
        /* keyword match */
        cy.get('div[drawer_row_index="4"]')
            .should('contain.text',`test${randomString}`)
            .should('contain.text',`it${randomString}`)
        /* edit */
        // cancel
        cy.get(`p:contains("test${randomString}")`).next().find('svg[data-testid="EditIcon"]').click()
        cy.get('div[role="dialog"] button:contains("Cancel")').click()
        // save
        cy.get(`p:contains("it${randomString}")`).next().find('svg[data-testid="EditIcon"]').click()
        // choose daily and Email
        cy.get('div[role="dialog"] button:contains("Email"):last').click()
        cy.get('div[role="dialog"] button:contains("Save")').click()
        cy.get('div[role="presentation"]').should('exist')
        cy.get('div[role="presentation"] h6').should('contain.text','Job alert updated.')
        /* delete */
        cy.get(`p:contains("test${randomString}")`).next().find('svg[data-testid="DeleteIcon"]').click()
        cy.get('div[role="dialog"] button:contains("Delete")').click()
        cy.get('div[role="presentation"]').should('exist')
        cy.get('div[role="presentation"] h6').should('contain.text','Job alert deleted.')
        /* View Job */
        cy.get(`p:contains("it${randomString}")`).next().find('button:contains("View Jobs")').click()
        cy.wait(5000)
        cy.url().should('include', 'jobs')
    })

})