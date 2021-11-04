import { ref } from 'vue';
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

  return {
    resize,
  };
}
