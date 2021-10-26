import { mount } from '@cypress/vue';
import TheHeader from './TheHeader.vue';
import '../../styles/main.scss';
import { createPinia, setActivePinia } from 'pinia';

describe('TheHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mount(TheHeader);
  });

  it('shows the logo', () => {
    cy.get('img')
      .should('exist')
      .should('have.attr', 'alt', 'Logo Kultige Videos');
  });

  it('sticks to the top of the page and has padding left and right', () => {
    cy.get('.the-header').should('have.css', 'position', 'sticky');
    cy.get('.the-header').should('have.css', 'top', '0px');
    cy.get('.the-header').should('have.css', 'padding', '0px 16px');
  });

  it('is larger on bigger screens', () => {
    cy.viewport('iphone-3');
    cy.get('.the-header').as('header').should('have.css', 'height', '48px');
    cy.viewport('macbook-15');
    cy.get('@header').should('have.css', 'height', '56px');
  });
});
