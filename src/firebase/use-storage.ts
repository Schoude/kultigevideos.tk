import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import {
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import type { UploadMetadata } from 'firebase/storage';
import { ref } from 'vue';

const config = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG
) as FirebaseOptions;
const firebaseApp = initializeApp(config);
const storage = getStorage(firebaseApp);

export function useStorage() {
  /**
   * Upload a user avatar picture from a file.
   */
  function uploadUserAvatar(file: File, userId: string) {
    const storageRef = firebaseRef(storage, `avatars/${userId}.jpeg`);
    const metadata: UploadMetadata = {
      contentType: 'image/jpeg',
    };
    const progress = ref(0);
    const newDownloadURL = ref('');

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      'state_changed',
      snapshot => {
        progress.value =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        newDownloadURL.value = downloadURL;
      }
    );

    return {
      progress,
      newDownloadURL,
    };
  }

  return {
    uploadUserAvatar,
  };
}
