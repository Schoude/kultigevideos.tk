import {
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from 'firebase/storage';
import type { UploadMetadata } from 'firebase/storage';
import { ref } from 'vue';
import { setupStorage } from './setup';
const { storage } = setupStorage();

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

  /**
   * Upload a file for the new video. Works for both thumbnail and video file.
   */
  function uploadFileNewVideo(
    file: File,
    videoHash: string,
    type: 'image/jpeg' | 'video/mp4'
  ) {
    const storageRef = firebaseRef(storage, `${videoHash}/${file.name}`);
    const metadata: UploadMetadata = {
      contentType: type,
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

  async function deleteVideoDataFromStorage(hash: string) {
    const videoFilesRef = firebaseRef(storage, `${hash}`);
    try {
      const res = await listAll(videoFilesRef);
      res.items.forEach(itemRef => deleteObject(itemRef));
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  return {
    uploadUserAvatar,
    uploadFileNewVideo,
    deleteVideoDataFromStorage,
  };
}
