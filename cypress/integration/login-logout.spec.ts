/// <reference types="cypress" />

describe('visit the login page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/refresh', {
      fixture: 'auth/refresh-401',
      statusCode: 401,
    });
    cy.visit('http://localhost:5000');
  });

  it('can toggle the password input type', () => {
    cy.get('[data-cy="password"]').as('password').type('password');
    cy.get('@password').should('have.attr', 'type', 'password');
    cy.get('.btn-icon').click();
    cy.get('@password').should('have.attr', 'type', 'text');
  });

  it('fills out the login form loggs the user', () => {
    cy.url().should('eq', 'http://localhost:5000/login');

    cy.get('[data-cy="email"]')
      .type('e2etester@gmail.com')
      .should('have.value', 'e2etester@gmail.com');
    cy.get('[data-cy="password"]')
      .type('password')
      .should('have.value', 'password');

    // interceptions for
    cy.intercept('POST', '/api/v1/login', {
      fixture: 'auth/login.json',
    });

    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:5000/');

    // page reload refresh
    cy.intercept('GET', '/api/v1/refresh', {
      fixture: 'auth/refresh',
      statusCode: 200,
    });
    cy.reload();
    cy.url().should('eq', 'http://localhost:5000/');

    // TODO: test loggin out
    // cy.get('button[title="Abmelden"]').click();

    // cy.url().should('eq', 'http://localhost:5000/login');
  });
});
