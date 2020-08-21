import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
const provider = new firebase.auth.GoogleAuthProvider();

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const signInWithGoogle = () => {
  auth.signInWithRedirect(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("banana");
    console.log(user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};