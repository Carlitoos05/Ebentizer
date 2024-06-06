// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjJLkYgPeoTffA1hjYvE_Ny9Gp2W41k_U",
  authDomain: "ebentizer.firebaseapp.com",
  projectId: "ebentizer",
  storageBucket: "ebentizer.appspot.com",
  messagingSenderId: "826182261195",
  appId: "1:826182261195:web:cb7f4e5c48aadd13c5be4e"
};

// Initialize Firebases
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app); // Aquí importamos la función getDatabase para acceder a Firebase Database


export {auth, firestore, database };