import { mount } from '@cypress/vue';
import TheVideoDescriptionDisplay from './TheVideoDescriptionDisplay.vue';
import '../../styles/main.scss';
import { createPinia, setActivePinia } from 'pinia';
import { useVideoStore } from '../../stores/video';

describe('TheVideoDescriptionDisplay', () => {
  const mockVideo = {
    _id: '617af9b8e45059e41a89d5a1',
    hash: 'TYNKGOKyDah',
    url: 'https://firebasestorage.googleapis.com/v0/b/kultige-videos.appspot.com/o/TYNKGOKyDah.mp4?alt=media&token=a37c261d-99bb-4568-9b18-bea1cf998235',
    thumb:
      'https://i.ytimg.com/vi/qTa5rj2wvWI/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAeSgXwdJg-DfLroM2BVNiM1VZ7Eg',
    viewCount: 123,
    listed: true,
    uploader: {
      _id: '6177176029676e6d4369bff7',
      username: 'Marc',
      meta: {
        avatarUrl:
          'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png',
      },
    },
    uploadedAt: '2021-10-28T19:27:52.994Z',
    title: 'Oliver Kahn Interview - Best Of',
    description: 'Der Titan Oliver Kahn in gewohnter Bestform.',
  };

  setActivePinia(createPinia());
  const videoStore = useVideoStore();
  videoStore.currentVideo = mockVideo;

  beforeEach(() => {
    mount(TheVideoDescriptionDisplay);
  });

  it('displays the relevant data', () => {
    cy.get('[data-cy="avatar"]')
      .should('have.attr', 'src', mockVideo.uploader.meta.avatarUrl)
      .should(
        'have.attr',
        'alt',
        `avatar picture of user ${mockVideo.uploader.username}`
      );

    cy.get('[data-cy="description-text"]').should(
      'have.text',
      mockVideo.description
    );

    cy.get('[data-cy="more-button"]').should('have.text', 'MEHR ANSEHEN');
  });

  it('can open and close the description box', () => {
    cy.get('[data-cy="description-text"]').should('not.have.class', 'open');
    cy.get('[data-cy="more-button"]').click();
    cy.get('[data-cy="description-text"]').should('have.class', 'open');
    cy.get('[data-cy="more-button"]').click();
    cy.get('[data-cy="description-text"]').should('not.have.class', 'open');
  });
});
