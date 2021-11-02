import { mount } from '@cypress/vue';
import TheVideoMetadataDisplay from './TheVideoMetadataDisplay.vue';
import '../../styles/main.scss';
import { createPinia, setActivePinia } from 'pinia';
import { useVideoStore } from '../../stores/video';
import { Video } from '../../types/models/video';

describe('TheVideoMetadataDisplay', () => {
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
    likes: [],
    dislikes: [],
    approvedById: '6177176029676e6d4369bff7',
    uploaderId: '6177176029676e6d4369bff7',
  } as Video;

  setActivePinia(createPinia());
  const videoStore = useVideoStore();
  videoStore.currentVideo = mockVideo;

  beforeEach(() => {
    mount(TheVideoMetadataDisplay);
  });

  it('displays the right data for the video', () => {
    cy.get('[data-cy="video-title"]').should('have.text', mockVideo.title);
    cy.get('[data-cy="viewcount"]').should(
      'have.text',
      `${mockVideo.viewCount} Aufrufe`
    );
    cy.get('[data-cy="upload-date"]').should(
      'have.text',
      new Date(mockVideo.uploadedAt).toLocaleDateString()
    );
    cy.get('[data-cy="counter-likes"]').should('have.text', 0);
    cy.get('[data-cy="counter-dislikes"]').should('have.text', 0);
    cy.get('[data-cy="indicator"]').should('have.css', 'width', '69.5px');
  });
});
