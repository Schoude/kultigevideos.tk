import { mount } from '@cypress/vue';
import VideoFeedEntry from './VideoFeedEntry.vue';
import '../../styles/main.scss';

describe('VideoFeedEntry', () => {
  const mockVideoData = {
    _id: '617af9b8e45059e41a89d5a1',
    hash: 'TYNKGOKyDah',
    url: 'https://firebasestorage.googleapis.com/v0/b/kultige-videos.appspot.com/o/TYNKGOKyDah.mp4?alt=media&token=a37c261d-99bb-4568-9b18-bea1cf998235',
    title: 'Oliver Kahn Interview - Best Of',
    thumb: 'https://i.ytimg.com/vi/qTa5rj2wvWI/hqdefault.jpg',
    viewCount: 0,
    listed: true,
    approved: true,
    approvedBy: {
      _id: '6177176029676e6d4369bff7',
      username: 'Marc',
      meta: {
        avatarUrl:
          'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png',
      },
    },
    uploader: {
      _id: '6177176029676e6d4369bff7',
      username: 'Marc',
      meta: {
        avatarUrl:
          'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png',
      },
    },
    uploadedAt: new Date('2021-10-28T19:27:52.994Z'),
    approvedAt: new Date('2021-10-28T20:27:52.994Z'),
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
      mockVideoData.uploader.username
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
      `am ${mockVideoData.uploadedAt?.toLocaleDateString()}`
    );
  });
});
