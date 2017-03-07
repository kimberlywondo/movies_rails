// ***********************************************
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************

// self-contained login process
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

    cy.visit('http://localhost:3000/users/sign_in', {log: false})
        .contains('Log in', {log: false})
        // type username
        .get('#user_email', {log: false}).type(email, {log: false})
        // type password
        .get('#user_password', {log: false}).type(password, {log: false})
        // submit form, login
        .get('input[type="submit"]', {log: false}).click({log: false})
        .then(function() {log.snapshot().end()})
})


// self-contained search process
Cypress.addParentCommand('search', function(movieTitle) {
    var movieTitle = movieTitle,
        log = Cypress.Log.command({
            name: 'search',
            message: movieTitle,
            consoleProps: function() {
                return { movieTitle: movieTitle }
            }
        })

    cy.login('test@cypress.io', 'test123', {log: false})
    cy.visit('http://localhost:3000/search', {log:false})
    // perform search
    cy.get('#form_input', {log: false})
        .type(movieTitle, {log:false})
        .get('#form_submit').click()
})