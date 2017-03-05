// ***********************************************
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************


// failed login attempt
Cypress.addParentCommand('failLogin', function(email, password) {
    var email =  email ||'fail@cypress.io'
    var password = password || 'fail123'
    var log = Cypress.Log.command({
        name: 'login',
        message: [email, password],
        consoleProps: function() {
            return { email: email,
                password: password }
        }
    })
    cy.visit('http://localhost:3000/users/sign_in', { log: false })
        .contains('Log in', { log: false })
        .get('#user_email', { log: false }).type(email, { log: false })
        .get('#user_password', { log: false }).type(password, { log: false })
        .get('input[type="submit"]', { log: false }).click({ log: false }) // should fail, redirect
        .url({ log: false}).should('eq','http://localhost:3000/users/sign_in', { log: false })
        .then(function() { log.snapshot().end() })
})


// successful login
Cypress.addParentCommand('successLogin', function(email, password) {
    var email =  email ||'test@cypress.io'
    var password = password || 'test123'
    var log = Cypress.Log.command({
        name: 'login',
        message: [email, password],
        consoleProps: function() {
            return { email: email,
                  password: password }
        }
    })
    cy.visit('http://localhost:3000/users/sign_in', { log: false })
        .contains('Log in', { log: false })
        .get('#user_email', { log: false }).type(email, { log: false })
        .get('#user_password', { log: false }).type(password, { log: false })
        .get('input[type="submit"]', { log: false }).click({ log: false })
        .url({ log: false}).should('eq','http://localhost:3000/', { log: false })
        .then(function() { log.snapshot().end() })
})
