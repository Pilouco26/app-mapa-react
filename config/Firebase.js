// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want tod usedf
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGUnPLNIU8fjpYXczHQRr05KGU9XRq4vg",
  authDomain: "appreact-5409a.firebaseapp.com",
  projectId: "appreact-5409a",
  storageBucket: "appreact-5409a.appspot.com",
  messagingSenderId: "167132280668",
  appId: "1:167132280668:web:72e736ca50a425c88a3399"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);


