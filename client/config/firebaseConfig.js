// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5-mFgd15XUTklDdrxTl6CEKPasAvofLE",
  authDomain: "react-native-udemy-exercise.firebaseapp.com",
  projectId: "react-native-udemy-exercise",
  storageBucket: "react-native-udemy-exercise.firebasestorage.app",
  messagingSenderId: "330033612093",
  appId: "1:330033612093:web:8b75534443643fb2b47154",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use initializeAuth with ReactNativeAsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
