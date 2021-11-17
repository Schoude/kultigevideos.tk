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
    const aspectRatio = 16 / 9;
    const duration = ref(0);

    video.src = URL.createObjectURL(file);

    video.addEventListener('loadedmetadata', () => {
      duration.value = Math.floor(video.duration);

      let inputAspectRatio = video.videoWidth / video.videoHeight;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // set the canvas height to match 16/9 if input aspect ratio is smaller (i.e. 4/3)
      if (inputAspectRatio < aspectRatio) {
        canvas.height = video.videoWidth / aspectRatio;
      }

      const timeStep = Math.floor(video.duration / thumbnailImages.length);

      timecodes.value.push(timeStep + 1);
      timecodes.value.push(timeStep * 2);
      timecodes.value.push(timeStep * 3);
      timecodes.value.push(timeStep * 4 - 1);

      timecodes.value.forEach((timecode, index) => {
        setTimeout(() => {
          video.currentTime = timecode;
        }, index * 250);
      });
    });

    video.addEventListener('timeupdate', () => {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      // Centers the image data from the video.
      const outputX = (canvas.width - video.videoWidth) * 0.5;
      const outputY = (canvas.height - video.videoHeight) * 0.5;

      ctx.drawImage(video, outputX, outputY);

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
      duration,
    };
  }

  return {
    resize,
    generateThumbNailsFromFile,
  };
}
