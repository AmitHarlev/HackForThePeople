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

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const signOut = () => {
  // TODO: catch promise
  auth.signOut();
}

export const setUserOpinions = (opinions) => {
  const user = getCurrentUser();
  let opinions_and_completed_survey_bool = {
    completedSurvey: true,
    ...opinions
  }
  db.collection('users').doc(user.uid).update(opinions_and_completed_survey_bool)
}

// Takes the user the request was sent to as argument
export const sendConversationRequest = ({id, data, topic}) => {
  const user = getCurrentUser();
  db.collection('users').doc(id).update({
    requests: firebase.firestore.FieldValue.arrayUnion({"user":user.uid, "topic":topic}),
  });
  db.collection('users').doc(user.uid).update({
    requestsSent: firebase.firestore.FieldValue.arrayUnion({"user":id, "topic":topic}),
  });
}

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then(function(result) {

    const user = result.user;
    const usersRef = db.collection('users');

    usersRef.doc(user.uid).get()
      .then(
        (doc) => {
          if (!doc.exists) {
            usersRef.doc(user.uid).set({
              name: user.displayName,
              completedSurvey: false,
              requests:[],
              requestsSent:[],
              ratings: [{
                uid: "Ilona Kariko",
                rating: 1
              }, {
                uid: "Ingrid Tsang",
                rating: 4
              }]
            });
          }
        }
      )
      .catch(
        (err) => {
          console.log("error: "+ err);
        }
      )

  }).catch(function(error) {
    console.log(error.message)
  });
};