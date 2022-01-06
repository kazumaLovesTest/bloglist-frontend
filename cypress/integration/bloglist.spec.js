describe('Blog app', function () {
  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'mekbib',
      username: 'kazuma',
      password: 'thePower'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is shown by default', function () {
    cy.contains('login')
  })
  describe('Login', function () {
    beforeEach(function () {

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
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('kazuma')
      cy.get('#password').type('thePower')
      cy.contains('login').click()

    })

    it('A blog can be created', function () {
      cy.contains('add blog').click()

      cy.get('#author').type('Trevor')
      cy.get('#title').type('Google')
      cy.get('#url').type('https://www.google.com/')
      cy.get('#submit').click()

      cy.contains('Google')
    })
  })
})