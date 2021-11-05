import { mount } from '@cypress/vue';
import ProgressBar from './ProgressBar.vue';
import '../../../styles/main.scss';

describe('ProgressBar', () => {
  it('has an inital styling', () => {
    mount(ProgressBar);

    cy.get('[data-cy="progress-bar"]')
      .should('have.css', 'min-width', '100px')
      .should('have.css', 'height', '5px')
      .should('have.css', 'margin', '5px 0px')
      .should('have.css', 'background-color', 'rgb(83, 83, 83)');
  });

  it('the indicator width can be set with a prop', () => {
    mount(ProgressBar, { props: { loaded: 66 } });

    cy.get('[data-cy="progress-bar"]')
      .should('have.css', 'min-width', '100px')
      .should('have.css', 'height', '5px')
      .should('have.css', 'background-color', 'rgb(83, 83, 83)');

    cy.get('[data-cy="progress-indicator"]').should(
      'have.css',
      'width',
      '318.765625px'
    );
  });
});
