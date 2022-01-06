describe('Blog app', function () {
  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function () {
    cy.contains('login')
  })
  describe('Login', function () {
    beforeEach(function () {
      const user = {
        name: 'mekbib',
        username: 'kazuma',
        password: 'thePower'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kazuma')
      cy.get('#password').type('thePower')
      cy.contains('login').click()

      cy.contains('Logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('kazuma')
      cy.get('#password').type('wrongsdf')
      cy.contains('login').click()

      cy.get('.notification').contains('wrong username or password')
    })
  })
})