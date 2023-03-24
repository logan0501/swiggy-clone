// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF0aD8K_BvLycEtrCDAlGO8qL-pIZB32E",
  authDomain: "swiggy-clone-react.firebaseapp.com",
  projectId: "swiggy-clone-react",
  storageBucket: "swiggy-clone-react.appspot.com",
  messagingSenderId: "689621529656",
  appId: "1:689621529656:web:6df4d3f8d8ecae628722cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
