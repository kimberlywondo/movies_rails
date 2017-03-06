describe('initial page load', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('should have correct title', function () {
        cy.title().should('eq', 'Movies: Rails')
    })

    it('should redirect to user login', function() {
        cy.request({ url: '/', followRedirect: false })
            .then(function(response) {
                expect(response.status).to.eq(302)
        })
        cy.location().its('pathname').should('contain', "/users")
    })
})


describe('login attempts', function() {
    it('should notify user of failed login', function() {
        cy.login('fail@cypress.io', 'fail123')
        cy.get('.navbar-link')
            .should('contain', 'Invalid Email or password.')
    })

    it('should notify user of successful login', function() {
        cy.login('test@cypress.io', 'test123')
        cy.get('.navbar-link')
            .should('contain', 'Signed in successfully.')
    })
})







/*
unsure of how to directly POST to login without an
authenticity token and still validate 401 Unauthorized response
*/

// describe('invalid login attempt', function() {
//     before(function() {
//         Cypress.config('baseUrl', 'http://localhost:3000')
//     })
//     it('should be unauthorized', function() {
//         cy.request({
//             method: 'POST',
//             url: '/users/sign_in',
//             form: true,
//             body: {
//                 user: { email: 'fail@cypress.io',
//                         password: 'fail123' }
//             }
//         }).then(function(response) {
//             expect(response.status).to.eq(401)
//         })
//     })
// })