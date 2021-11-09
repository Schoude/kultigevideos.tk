import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { convertToJpegImage } from '../utils';

export function useImageHelpers() {
  /**
   * Resizes the given image file to a jpeg image with the given height.
   * The aspect ratio is preserved.
   */
  function resize(file: File, height: number) {
    const convertedFile = ref<File | null>(null);
    const dataURI = ref('');

    const tempImage = new Image();
    tempImage.src = URL.createObjectURL(file);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    tempImage.addEventListener('load', () => {
      const ratio = parseFloat((tempImage.width / tempImage.height).toFixed(2));

      canvas.height = height;
      canvas.width = canvas.height * ratio;

      // Draw image and export to a data-uri
      // ctx?.drawImage(previewImageEl.value as HTMLImageElement,
      //   600, 800,
      //   1200, 1200,
      //   0, 0,
      //   canvas.width, canvas.height);
      // TODO: figure out how to center and square crop

      ctx.drawImage(tempImage, 0, 0, canvas.width, canvas.height);

      dataURI.value = canvas.toDataURL();
      convertedFile.value = convertToJpegImage(dataURI.value, file.name);

      tempImage.remove();
      canvas.remove();
    });

    return {
      dataURI,
      convertedFile,
    };
  }

  function generateThumbNailsFromFile(
    file: File,
    thumbnailImages: Ref<HTMLImageElement>[]
  ) {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const imageDataUrls = ref<string[]>([]);
    const timecodes = ref<number[]>([]);
    const finished = ref(false);

    video.src = URL.createObjectURL(file);

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const timeStep = Math.floor(video.duration / thumbnailImages.length);

      timecodes.value.push(timeStep + 1);
      timecodes.value.push(timeStep * 2);
      timecodes.value.push(timeStep * 3 - 1);

      timecodes.value.forEach((timecode, index) => {
        setTimeout(() => {
          video.currentTime = timecode;
        }, index * 250);
      });
    });

    video.addEventListener('timeupdate', () => {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      // console.log(Math.floor(video.videoWidth) / Math.floor(video.videoHeight));
      // w / h
      // 1.777777 = 16/9
      // 1.6 = 16/10
      // 1.333333 = 4/3

      // TODO: check if aspect ratio is not 16/9, then size the canvas to 16/9 give it a black background.
      // The image data from the video should be placed in the center
      // OR crop the 4/3 image to have a 16/9 ratio
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      imageDataUrls.value.push(canvas.toDataURL());
    });

    watch(
      imageDataUrls,
      urls => {
        if (urls.length === thumbnailImages.length) {
          urls.forEach((url, index) => {
            thumbnailImages[index].value.src = url;
          });
          video.remove();
          canvas.remove();
          finished.value = true;
        }
      },
      { deep: true }
    );

    return {
      finished,
    };
  }

  return {
    resize,
    generateThumbNailsFromFile,
  };
}
