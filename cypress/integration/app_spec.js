Cypress.config('baseUrl', 'http://localhost:3000')

describe('initial page load', function() {
    it('should have correct title', function () {
        cy.visit('http://localhost:3000')
        cy.title().should('include', 'Movies: Rails')
    })
})