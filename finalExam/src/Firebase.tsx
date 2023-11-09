// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH3Ikr5oRy2NFGCr4x86dPcG-XjInavdY",
  authDomain: "todo-app-dev3.firebaseapp.com",
  projectId: "todo-app-dev3",
  storageBucket: "todo-app-dev3.appspot.com",
  messagingSenderId: "496056048486",
  appId: "1:496056048486:web:22a418994bb6f3004546a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Firebase = getFirestore(app);