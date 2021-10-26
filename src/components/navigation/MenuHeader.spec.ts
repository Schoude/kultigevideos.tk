import { User } from './../../types/models/user.d';
import { useAuthStore } from './../../stores/auth';
import { mount } from '@cypress/vue';
import { createPinia, setActivePinia } from 'pinia';
import '../../styles/main.scss';

import MenuHeader from './MenuHeader.vue';

describe('MenuHeader', () => {
  const mockUser: User = {
    _id: '612ffd922c8d16b3319593e1',
    username: 'E2E-Tester',
    email: 'e2etester@gmail.com',
    role: 'admin',
    meta: {
      avatarUrl:
        'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png',
    },
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    const authStore = useAuthStore();
    authStore.user = mockUser;

    mount(MenuHeader);
  });

  it('displays the user name of the logged in user', () => {
    cy.get('[data-cy="username"]')
      .should('exist')
      .should('have.text', mockUser.username);
  });

  it('displays the avatar of the user', () => {
    cy.get('[data-cy="avatar"]').should('exist');
  });
});
