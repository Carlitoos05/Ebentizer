// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvDlhXKf1UIi-H5jjHSgW7XhQvxyqd-bk",
  authDomain: "ebentizer-a0499.firebaseapp.com",
  projectId: "ebentizer-a0499",
  storageBucket: "ebentizer-a0499.firebasestorage.app",
  messagingSenderId: "90614480654",
  appId: "1:90614480654:web:ff6d58a8029a4695fd215f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialix=ze RealTimeDatBAse
const database = getDatabase(app);

export { db, database, auth };
