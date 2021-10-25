import { mount } from '@cypress/vue';
import LoaderIndeterminate from './LoaderIndeterminate.vue';
import '../../../styles/main.scss';

describe('LoaderIndeterminate', () => {
  beforeEach(() => {
    mount(LoaderIndeterminate);
  });

  it('can be made visible via a class with an animation', () => {
    cy.get('.loader').as('loader').should('not.be.visible');
    cy.get('@loader').invoke('addClass', 'visible').should('be.visible');
    cy.get('.indicator').should(
      'have.css',
      'animation',
      '0.8s ease 0s infinite normal none running loader-indeterminate'
    );
  });
});
