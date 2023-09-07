// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want tod usedf
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHAzTVKxmGh6sLsWRkJKJuFniYQ0VPZ4s',
  authDomain: 'mapboxapp-54f17.firebaseapp.com',
  projectId: 'mapboxapp-54f17',
  storageBucket: 'mapboxapp-54f17.appspot.com',
  messagingSenderId: '649007846141',
  appId: '1:649007846141:web:bfa8525f6581dd9083a494',
  measurementId: 'G-09S9XMYZVB',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
