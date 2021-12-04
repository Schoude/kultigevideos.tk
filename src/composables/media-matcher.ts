import { onBeforeUnmount, ref, onBeforeMount, onMounted, watch } from 'vue';

type ScreenSize = 'p-m' | 'p-l' | 't-p' | 't-l';
enum ScreenSizePixels {
  'p-s' = '320px',
  'p-m' = '375px',
  'p-l' = '414px',
  't-p' = '768px',
  't-l' = '1024px',
  'laptop' = '1280px',
  'laptop-large' = '1366px',
  'desktop' = '1920px',
  'wqhd' = '2560px',
  '4k' = '3840px',
}

/**
 * Initialize a media listener by calling the methods.
 * Remove the listener with the destroy fn onBeforeUnmount/onUnmount.
 */
export function useMediaMatcher() {
  function matchScreen(size: ScreenSize) {
    const matching = ref(
      window.matchMedia(`(min-width: ${ScreenSizePixels[size]})`).matches
    );

    window.onresize = () => {
      matching.value = window.matchMedia(
        `(min-width: ${ScreenSizePixels[size]})`
      ).matches;
    };

    return matching;
  }

  function destroy() {
    window.onresize = null;
  }

  return {
    matchScreen,
    destroy,
  };
}
