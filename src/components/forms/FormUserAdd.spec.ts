import { mount } from '@cypress/vue';
import FormUserAdd from './FormUserAdd.vue';
import '../../styles/main.scss';
import type { UserRole } from '../../types/models/user';

describe('FormUserAdd', () => {
  const newUser = {
    username: 'Test User',
    email: 'newuser@test.de',
    password: 'password',
    role: 'user',
  } as {
    username: string;
    email: string;
    password: string;
    role: UserRole;
  };

  beforeEach(() => {
    mount(FormUserAdd);
  });

  it('has three form fields with labels for username ,email and password', () => {
    cy.get('[data-cy="label-username"]')
      .should('exist')
      .should('have.text', 'Benutzername');
    cy.get('[data-cy="email"]').should('exist');

    cy.get('[data-cy="label-email"]')
      .should('exist')
      .should('have.text', 'E-Mail');
    cy.get('[data-cy="email"]').should('exist');

    cy.get('[data-cy="label-password"]')
      .should('exist')
      .should('have.text', 'Passwort');
    cy.get('[data-cy="password"]').should('exist');
  });

  it('has form validations for username, email and password', () => {
    cy.get('[data-cy="username"]').as('email').focus().blur();
    cy.get('[data-cy="email"]').as('email').focus().blur();
    cy.get('[data-cy="password"]').as('password').focus().blur();

    cy.get('[data-cy="error-username-required"]').should('exist');
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
      .type(newUser.password)
      .should('have.value', newUser.password);
    cy.get('@passwordInput').should('have.attr', 'type', 'password');
    cy.get('.btn-icon').click();
    cy.get('@passwordInput').should('have.attr', 'type', 'text');
    cy.get('.btn-icon').click();
    cy.get('@passwordInput').should('have.attr', 'type', 'password');
  });

  it('has three radio buttons to chose a user role', () => {
    cy.get('.kv-radio-button').should('have.length', 3);
  });

  it('has a submit button', () => {
    cy.get('button[type="submit"]').should('exist');
  });
});
