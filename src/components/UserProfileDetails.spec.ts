import { User } from './../types/models/user.d';
import { useAuthStore } from './../stores/auth';
import { mount } from '@cypress/vue';
import { setActivePinia, createPinia } from 'pinia';
import UserProfileDetails from './UserProfileDetails.vue';
import '../styles/main.scss';

describe('UserProfileDetails', () => {
  const mockUser: User = {
    _id: '612ffd922c8d16b3319593e1',
    username: 'Tester',
    email: 'tester@gmail.com',
    role: 'admin',
    meta: {
      avatarUrl:
        'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png',
    },
  };

  setActivePinia(createPinia());
  const authStore = useAuthStore();
  authStore.user = mockUser;

  beforeEach(() => {
    mount(UserProfileDetails);
  });

  it('displays the user avatar', () => {
    cy.get('[data-cy="user-avatar"]').should('exist');
  });

  it('displays the username, email and role of the user', () => {
    cy.get('[data-cy="username"]')
      .should('exist')
      .should('have.text', authStore.getUserName);

    cy.get('[data-cy="email"]')
      .should('exist')
      .should('have.text', authStore.user?.email);

    cy.get('[data-cy="role"]')
      .should('exist')
      .should('have.text', authStore.getUserRoleText);
  });

  it('displays a link to the admin panel for admin users', () => {
    cy.get('[data-cy="link-admin-panel"]')
      .should('exist')
      .should('have.text', 'Zum Adminpanel');
  });

  it('has two inputs to change the users password', () => {
    cy.get('[data-cy="new-password"]').should('exist');
    cy.get('[data-cy="new-password-confirm"]').should('exist');

    cy.get('[data-cy="label-new-password"]').should(
      'have.text',
      'Neues Passwort'
    );
    cy.get('[data-cy="label-new-password-confirm"]').should(
      'have.text',
      'Passwort bestätigen'
    );
  });

  it('the inputs for the new password have validations', () => {
    cy.get('[data-cy="new-password"]').focus().blur();
    cy.get('[data-cy="new-password-confirm"]').focus().blur();

    cy.get('[data-cy="error-new-password-required"]')
      .should('exist')
      .should('have.text', 'Feld ist erforderlich.');
    cy.get('[data-cy="error-new-password-confirm-required"]')
      .should('exist')
      .should('have.text', 'Feld ist erforderlich.');

    cy.get('[data-cy="new-password"]').type('test').blur();
    cy.get('[data-cy="new-password-confirm"]').type('tester').blur();

    cy.get('[data-cy="error-new-password-min"]')
      .should('exist')
      .should('have.text', 'Das Passwort muss min. 5 Zeichen lang sein.');

    cy.get('[data-cy="error-new-password-confirm-same-as"]')
      .should('exist')
      .should('have.text', 'Muss mit dem anderen Passwort übereinstimmen.');
  });

  it('sends the new password to the backend', () => {
    cy.intercept('PUT', '/api/v1/user/password', {
      body: { message: 'Password changed.' },
      statusCode: 200,
    }).as('changePassword');

    cy.get('[data-cy="new-password"]').type('testpw').blur();
    cy.get('[data-cy="new-password-confirm"]').type('testpw').blur();
    cy.get('[data-cy="btn-password-change"]').click().should('be.disabled');

    cy.wait('@changePassword').then(interception => {
      const { userId, newPassword } = JSON.parse(interception.request.body);
      expect(userId).to.equal(mockUser._id);
      expect(newPassword).to.equal('testpw');
    });

    cy.get('[data-cy="btn-password-change"]').should('not.be.disabled');
  });
});
