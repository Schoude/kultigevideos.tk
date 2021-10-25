import { mount } from '@cypress/vue';
import TestingSvgIcon from './TestingSvgIcon.vue';
import '../../../styles/main.scss';

describe('SvgIcon', () => {
  beforeEach(() => {
    mount(TestingSvgIcon);
  });

  it('has 5 different sizes', () => {
    cy.get('[data-cy="size-xs"]')
      .should('have.class', 'icon-xs')
      .should('have.css', 'height', '18px');

    cy.get('[data-cy="size-s"]')
      .should('have.class', 'icon-s')
      .should('have.css', 'height', '20px');

    cy.get('[data-cy="size-m"]')
      .should('have.class', 'icon-m')
      .should('have.css', 'height', '24px');

    cy.get('[data-cy="size-l"]')
      .should('have.class', 'icon-l')
      .should('have.css', 'height', '28px');

    cy.get('[data-cy="size-xl"]')
      .should('have.class', 'icon-xl')
      .should('have.css', 'height', '32px');
  });

  it('can take different types of color values', () => {
    cy.get('[data-cy="color-red"]').should('have.attr', 'fill', 'red');
    cy.get('[data-cy="color-hex"]').should('have.attr', 'fill', '#3c67d3');
    cy.get('[data-cy="color-var"]').should(
      'have.attr',
      'fill',
      'rgb(48, 187, 78)'
    );
  });

  it('can display different paths for the icon', () => {
    cy.get('[data-cy="house-user"]').within(() => {
      cy.get('path').should(
        'have.attr',
        'd',
        'M570.69,236.27,512,184.44V48a16,16,0,0,0-16-16H432a16,16,0,0,0-16,16V99.67L314.78,10.3C308.5,4.61,296.53,0,288,0s-20.46,4.61-26.74,10.3l-256,226A18.27,18.27,0,0,0,0,248.2a18.64,18.64,0,0,0,4.09,10.71L25.5,282.7a21.14,21.14,0,0,0,12,5.3,21.67,21.67,0,0,0,10.69-4.11l15.9-14V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V269.88l15.91,14A21.94,21.94,0,0,0,538.63,288a20.89,20.89,0,0,0,11.87-5.31l21.41-23.81A21.64,21.64,0,0,0,576,248.19,21,21,0,0,0,570.69,236.27ZM288,176a64,64,0,1,1-64,64A64,64,0,0,1,288,176ZM400,448H176a16,16,0,0,1-16-16,96,96,0,0,1,96-96h64a96,96,0,0,1,96,96A16,16,0,0,1,400,448Z'
      );
    });

    cy.get('[data-cy="laptop-code"]').within(() => {
      cy.get('path').should(
        'have.attr',
        'd',
        'M255.03 261.65c6.25 6.25 16.38 6.25 22.63 0l11.31-11.31c6.25-6.25 6.25-16.38 0-22.63L253.25 192l35.71-35.72c6.25-6.25 6.25-16.38 0-22.63l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0l-58.34 58.34c-6.25 6.25-6.25 16.38 0 22.63l58.35 58.34zm96.01-11.3l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l58.34-58.34c6.25-6.25 6.25-16.38 0-22.63l-58.34-58.34c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63L386.75 192l-35.71 35.72c-6.25 6.25-6.25 16.38 0 22.63zM624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z'
      );
    });

    cy.get('[data-cy="sparkles"]').within(() => {
      cy.get('path').should(
        'have.attr',
        'd',
        'M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z'
      );
    });
  });
});
