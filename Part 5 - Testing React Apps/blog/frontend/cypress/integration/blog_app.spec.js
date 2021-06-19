/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Dynia',
            username: 'Dynia',
            password: 'Dynia'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
        })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('.username').type('Dynia')
            cy.get('.password').type('Dynia')
            cy.get('.toLogin').click()
            cy.contains('Dynia is logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('.username').type('WrongDynia')
            cy.get('.password').type('WrongDynia')
            cy.get('.toLogin').click()
            cy.contains('Wrong username or password')
        })
      })
})