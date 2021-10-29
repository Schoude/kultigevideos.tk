import { mount } from '@cypress/vue';
import VideoPlayer from './VideoPlayer.vue';
import '../../styles/main.scss';

describe('VideoPlayer', () => {
  const props = {
    url: 'https://firebasestorage.googleapis.com/v0/b/kultige-videos.appspot.com/o/TYNKGOKyDah.mp4?alt=media&token=a37c261d-99bb-4568-9b18-bea1cf998235',
    poster:
      'https://i.ytimg.com/vi/qTa5rj2wvWI/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAeSgXwdJg-DfLroM2BVNiM1VZ7Eg',
  };

  beforeEach(() => {
    mount(VideoPlayer, { props });
  });

  it('displays the video', () => {
    cy.get('video').should('have.attr', 'poster', props.poster);
    cy.get('source').should('have.attr', 'src', props.url);
  });

  it('has a calculated aspect ratio', () => {
    cy.get('.video-player').should('have.css', 'padding-top', '281.25px');
  });
});
