import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyBRY-A-0RIc3LO5DXsa1BuQFAoImHu1kZQ",
    authDomain: "simplenotes-84e50.firebaseapp.com",
    databaseURL: "https://simplenotes-84e50.firebaseio.com",
    projectId: "simplenotes-84e50",
    storageBucket: "simplenotes-84e50.appspot.com",
    messagingSenderId: "866235042867",
    appId: "1:866235042867:web:0fdec2ffba348d3dbd2746",
    measurementId: "G-E0G5KDBRLB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export const database = firebase.database();

  export default firebase; 