import { mount } from '@cypress/vue';
import KvRadioButtonPlayground from './KvRadioButtonPlayground.vue';
import '../../../styles/main.scss';

describe('KvRadioButtonPlayground', () => {
  beforeEach(() => {
    mount(KvRadioButtonPlayground);
  });

  it('should have 3 KvRadioButton components', () => {
    cy.get('.kv-radio-button').should('have.length', 3);
    cy.get('[data-cy="value-1"]').should('have.text', 'Wert 1');
    cy.get('[data-cy="value-2"]').should('have.text', 'Wert 2');
    cy.get('[data-cy="value-3"]').should('have.text', 'Wert 3');
    cy.get('[data-cy="value-1"]').should('have.attr', 'name', 'value1');
    cy.get('[data-cy="value-2"]').should('have.attr', 'name', 'value2');
    cy.get('[data-cy="value-3"]').should('have.attr', 'name', 'value3');
    cy.get('.value-display').should('have.text', 'value1');
  });

  it('clicking on a radio button changes the model value', () => {
    cy.get('[data-cy="value-2"]').click();
    cy.get('.value-display').should('have.text', 'value2');
    cy.get('[data-cy="value-3"]').click();
    cy.get('.value-display').should('have.text', 'value3');
    cy.get('[data-cy="value-1"]').click();
    cy.get('.value-display').should('have.text', 'value1');
  });
});
