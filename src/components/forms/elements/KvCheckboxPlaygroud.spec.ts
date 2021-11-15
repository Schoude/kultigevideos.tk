import { mount } from '@cypress/vue';
import '../../../styles/main.scss';
import KvCheckboxPlaygroud from './KvCheckboxPlaygroud.vue';

describe('KvCheckboxPlaygroud', () => {
  beforeEach(() => {
    mount(KvCheckboxPlaygroud);
  });

  it('is initially not checked', () => {
    cy.get('[data-cy="checkbox"]').should('not.have.class', 'checked');
    cy.get('[data-cy="checkbox"]').within(() => {
      cy.get('.icon__checked').should('not.be.visible');
    });
    cy.get('.control').should('have.text', 'checked value false');
  });

  it('can be checked', () => {
    cy.get('[data-cy="checkbox"]').click();
    cy.get('[data-cy="checkbox"]').should('have.class', 'checked');
    cy.get('[data-cy="checkbox"]').within(() => {
      cy.get('.icon__checked').should('be.visible');
    });
    cy.get('.control').should('have.text', 'checked value true');
  });
});
