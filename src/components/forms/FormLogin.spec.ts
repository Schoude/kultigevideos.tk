import { mount } from '@cypress/vue';
import FormLogin from './FormLogin.vue';
import '../../styles/main.scss';
import { createPinia, setActivePinia } from 'pinia';

const loginData = {
  email: 'tester@test.de',
  password: 'password',
};

describe('FormLogin', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    mount(FormLogin);
  });

  it('has a logo', () => {
    cy.get('[data-cy="logo"]').should('exist');
  });

  it('has a heading', () => {
    cy.get('[data-cy="heading"]')
      .should('exist')
      .should('have.text', 'Bitte melde dich an.');
  });

  it('has two form fields with labels for email and password', () => {
    cy.get('[data-cy="label-email"]')
      .should('exist')
      .should('have.text', 'E-Mail');
    cy.get('[data-cy="email"]').should('exist');

    cy.get('[data-cy="label-password"]')
      .should('exist')
      .should('have.text', 'Passwort');
    cy.get('[data-cy="password"]').should('exist');
  });

  it('has form validations for email and password', () => {
    cy.get('[data-cy="email"]').as('email').focus().blur();
    cy.get('[data-cy="password"]').as('password').focus().blur();

    cy.get('[data-cy="error-email-required"]').should('exist');
    cy.get('[data-cy="error-password-required"]').should('exist');

    cy.get('@email').type('tester').blur();
    cy.get('@password').type('test').blur();

    cy.get('[data-cy="error-email-format"]').should('exist');
    cy.get('[data-cy="error-password-min"]').should('exist');
  });

  it('the password visibility can be toggled', () => {
    cy.get('[data-cy="password"]')
      .as('passwordInput')
      .type(loginData.password)
      .should('have.value', loginData.password);
    cy.get('@passwordInput').should('have.attr', 'type', 'password');
    cy.get('.btn-icon').click();
    cy.get('@passwordInput').should('have.attr', 'type', 'text');
    cy.get('.btn-icon').click();
    cy.get('@passwordInput').should('have.attr', 'type', 'password');
  });

  it('has a submit button', () => {
    cy.get('button[type="submit"]').should('exist');
  });

  it('the user can fill in the login fields and submit the data', () => {
    cy.get('[data-cy="email"]')
      .type(loginData.email)
      .should('have.value', loginData.email);
    cy.get('[data-cy="password"]')
      .type(loginData.password)
      .should('have.value', loginData.password);

    cy.intercept('POST', '/api/v1/login', req => {
      expect(req.body.email).to.equal(loginData.email);
      expect(req.body.password).to.equal(loginData.password);
    });

    cy.intercept('POST', '/api/v1/login', {
      fixture: 'auth/login',
      statusCode: 200,
    }).as('loginResponse');

    cy.get('button[type="submit"]').as('submit').click();
    cy.get('@submit').should('be.disabled');

    // Loader indicator
    cy.get('.loader').should('have.class', 'visible');
    cy.wait('@loginResponse');
    cy.get('.loader').should('not.have.class', 'visible');
  });
});
