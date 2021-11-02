import { mount } from '@cypress/vue';
import VideoFeedEntry from './VideoFeedEntry.vue';
import '../../styles/main.scss';
import { Video } from '../../types/models/video';

describe('VideoFeedEntry', () => {
  const mockVideoData: Video = {
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
  };

  beforeEach(() => {
    mount(VideoFeedEntry, {
      props: {
        video: mockVideoData,
      },
    });
  });

  it('displays the video thumbnail', () => {
    cy.get('[data-cy="thumbnail"]').should(
      'have.attr',
      'src',
      mockVideoData.thumb
    );
  });

  it('displays the video title', () => {
    cy.get('[data-cy="title"]').should('have.text', mockVideoData.title);
  });

  it('displays the uploader name', () => {
    cy.get('[data-cy="uploader-name"]').should(
      'have.text',
      mockVideoData.uploader?.username
    );
  });

  it('displays the viewcount', () => {
    cy.get('[data-cy="viewcount"]').should(
      'have.text',
      `${mockVideoData.viewCount} Aufrufe`
    );
  });

  it('displays the upload date', () => {
    cy.get('[data-cy="upload-date"]').should(
      'have.text',
      `am ${new Date(mockVideoData.uploadedAt).toLocaleDateString()}`
    );
  });
});
