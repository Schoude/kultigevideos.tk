import { mount } from '@cypress/vue';
import TheHeader from './TheHeader.vue';
import '../../styles/main.scss';
import { verify } from 'cypress/types/sinon';

describe('TheHeader', () => {
  beforeEach(() => mount(TheHeader));

  it('sticks to the top of the page', () => {
    cy.get('.the-header').should('have.css', 'position', 'sticky');
    cy.get('.the-header').should('have.css', 'top', '0px');
  });

  it('is larger on bigger screens', () => {
    cy.viewport('iphone-3');
    cy.get('.the-header').as('header').should('have.css', 'height', '48px');
    cy.viewport('macbook-15');
    cy.get('@header').should('have.css', 'height', '56px');
  });
});
