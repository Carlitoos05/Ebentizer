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
  apiKey: "AIzaSyDCLvO6kslY5NYdS2JzWeh5AqVWHSoAcd0",
  authDomain: "organizer-ee1d1.firebaseapp.com",
  projectId: "organizer-ee1d1",
  storageBucket: "organizer-ee1d1.appspot.com",
  messagingSenderId: "439942894629",
  appId: "1:439942894629:web:b888ddc1ce5bf24d1adbcc",

  databaseURL:
    "https://organizer-ee1d1-default-rtdb.europe-west1.firebasedatabase.app/",
  // database:
  //   "https://organizer-ee1d1-default-rtdb.europe-west1.firebasedatabase.app",
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
