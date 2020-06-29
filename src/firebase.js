import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDd15ulXz7ABJQQ7XqBl37R3aWY2uLIHss",
  authDomain: "tack-e5596.firebaseapp.com",
  databaseURL: "https://tack-e5596.firebaseio.com",
  projectId: "tack-e5596",
  storageBucket: "tack-e5596.appspot.com",
  messagingSenderId: "511137711928",
  appId: "1:511137711928:web:580b08d188659312e123cd",
  measurementId: "G-E1BB1WWEWT",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
