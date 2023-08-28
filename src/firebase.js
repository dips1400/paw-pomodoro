import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC0p1MNzShBzmsQdE0_zVletM9I4vturTs",
  authDomain: "paw-pomodoro.firebaseapp.com",
  projectId: "paw-pomodoro",
  storageBucket: "paw-pomodoro.appspot.com",
  messagingSenderId: "343827382230",
  appId: "1:343827382230:web:63548c737c89e15b946e77"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};