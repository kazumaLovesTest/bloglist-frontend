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
    describe('Deleting blogs', function () {
      beforeEach(function () {
        cy.contains('add blog').click()

        cy.get('#author').type('Trevor')
        cy.get('#title').type('Google')
        cy.get('#url').type('https://www.google.com/')
        cy.get('#submit').click()

        cy.contains('Google')
      })
      it('User who created the blog can delete the blog', function () {
        cy.contains('delete').click()
        cy.contains('Google was deleted')
      })
      it.only('User who didnt create the blog can not delete the blog', function () {
        const differentUser = {
          name: 'another',
          username: 'WaterMan',
          password: 'theLover'
        }
        cy.request('POST', 'http://localhost:3003/api/users', differentUser)

        cy.contains('Log Out').click()

        cy.get('#username').type('WaterMan')
        cy.get('#password').type('theLover')

        cy.contains('login').click()

        cy.contains('delete').click()
        cy.contains('couldnt delete blog because')
      })
    })
  })
})