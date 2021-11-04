import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export function setupStorage() {
  const config = JSON.parse(
    import.meta.env.VITE_FIREBASE_CONFIG
  ) as FirebaseOptions;
  const firebaseApp = initializeApp(config);
  const storage = getStorage(firebaseApp);

  return {
    storage,
  };
}
