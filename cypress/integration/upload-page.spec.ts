/// <reference types="cypress" />
/// <reference types="cypress-file-upload" />

describe('Upload page', () => {
  /**
   * Loads the preview image from fixtures and attaches
   * it to the input element so the native Event gets triggered.
   */
  function loadFile() {
    cy.fixture('videos/test-video.mp4', 'binary').then(fileContent => {
      const fileBlob = Cypress.Blob.binaryStringToBlob(fileContent);

      cy.get('[data-cy="input-new-video"]').attachFile({
        fileContent: fileBlob,
        fileName: 'test-video.mp4',
        mimeType: 'video/mp4',
      });
    });
  }

  beforeEach(() => {
    cy.intercept('GET', '/api/v1/refresh', {
      fixture: 'auth/refresh',
      statusCode: 200,
    });
    cy.visit('http://localhost:5000/upload');
  });

  it('render an upload button on first visit', () => {
    cy.get('[data-cy="btn-pick-video"]').should('have.text', 'Video auswählen');
  });

  it('displays the data of the picked video', () => {
    loadFile();
    cy.get('[data-cy="loader-thumbs"]')
      .should('be.visible')
      .should('have.class', 'visible');

    cy.wait(750);

    cy.get('.video-player').should('exist');
    cy.get('.btn_video-remove').should('have.text', 'Video entfernen');

    cy.get('[data-cy="heading-preview-img"]').should(
      'have.text',
      'Wähle ein Vorschaubild'
    );

    cy.get('.btn_thumb-img').should('have.length', 4);

    cy.get('[data-cy="heading-video-title"]').should('have.text', 'Videotitel');
    cy.get('[data-cy="heading-video-description"]').should(
      'have.text',
      'Videobeschreibung'
    );

    cy.get('.description').should('exist');

    cy.get('[data-cy="btn-upload"]').should('have.text', 'Video hochladen');
  });

  it('the video can be deselected', () => {
    loadFile();
    cy.get('.video-player').should('exist');
    cy.get('.btn_video-remove').click();
    cy.get('.video-player').should('not.exist');
    cy.get('[data-cy="btn-pick-video"]').should('exist');
  });
});
