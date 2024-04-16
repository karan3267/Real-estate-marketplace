// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-marketplace-4df55.firebaseapp.com",
  projectId: "real-estate-marketplace-4df55",
  storageBucket: "real-estate-marketplace-4df55.appspot.com",
  messagingSenderId: "1078717811234",
  appId: "1:1078717811234:web:cadcbe2521219f2e73187b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);