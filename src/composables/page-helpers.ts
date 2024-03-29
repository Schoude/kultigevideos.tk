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
  function getLocaleDateString(
    dateString: undefined | string,
    withTime: boolean = false
  ) {
    const date = new Date(dateString as string);
    return withTime
      ? `am ${date.toLocaleDateString()} um ${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date
          .getMinutes()
          .toString()
          .padStart(2, '0')} Uhr`
      : date.toLocaleDateString();
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

  function setPageTitle(prefix?: string) {
    const defaultTitle = 'Kultige Videos';

    if (prefix) {
      document.title = `${prefix} | ${defaultTitle}`;
    } else {
      document.title = defaultTitle;
    }
  }

  function handleClickOutside(
    event: Event | PointerEvent,
    el: HTMLElement,
    onClickedOutside: () => void
  ) {
    if (el.contains(event.target as Node)) {
    } else {
      onClickedOutside();
    }
  }

  function placeCursorAtPosition(el: Node, position: 'start' | 'end') {
    const range = document.createRange();
    range.selectNodeContents(el);
    switch (position) {
      case 'end':
        range.collapse(false);
        break;

      case 'start':
        range.collapse(true);
    }

    const sel = window.getSelection() as Selection;
    sel.removeAllRanges();
    sel.addRange(range);
  }

  return {
    isDarkMode,
    getLogoPath,
    getLogoPathSmall,
    getLocaleDateString,
    createFormattedDurationStringFromSeconds,
    setMediaSession,
    setPageTitle,
    handleClickOutside,
    placeCursorAtPosition,
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
