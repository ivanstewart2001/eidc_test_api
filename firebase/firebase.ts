
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDbpgE4BMHzAGw9pvMzxnpuVxPNp70b3E4",
  authDomain: "eidc-a16f6.firebaseapp.com",
  projectId: "eidc-a16f6",
  storageBucket: "eidc-a16f6.appspot.com",
  messagingSenderId: "825363740179",
  appId: "1:825363740179:web:4894cb10ffce60141471e6",
  measurementId: "G-96FXVB899Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const database = firebase.firestore()
export const auth = firebase.auth()