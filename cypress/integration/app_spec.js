Cypress.config('baseUrl', 'http://localhost:3000')

describe('initial page load', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('should load page', function() {
        cy.request({
            url: '/movies', followRedirect: false
        }).then(function(response) {
            expect(response.status).to.eq(200)
        })
    })

    it('should have correct title', function () {
        cy.visit('http://localhost:3000')
        cy.title().should('include', 'Movies: Rails')
    })
})
