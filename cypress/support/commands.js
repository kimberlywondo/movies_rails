// ***********************************************
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************


Cypress.addParentCommand('login', function(email, password) {
    var email =  email, password = password,
        log = Cypress.Log.command({
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
        .then(function() { log.snapshot().end() })
})
