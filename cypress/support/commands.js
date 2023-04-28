// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-network-idle'

Cypress.Commands.add('visitAndWait', (url) => {
    cy.visit(url)
    cy.waitForNetworkIdle('GET','*/collect*', 1000) // wait for request done
})

Cypress.Commands.add('Login', () => {
    cy.get('div[role="dialog"] input[id="filled-required-Email"]').type(Cypress.env('Email'))
    cy.get('div[role="dialog"] input[id="filled-required-Password"]').type(Cypress.env('Password'))
    cy.get('div[role="dialog"] button:contains("Log In")').click()
    cy.wait(5000)
    cy.get('#nav-signed-in-avatar-button').should('exist')
})