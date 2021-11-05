import { mount } from '@cypress/vue';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '../../stores/auth';
import { User } from '../../types/models/user';
import UserAvatarEditor from './UserAvatarEditor.vue';
import '../../styles/main.scss';

/**
 * Loads the preview image from fixtures and attaches
 * it to the input element so the native Event gets triggered.
 */
function loadFile() {
  cy.fixture('pics/dummy-avatar.jpg').then((fileContent) => {
    const fileBlob = Cypress.Blob.base64StringToBlob(fileContent.toString());

    cy.get('[data-cy="input-new-avatar"]').attachFile({
      fileContent: fileBlob,
      fileName: 'dummy-avatar.jpg',
      mimeType: 'image/jpeg',
    });
  });
}

describe('UserAvatarEditor', () => {
  const mockUser: User = {
    _id: 'testing-avatar',
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
    mount(UserAvatarEditor);
  });

  it('displays the current user avatar', () => {
    cy.get('[data-cy="user-avatar"]').should('exist');
    cy.get('[data-cy="current-label"]')
      .should('exist')
      .should('have.text', 'Aktueller Avatar');
  });

  it('has an input to choose a file for the new avatar picture with a label to trigger it', () => {
    cy.get('[data-cy="new-avatar-label"]').should(
      'have.text',
      'Neues Avatarbild auswählen...'
    );

    cy.get('[data-cy="input-new-avatar"]')
      .should('have.attr', 'type', 'file')
      .should('have.attr', 'accept', 'image/jpeg')
      .should('have.attr', 'name', 'new-avatar');
  });

  it('hides the preview display initially', () => {
    cy.get('[data-cy="preview-label"]').should('be.hidden');
    cy.get('[data-cy="preview-image"]').should('be.hidden');
  });

  it('shows a preview image after selecting an image', () => {
    loadFile();

    cy.get('[data-cy="preview-label"]').should('have.text', 'Vorschau');
    cy.get('[data-cy="preview-image"]').should('be.visible');
  });

  it('the preview image can be deselected', () => {
    loadFile();

    cy.get('[data-cy="preview-avatar-deselect"]')
      .should('have.text', 'Rückgängig')
      .click();

    cy.get('[data-cy="preview-label"]').should('be.hidden');
    cy.get('[data-cy="preview-image"]').should('be.hidden');

    cy.get('[data-cy="preview-avatar-deselect"]').should('not.exist');
    cy.get('[data-cy="new-avatar-label"]').should('exist');
  });

  it('displays an upload button after selecting a new avatar image', () => {
    cy.get('[data-cy="button-upload"]').should('not.exist');

    loadFile();

    cy.get('[data-cy="button-upload"]')
      .should('exist')
      .should('have.text', 'Hochladen');
  });

  it('saves the new avatar in the db', () => {
    cy.intercept('PUT', '/api/v1/user').as('updateUser');
    loadFile();

    cy.get('[data-cy="progress-indicator"]').should('have.css', 'width', '0px');

    cy.get('[data-cy="button-upload"]').click();
    cy.wait('@updateUser').then((interception) => {
      expect(
        JSON.parse(interception.request.body).updatedUser.meta.avatarUrl
      ).to.equal(authStore.user?.meta.avatarUrl);

      cy.get('[data-cy="progress-indicator"]').should(
        'have.css',
        'width',
        '0%'
      );
    });
  });
});
