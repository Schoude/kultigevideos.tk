/**
 * Creates Uint8Array from base64 dataURL.
 */
function createUint8ArrayFromDataURL(dataUrl: string) {
  const blobBin = atob(dataUrl.split(',')[1]);
  const array = [];

  for (let i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }

  return [new Uint8Array(array)];
}

/**
 * Converts a base64 dataURL to a jpeg image file.
 */
export function convertToJpegImage(dataUrl: string, filename: string): File {
  return new File(createUint8ArrayFromDataURL(dataUrl), filename, {
    type: 'image/jpeg',
  });
}

/**
 * Generates a random string for the given length.
 */
export function randomString(length: number) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123465790';
  const parts = [];

  for (let index = 0; index < length; index++) {
    let substr = Math.floor(Math.random() * charset.length);
    const char = charset.substr(substr, 1);
    parts.push(char);
  }

  return parts.join('');
}
