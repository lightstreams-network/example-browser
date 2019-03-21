import { createContext } from 'react';
import app from 'firebase/app';
import createFirebaseApp from '../../lib/firebase';

export const firebaseApp = createFirebaseApp(app);
export const FirebaseContext = createContext(null);
