import { ref, computed } from 'vue';
import logoLight from '../assets/kv-logo-light-large.svg';
import logoDark from '../assets/kv-logo-dark-large.svg';
import logoDarkSmall from '../assets/kv-logo-dark.svg';
import logoLightSmall from '../assets/kv-logo-light.svg';

const isDarkMode = ref(
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
);

const getLogoPath = computed(() => (isDarkMode.value ? logoLight : logoDark));
const getLogoPathSmall = computed(() =>
  isDarkMode.value ? logoLightSmall : logoDarkSmall
);

export const usePageHelpers = () => {
  function getLocaleDateString(dateString: undefined | string) {
    return new Date(dateString as string).toLocaleDateString();
  }

  /**
   * Takes the duration in seconds and returns a formatted duration string with hours, minutes and seconds.
   */
  function createFormattedDurationStringFromSeconds(durationInSeconds: number) {
    const h = Math.floor(durationInSeconds / 3600);
    const m = Math.floor((durationInSeconds / 60) % 60);
    const s = Math.floor(durationInSeconds % 60);

    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  }

  function setMediaSession(title: string, uploader: string, thumb: string) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: uploader,
        artwork: [{ src: thumb, type: 'image/jpg' }],
      });
    }
  }

  return {
    isDarkMode,
    getLogoPath,
    getLogoPathSmall,
    getLocaleDateString,
    createFormattedDurationStringFromSeconds,
    setMediaSession,
  };
};

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', event => {
    if (event.matches) {
      isDarkMode.value = true;
    } else {
      isDarkMode.value = false;
    }
  });
