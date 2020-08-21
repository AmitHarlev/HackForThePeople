import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCeHaINilUoapZQrDfQP4SI-guU1QrFcdY",
    authDomain: "hack-for-the-people.firebaseapp.com",
    databaseURL: "https://hack-for-the-people.firebaseio.com",
    projectId: "hack-for-the-people",
    storageBucket: "hack-for-the-people.appspot.com",
    messagingSenderId: "591486962519",
    appId: "1:591486962519:web:d0dc7ba2cbb582388c8c12"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// export default db;