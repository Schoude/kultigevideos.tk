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
  function createFormattedDurationStringFromSeconds(duration: number) {
    const hourValue = 3600;
    const minuteValue = 60;

    let h = 0;
    let m = 0;
    let s = 0;

    let durationStringHours = '0:';
    let durationStringMinutes = '0:';
    let durationStringSeconds = '00';

    while (duration >= hourValue) {
      h++;
      duration = duration - hourValue;
      durationStringHours = `${h}:`;
    }

    while (duration >= minuteValue) {
      m++;
      duration = duration - minuteValue;

      if (m === minuteValue) {
        h++;
        m = 0;
      }

      durationStringMinutes = `${m}:`;
    }

    while (duration > 0) {
      s = Math.floor(duration);
      duration = 0;

      durationStringSeconds = `${s}`;

      if (s === 60) {
        m++;
        s = 0;
        durationStringSeconds = `00`;
      }

      if (s < 10) {
        durationStringSeconds = `0${s}`;
      }
    }

    if (h > 0) {
      return `${durationStringHours}${durationStringMinutes}${durationStringSeconds}`;
    } else {
      return `${durationStringMinutes}${durationStringSeconds}`;
    }
  }

  return {
    isDarkMode,
    getLogoPath,
    getLogoPathSmall,
    getLocaleDateString,
    createFormattedDurationStringFromSeconds,
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
