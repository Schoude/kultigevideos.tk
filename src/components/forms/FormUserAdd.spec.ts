import { NewUserData } from './../../types/models/user.d';
import { mount } from '@cypress/vue';
import FormUserAdd from './FormUserAdd.vue';
import '../../styles/main.scss';
import type { UserRole } from '../../types/models/user';
import { setActivePinia, createPinia } from 'pinia';

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
    setActivePinia(createPinia());

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

  it('the user can fill in the login fields and submit the data', () => {
    cy.get('[data-cy="username"]')
      .type(newUser.username)
      .should('have.value', newUser.username);
    cy.get('[data-cy="email"]')
      .type(newUser.email)
      .should('have.value', newUser.email);
    cy.get('[data-cy="password"]')
      .type(newUser.password)
      .should('have.value', newUser.password);
    cy.get('.kv-radio-button[name="admin"]').click();
    cy.get('.kv-radio-button[name="maintainer"]').click();
    cy.get('.kv-radio-button[name="user"]').click();

    cy.intercept('POST', '/api/v1/user', {
      statusCode: 200,
    }).as('createUserIntercept');

    cy.get('button[type="submit"]').as('submit').click();
    cy.get('@submit').should('be.disabled');

    // Loader indicator
    cy.get('.loader').should('have.class', 'visible');
    cy.wait('@createUserIntercept').then(interception => {
      const { email, password, role, username } = JSON.parse(
        interception.request.body
      ) as NewUserData;

      expect(username).to.equal(newUser.username);
      expect(email).to.equal(newUser.email);
      expect(password).to.equal(newUser.password);
      expect(role).to.equal(newUser.role);
    });
    cy.get('.loader').should('not.have.class', 'visible');
  });
});
