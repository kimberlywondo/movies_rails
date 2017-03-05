// ***********************************************
// This example commands.js shows you how to
// create the custom command: 'login'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************
//
// Cypress.addParentCommand("login", function(email, password){
//   var email    = email || "joe@example.com"
//   var password = password || "foobar"
//
//   var log = Cypress.Log.command({
//     name: "login",
//     message: [email, password],
//     consoleProps: function(){
//       return {
//         email: email,
//         password: password
//       }
//     }
//   })
//
//   cy
//     .visit("/login", {log: false})
//     .contains("Log In", {log: false})
//     .get("#email", {log: false}).type(email, {log: false})
//     .get("#password", {log: false}).type(password, {log: false})
//     .get("button", {log: false}).click({log: false}) //this should submit the form
//     .get("h1", {log: false}).contains("Dashboard", {log: false}) //we should be on the dashboard now
//     .url({log: false}).should("match", /dashboard/, {log: false})
//     .then(function(){
//       log.snapshot().end()
//     })
// })

Cypress.addParentCommand('login', function(email, password) {
    var email = 'test@cypress.io'
    var password = 'test123'

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
        .get('button', { log: false }).click({ log: false }) // form submission
        .url({ log: false}).should('match', '/', { log: false })
        .then(function() {
            log.snapshot().end()
        })
})
