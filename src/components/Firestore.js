// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFJrUz6MVxtXznVDqzOJfM17PeHe8kwHg",
  authDomain: "poker-fcbd4.firebaseapp.com",
  projectId: "poker-fcbd4",
  storageBucket: "poker-fcbd4.appspot.com",
  messagingSenderId: "495869216888",
  appId: "1:495869216888:web:ce58451db72d929877c58d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {firestore, auth};