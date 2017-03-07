
describe('initial page load', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('should have correct title', function () {
        cy.title().should('eq', 'Movies: Rails')
    })

    it('should have navigation links', function() {
        cy.get('.nav').within(function() {
            cy.get('li')
                .should('contain', 'Favorites')
                .should('contain', 'Watch List')
        })
        cy.get('.navbar-right').contains('Sign up')
        cy.get('.navbar').contains('Login')
    })

    it('should auto-redirect to user login', function() {
        cy.request({ url: '/', followRedirect: false })
            .then(function(response) {
                expect(response.status).to.eq(302)
        })
        cy.location().its('pathname').should('contain', "/users")
    })
})


describe('verify sign up form', function() {
    before(function() {
        cy.visit('http://localhost:3000/users/sign_up')
    })

    it('should have form title', function() {
        cy.get('h2').should('contain', 'Sign up')
    })

    it('should have complete sign up form', function() {
        cy.get('#new_user').within(function() {
            cy.get('#user_email').should('exist')
                .get('#user_password').should('exist')
                .get('#user_password_confirmation').should('exist')
                .get('input[type="submit"]').should('exist')
        })
        cy.get('a').should('contain', 'Log in')
    })
})


describe('verify login form', function() {
    before(function() {
        cy.visit('http://localhost:3000/users/sign_in')
    })

    it('should have complete login form', function() {
        cy.get('#new_user').within(function() {
            cy.get('#user_email').should('exist')
                .get('#user_password').should('exist')
                .get('input[type="submit"]').should('exist')
        })
    })

    it('should have links to sign up', function() {
        cy.get('a').contains('Sign up')
        cy.get('a').contains('Forgot your password?')
    })
})


describe('failed login attempt', function() {
    it('should fail login (with notification)', function() {
        // no user exists
        cy.login('fail@cypress.io', 'fail123')
        cy.get('.navbar-link')
            .should('contain', 'Invalid Email or password.')
    })
})


describe('successful login', function() {
    it('should validate login (with notification)', function() {
        // valid username and password
        cy.login('test@cypress.io', 'test123')
        cy.get('.navbar-link')
            .should('contain', 'Signed in successfully.')
    })
})


// search functionality next
describe('search for movie', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.login('test@cypress.io', 'test123')
        cy.visit('http://localhost:3000/search')
    })

    it('should perform search for "Fight Club"', function() {
        // perform search for 'Fight Club'
        cy.get('#form_input').type('Fight Club')
            .get('#form_submit').click()
    })

    it('should render results page', function() {
        cy.get('#form_input').type('Fight Club')
            .get('#form_submit').click()
        cy.url().should('eq', 'http://localhost:3000/results')
    })
})


describe('display results', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.login('test@cypress.io', 'test123')
        cy.visit('http://localhost:3000/search')
        cy.get('#form_input').type('Fight Club')
            .get('#form_submit').click()
    })

    it('should contain correct movie', function() {
        cy.get('.detail-container').should('exist')
            .within(function() {
                cy.get('h1').should('exist')
                    .contains('Fight Club')
                cy.get('#favorite-form').should('exist')
                cy.get('#watch-form').should('exist')
            })
    })
})




/*
unsure of how to directly POST to login without an
authenticity_token and still validate '401 Unauthorized' response
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
