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
  return {
    isDarkMode,
    getLogoPath,
    getLogoPathSmall,
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
