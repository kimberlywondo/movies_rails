Cypress.config('baseUrl', 'http://localhost:3000')

describe('initial page load', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('should have correct title', function () {
        cy.title().should('include', 'Movies: Rails')
    })

    it('should redirect to user signup/login', function() {
        cy.request({ url: '/', followRedirect: false })
            .then(function(response) {
            expect(response.status).to.eq(302)
        })
        cy.location().its('pathname').should('contain', "/users")
    })
})
