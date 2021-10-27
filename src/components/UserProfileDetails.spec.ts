import { User } from './../types/models/user.d';
import { useAuthStore } from './../stores/auth';
import { mount } from '@cypress/vue';
import { setActivePinia, createPinia } from 'pinia';
import UserProfileDetails from './UserProfileDetails.vue';

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
});
