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

    describe('When logged in', function() {
    beforeEach(function() {
        cy.get('.username').type('Dynia')
        cy.get('.password').type('Dynia')
        cy.get('.toLogin').click()
    })

    it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('.title').type('Dynia is nice')
        cy.get('.author').type('Dynias are the best')
        cy.get('.url').type('Dynia.com')
        cy.get('.toSend').click()
        cy.contains('a new blog')
        cy.contains('Dynia is nice')
    })

    it('A blog can be liked', function() {
        cy.contains('new blog').click()
        cy.get('.title').type('Dynia is nice')
        cy.get('.author').type('Dynias are the best')
        cy.get('.url').type('Dynia.com')
        cy.get('.toSend').click()
        cy.contains('view').click()
        cy.contains('0 likes')
        cy.contains('like').click()
        cy.contains('1 likes')
    })
    it('A blog can be deleted', function() {
        cy.contains('new blog').click()
        cy.get('.title').type('Dynia is nice')
        cy.get('.author').type('Dynias are the best')
        cy.get('.url').type('Dynia.com')
        cy.get('.toSend').click()
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.contains('Dynias are the best').should('not.exist')
    })
    })
})