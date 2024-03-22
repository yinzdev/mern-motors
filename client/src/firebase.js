// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-carros.firebaseapp.com',
  projectId: 'mern-carros',
  storageBucket: 'mern-carros.appspot.com',
  messagingSenderId: '7856256123',
  appId: '1:7856256123:web:bf91544775736df5995ede',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
