// https://docs.cypress.io/api/introduction/api.html
// https://docs.cypress.io/api/commands



describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  })
  it('Shows the logo', () => {
    cy.contains('h1', 'tend');
  })

  it('logs in', () => {
    cy.get('#Email').type("email@email");
    cy.get('#Password').type("Password1");
    cy.contains('button', 'submit').click();
    cy.url().should('include', '/my-plants');
  })

  it('doesn\'t log in on incorect email', () => {
    cy.get('#Email').type("not an email");
    cy.get('#Password').type("Password1");
    cy.contains('button', 'submit').click();
    cy.url().should('not.include', '/my-plants');
  })
  it('doesn\'t log in on empty form', () => {
    cy.contains('button', 'submit').click();
    cy.url().should('not.include', '/my-plants');
  })
})


describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  })

  it('registers a user', () => {
    cy.contains('button', 'register').click();
    cy.get('#Email').type("email@email");
    cy.get('#Password').type("Password1");
    cy.get('#Username').type("myUsername");
    cy.get('#ConfirmPassword').type("Password1");
    cy.contains('button', 'submit').click();
    cy.url().should('include', '/my-plants');
  })

  it('doesn\'t register on different passwords', () => {
    cy.contains('button', 'register').click();
    cy.get('#Email').type("email@email");
    cy.get('#Password').type("Password1");
    cy.get('#Username').type("myUsername");
    cy.get('#ConfirmPassword').type("Password2");
    cy.contains('button', 'submit').click();
    cy.url().should('not.include', '/my-plants');
  })
  it('doesn\'t register in on empty form', () => {
    cy.contains('button', 'register').click();
    cy.contains('button', 'submit').click();
    cy.url().should('not.include', '/my-plants');
  })
})
