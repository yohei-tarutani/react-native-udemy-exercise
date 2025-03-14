// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSqnSz67b-gw2eNup3Tyd-1cMTge4NQbA",
  authDomain: "strong-keyword-453402-d0.firebaseapp.com",
  projectId: "strong-keyword-453402-d0",
  storageBucket: "strong-keyword-453402-d0.firebasestorage.app",
  messagingSenderId: "469992452339",
  appId: "1:469992452339:web:bdd5fa4f0059ef8eb18786",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use initializeAuth with ReactNativeAsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
