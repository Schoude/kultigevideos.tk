/// <reference types="cypress" />

describe('Profile page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/refresh', {
      fixture: 'auth/refresh',
      statusCode: 200,
    });
    cy.visit('http://localhost:5000/profile');
  });

  it('renders', () => {});
});
