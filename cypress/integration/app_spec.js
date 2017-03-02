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
        // without login, should redirect to user path
        cy.location().its('pathname').should('contain', "/users")
    })
})

describe('login attempts', function() {
    beforeEach(function() {
        cy.visit('/users/sign_in')
    })

    it('should fail log in with incorrect credentials', function() {
        cy.get('#user_email').type('fail@test.com')
            .get('#user_password').type('fail123{enter}')
    })

    it('should log in successfully with correct credentials', function() {
        cy.get('#user_email').type('dupper.john@gmail.com')
            .get('#user_password').type('test123{enter}')
    })
})

describe('search', function() {
    beforeEach(function() {
        cy.visit('/users/sign_in')
        cy.get('#user_email').type('dupper.john@gmail.com')
            .get('#user_password').type('test123{enter}')
    })

    it('should go to search page', function() {
        cy.visit('/search')
    })

    it('should perform a search', function() {
        cy.visit('/search')
        cy.get('#form_input').type('the matrix{enter}')
    })
})
